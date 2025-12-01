'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Fix for default marker icon in Leaflet with Next.js
import 'leaflet/dist/leaflet.css';

interface Property {
    gnaf_pid: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    address: {
        street: string;
        sal: string;
        state: string;
    };
    price: number;
    attributes: {
        bedrooms: number;
        bathrooms: number;
        garage_spaces: number | null;
    };
}

interface PropertyMapProps {
    properties: Property[];
}

const createScoreIcon = (score: number) => {
    const colorClass = score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500';

    return divIcon({
        className: 'custom-icon',
        html: `<div class="${colorClass} text-white font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg text-xs">${score}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
};

export default function PropertyMap({ properties }: PropertyMapProps) {
    // Center map on the first property or a default location
    const center = properties.length > 0
        ? [properties[0].coordinates.latitude, properties[0].coordinates.longitude] as [number, number]
        : [-33.02, 151.67] as [number, number];

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 z-0 relative">
            <MapContainer center={center} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {properties.map((property) => {
                    // Simulate a score for the map view (70-95)
                    // In a real app, this would be pre-calculated
                    const score = Math.floor(Math.random() * (95 - 70 + 1)) + 70;

                    return (
                        <Marker
                            key={property.gnaf_pid}
                            position={[property.coordinates.latitude, property.coordinates.longitude]}
                            icon={createScoreIcon(score)}
                        >
                            <Popup className="min-w-[200px]">
                                <div className="p-1">
                                    <h3 className="font-bold text-slate-900 text-sm mb-1">{property.address.street}</h3>
                                    <p className="text-xs text-slate-500 mb-2">{property.address.sal}, {property.address.state}</p>

                                    <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                                        <span>{property.attributes.bedrooms} Bed</span>
                                        <span>•</span>
                                        <span>{property.attributes.bathrooms} Bath</span>
                                        <span>•</span>
                                        <span>${(property.price / 1000000).toFixed(2)}M</span>
                                    </div>

                                    <Link
                                        href={`/property/${property.gnaf_pid}`}
                                        className="flex items-center justify-center gap-1 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium py-2 px-3 rounded transition-colors"
                                    >
                                        View Insights <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
