import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

export default function SponsoredHackathons({ showBrowseCTA = true }) {
    const [showAllSponsored, setShowAllSponsored] = useState(false);

    return (
        <div className="mt-28 mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-14"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 mb-5">
                    <span className="text-sm">🌟</span>
                    <span className="text-sm text-amber-300 font-medium">Premium Events</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                    <span className="text-gradient">Sponsored</span> Hackathons
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                    Compete in official corporate hackathons to win huge cash prizes, secure direct job interviews, and get free premium platform credits.
                </p>
                <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
            </motion.div>

            {/* Sponsored Events Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    {
                        sponsor: "Google Cloud", title: "Build with AI Hackathon", prize: "₹5,00,000", gradient: "from-blue-400 to-blue-600", bgGlow: "bg-blue-500/10", tags: ["Vertex AI", "Gemini", "Cloud Run"], intro: "Create innovative AI applications using Google's generative AI models to solve real-world problems.", benefit: "Get fast-tracked interviews for Google Cloud engineering roles."
                    },
                    {
                        sponsor: "Microsoft", title: "Azure Innovators Cup", prize: "₹7,50,000", gradient: "from-cyan-400 to-blue-500", bgGlow: "bg-cyan-500/10", tags: ["Azure OpenAI", "Cosmos DB", "Copilot"], intro: "Empower businesses with next-generation enterprise solutions powered by Azure AI and Cosmos DB.", benefit: "Free Azure startup credits worth up to $150,000."
                    },
                    {
                        sponsor: "AWS", title: "Serverless DevFest", prize: "₹4,00,000", gradient: "from-amber-400 to-orange-500", bgGlow: "bg-amber-500/10", tags: ["Lambda", "DynamoDB", "Bedrock"], intro: "Architect highly scalable, serverless applications with seamless ML integration using AWS Bedrock.", benefit: "Exclusive AWS certification vouchers and direct hiring opportunities."
                    },
                    {
                        sponsor: "Devfolio & Polygon", title: "Web3 CodeStorm", prize: "₹10,00,000", gradient: "from-violet-400 to-purple-600", bgGlow: "bg-violet-500/10", tags: ["Blockchain", "Smart Contracts", "DeFi"], intro: "Build decentralized finance (DeFi) protocols and high-throughput dApps on the Polygon network.", benefit: "Direct access to Polygon ecosystem funding and grants."
                    },
                    {
                        sponsor: "NVIDIA", title: "GreenHack India", prize: "₹6,00,000", gradient: "from-emerald-400 to-green-600", bgGlow: "bg-emerald-500/10", tags: ["CleanEnergy", "AgriTech", "CUDA"], intro: "Develop sustainable technologies leveraging NVIDIA's massive parallel computing infrastructure.", benefit: "Premium NVIDIA hardware swags and accelerated computing access."
                    }
                ].slice(0, showAllSponsored ? 5 : 3).map((h, i) => (
                    <SponsoredCard key={i} delayIndex={i} {...h} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-8 flex justify-center"
            >
                <button onClick={() => setShowAllSponsored(!showAllSponsored)} className="text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors text-sm font-semibold flex items-center gap-2">
                    {showAllSponsored ? "See Less ▲" : "See More ▼"}
                </button>
            </motion.div>

            {/* Why join sponsored hackathons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-20 text-center mb-10"
            >
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Why join <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">sponsored events?</span></h3>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                <SponsorBenefit
                    icon="💼"
                    title="Direct Hiring"
                    desc="Top performers often get direct interview calls or job offers from the sponsoring tech giants."
                />
                <SponsorBenefit
                    icon="💰"
                    title="Massive Prizes"
                    desc="Sponsored events feature significantly larger cash prize pools and premium swags/hardware."
                />
                <SponsorBenefit
                    icon="☁️"
                    title="Free Credits"
                    desc="Get thousands of dollars in free cloud and API credits just for participating."
                />
                <SponsorBenefit
                    icon="📜"
                    title="Official Certs"
                    desc="Earn co-branded completion certificates recognized globally in the tech industry."
                />
            </motion.div>

            {/* CTA */}
            {showBrowseCTA && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mt-16 text-center"
                >
                    <Link to="/hackathons" className="btn btn-outline inline-flex items-center gap-2 px-8 py-3">
                        Browse All Hackathons
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}

function SponsoredCard({ sponsor, title, prize, gradient, bgGlow, tags, intro, benefit, delayIndex = 0 }) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Map sponsor to solid background colors matching reference image
    let cardBg = "bg-slate-50 border border-slate-200 dark:border-transparent dark:bg-[#1f2937]";
    let badgeColor = "bg-blue-500 text-white";
    let titleColor = "text-slate-900 dark:text-white";
    let prizeColor = "text-amber-600 dark:text-yellow-500";
    let tagBg = "bg-slate-200 dark:bg-white/10";

    if (sponsor.includes("Google")) {
        cardBg = "bg-blue-50 border border-blue-200 dark:border-transparent dark:bg-[#1a2d52]"; // Deep blue
        badgeColor = "bg-blue-500 text-white";
    } else if (sponsor.includes("Microsoft")) {
        cardBg = "bg-cyan-50 border border-cyan-200 dark:border-transparent dark:bg-[#0d344d]"; // Deep teal
        badgeColor = "bg-cyan-500 text-white";
    } else if (sponsor.includes("AWS")) {
        cardBg = "bg-orange-50 border border-orange-200 dark:border-transparent dark:bg-[#452d1b]"; // Deep brown/amber
        badgeColor = "bg-orange-500 text-white";
    } else if (sponsor.includes("Devfolio")) {
        cardBg = "bg-violet-50 border border-violet-200 dark:border-transparent dark:bg-[#251545]"; // Deep purple
        badgeColor = "bg-violet-500 text-white";
    } else if (sponsor.includes("NVIDIA")) {
        cardBg = "bg-emerald-50 border border-emerald-200 dark:border-transparent dark:bg-[#0f2e1a]"; // Deep green
        badgeColor = "bg-emerald-500 text-white";
    }

    return (
        <motion.div
            custom={delayIndex}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className={`relative group cursor-pointer ${cardBg} rounded-2xl p-6 h-[240px] transition-all duration-300 shadow-lg flex flex-col`}
        >
            <AnimatePresence mode="wait">
                {!isFlipped ? (
                    <motion.div
                        key="front"
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full"
                    >
                        <div className="flex items-start justify-between">
                            <div className={`inline-flex px-3 py-1 rounded-full ${badgeColor}`}>
                                <span className="text-[10px] font-bold uppercase tracking-wider">BY {sponsor}</span>
                            </div>
                            <div className="text-[#facc15] text-xl opacity-90 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">✨</div>
                        </div>

                        <h3 className={`mt-6 text-xl font-bold ${titleColor} transition-all`}>
                            {title}
                        </h3>

                        <div className={`mt-1 text-2xl font-black ${prizeColor}`}>
                            {prize}
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-2">
                                {tags.map((t, i) => (
                                    <span key={i} className={`text-[11px] font-medium px-2 py-1.5 rounded-md ${tagBg} text-slate-700 dark:text-slate-200`}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-white/40 font-semibold uppercase tracking-wider animate-pulse whitespace-nowrap">
                                Details ➔
                            </span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="back"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full overflow-y-auto custom-scrollbar"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <h3 className={`text-base leading-tight font-bold ${titleColor}`}>
                                {title} <span className="text-xs font-normal opacity-70 ml-1">Overview</span>
                            </h3>
                            <div className="text-slate-500 hover:bg-slate-200 dark:text-white dark:hover:bg-white/10 rounded-full p-1 transition-colors cursor-pointer shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>

                        <p className="text-sm text-slate-700 dark:text-slate-200/90 leading-relaxed mb-4">
                            {intro}
                        </p>

                        <div className="mt-auto pt-3 border-t border-slate-200 dark:border-white/10">
                            <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 mb-1 tracking-wider">Top Benefit</div>
                            <p className="text-sm font-medium text-emerald-300/90 leading-snug">
                                {benefit}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function SponsorBenefit({ icon, title, desc }) {
    return (
        <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-slate-300 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/40 p-5 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
        >
            <div className="text-3xl mb-3">{icon}</div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">{title}</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
        </motion.div>
    );
}
