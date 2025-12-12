import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../controllers/useProducts';
import { useCategories } from '../../controllers/useCategories';
import ProductCard from '../components/ProductCard';
import OrderForm from '../components/OrderForm';
import { Filter } from 'lucide-react';

const ProductsPage = () => {
    const { products, loading: prodLoading, error: prodError } = useProducts();
    const { categories, loading: catLoading } = useCategories();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const categoryFilter = searchParams.get('category');

    // Filter products
    const displayedProducts = categoryFilter 
        ? products.filter(p => 
            p.cat?.documentId === categoryFilter || 
            p.category?.documentId === categoryFilter
          )
        : products;

    if (prodLoading || catLoading) return <div className="loading-spinner">Loading products...</div>;
    if (prodError) return <div className="error-msg">Error loading products.</div>;

    const handleCategoryClick = (docId) => {
        if (categoryFilter === docId) {
            setSearchParams({});
        } else {
            setSearchParams({ category: docId });
        }
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            {/* Modal Overlay for Order Form */}
            {selectedProduct && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 1000, padding: '1rem'
                }}>
                    <div style={{
                        background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)',
                        width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                    </div>
                </div>
            )}

            {/* Sidebar Filter */}
            <aside style={{ width: '250px', flexShrink: 0, background: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', position: 'sticky', top: '100px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                    <Filter size={20} /> تصفية
                </div>
                
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>القسم</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button 
                        onClick={() => setSearchParams({})}
                        style={{ 
                            textAlign: 'right', padding: '0.5rem', borderRadius: 'var(--radius-sm)',
                            background: !categoryFilter ? 'var(--primary)' : 'transparent',
                            color: !categoryFilter ? 'white' : 'var(--text-main)',
                            fontWeight: !categoryFilter ? 600 : 400
                        }}
                    >
                        كل المنتجات
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat.id || cat.documentId}
                            onClick={() => handleCategoryClick(cat.documentId)}
                            style={{ 
                                textAlign: 'right', padding: '0.5rem', borderRadius: 'var(--radius-sm)',
                                background: categoryFilter === cat.documentId ? 'var(--primary)' : 'transparent',
                                color: categoryFilter === cat.documentId ? 'white' : 'var(--text-main)',
                                fontWeight: categoryFilter === cat.documentId ? 600 : 400
                            }}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>
            </aside>

            {/* Product Grid */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem' }}>
                        {categoryFilter ? categories.find(c => c.documentId === categoryFilter)?.title || 'القسم' : 'كل المنتجات'}
                    </h1>
                    <span style={{ color: 'var(--text-muted)' }}>{displayedProducts.length} منتج</span>
                </div>

                {displayedProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        لا توجد منتجات في هذا القسم.
                    </div>
                ) : (
                    <div className="grid-3">
                        {displayedProducts.map(product => (
                            <ProductCard 
                                key={product.id || product.documentId} 
                                product={product} 
                                onOrder={setSelectedProduct} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
