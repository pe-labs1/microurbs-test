import { Users, Baby, Briefcase } from 'lucide-react';

interface DemographicCardProps {
    averageAge: number;
    familyComposition: string;
    occupation: string;
}

export function DemographicCard({ averageAge, familyComposition, occupation }: DemographicCardProps) {
    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white h-full">
            <h2 className="text-xl font-semibold mb-6">Community Vibe</h2>

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                        <Users className="w-6 h-6 text-indigo-300" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Average Age</p>
                        <p className="text-2xl font-bold">{averageAge} years</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                        <Baby className="w-6 h-6 text-pink-300" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Family Type</p>
                        <p className="text-2xl font-bold">{familyComposition}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                        <Briefcase className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Top Occupation</p>
                        <p className="text-2xl font-bold">{occupation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
