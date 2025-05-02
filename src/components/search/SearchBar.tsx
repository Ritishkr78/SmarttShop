import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Mic, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFocus, onBlur }) => {
  const { query, suggestions, setQuery, executeSearch, clearSearch } = useSearch();
  const [isFocused, setIsFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
    setIsFocused(false);
    setShowFilters(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    executeSearch();
    setIsFocused(false);
    setShowFilters(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search for products, brands..."
            className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <div className="absolute right-2 flex items-center space-x-1">
            {query && (
              <button
                type="button"
                onClick={() => clearSearch()}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full focus:outline-none"
            >
              <Filter className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full focus:outline-none"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button
              type="submit"
              className="ml-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-50 border border-gray-200 py-2 max-h-96 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* Filters Section */}
      {showFilters && (
        <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-40 border border-gray-200 p-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">All Categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="audio">Audio</option>
                <option value="tvs">TVs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="relevance">Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;