"use client";

import { Sparkles, Zap, ShieldAlert, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const manifestoItems = [
    {
        icon: Sparkles,
        title: "The Frontier",
        description: "We occupy the edge where code meets consciousness. AI isn't a tool; it's a teammate. We interpret the algorithms so you don't have to.",
        color: "text-violet-500",
        bg: "bg-violet-500/10"
    },
    {
        icon: ShieldAlert,
        title: "The Burnout",
        description: "The velocity is high, and the noise is infinite. We filter the exhaustion of the 24/7 digital loop into actionable survival signals.",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10"
    },
    {
        icon: Zap,
        title: "The Escape",
        description: "Gaming, subcultures, and the physical/digital borderlands. We find the sanctuaries where the sleepless generation recharges.",
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    }
];

export function Manifesto() {
    return (
        <div className="space-y-24 py-12">
            {/* Hero Manifesto */}
            <div className="text-center space-y-8 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] animate-pulse-subtle">
                    <Coffee className="w-3 h-3" />
                    Est. 3:00 AM
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none font-display">
                    WE ARE THE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">SIGNAL FILTER</span>.
                </h2>
                <p className="text-xl text-slate-400 font-medium leading-relaxed">
                    The internet is loud. The news is noisy. Your scroll is infinite. <br />
                    We translate the velocity of the digital age into the signals that actually matter.
                </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {manifestoItems.map((item, i) => (
                    <div
                        key={item.title}
                        className="glass-dark sanctuary-card p-10 group hover:border-primary/30"
                    >
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", item.bg)}>
                            <item.icon className={cn("w-7 h-7", item.color)} />
                        </div>
                        <h3 className="text-2xl font-black mb-4 tracking-tight">
                            {item.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-sm font-medium">
                            {item.description}
                        </p>

                        {/* Decorative glow */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>

            {/* Final Statement */}
            <div className="glass-dark sanctuary-card p-12 text-center max-w-4xl mx-auto border-dashed border-2 border-white/5">
                <p className="text-2xl md:text-3xl font-display font-black leading-tight italic">
                    "When the world stays quiet, we stay awake to find the truth in the noise."
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-white/10" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">The 3AM SCROLL Manifesto</span>
                    <div className="h-px w-12 bg-white/10" />
                </div>
            </div>
        </div>
    );
}
