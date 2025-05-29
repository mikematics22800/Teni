import React, { useState } from 'react';
import tripadvisorApi from '../api/tripadvisor';

export default function Hotels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationId, setLocationId] = useState('');
  const [hotels, setHotels] = useState([]);
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

      const data = await tripadvisorApi.searchHotels(locationId, {
        query: searchQuery
      });
      setHotels(data.data || []);
    } catch (err) {
      setError('Failed to load hotels');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Hotels</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter location or hotel name"
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
        {hotels.map((hotel) => (
          <div
            key={hotel.hotelId}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {hotel.photo && (
              <img
                src={hotel.photo.images.medium.url}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{hotel.rating}</span>
                <span className="ml-2 text-gray-500">
                  ({hotel.numReviews} reviews)
                </span>
              </div>
              <p className="text-gray-500 mb-2">{hotel.priceLevel}</p>
              {hotel.address && (
                <p className="text-gray-500 mb-2">{hotel.address}</p>
              )}
              {hotel.amenities && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
