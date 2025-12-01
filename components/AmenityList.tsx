import { Coffee, GraduationCap, TreePine, ShoppingBag } from 'lucide-react';

interface Amenity {
    name: string;
    category: string;
    distance?: string;
}

interface AmenityListProps {
    amenities: Amenity[];
}

const getIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('school') || lower.includes('education')) return <GraduationCap className="w-5 h-5 text-blue-500" />;
    if (lower.includes('park') || lower.includes('reserve')) return <TreePine className="w-5 h-5 text-green-500" />;
    if (lower.includes('cafe') || lower.includes('restaurant')) return <Coffee className="w-5 h-5 text-amber-500" />;
    return <ShoppingBag className="w-5 h-5 text-slate-400" />;
};

export function AmenityList({ amenities }: AmenityListProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                Lifestyle & Convenience
            </h2>
            <div className="space-y-4">
                {amenities.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-50 rounded-full group-hover:bg-white transition-colors">
                                {getIcon(item.category)}
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">{item.name}</p>
                                <p className="text-xs text-slate-500">{item.category}</p>
                            </div>
                        </div>
                        {item.distance && (
                            <span className="text-sm font-medium text-slate-400">{item.distance}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
