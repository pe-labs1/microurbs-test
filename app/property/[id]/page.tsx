import { getProperty, getAmenities, getDevelopmentApplications } from '@/lib/api';
import { DashboardHeader } from '@/components/DashboardHeader';
import { LiveabilityScore } from '@/components/LiveabilityScore';
import { DevelopmentActivity } from '@/components/DevelopmentActivity';
import { MarketChart } from '@/components/MarketChart';
import { DemographicCard } from '@/components/DemographicCard';
import { PropertyFeatures } from '@/components/PropertyFeatures';

// Mock data for charts
const MOCK_MARKET_DATA = [
    { year: '2019', price: 850000 },
    { year: '2020', price: 890000 },
    { year: '2021', price: 980000 },
    { year: '2022', price: 1050000 },
    { year: '2023', price: 1020000 },
    { year: '2024', price: 1150000 },
];

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let propertyData;
    let amenitiesData;
    let daData;

    try {
        // Fetch specific property details
        propertyData = await getProperty(id);

        if (propertyData?.id) {
            const [amenities, das] = await Promise.all([
                getAmenities(propertyData.id),
                getDevelopmentApplications(propertyData.id).catch(() => ({ results: [] }))
            ]);
            amenitiesData = amenities;
            daData = das;
        }
    } catch (e) {
        console.error("Failed to fetch data", e);
    }

    // --- Logic (Same as before) ---
    const amenities = amenitiesData?.results || [];
    let score = 50;

    const schools = amenities.filter((a: any) => a.category.toLowerCase().includes('school') || a.category.toLowerCase().includes('education')).length;
    const parks = amenities.filter((a: any) => a.category.toLowerCase().includes('park') || a.category.toLowerCase().includes('reserve')).length;
    const transport = amenities.filter((a: any) => a.category.toLowerCase().includes('transport') || a.category.toLowerCase().includes('station')).length;
    const lifestyle = amenities.filter((a: any) => a.category.toLowerCase().includes('cafe') || a.category.toLowerCase().includes('shop')).length;

    score += Math.min(schools * 10, 30);
    score += Math.min(parks * 5, 20);
    score += Math.min(transport * 10, 20);
    score += Math.min(lifestyle * 2, 20);

    const finalScore = Math.min(score, 98);

    const daCount = daData?.results?.length || 12;
    const daTrend = daCount > 10 ? 'high' : 'normal';

    const address = propertyData?.address || 'Property Not Found';
    const estimatedValue = propertyData?.estimatedValue ? `$${(propertyData.estimatedValue / 1000000).toFixed(2)}M` : '$1.15M';
    const marketTemp = 'High Demand';

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-1">
                        <a href="/" className="text-indigo-600 hover:underline text-sm font-medium">← Back to Map</a>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Property Details</h1>
                </header>

                <DashboardHeader
                    address={address}
                    suburb={propertyData?.suburb || 'Belmont North'}
                    estimatedValue={estimatedValue}
                    marketTemperature={marketTemp}
                />

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Property Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 h-64">
                            <LiveabilityScore score={finalScore} />
                        </div>
                        <div className="lg:col-span-1 h-64">
                            <DevelopmentActivity count={daCount} trend={daTrend} />
                        </div>
                        <div className="lg:col-span-1 h-64">
                            <PropertyFeatures attributes={propertyData?.attributes} />
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Investment Health</h2>
                        <MarketChart data={MOCK_MARKET_DATA} />
                    </div>

                    <div className="md:col-span-4">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Resident Profile</h2>
                        <DemographicCard
                            averageAge={34}
                            familyComposition="Maturing Couples"
                            occupation="Professionals"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
