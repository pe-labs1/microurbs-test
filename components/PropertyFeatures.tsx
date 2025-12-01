import { Bed, Bath, Car, Ruler, Home } from 'lucide-react';

interface PropertyAttributes {
    bedrooms: number;
    bathrooms: number;
    garage_spaces: number | null;
    land_size: string | number;
    building_size: string | number;
}

interface PropertyFeaturesProps {
    attributes: PropertyAttributes;
}

export function PropertyFeatures({ attributes }: PropertyFeaturesProps) {
    if (!attributes) return null;

    const features = [
        {
            icon: Bed,
            label: 'Bedrooms',
            value: attributes.bedrooms,
            color: 'text-blue-500',
            bg: 'bg-blue-50'
        },
        {
            icon: Bath,
            label: 'Bathrooms',
            value: attributes.bathrooms,
            color: 'text-teal-500',
            bg: 'bg-teal-50'
        },
        {
            icon: Car,
            label: 'Garage',
            value: attributes.garage_spaces || '-',
            color: 'text-orange-500',
            bg: 'bg-orange-50'
        },
        {
            icon: Ruler,
            label: 'Land Size',
            value: attributes.land_size,
            color: 'text-green-500',
            bg: 'bg-green-50'
        },
        {
            icon: Home,
            label: 'Building',
            value: attributes.building_size !== 'nan' && attributes.building_size !== 'None' ? attributes.building_size : '-',
            color: 'text-purple-500',
            bg: 'bg-purple-50'
        }
    ];

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-full">
            <h3 className="font-bold text-slate-900 mb-4">Property Features</h3>
            <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center`}>
                            <feature.icon className={`w-5 h-5 ${feature.color}`} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">{feature.label}</p>
                            <p className="text-sm font-bold text-slate-900">{feature.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
