import { useState, useEffect, useCallback } from 'react';

export const useApi = (endpoint, params = {}, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams(params).toString();
      const url = `http://localhost:5001/api${endpoint}${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params)]);

  useEffect(() => {
    if (!options.manual) {
      fetchData();
    }
  }, [fetchData, options.manual]);

  return { data, loading, error, refetch: fetchData };
};

export const useApiPost = () => {
  const [loading, setLoading] = useState(false);
  
  const post = async (endpoint, body) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Post Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { post, loading };
};