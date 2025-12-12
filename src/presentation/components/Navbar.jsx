import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, BookOpen, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navStyle = {
        background: 'rgba(255, 255, 255, 0.8)', // Glassmorphism
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '0.75rem 0'
    };

    const linkStyle = (active) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-md)',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        fontWeight: active ? 600 : 500,
        backgroundColor: active ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
    });

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav style={navStyle}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                
                {/* Brand */}
                <Link to="/" onClick={closeMenu} style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: 8 }}></div>
                     الفحل السعودي
                </Link>

                {/* Mobile Toggle Button */}
                <button 
                    className="nav-toggle" 
                    onClick={toggleMenu} 
                    aria-label="Toggle Menu"
                    style={{ color: 'var(--text-main)', padding: '0.5rem' }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                    
                {/* Desktop Nav */}
                <div className="hide-on-mobile" style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
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

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="nav-links show-on-mobile" style={{ 
                        position: 'absolute', 
                        top: '100%', 
                        left: 0, 
                        right: 0, 
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(16px)',
                        borderBottom: '1px solid var(--border)',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Link to="/" onClick={closeMenu} style={{ ...linkStyle(isActive('/')), width: '100%' }}>
                            <Home size={20} />
                            الرئيسية
                        </Link>
                        <Link to="/products" onClick={closeMenu} style={{ ...linkStyle(isActive('/products')), width: '100%' }}>
                            <ShoppingBag size={20} />
                            المتجر
                        </Link>
                        <Link to="/blog" onClick={closeMenu} style={{ ...linkStyle(isActive('/blog')), width: '100%' }}>
                            <BookOpen size={20} />
                            المدونة
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
