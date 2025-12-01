import { CheckCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface LiveabilityScoreProps {
    score: number;
}

export function LiveabilityScore({ score }: LiveabilityScoreProps) {
    const isExcellent = score >= 80;
    const isGood = score >= 50 && score < 80;

    const colorClass = isExcellent ? 'text-emerald-500' : isGood ? 'text-amber-500' : 'text-red-500';
    const bgClass = isExcellent ? 'bg-emerald-50' : isGood ? 'bg-amber-50' : 'bg-red-50';
    const borderClass = isExcellent ? 'border-emerald-100' : isGood ? 'border-amber-100' : 'border-red-100';
    const label = isExcellent ? 'Excellent' : isGood ? 'Good' : 'Average';

    return (
        <div className={clsx("rounded-xl border p-6 flex flex-col items-center justify-center h-full", bgClass, borderClass)}>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Liveability Score</h3>
            <div className="relative flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                        className="text-white opacity-50"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="58"
                        cx="64"
                        cy="64"
                    />
                    <circle
                        className={colorClass}
                        strokeWidth="8"
                        strokeDasharray={365}
                        strokeDashoffset={365 - (365 * score) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="58"
                        cx="64"
                        cy="64"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className={clsx("text-4xl font-bold", colorClass)}>{score}</span>
                    <span className={clsx("text-xs font-medium uppercase", colorClass)}>{label}</span>
                </div>
            </div>
            <p className="text-center text-slate-600 text-sm mt-4 px-4">
                Based on proximity to schools, parks, and transport.
            </p>
        </div>
    );
}
