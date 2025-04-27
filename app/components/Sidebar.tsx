'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Icon library

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Create Program', href: '/create-program' },
    { name: 'Clients', href: '/clients' },
    { name: 'Enroll', href: '/enroll' },
    { name: 'All Clients', href: '/clients-list' },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            {/* Mobile Top Bar */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-md w-full fixed top-0 z-20">
                <h1 className="text-xl font-bold text-gray-800">HealthSystem</h1>
                <button onClick={() => setOpen(!open)}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform bg-white border-r border-blue-50 h-screen w-64 p-6 pt-20 md:pt-6 space-y-6 transition-transform duration-300 ease-in-out z-30
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-0
      `}>
                <div className="flex flex-col space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 hidden md:block">HealthSystem</h2>

                    <nav className="flex flex-col space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:bg-gray-100 rounded-md p-2 font-medium transition"
                                onClick={() => setOpen(false)} // Close sidebar on mobile
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Page Content */}
            <div className="flex-1 p-6 mt-16 md:mt-0 ml-0 md:ml-64">
                {/* Your page content will go here */}
            </div>
        </div>
    );
}
