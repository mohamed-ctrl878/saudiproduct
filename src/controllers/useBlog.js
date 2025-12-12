import { useState, useEffect } from 'react';
import { getBlogs, getBlogByDocumentId } from '../models/blogModel';

export const useBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, loading, error };
};

export const useBlogDetails = (documentId) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!documentId) return;
        const fetchBlog = async () => {
            try {
                const data = await getBlogByDocumentId(documentId);
                setBlog(data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [documentId]);

    return { blog, loading, error };
};


