import { useParams, Link } from 'react-router-dom';
import { useBlogDetails } from '../../controllers/useBlog';
// import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { ArrowRight, Calendar, User } from 'lucide-react';

const BlogDetailsPage = () => {
    const { documentId } = useParams();
    const { blog, loading, error } = useBlogDetails(documentId);

    if (loading) return <div className="loading-spinner">جاري تحميل المقال...</div>;
    if (error || !blog) return <div className="error-msg">المقال غير موجود.</div>;

    const imageUrl = blog.pic?.url 
        ? `https://miniecommerce-production-c1a9.up.railway.app${blog.pic.url}`
        : 'https://via.placeholder.com/800x400?text=No+Cover+Image';

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <ArrowRight size={20} /> العودة للمدونة
            </Link>

            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2rem', maxHeight: '400px' }}>
                <img 
                    src={imageUrl} 
                    alt={blog.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.3 }}>{blog.title}</h1>

            <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-muted)', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={18} />
                    {new Date(blog.publishedAt).toLocaleDateString('ar-SA')}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={18} />
                    ادمن
                </span>
            </div>

            {/* Rich Text Content */}
            <div className="prose">
                {/* {blog.discription ? (
                    <BlocksRenderer content={blog.discription} />
                ) : (
                    <p>لا يوجد محتوى لهذا المقال.</p>
                )} */}
            </div>
        </div>
    );
};

export default BlogDetailsPage;
