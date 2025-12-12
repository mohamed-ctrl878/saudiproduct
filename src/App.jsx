import { Routes, Route } from 'react-router-dom';
import Layout from './presentation/components/Layout';
import HomePage from './presentation/pages/HomePage';
import ProductsPage from './presentation/pages/ProductsPage';
import ProductDetailsPage from './presentation/pages/ProductDetailsPage';
import BlogPage from './presentation/pages/BlogPage';
import BlogDetailsPage from './presentation/pages/BlogDetailsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:documentId" element={<BlogDetailsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
