'use client';

import dynamic from 'next/dynamic';
import { FOR_SALE_PROPERTIES } from '@/lib/mockData';

// Dynamically import the map component to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Loading Map...</div>
});

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded">BETA</span>
            <p className="text-slate-500 font-medium text-sm">Liveability & Investment Snapshot</p>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Property Explorer</h1>
          <p className="text-slate-600 mt-2">
            Explore properties with instant Liveability Scores. Click a marker to view detailed investment insights.
          </p>
        </header>

        <section className="mb-8">
          <PropertyMap properties={FOR_SALE_PROPERTIES} />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Liveability First</h3>
            <p className="text-sm text-slate-500">
              Our map instantly calculates a 0-100 score for every property based on schools, parks, and transport.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Investment Data</h3>
            <p className="text-sm text-slate-500">
              Deep dive into market trends, rental yields, and capital growth history for any selected property.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Growth Signals</h3>
            <p className="text-sm text-slate-500">
              We track Development Applications to identify up-and-coming areas with high activity.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
