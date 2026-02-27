import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

const REVIEWS = [
    {
        name: "Aisha Sharma",
        role: "Full Stack Developer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha&backgroundColor=b6e3f4",
        review: "The Judges Panel is a game-changer. I received incredibly detailed rubric scores and feedback which helped our team identify exactly what to improve.",
        hackathon: "Build with AI Hackathon",
        rating: 5,
    },
    {
        name: "Rahul Verma",
        role: "Hackathon Organizer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=c0aede",
        review: "Hosting our university's national hackathon on Codearenaa was seamless. The real-time announcements feature saved us from total chaos during submission hours.",
        hackathon: "TechNova 2024",
        rating: 5,
    },
    {
        name: "Sneha Patel",
        role: "UI/UX Designer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha&backgroundColor=ffdfbf",
        review: "Codearenaa's interface is stunning. Joining a team with an invite code and submitting our Figma links along with GitHub was buttery smooth. And the auto-generated certificates are beautiful!",
        hackathon: "DesignSprint India",
        rating: 4,
    },
];

export default function UserReviews() {
    return (
        <div className="mt-28 mb-20 relative">
            {/* Background glow elements */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-14 relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-5">
                    <span className="text-sm">💬</span>
                    <span className="text-sm text-emerald-300 font-medium">Testimonials</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                    Loved by <span className="text-gradient">Developers & Organizers</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                    See how Codearenaa is transforming the hackathon experience for participants, host communities, and judges across the country.
                </p>
                <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid md:grid-cols-3 gap-6 relative z-10"
            >
                {REVIEWS.map((review, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={fadeUp}
                        whileHover={{ y: -5 }}
                        className="card p-6 flex flex-col hover:border-emerald-500/30 hover:shadow-glow transition-all duration-300 bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm"
                    >
                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-4 text-amber-400 text-sm">
                            {[...Array(5)].map((_, idx) => (
                                <span key={idx} className={idx < review.rating ? "opacity-100" : "opacity-30"}>
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex-1 italic">
                            "{review.review}"
                        </p>

                        {/* User Info */}
                        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700/50 flex items-center gap-3">
                            <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700/50"
                            />
                            <div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">{review.name}</div>
                                <div className="text-[11px] text-slate-600 dark:text-slate-500">{review.role}</div>
                                <div className="text-[10px] text-emerald-400/80 font-medium mt-0.5">{review.hackathon}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
