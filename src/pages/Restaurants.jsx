import React, { useState, useEffect } from 'react';
import tripadvisorApi from '../api/tripadvisor';

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationId, setLocationId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLocationSearch = async (query) => {
    try {
      const response = await tripadvisorApi.searchLocations(query);
      if (response.data && response.data.length > 0) {
        setLocationId(response.data[0].locationId);
        return response.data[0].locationId;
      }
    } catch (err) {
      setError('Failed to find location');
      console.error(err);
    }
    return null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!locationId) {
        const newLocationId = await handleLocationSearch(searchQuery);
        if (!newLocationId) {
          setLoading(false);
          return;
        }
      }

      const data = await tripadvisorApi.searchRestaurants(locationId, {
        query: searchQuery
      });
      setRestaurants(data.data || []);
    } catch (err) {
      setError('Failed to load restaurants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Restaurants</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter location or restaurant name"
            className="flex-1 p-2 border rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.restaurantId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {restaurant.photo && (
              <img
                src={restaurant.photo.images.medium.url}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
              <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{restaurant.rating}</span>
                <span className="ml-2 text-gray-500">
                  ({restaurant.numReviews} reviews)
                </span>
              </div>
              <p className="text-gray-500">{restaurant.priceLevel}</p>
              {restaurant.address && (
                <p className="text-gray-500 mt-2">{restaurant.address}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
