import React, { useState, useEffect } from 'react';
import tripadvisorApi from '../api/tripadvisor';

export default function Home() {
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        const data = await tripadvisorApi.getPopularDestinations();
        setPopularDestinations(data.data || []);
      } catch (err) {
        setError('Failed to load popular destinations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Popular Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularDestinations.map((destination) => (
          <div
            key={destination.locationId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {destination.photo && (
              <img
                src={destination.photo.images.medium.url}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
              <p className="text-gray-600">{destination.description}</p>
              <div className="mt-4 flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{destination.rating}</span>
                <span className="ml-2 text-gray-500">
                  ({destination.numReviews} reviews)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 