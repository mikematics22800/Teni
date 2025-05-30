import axios from 'axios';

const key = import.meta.env.VITE_EXPEDIA_API_KEY;

const baseUrl = 'https://expedia13.p.rapidapi.com'

const headers = {
  'x-rapidapi-key': key,
  'x-rapidapi-host': 'expedia13.p.rapidapi.com/api/v1'
}

export const searchAirport = async (query) => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/flight/search-airport`, { params: { query }, headers });
    return response.data;
    /* example response
    {
  "status": true,
  "message": "Success",
  "timestamp": 1725278241862,
  "data": [
    {
      "@type": "gaiaRegionResult",
      "index": "0",
      "gaiaId": "6139058",
      "type": "METROCODE",
      "regionNames": {
        "fullName": "New York, NY, United States of America (NYC-All Airports)",
        "shortName": "New York, NY (NYC-All Airports)",
        "displayName": "New York (NYC - All Airports), New York, United States of America",
        "primaryDisplayName": "New York (NYC - All Airports)",
        "secondaryDisplayName": "New York, United States of America",
        "lastSearchName": "New York (NYC - All Airports)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "6139058"
      },
      "coordinates": {
        "lat": "40.89365947010051",
        "long": "-73.76797100160852"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "NYC",
          "airportId": "6139058",
          "metrocode": "NYC",
          "multicity": "178293"
        }
      }
    },
    {
      "@type": "gaiaRegionResult",
      "index": "1",
      "gaiaId": "5396293",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "Newark Liberty Intl. Airport, United States of America (EWR)",
        "shortName": "Newark Liberty Intl. Airport (EWR)",
        "displayName": "Newark Liberty Intl. Airport (EWR - Newark Liberty Intl. Airport), United States of America",
        "primaryDisplayName": "Newark Liberty Intl. Airport (EWR - Newark Liberty Intl. Airport)",
        "secondaryDisplayName": "United States of America",
        "lastSearchName": "Newark Liberty Intl. Airport (EWR - Newark Liberty Intl. Airport)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "5396293"
      },
      "coordinates": {
        "lat": "40.69085",
        "long": "-74.17747"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "EWR",
          "airportId": "5396293",
          "metrocode": "NYC",
          "multicity": "178293"
        },
        "relation": [
          "child"
        ],
        "isChild": "true"
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "2",
      "gaiaId": "4933194",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "New York, NY, United States of America (JFK-John F. Kennedy Intl.)",
        "shortName": "New York, NY (JFK-John F. Kennedy Intl.)",
        "displayName": "New York (JFK - John F. Kennedy Intl.), New York, United States of America",
        "primaryDisplayName": "New York (JFK - John F. Kennedy Intl.)",
        "secondaryDisplayName": "New York, United States of America",
        "lastSearchName": "New York (JFK - John F. Kennedy Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "4933194"
      },
      "coordinates": {
        "lat": "40.644166",
        "long": "-73.782548"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "JFK",
          "airportId": "4933194",
          "metrocode": "NYC",
          "multicity": "178293"
        },
        "relation": [
          "child"
        ],
        "isChild": "true"
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "3",
      "gaiaId": "4278092",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "New York, NY, United States of America (LGA-LaGuardia)",
        "shortName": "New York, NY (LGA-LaGuardia)",
        "displayName": "New York (LGA - LaGuardia), New York, United States of America",
        "primaryDisplayName": "New York (LGA - LaGuardia)",
        "secondaryDisplayName": "New York, United States of America",
        "lastSearchName": "New York (LGA - LaGuardia)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "4278092"
      },
      "coordinates": {
        "lat": "40.77429",
        "long": "-73.872035"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "LGA",
          "airportId": "4278092",
          "metrocode": "NYC",
          "multicity": "178293"
        },
        "relation": [
          "child"
        ],
        "isChild": "true"
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "4",
      "gaiaId": "4997966",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "Newcastle, United Kingdom (NCL-Newcastle Intl.)",
        "shortName": "Newcastle (NCL-Newcastle Intl.)",
        "displayName": "Newcastle (NCL - Newcastle Intl.), United Kingdom",
        "primaryDisplayName": "Newcastle (NCL - Newcastle Intl.)",
        "secondaryDisplayName": "United Kingdom",
        "lastSearchName": "Newcastle (NCL - Newcastle Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "4997966"
      },
      "coordinates": {
        "lat": "55.037147",
        "long": "-1.710284"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United Kingdom",
          "isoCode2": "GB",
          "isoCode3": "GBR"
        },
        "airport": {
          "airportCode": "NCL",
          "airportId": "4997966",
          "multicity": "6034271"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "5",
      "gaiaId": "177865",
      "type": "CITY",
      "regionNames": {
        "fullName": "New Delhi, National Capital Territory of Delhi, India",
        "shortName": "New Delhi",
        "displayName": "Delhi (DEL - Indira Gandhi Intl.), Near New Delhi, National Capital Territory of Delhi, India",
        "primaryDisplayName": "Delhi (DEL - Indira Gandhi Intl.)",
        "secondaryDisplayName": "Near New Delhi, National Capital Territory of Delhi, India",
        "lastSearchName": "Delhi (DEL - Indira Gandhi Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "177865"
      },
      "coordinates": {
        "lat": "28.613939",
        "long": "77.209023"
      },
      "hierarchyInfo": {
        "country": {
          "name": "India",
          "isoCode2": "IN",
          "isoCode3": "IND"
        },
        "airport": {
          "airportCode": "DEL",
          "airportId": "4998468",
          "multicity": "180000"
        }
      }
    },
    {
      "@type": "gaiaRegionResult",
      "index": "6",
      "gaiaId": "5854029",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "New Orleans, LA, United States of America (MSY-Louis Armstrong New Orleans Intl.)",
        "shortName": "New Orleans, LA (MSY-Louis Armstrong New Orleans Intl.)",
        "displayName": "New Orleans (MSY - Louis Armstrong New Orleans Intl.), Louisiana, United States of America",
        "primaryDisplayName": "New Orleans (MSY - Louis Armstrong New Orleans Intl.)",
        "secondaryDisplayName": "Louisiana, United States of America",
        "lastSearchName": "New Orleans (MSY - Louis Armstrong New Orleans Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "5854029"
      },
      "coordinates": {
        "lat": "29.985501",
        "long": "-90.257956"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "MSY",
          "airportId": "5854029",
          "metrocode": "MSY",
          "multicity": "178292"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "7",
      "gaiaId": "6030636",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "Newquay, United Kingdom (NQY-Newquay Cornwall)",
        "shortName": "Newquay (NQY-Newquay Cornwall)",
        "displayName": "Newquay (NQY - Newquay Cornwall), United Kingdom",
        "primaryDisplayName": "Newquay (NQY - Newquay Cornwall)",
        "secondaryDisplayName": "United Kingdom",
        "lastSearchName": "Newquay (NQY - Newquay Cornwall)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "6030636"
      },
      "coordinates": {
        "lat": "50.438129",
        "long": "-4.998479"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United Kingdom",
          "isoCode2": "GB",
          "isoCode3": "GBR"
        },
        "airport": {
          "airportCode": "NQY",
          "airportId": "6030636",
          "multicity": "2596"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "8",
      "gaiaId": "6139131",
      "type": "METROCODE",
      "regionNames": {
        "fullName": "New Orleans, LA, United States of America (MSY-All Airports)",
        "shortName": "New Orleans, LA (MSY-All Airports)",
        "displayName": "New Orleans (MSY - All Airports), Louisiana, United States of America",
        "primaryDisplayName": "New Orleans (MSY - All Airports)",
        "secondaryDisplayName": "Louisiana, United States of America",
        "lastSearchName": "New Orleans (MSY - All Airports)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "6139131"
      },
      "coordinates": {
        "lat": "29.971530421132833",
        "long": "-90.19694299237744"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "MSY",
          "airportId": "6139131",
          "metrocode": "MSY",
          "multicity": "178292"
        }
      }
    },
    {
      "@type": "gaiaRegionResult",
      "index": "9",
      "gaiaId": "178233",
      "type": "MULTICITY",
      "regionNames": {
        "fullName": "Auckland (and vicinity), Auckland Region, New Zealand",
        "shortName": "Auckland (and vicinity)",
        "displayName": "Auckland (AKL - Auckland Intl.), Auckland Region, New Zealand",
        "primaryDisplayName": "Auckland (AKL - Auckland Intl.)",
        "secondaryDisplayName": "Auckland Region, New Zealand",
        "lastSearchName": "Auckland (AKL - Auckland Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "178233"
      },
      "coordinates": {
        "lat": "-36.84906",
        "long": "174.76538"
      },
      "hierarchyInfo": {
        "country": {
          "name": "New Zealand",
          "isoCode2": "NZ",
          "isoCode3": "NZL"
        },
        "airport": {
          "airportCode": "AKL",
          "airportId": "5000001",
          "multicity": "178233"
        }
      }
    }
  ]
}
    */
  } catch (error) {
    console.error(error);
  }
}

export const searchOneWayFlights = async (originAirportCode, destinationAirportCode, departureDate, flightsCabinClass, adults) => {
  try {
    const response = await axios.get(`${baseUrl}/flight/search-one-way`, { 
      originAirportCode, // ex 'BOM'
      destinationAirportCode, // ex 'DEL'
      departureDate, // ex '2025-06-01'
      flightsCabinClass, // ex 'COACH'
      adults 
    });
    return response.data;
    /* example response
     {
  "status": true,
  "message": "Success",
  "timestamp": 1748609774137,
  "data": [
    {
      "@type": "gaiaRegionResult",
      "index": "0",
      "gaiaId": "4997966",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "Newcastle, United Kingdom (NCL-Newcastle Intl.)",
        "shortName": "Newcastle (NCL-Newcastle Intl.)",
        "displayName": "Newcastle (NCL - Newcastle Intl.), United Kingdom",
        "primaryDisplayName": "Newcastle (NCL - Newcastle Intl.)",
        "secondaryDisplayName": "United Kingdom",
        "lastSearchName": "Newcastle (NCL - Newcastle Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "4997966"
      },
      "coordinates": {
        "lat": "55.037147",
        "long": "-1.710284"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United Kingdom",
          "isoCode2": "GB",
          "isoCode3": "GBR"
        },
        "airport": {
          "airportCode": "NCL",
          "airportId": "4997966",
          "multicity": "6034271"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "1",
      "gaiaId": "6139058",
      "type": "METROCODE",
      "regionNames": {
        "fullName": "New York, NY, United States of America (NYC-All Airports)",
        "shortName": "New York, NY (NYC-All Airports)",
        "displayName": "New York (NYC - All Airports), New York, United States of America",
        "primaryDisplayName": "New York (NYC - All Airports)",
        "secondaryDisplayName": "New York, United States of America",
        "lastSearchName": "New York (NYC - All Airports)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "6139058"
      },
      "coordinates": {
        "lat": "40.89365947010051",
        "long": "-73.76797100160852"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "NYC",
          "airportId": "6139058",
          "metrocode": "NYC",
          "multicity": "178293"
        }
      }
    },
    {
      "@type": "gaiaRegionResult",
      "index": "2",
      "gaiaId": "177865",
      "type": "CITY",
      "regionNames": {
        "fullName": "New Delhi, National Capital Territory of Delhi, India",
        "shortName": "New Delhi",
        "displayName": "Delhi (DEL - Indira Gandhi Intl.), Near New Delhi, National Capital Territory of Delhi, India",
        "primaryDisplayName": "Delhi (DEL - Indira Gandhi Intl.)",
        "secondaryDisplayName": "Near New Delhi, National Capital Territory of Delhi, India",
        "lastSearchName": "Delhi (DEL - Indira Gandhi Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "177865"
      },
      "coordinates": {
        "lat": "28.613939",
        "long": "77.209023"
      },
      "hierarchyInfo": {
        "country": {
          "name": "India",
          "isoCode2": "IN",
          "isoCode3": "IND"
        },
        "airport": {
          "airportCode": "DEL",
          "airportId": "4998468",
          "multicity": "180000"
        }
      }
    },
    {
      "@type": "gaiaRegionResult",
      "index": "3",
      "gaiaId": "5396293",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "Newark Liberty Intl. Airport, United States of America (EWR)",
        "shortName": "Newark Liberty Intl. Airport (EWR)",
        "displayName": "Newark Liberty Intl. Airport (EWR - Newark Liberty Intl. Airport), United States of America",
        "primaryDisplayName": "Newark Liberty Intl. Airport (EWR - Newark Liberty Intl. Airport)",
        "secondaryDisplayName": "United States of America",
        "lastSearchName": "Newark Liberty Intl. Airport (EWR - Newark Liberty Intl. Airport)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "5396293"
      },
      "coordinates": {
        "lat": "40.69085",
        "long": "-74.17747"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "EWR",
          "airportId": "5396293",
          "metrocode": "NYC",
          "multicity": "178293"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "4",
      "gaiaId": "4933194",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "New York, NY, United States of America (JFK-John F. Kennedy Intl.)",
        "shortName": "New York, NY (JFK-John F. Kennedy Intl.)",
        "displayName": "New York (JFK - John F. Kennedy Intl.), New York, United States of America",
        "primaryDisplayName": "New York (JFK - John F. Kennedy Intl.)",
        "secondaryDisplayName": "New York, United States of America",
        "lastSearchName": "New York (JFK - John F. Kennedy Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "4933194"
      },
      "coordinates": {
        "lat": "40.644166",
        "long": "-73.782548"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "JFK",
          "airportId": "4933194",
          "metrocode": "NYC",
          "multicity": "178293"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "5",
      "gaiaId": "5854029",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "New Orleans, LA, United States of America (MSY-Louis Armstrong New Orleans Intl.)",
        "shortName": "New Orleans, LA (MSY-Louis Armstrong New Orleans Intl.)",
        "displayName": "New Orleans (MSY - Louis Armstrong New Orleans Intl.), Louisiana, United States of America",
        "primaryDisplayName": "New Orleans (MSY - Louis Armstrong New Orleans Intl.)",
        "secondaryDisplayName": "Louisiana, United States of America",
        "lastSearchName": "New Orleans (MSY - Louis Armstrong New Orleans Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "5854029"
      },
      "coordinates": {
        "lat": "29.985501",
        "long": "-90.257956"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "MSY",
          "airportId": "5854029",
          "metrocode": "MSY",
          "multicity": "178292"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "6",
      "gaiaId": "6030636",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "Newquay, United Kingdom (NQY-Newquay Cornwall)",
        "shortName": "Newquay (NQY-Newquay Cornwall)",
        "displayName": "Newquay (NQY - Newquay Cornwall), United Kingdom",
        "primaryDisplayName": "Newquay (NQY - Newquay Cornwall)",
        "secondaryDisplayName": "United Kingdom",
        "lastSearchName": "Newquay (NQY - Newquay Cornwall)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "6030636"
      },
      "coordinates": {
        "lat": "50.438129",
        "long": "-4.998479"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United Kingdom",
          "isoCode2": "GB",
          "isoCode3": "GBR"
        },
        "airport": {
          "airportCode": "NQY",
          "airportId": "6030636",
          "multicity": "2596"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "7",
      "gaiaId": "6139131",
      "type": "METROCODE",
      "regionNames": {
        "fullName": "New Orleans, LA, United States of America (MSY-All Airports)",
        "shortName": "New Orleans, LA (MSY-All Airports)",
        "displayName": "New Orleans (MSY - All Airports), Louisiana, United States of America",
        "primaryDisplayName": "New Orleans (MSY - All Airports)",
        "secondaryDisplayName": "Louisiana, United States of America",
        "lastSearchName": "New Orleans (MSY - All Airports)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "6139131"
      },
      "coordinates": {
        "lat": "29.971530421132833",
        "long": "-90.19694299237744"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "MSY",
          "airportId": "6139131",
          "metrocode": "MSY",
          "multicity": "178292"
        }
      }
    },
    {
      "@type": "gaiaRegionResult",
      "index": "8",
      "gaiaId": "4278092",
      "type": "AIRPORT",
      "regionNames": {
        "fullName": "New York, NY, United States of America (LGA-LaGuardia)",
        "shortName": "New York, NY (LGA-LaGuardia)",
        "displayName": "New York (LGA - LaGuardia), New York, United States of America",
        "primaryDisplayName": "New York (LGA - LaGuardia)",
        "secondaryDisplayName": "New York, United States of America",
        "lastSearchName": "New York (LGA - LaGuardia)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "4278092"
      },
      "coordinates": {
        "lat": "40.77429",
        "long": "-73.872035"
      },
      "hierarchyInfo": {
        "country": {
          "name": "United States",
          "isoCode2": "US",
          "isoCode3": "USA"
        },
        "airport": {
          "airportCode": "LGA",
          "airportId": "4278092",
          "metrocode": "NYC",
          "multicity": "178293"
        }
      },
      "isMinorAirport": "false"
    },
    {
      "@type": "gaiaRegionResult",
      "index": "9",
      "gaiaId": "178233",
      "type": "MULTICITY",
      "regionNames": {
        "fullName": "Auckland (and vicinity), Auckland Region, New Zealand",
        "shortName": "Auckland (and vicinity)",
        "displayName": "Auckland (AKL - Auckland Intl.), Auckland Region, New Zealand",
        "primaryDisplayName": "Auckland (AKL - Auckland Intl.)",
        "secondaryDisplayName": "Auckland Region, New Zealand",
        "lastSearchName": "Auckland (AKL - Auckland Intl.)"
      },
      "essId": {
        "sourceName": "GAI",
        "sourceId": "178233"
      },
      "coordinates": {
        "lat": "-36.84906",
        "long": "174.76538"
      },
      "hierarchyInfo": {
        "country": {
          "name": "New Zealand",
          "isoCode2": "NZ",
          "isoCode3": "NZL"
        },
        "airport": {
          "airportCode": "AKL",
          "airportId": "5000001",
          "multicity": "178233"
        }
      }
    }
  ]
}
    */

  } catch (error) {
    console.error(error);
  }
}

export const searchRoundTripFlights = async (originAirportCode, destinationAirportCode, departDate, returnDate, flightsCabinClass, adults) => { 
  try {
    const response = await axios.get(`${baseUrl}/flight/search-round-trip`, { 
      originAirportCode, // ex 'BOM'
      destinationAirportCode, // ex 'DEL'
      departDate, // ex '2025-06-01'
      returnDate, // ex '2025-06-05'
      adults, // ex 1
      flightsCabinClass, // ex 'COACH'
      page, // ex 1
      limit, // ex 10
      currency // ex 'USD'
    });
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const searchMultiCityFlights = async (legs, adults, page, limit, currency) => {  
  try {
    const response = await axios.get(`${baseUrl}/flight/search-multi-city`, { 
      legs, // ex '[{'fromAirportCode':'BOM','toAirportCode':'NYC','date':'2024-09-10'},{'fromAirportCode':'NYC','toAirportCode':'BOM','date':'2024-09-19'},{'fromAirportCode':'BOM','toAirportCode':'BKK','date':'2024-09-25'}]'
      adults, // ex 1
      page, // ex 1
      limit, // ex 10
      currency // ex 'USD'
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const searchNextFlight = async (priceId, page, limit) => {
  try {
    const response = await axios.get(`${baseUrl}/flight/search-next-flight`, { 
      priceId, 
      page,
      limit
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getJourneySummary = async (jorneyContinuationId) => {
  try {
    const response = await axios.get(`${baseUrl}/flight/get-journey-summary`, { 
      jorneyContinuationId
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getPriceSummary = async (jorneyContinuationId) => { 
  try {
    const response = await axios.get(`${baseUrl}/flight/get-price-summary`, { 
      jorneyContinuationId
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getSeatDetails = async (jorneyContinuationId) => {
  try {
    const response = await axios.get(`${baseUrl}/flight/get-seat-details`, { 
      jorneyContinuationId
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getBaggageDetails = async (jorneyContinuationId) => {
  try {
    const response = await axios.get(`${baseUrl}/flight/get-baggage-details`, { 
      jorneyContinuationId
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getFlightFilters = async (id) => { 
  try { 
    const response = await axios.get(`${baseUrl}/flight/get-flight-filters`, { 
      id
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const searchCarRentalLocation = async (location) => {
  try {
    const response = await axios.get(`${baseUrl}/car-rental/search-location`, { 
      location
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const searchCarRentals = async (pageNumber) => {
  try {
    const response = await axios.get(`${baseUrl}/car-rental/search-rentals`, { 
      pageNumber
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const carDropOffSearch = async () => {
  try {
    const response = await axios.get(`${baseUrl}/car-rental/car-drop-off-search`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getCarDetail = async () => {
  try {
    const response = await axios.get(`${baseUrl}/car-rental/get-car-detail`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const insuranceDetailPriming = async () => {
  try {
    const response = await axios.get(`${baseUrl}/car-rental/insurance-detail-priming`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}