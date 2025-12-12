import { useBlog } from '../../controllers/useBlog';
import BlogCard from '../components/BlogCard';

const BlogPage = () => {
    const { blogs, loading, error } = useBlog();

    if (loading) return <div className="loading-spinner">تحميل المدونات...</div>;
    if (error) return <div className="error-msg">خطاء في تحميل المدونات.</div>;

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                 <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>آخر الأخبار</h1>
                 <p style={{ color: 'var(--text-muted)' }}>التحديثات، النصائح، والقصص من فريقنا.</p>
            </div>
           
            <div className="grid-3">
                {blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
