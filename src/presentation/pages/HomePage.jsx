import { useCategories } from '../../controllers/useCategories';
import { useProducts } from '../../controllers/useProducts';
import { useBlog } from '../../controllers/useBlog';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';

const HomePage = () => {
    const { categories, loading: catLoading } = useCategories();
    const { products, loading: prodLoading } = useProducts();
    const { blogs, loading: blogLoading } = useBlog();

    if (catLoading || prodLoading || blogLoading) return <div className="loading-spinner">جاري التحميل...</div>;

    // Helper to filter products by category documentId or ID
    const getProductsByCategory = (catDocId, catId) => {
        return products.filter(p => 
            p.cat?.documentId === catDocId || 
            p.category?.documentId === catDocId ||
            p.cat?.id === catId
        ).slice(0, 10);
    };

    return (
        <div>
            {/* Hero Section */}
            <section style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem', 
                background: 'linear-gradient(to bottom right, #e0e7ff, #f0fdf4)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
                    مرحباً بكم في متجر الفحل السعودي
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    اكتشف مجموعتنا المميزة من المنتجات. جودة عالية وتصميم بسيط.
                </p>
                <Link to="/products" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
                    تصفح المنتجات <ArrowRight size={20} style={{ marginRight: '0.5rem', transform: 'rotate(180deg)' }}/>
                </Link>
            </section>


            
            {/* Categories Title */}
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>الأقسام</h2>

            {/* Categories & Products Sections */}
            {categories.slice(0, 4).map(cat => {
                const catProducts = getProductsByCategory(cat.documentId, cat.id);
                if (catProducts.length === 0) return null;

                return (
                    <section key={cat.documentId || cat.id} style={{ marginBottom: '4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                            <h2 style={{ fontSize: '1.75rem' }}>{cat.title}</h2>
                            <Link 
                                to={`/products?category=${cat.documentId}`} 
                                className="btn"
                                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                            >
                                عرض المزيد <ArrowRight size={16} style={{ marginRight: '0.5rem', transform: 'rotate(180deg)' }}/>
                            </Link>
                        </div>
                        <div className="grid-3">
                            {catProducts.map(product => (
                                <ProductCard 
                                    key={product.id || product.documentId} 
                                    product={product} 
                                    onOrder={() => {}} // Simple view only on home
                                />
                            ))}
                        </div>
                    </section>
                );
            })}

            {/* Blogs Section */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem' }}>المدونة</h2>
                    <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: 600 }}>عرض كل التدوينات &larr;</Link>
                </div>
                <div className="grid-3">
                    {blogs.slice(0, 3).map(blog => (
                        <BlogCard key={blog.id || blog.documentId} blog={blog} />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default HomePage;
