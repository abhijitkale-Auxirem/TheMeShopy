import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';

export function useSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const setSearchQuery = useProductStore(s => s.setSearchQuery);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    setSearchQuery(q);
    if (q.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(q)}`);
    }
  }, [navigate, setSearchQuery]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSearchQuery('');
  }, [setSearchQuery]);

  return { query, setQuery, handleSearch, clearSearch };
}
