import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, BookOpen, Home, Calendar } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navStyle = {
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: 'var(--spacing-md) 0'
    };

    const linkStyle = (active) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-md)',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        fontWeight: active ? 600 : 500,
        backgroundColor: active ? 'rgba(79, 70, 229, 0.05)' : 'transparent'
    });

    return (
        <nav style={navStyle}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8 }}></div>
                    متجري
                </Link>

                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <Link to="/" style={linkStyle(isActive('/'))}>
                        <Home size={20} />
                        الرئيسية
                    </Link>
                    <Link to="/products" style={linkStyle(isActive('/products'))}>
                        <ShoppingBag size={20} />
                        المتجر
                    </Link>
                    <Link to="/blog" style={linkStyle(isActive('/blog'))}>
                        <BookOpen size={20} />
                        المدونة
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
