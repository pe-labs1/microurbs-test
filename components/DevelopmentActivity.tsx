import { ArrowUp, ArrowRight, Construction } from 'lucide-react';

interface DevelopmentActivityProps {
    count: number;
    trend: 'high' | 'normal';
}

export function DevelopmentActivity({ count, trend }: DevelopmentActivityProps) {
    const isHigh = trend === 'high';

    return (
        <div className="bg-white rounded-xl border border-slate-100 p-6 h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Construction className="w-5 h-5 text-slate-400" />
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Growth Signal</h3>
                </div>
                <p className="text-slate-600 text-sm">Active DAs within 1km (Last 12m)</p>
            </div>

            <div className="flex items-end gap-3 mt-4">
                <span className="text-4xl font-bold text-slate-900">{count}</span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-1 ${isHigh ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                    {isHigh ? (
                        <>
                            <ArrowUp className="w-3 h-3" />
                            High Activity
                        </>
                    ) : (
                        <>
                            <ArrowRight className="w-3 h-3" />
                            Normal Activity
                        </>
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50">
                <p className="text-xs text-slate-400">
                    Includes new dwellings and subdivisions. High activity often signals incoming supply or gentrification.
                </p>
            </div>
        </div>
    );
}
