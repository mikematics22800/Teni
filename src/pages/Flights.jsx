import React, { useState } from 'react';
import tripadvisorApi from '../api/tripadvisor';

export default function Flights() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    adults: 1,
    cabinClass: 'ECONOMY'
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, get location IDs for from and to locations
      const fromLocation = await tripadvisorApi.searchLocations(searchParams.from);
      const toLocation = await tripadvisorApi.searchLocations(searchParams.to);

      if (!fromLocation.data?.[0]?.locationId || !toLocation.data?.[0]?.locationId) {
        throw new Error('Could not find locations');
      }

      const data = await tripadvisorApi.searchFlights({
        fromId: fromLocation.data[0].locationId,
        toId: toLocation.data[0].locationId,
        date: searchParams.date,
        adults: searchParams.adults,
        cabinClass: searchParams.cabinClass
      });

      setFlights(data.data || []);
    } catch (err) {
      setError('Failed to search flights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Flights</h1>
      
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              type="text"
              name="from"
              value={searchParams.from}
              onChange={handleInputChange}
              placeholder="City or Airport"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="text"
              name="to"
              value={searchParams.to}
              onChange={handleInputChange}
              placeholder="City or Airport"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={searchParams.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passengers
            </label>
            <input
              type="number"
              name="adults"
              value={searchParams.adults}
              onChange={handleInputChange}
              min="1"
              max="9"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cabin Class
          </label>
          <select
            name="cabinClass"
            value={searchParams.cabinClass}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First Class</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="space-y-4">
        {flights.map((flight) => (
          <div
            key={flight.flightId}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{flight.airline}</h2>
                <p className="text-gray-600">{flight.flightNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  ${flight.price}
                </p>
                <p className="text-gray-500">{flight.cabinClass}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{flight.departureTime}</p>
                <p className="text-gray-600">{flight.departureAirport}</p>
              </div>
              <div className="flex-1 mx-4">
                <div className="border-t border-gray-300 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-gray-500">→</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  {flight.duration}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{flight.arrivalTime}</p>
                <p className="text-gray-600">{flight.arrivalAirport}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
