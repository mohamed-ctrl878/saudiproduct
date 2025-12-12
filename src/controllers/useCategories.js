import { useState, useEffect } from 'react';
import { getCategories } from '../models/categoryModel';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data.data); // Strapi returns { data: [...], meta: ... }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};
