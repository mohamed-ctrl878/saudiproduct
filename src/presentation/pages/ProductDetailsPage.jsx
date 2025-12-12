import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../../controllers/useProducts';
import { useState } from 'react';
import OrderForm from '../components/OrderForm';
import { ArrowRight, ShoppingCart } from 'lucide-react'; // Changed ArrowLeft to ArrowRight for RTL

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (loading) return <div className="loading-spinner">جاري تحميل تفاصيل المنتج...</div>;
    if (error || !product) return <div className="error-msg">المنتج غير موجود.</div>;

    // flattened data access
    const images = product.photo || [];
    const mainImageUrl = images.length > 0 && images[selectedImageIndex]?.url 
        ? `https://miniecommerce-production-c1a9.up.railway.app${images[selectedImageIndex].url}`
        : 'https://via.placeholder.com/600x400?text=No+Image';

    return (
        <div>
            <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <ArrowRight size={20} /> العودة للمنتجات
            </Link>

            {showOrderForm && (
                <div  style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 1000, padding: '1rem'
                }}>
                    <div style={{
                        background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)',
                        width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <OrderForm product={product} onClose={() => setShowOrderForm(false)} />
                    </div>
                </div>
            )}

            <div className='product-card' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
                {/* Image Gallery */}
                <div>
                     <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '1rem' }}>
                        <img 
                            src={mainImageUrl} 
                            alt={product.title} 
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                    {images.length > 1 && (
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {images.map((img, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    style={{ 
                                        width: '80px', height: '80px', 
                                        borderRadius: 'var(--radius-md)', overflow: 'hidden',
                                        border: selectedImageIndex === index ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        opacity: selectedImageIndex === index ? 1 : 0.7,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <img 
                                        src={`https://miniecommerce-production-c1a9.up.railway.app${img.url}`} 
                                        alt={`View ${index + 1}`} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.title}</h1>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '2rem' }}>
                        {product.price} ريال
                    </div>
                    
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>الوصف</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                            {product.description}
                        </p>
                    </div>

                    <button 
                        className="btn btn-primary" 
                        onClick={() => setShowOrderForm(true)}
                        style={{ padding: '1rem 2rem', fontSize: '1.1rem', gap: '0.5rem' }}
                    >
                        <ShoppingCart size={24} />
                        اطلب الآن
                    </button>
                    
                     {product.category && (
                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                            القسم: <strong>{product.category.title || product.cat?.title || "عام"}</strong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
