import { useState } from 'react';
import { useOrder } from '../../controllers/useOrder';
import { X } from 'lucide-react';

const OrderForm = ({ product, onClose }) => {
    const { submitOrder, loading, error, success } = useOrder();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        adress: '',
        countofproduct: 1
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCountChange = (increment) => {
        setFormData(prev => {
            const newCount = prev.countofproduct + increment;
            return { ...prev, countofproduct: newCount > 0 ? newCount : 1 };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderPayload = {
            name: formData.name,
            phone: formData.phone,
            adress: formData.adress,
            productname: product.title, // Fixed/Read-only from prop
            countofproduct: formData.countofproduct
        };
        await submitOrder(orderPayload);
    };

    if (success) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ color: 'var(--success)', fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                <h3>تم الطلب بنجاح!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>سنتواصل معك قريباً.</p>
                <button className="btn btn-primary" onClick={onClose}>إغلاق</button>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
             <button 
                onClick={onClose} 
                style={{ position: 'absolute', left: 0, top: 0, color: 'var(--text-muted)' }}
            >
                <X size={24} />
            </button>

            <h2 style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }}>طلب منتج</h2>
            
            {error && (
                <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                    فشل الطلب. يرجى المحاولة مرة أخرى.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Read-only Product Name */}
                <div className="form-group">
                    <label className="form-label">المنتج</label>
                    <input 
                        type="text" 
                        value={product.title} 
                        readOnly 
                        className="form-input" 
                        style={{ backgroundColor: 'var(--surface)', color: 'var(--text-muted)', cursor: 'not-allowed' }}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">العدد</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button 
                            type="button" 
                            onClick={() => handleCountChange(-1)}
                            style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', fontSize: '1.25rem' }}
                        >
                            -
                        </button>
                        <span style={{ fontSize: '1.25rem', fontWeight: 600, minWidth: '30px', textAlign: 'center' }}>
                            {formData.countofproduct}
                        </span>
                        <button 
                            type="button" 
                            onClick={() => handleCountChange(1)}
                            style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', fontSize: '1.25rem' }}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">الاسم الكامل</label>
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        className="form-input" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="الاسم"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">رقم الجوال</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        required 
                        className="form-input" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="05xxxxxxxx"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">العنوان</label>
                    <textarea 
                        name="adress" 
                        required 
                        className="form-input" 
                        rows="3"
                        value={formData.adress}
                        onChange={handleChange}
                        placeholder="المدينة، الحي، الشارع"
                    />
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '1rem' }}
                    disabled={loading}
                >
                    {loading ? 'جاري الطلب...' : 'تأكيد الطلب'}
                </button>
            </form>
        </div>
    );
};

export default OrderForm;
