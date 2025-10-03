
import React, { useState } from 'react';

interface SearchInputProps {
  initialValue: string;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ initialValue, onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-full bg-gray-800 p-2 shadow-lg focus-within:ring-2 focus-within:ring-cyan-500 transition-shadow duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 ml-3 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="e.g., Eiffel Tower, Paris"
        disabled={isLoading}
        className="w-full bg-transparent text-lg text-gray-200 placeholder-gray-500 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300 flex items-center justify-center whitespace-nowrap"
      >
        {isLoading ? 'Exploring...' : 'Explore'}
      </button>
    </form>
  );
};

export default SearchInput;
