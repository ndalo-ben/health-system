'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ClientSearch() {
    const [query, setQuery] = useState('');
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);

    interface Client {
        id: string;
        first_name: string;
        last_name: string;
        contact: string;
    }

    useEffect(() => {
        const fetchClients = async () => {
            if (query.trim() === '') {
                setClients([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/clients/search?query=${encodeURIComponent(query)}`);
                const data = await res.json();
                setClients(data.clients);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
            setLoading(false);
        };

        const delayDebounce = setTimeout(() => {
            fetchClients();
        }, 300); // 300ms debounce

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const clearQuery = () => {
        setQuery('');
        setClients([]);
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search clients..."
                    className="w-full border border-gray-300 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                    <button
                        onClick={clearQuery}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                        ×
                    </button>
                )}
            </div>

            <div className="mt-6 space-y-3">
                {loading && (
                    <div className="text-center text-gray-500 animate-pulse">
                        Searching...
                    </div>
                )}

                {!loading && clients.length > 0 && clients.map((client) => (
                    <Link key={client.id} href={`/clients/${client.id}`}>
                        <div className="border rounded-lg p-4 bg-white hover:bg-gray-50 shadow-sm cursor-pointer transition transform hover:scale-[1.02]">
                            <div className="font-semibold text-lg text-gray-800">
                                {client.first_name} {client.last_name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {client.contact}
                            </div>
                        </div>
                    </Link>
                ))}

                {!loading && query && clients.length === 0 && (
                    <div className="text-center text-gray-400">
                        No clients found.
                    </div>
                )}
            </div>
        </div>
    );
}
