import React, { useState } from 'react';
import { searchAirport, searchOneWayFlights, searchRoundTripFlights } from '../api/expedia';

export default function Flights() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    cabinClass: 'COACH',
    tripType: 'one-way'
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [airports, setAirports] = useState({ from: [], to: [] });

  const handleAirportSearch = async (query, type) => {
    if (!query || query.length < 2) return;
    
    try {
      const data = await searchAirport(query);
      if (data && data.data) {
        setAirports(prev => ({
          ...prev,
          [type]: data.data.map(airport => ({
            code: airport.regionNames.shortName.match(/\(([A-Z]{3})/)?.[1] || '',
            name: airport.regionNames.primaryDisplayName,
            city: airport.regionNames.fullName.split(',')[0],
            country: airport.hierarchyInfo.country.name,
            coordinates: airport.coordinates
          }))
        }));
      }
    } catch (err) {
      console.error('Failed to search airports:', err);
      setError('Failed to search airports. Please try again.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let data;
      if (searchParams.tripType === 'one-way') {
        data = await searchOneWayFlights(
          searchParams.from,
          searchParams.to,
          searchParams.departureDate,
          searchParams.cabinClass,
          searchParams.adults
        );
      } else {
        data = await searchRoundTripFlights(
          searchParams.from,
          searchParams.to,
          searchParams.departureDate,
          searchParams.returnDate,
          searchParams.cabinClass,
          searchParams.adults
        );
      }

      if (data && data.data) {
        setFlights(data.data);
      } else {
        setError('No flights found. Please try different search criteria.');
      }
    } catch (err) {
      setError('Failed to search flights. Please try again.');
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

    if (name === 'from' || name === 'to') {
      handleAirportSearch(value, name);
    }
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
            <div className="relative">
              <input
                type="text"
                name="from"
                value={searchParams.from}
                onChange={handleInputChange}
                placeholder="Search airport or city"
                className="w-full p-2 border rounded-md"
                required
              />
              {airports.from.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {airports.from.map((airport) => (
                    <div
                      key={airport.code}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchParams(prev => ({ ...prev, from: airport.code }));
                        setAirports(prev => ({ ...prev, from: [] }));
                      }}
                    >
                      <div className="font-medium">{airport.name}</div>
                      <div className="text-sm text-gray-600">
                        {airport.city}, {airport.country}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                name="to"
                value={searchParams.to}
                onChange={handleInputChange}
                placeholder="Search airport or city"
                className="w-full p-2 border rounded-md"
                required
              />
              {airports.to.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {airports.to.map((airport) => (
                    <div
                      key={airport.code}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchParams(prev => ({ ...prev, to: airport.code }));
                        setAirports(prev => ({ ...prev, to: [] }));
                      }}
                    >
                      <div className="font-medium">{airport.name}</div>
                      <div className="text-sm text-gray-600">
                        {airport.city}, {airport.country}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure Date
            </label>
            <input
              type="date"
              name="departureDate"
              value={searchParams.departureDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          {searchParams.tripType === 'round-trip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Return Date
              </label>
              <input
                type="date"
                name="returnDate"
                value={searchParams.returnDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          )}
          
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

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trip Type
            </label>
            <select
              name="tripType"
              value={searchParams.tripType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="one-way">One Way</option>
              <option value="round-trip">Round Trip</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cabin Class
            </label>
            <select
              name="cabinClass"
              value={searchParams.cabinClass}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="COACH">Economy</option>
              <option value="PREMIUM_COACH">Premium Economy</option>
              <option value="BUSINESS">Business</option>
              <option value="FIRST">First Class</option>
            </select>
          </div>
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
        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-md">{error}</div>
      )}

      <div className="space-y-4">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{flight.validatingAirlineCodes[0]}</h2>
                <p className="text-gray-600">{flight.itineraries[0].segments[0].number}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">
                  {flight.price.total}
                </p>
                <p className="text-gray-500">{flight.travelerPricings[0].fareDetailsBySegment[0].cabin}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{flight.itineraries[0].segments[0].departure.at}</p>
                <p className="text-gray-600">{flight.itineraries[0].segments[0].departure.iataCode}</p>
              </div>
              <div className="flex-1 mx-4">
                <div className="border-t border-gray-300 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-gray-500">→</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  {flight.itineraries[0].duration}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{flight.itineraries[0].segments[0].arrival.at}</p>
                <p className="text-gray-600">{flight.itineraries[0].segments[0].arrival.iataCode}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
