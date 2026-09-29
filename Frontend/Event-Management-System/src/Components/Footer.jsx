import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
    ArrowUp,
    Sparkles,
    Ticket,
    ShieldCheck,
    Headphones
} from 'lucide-react'

// Inline SVG brand icons for reliable rendering
const TwitterIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

const InstagramIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
)

const FacebookIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
)

const LinkedinIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.37-2.3 1.7-2.3 1.33 0 1.55 1.05 1.55 2.37v4.86h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
)

const GithubIcon = ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
)

const Footer = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email.trim()) {
            setSubscribed(true)
            setEmail('')
            setTimeout(() => setSubscribed(false), 5000)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="w-full bg-[#111622] text-gray-300 font-sans pt-16 pb-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pb-12 border-b border-gray-800/80">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/40 border border-gray-800/50">
                        <div className="p-3 rounded-xl bg-[#f05335]/10 text-[#f05335]">
                            <Ticket size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm">Instant E-Tickets</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Seamless mobile entry with QR codes</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/40 border border-gray-800/50">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm">100% Secure Checkout</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Encrypted payment & verified sellers</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/40 border border-gray-800/50">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <Headphones size={24} />
                        </div>
                        <div>
                            <h4 className="text-white font-semibold text-sm">24/7 Organizer Support</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Dedicated assistance for event hosts</p>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

                    {/* Brand Info (2 Columns wide on lg) */}
                    <div className="lg:col-span-2 pr-0 lg:pr-6">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 text-2xl font-black tracking-tight text-white font-sans group mb-4"
                        >
                            <span className="h-3 w-3 rounded-full bg-[#f05335] inline-block transition-transform group-hover:scale-125" />
                            <span>EVENTORA</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            EVENTORA is the premier platform to discover, buy, and manage tickets for live events. Whether you are hosting an intimate workshop or a massive music festival, we provide the tools to make event management effortless.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-3 text-xs sm:text-sm text-gray-400">
                            <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-[#f05335] shrink-0" />
                                <span>Lokanthali,Bhaktapur,Nepal</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-[#f05335] shrink-0" />
                                <a href="9865460356" className="hover:text-white transition-colors">9865460356</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-[#f05335] shrink-0" />
                                <a href="suryajoshi180@gmail.com" className="hover:text-white transition-colors">suryajoshi180@gmail.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Column 1: Explore Events */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#f05335] pl-2.5">
                            Explore
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {['Concerts & Live Music', 'Tech Conferences', 'Art & Exhibitions', 'Sports & Fitness', 'Workshops & Seminars', 'Food & Drink Festivals'].map((item, idx) => (
                                <li key={idx}>
                                    <Link to="/event" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2: Organizers */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#f05335] pl-2.5">
                            For Organizers
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {['Create an Event', 'Ticket Pricing Plan', 'Organizer Dashboard', 'Venue Directory',].map((item, idx) => (
                                <li key={idx}>
                                    <Link to="/organizer" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company & Legal */}
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#f05335] pl-2.5">
                            Company
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            {['About Us', 'Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map((item, idx) => (
                                <li key={idx}>
                                    <a href="#company" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-150">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Social Links */}
                <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500 text-center sm:text-left">
                        © {new Date().getFullYear()} EVENTORA . All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {[
                            { component: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                            { component: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
                            { component: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
                            { component: GithubIcon, href: 'https://github.com', label: 'GitHub' },
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.label}
                                className="p-2.5 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-700 transition-all duration-200"
                            >
                                <social.component size={16} />
                            </a>
                        ))}
                    </div>

                    {/* Scroll to top button */}
                    <button
                        onClick={scrollToTop}
                        className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-800 px-3.5 py-2 rounded-full border border-gray-800 transition-all cursor-pointer"
                        aria-label="Back to top"
                    >
                        <span>Back to top</span>
                        <ArrowUp size={14} />
                    </button>
                </div>

            </div>
        </footer>
    )
}

export default Footer
