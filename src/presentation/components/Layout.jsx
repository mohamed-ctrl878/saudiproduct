import Navbar from './Navbar';
import BackgroundBlobs from './BackgroundBlobs';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <BackgroundBlobs />
            <Navbar />
            <main className="container" style={{ flex: 1, paddingBottom: 'var(--spacing-xl)', position: 'relative', zIndex: 1 }}>
                {children}
            </main>
            <footer style={{ textAlign: 'center', padding: 'var(--spacing-lg)', borderTop: '1px solid var(--border)', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
                &copy; {new Date().getFullYear()} متجر الفحل السعودي. جميع الحقوق محفوظة.
            </footer>
        </div>
    );
};

export default Layout;
