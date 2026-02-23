"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, Zap, ShieldAlert, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { filterSignals } from "@/lib/ai/signal-filter";

type Message = {
    role: "user" | "ai";
    content: string;
};

export function SignalFilter() {
    const [query, setQuery] = useState("");
    const [mode, setMode] = useState<"trend" | "context" | "noise">("trend");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSearch = async () => {
        if (!query.trim() || isLoading) return;

        const currentQuery = query;
        const currentMode = mode;
        setQuery("");
        setMessages((prev) => [...prev, { role: "user", content: currentQuery }]);
        setIsLoading(true);

        try {
            const response = await filterSignals(currentQuery, currentMode);
            setMessages((prev) => [...prev, { role: "ai", content: response }]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "ERROR: SIGNAL LOST. THE NOISE IS TOO LOUD." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] glass-dark sanctuary-card overflow-hidden border border-white/5 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <Terminal className="w-3 h-3" />
                        Signal Filter v2.0 // Research Mode
                    </div>
                </div>

                <div className="flex bg-slate-900 rounded-lg p-1 border border-white/5">
                    {[
                        { id: "trend", icon: Sparkles, label: "Trend" },
                        { id: "context", icon: Zap, label: "Context" },
                        { id: "noise", icon: ShieldAlert, label: "Noise" },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setMode(m.id as any)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all",
                                mode === m.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <m.icon className="w-3 h-3" />
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Terminal Log */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm scrollbar-hide"
            >
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                        <Terminal className="w-12 h-12 text-slate-700" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
                            Waiting for Input...
                        </p>
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={cn(
                            "animate-in fade-in slide-in-from-bottom-2 duration-300",
                            msg.role === "user" ? "text-primary flex gap-3" : "text-slate-300 flex gap-3"
                        )}
                    >
                        <span className="font-black opacity-50 shrink-0">
                            {msg.role === "user" ? ">_" : "//"}
                        </span>
                        <div className="whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center gap-3 text-primary animate-pulse">
                        <span className="font-black opacity-50 shrink-0">||</span>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Filtering Noise...
                        </div>
                    </div>
                )}
            </div>

            {/* Terminal Input */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                <div className="relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        placeholder={`ENTER ${mode.toUpperCase()} QUERY...`}
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold tracking-tight text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700 font-mono"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={isLoading || !query.trim()}
                        className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <div className="mt-4 flex items-center justify-between text-[8px] font-black uppercase tracking-[0.2em] text-slate-600 px-2">
                    <span>Soul & Signal Protocol : ACTIVE</span>
                    <span>Gemini Core : CONNECTED</span>
                </div>
            </div>
        </div>
    );
}
