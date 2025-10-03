
import React from 'react';

interface LocationInfoProps {
  name: string;
  description: string;
  facts: string[];
}

const LocationInfo: React.FC<LocationInfoProps> = ({ name, description, facts }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-4 capitalize text-cyan-400">{name}</h2>
      <p className="text-gray-300 leading-relaxed mb-6">{description}</p>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-200">Highlights</h3>
      <ul className="space-y-3">
        {facts.map((fact, index) => (
          <li key={index} className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300">{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationInfo;
