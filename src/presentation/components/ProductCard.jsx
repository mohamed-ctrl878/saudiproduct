import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onOrder }) => {
    // Helper to get image URL safely
    // Adapting to user's observed "flat" structure. 
    // Schema says photo is multiple, so we check first item or direct url if flattened to object.
    const imageUrl = product?.photo?.[0]?.url || product?.photo?.url
        ? `https://miniecommerce-production-c1a9.up.railway.app${product?.photo?.[0]?.url || product?.photo?.url}`
        : 'https://via.placeholder.com/300x200?text=No+Image';

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Link to={`/product/${product.documentId}`} style={{ display: 'block', height: '200px', overflow: 'hidden', background: '#f1f5f9' }}>
                <img 
                    src={imageUrl} 
                    alt={product.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Link>
            <div className='product-card' style={{ padding: 'var(--spacing-md)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Link to={`/product/${product.documentId}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{product.title}</h3>
                </Link>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 'var(--spacing-md)', flex: 1 }}>
                    {product.description?.substring(0, 100)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {product.price} ريال
                    </span>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => onOrder(product)}
                        style={{ gap: '0.5rem' }}
                    >
                        <ShoppingCart size={18} />
                        اطلب
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
