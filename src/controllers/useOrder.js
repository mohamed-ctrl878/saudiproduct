import { useState } from 'react';
import { createSchedule } from '../models/scheduleModel';

export const useOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitOrder = async (orderData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await createSchedule(orderData);
            setSuccess(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { submitOrder, loading, error, success };
};
