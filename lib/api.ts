export type Property = {
  address: string;
  suburb: string;
  postcode: string;
  state: string;
  lat: number;
  lon: number;
  estimatedValue?: number;
  marketTemperature?: 'High' | 'Medium' | 'Low';
};

export type Amenity = {
  name: string;
  category: string;
  lat: number;
  lon: number;
  distance?: number; // in meters
};

export type MarketInsight = {
  medianPrice: number;
  rentalYield: number;
  capitalGrowth: number;
  year: number;
};

export type DemographicData = {
  averageAge: number;
  familyComposition: string;
};

const API_BASE_URL = 'https://www.microburbs.com.au/report_generator/api';
const API_TOKEN = 'test'; // Sandbox token

async function fetchAPI(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // Cache for 1 hour to be nice to the sandbox
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getProperties(suburb: string) {
  // In a real app, we'd search for properties. For the sandbox, we'll just get the list
  // and pick the first one to show details for, or return the list.
  // The sandbox endpoint is /suburb/properties
  return fetchAPI('/suburb/properties', { suburb });
}

import { FOR_SALE_PROPERTIES, MOCK_AMENITIES, MOCK_DEVELOPMENT_APPLICATIONS } from './mockData';

export async function getAmenities(propertyId: string) {
  // Return mock amenities
  return { results: MOCK_AMENITIES };
}

export async function getMarketInsights(propertyId: string) {
  // Sandbox endpoint: /property/market_insights
  return fetchAPI('/property/market_insights', { id: propertyId });
}

export async function getDemographics(propertyId: string) {
  // Sandbox endpoint: /property/demographics
  return fetchAPI('/property/demographics', { id: propertyId });
}

export async function getDevelopmentApplications(propertyId: string) {
  // Return mock DA data
  return { results: MOCK_DEVELOPMENT_APPLICATIONS };
}

export async function getProperty(id: string) {
  // Helper to find a specific property. 
  // First check our mock "For Sale" list
  const mockProperty = FOR_SALE_PROPERTIES.find((p: any) => p.gnaf_pid === id);
  if (mockProperty) {
    return {
      id: mockProperty.gnaf_pid,
      address: mockProperty.area_name,
      suburb: mockProperty.address.sal,
      estimatedValue: mockProperty.price,
      lat: mockProperty.coordinates.latitude,
      lon: mockProperty.coordinates.longitude,
      attributes: mockProperty.attributes,
      // Add other fields as needed to match Property type
    };
  }

  // Fallback to sandbox list
  const properties = await getProperties('Belmont North');
  return properties.results.find((p: any) => p.id === id) || properties.results[0];
}
