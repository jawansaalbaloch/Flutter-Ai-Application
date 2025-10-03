
import React from 'react';

interface MapViewProps {
  imageUrl: string;
  locationName: string;
}

const MapView: React.FC<MapViewProps> = ({ imageUrl, locationName }) => {
  return (
    <div className="bg-gray-800/50 p-2 rounded-2xl shadow-lg border border-gray-700 h-full">
      <img
        src={imageUrl}
        alt={`Generated view of ${locationName}`}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
};

export default MapView;
