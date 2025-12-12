import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, padding: 'var(--spacing-xl) 0' }}>
                <div className="container">
                    {children}
                </div>
            </main>
            <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: 'var(--spacing-lg) 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                <div className="container">
                    &copy; {new Date().getFullYear()} متجري. جميع الحقوق محفوظة.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
