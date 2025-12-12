import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    console.log(blog);
    
     // Helper to get image URL safely - 'pic' is an array in schema
     const imageUrl = blog?.pic?.url 
     ? `https://miniecommerce-production-c1a9.up.railway.app${blog?.pic?.url}`
     : 'https://via.placeholder.com/300x200?text=Blog+Cover';

     // Helper to extract text from Strapi Blocks (rich text)
     // content is in 'discription' (typo in DB)
     const renderDescription = () => {
         const blocks = blog?.discription;
         if (!blocks || !Array.isArray(blocks)) return "No description available.";
         
         // Try to find first paragraph
         const firstPara = blocks.find(b => b.type === 'paragraph');
         if (firstPara && firstPara.children) {
             return firstPara.children.map(c => c.text).join(' ').substring(0, 150) + '...';
         }
         return "Click to read more...";
     };

    return (
        <div className="card">
             <div style={{ height: '200px', overflow: 'hidden', background: '#f1f5f9' }}>
                <img 
                    src={imageUrl} 
                    alt={blog?.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ padding: 'var(--spacing-md)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{blog.title}</h3>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        {new Date(blog.publishedAt).toLocaleDateString('ar-SA')}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                         <User size={14} />
                        ادمن
                    </span>
                </div>
                <p style={{ color: 'var(--text-main)', lineHeight: 1.6 }}>
                    {renderDescription()}
                </p>
                <Link to={`/blog/${blog.documentId}`} style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: 600 }}>
                    اقرأ المزيد &larr;
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
