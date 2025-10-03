
import React, { useState, useCallback } from 'react';
import type { LocationData } from './types';
import { generateLocationDetails } from './services/geminiService';
import SearchInput from './components/SearchInput';
import LocationInfo from './components/LocationInfo';
import MapView from './components/MapView';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('Machu Picchu, Peru');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError('Please enter a location to search.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLocationData(null);

    try {
      const data = await generateLocationDetails(searchQuery);
      setLocationData(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
          Gemini Maps Explorer
        </h1>
        <p className="text-gray-400 text-lg">
          Discover the world, one search at a time.
        </p>
      </header>

      <main className="w-full max-w-5xl flex-grow">
        <SearchInput
          initialValue={query}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        <div className="mt-8">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          
          {locationData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
              <LocationInfo
                name={query}
                description={locationData.description}
                facts={locationData.facts}
              />
              <MapView
                locationName={query}
                imageUrl={locationData.imageUrl}
              />
            </div>
          )}
          
          {!isLoading && !error && !locationData && (
              <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-3m6-10v3m0 0l-6 3" />
                  </svg>
                  <h2 className="text-2xl font-semibold">Welcome to the Explorer</h2>
                  <p className="mt-2 max-w-md">Enter a landmark, city, or natural wonder to begin your journey. Try "Eiffel Tower" or "Grand Canyon".</p>
              </div>
          )}
        </div>
      </main>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
