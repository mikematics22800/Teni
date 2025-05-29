import axios from 'axios';

const BASE_URL = 'https://tripadvisor16.p.rapidapi.com/api/v1';

// Create axios instance with default config
const tripadvisorApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com/v1',
    'x-rapidapi-key': import.meta.env.VITE_TRIPADVISOR_API_KEY
  }
});

// Location Search
export const searchAirport = async (query) => {
  try {
    const response = await tripadvisorApi.get('/flights/searchAirport', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Location Details
export const getFlightFilters = async (query) => {
  try {
    const response = await tripadvisorApi.get('/flights/getFilters', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Search Restaurants
export const searchFlights = async (query) => {
  try {
    const response = await tripadvisorApi.get('/flights/searchFlights', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFlightLocation = async (query) => {
  try {
    const response = await tripadvisorApi.get('/hotels/searchLocation', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getHotelsFilter = async (query) => {
  try {
    const response = await tripadvisorApi.get('/hotels/getHotelsFilter', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error
  }
}

export const searchHotels = async (query) => {
  try {
    const response = await tripadvisorApi.get('/hotels/searchHotels', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchHotelsByLocation = async (query) => {
  try {
    const response = await tripadvisorApi.get('/hotels/searchHotelsByLocation', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getHotelDetails = async (query) => {
  try {
    const response = await tripadvisorApi.get('/hotels/getHotelDetails', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchRestaurantLocation = async (query) => {  
  try {
    const response = await tripadvisorApi.get('/restaurant/searchLocation', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchRestaurants = async (query) => {
  try {
    const response = await tripadvisorApi.get('/restaurant/searchRestaurants', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Get Restaurant Details
export const getRestaurantDetails = async (restaurantId) => {
  try {
    const response = await tripadvisorApi.get('/restaurant/getRestaurantDetailsV2', {
      params: { restaurantId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchRentalLocation = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/searchLocation', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const rentalSearch = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/rentalSearch', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getRentalDetails = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/rentalDetails', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getRentalAvailability = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/rentalAvailability', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getRentalRates = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/rentalRates', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getRentalReviews = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/rentalReviews', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCruiseLocation = async (query) => {
  try {
    const response = await tripadvisorApi.get('/cruises/getLocation', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCruisesQuickLinks = async (query) => {
  try {
    const response = await tripadvisorApi.get('/cruises/getQuickLinks', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchCruises = async (query) => {
  try {
    const response = await tripadvisorApi.get('/cruises/searchCruises', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCruisesDetails = async (query) => {
  try {
    const response = await tripadvisorApi.get('/cruises/getCruisesDetails', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchRentalCarsLocation = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/searchLocation', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchCarsSameDropOff = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/searchCarsSameDropOff', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const searchCarsDifferentDropOff = async (query) => {
  try {
    const response = await tripadvisorApi.get('/rentals/searchCarsDifferentDropOff', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}



export default {
  searchAirport,
  getFlightFilters,
  searchFlights,
  getFlightLocation,
  getHotelsFilter,
  searchHotels,
  searchHotelsByLocation,
  getHotelDetails,
  searchRestaurantLocation,
  searchRestaurants,
  getRestaurantDetails,
  searchRentalLocation,
  rentalSearch,
  getRentalDetails,
  getRentalAvailability,
  getRentalRates,
  getRentalReviews,
  getCruiseLocation,
  getCruisesQuickLinks,
  searchCruises,
  getCruisesDetails,
  searchRentalCarsLocation,
  searchCarsSameDropOff,
  searchCarsDifferentDropOff
};