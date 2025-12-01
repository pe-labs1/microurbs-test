import { MapPin, TrendingUp, DollarSign } from 'lucide-react';

interface DashboardHeaderProps {
    address: string;
    suburb: string;
    estimatedValue: string;
    marketTemperature: string;
}

export function DashboardHeader({ address, suburb, estimatedValue, marketTemperature }: DashboardHeaderProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center text-slate-500 text-sm mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{suburb}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">{address}</h1>
                </div>

                <div className="flex gap-4">
                    <div className="bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-100">
                        <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide mb-1">Est. Value</p>
                        <div className="flex items-center text-emerald-900 font-bold text-xl">
                            <DollarSign className="w-5 h-5 mr-1" />
                            {estimatedValue}
                        </div>
                    </div>

                    <div className="bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-100">
                        <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">Market Temp</p>
                        <div className="flex items-center text-indigo-900 font-bold text-xl">
                            <TrendingUp className="w-5 h-5 mr-1" />
                            {marketTemperature}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
