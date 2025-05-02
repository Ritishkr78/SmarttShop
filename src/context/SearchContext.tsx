import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useDebouncedCallback } from '../hooks/useDebounce';
import { searchProducts, getSuggestions } from '../services/apiService';

type SearchContextType = {
  query: string;
  suggestions: string[];
  isLoading: boolean;
  setQuery: (query: string) => void;
  executeSearch: () => void;
  clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useDebouncedCallback(async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }
    
    try {
      const results = await getSuggestions(searchTerm);
      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  }, 300);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    fetchSuggestions(newQuery);
  };

  const executeSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      await searchProducts(query);
    } catch (error) {
      console.error('Error executing search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        suggestions,
        isLoading,
        setQuery: handleQueryChange,
        executeSearch,
        clearSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};