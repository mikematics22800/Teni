import React, { useState } from 'react';
import { searchCarRentalLocation, searchCarRentals } from '../api/expedia';

export default function RentalCars() {
  const [searchParams, setSearchParams] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    sameDropoff: true
  });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locations, setLocations] = useState({ pickup: [], dropoff: [] });

  const handleLocationSearch = async (query, type) => {
    try {
      const data = await searchCarRentalLocation(query);
      setLocations(prev => ({
        ...prev,
        [type]: data.data || []
      }));
    } catch (err) {
      console.error('Failed to search locations:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await searchCarRentals(1); // Start with page 1
      setCars(data.data || []);
    } catch (err) {
      setError('Failed to search rental cars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'pickupLocation' || name === 'dropoffLocation') {
      handleLocationSearch(value, name === 'pickupLocation' ? 'pickup' : 'dropoff');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Rental Cars</h1>
      
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickupLocation"
              value={searchParams.pickupLocation}
              onChange={handleInputChange}
              placeholder="Enter airport code or city"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          {!searchParams.sameDropoff && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dropoff Location
              </label>
              <input
                type="text"
                name="dropoffLocation"
                value={searchParams.dropoffLocation}
                onChange={handleInputChange}
                placeholder="Enter airport code or city"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date
            </label>
            <input
              type="datetime-local"
              name="pickupDate"
              value={searchParams.pickupDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dropoff Date
            </label>
            <input
              type="datetime-local"
              name="dropoffDate"
              value={searchParams.dropoffDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="sameDropoff"
              checked={searchParams.sameDropoff}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Return car to same location</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Searching...' : 'Search Cars'}
        </button>
      </form>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {car.vehicleInfo?.images?.[0]?.url && (
              <img
                src={car.vehicleInfo.images[0].url}
                alt={car.vehicleInfo.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{car.vehicleInfo.name}</h2>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{car.vehicleInfo.rating}</span>
                <span className="ml-2 text-gray-500">
                  ({car.vehicleInfo.reviewCount} reviews)
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Type:</span> {car.vehicleInfo.type}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Transmission:</span> {car.vehicleInfo.transmission}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Seats:</span> {car.vehicleInfo.seats}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Luggage:</span> {car.vehicleInfo.luggage}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-500">{car.provider.name}</p>
                <p className="text-xl font-bold text-blue-600">
                  {car.price.total}/day
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
