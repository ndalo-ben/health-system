import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default async function ClientsListPage() {
    const { data: clients, error } = await supabase
        .from('clients')
        .select('id, first_name, last_name, contact, created_at');  // Include more fields as needed

    if (error) {
        console.error('Supabase Error:', error.message); // better debug
        throw new Error('Failed to fetch clients');
    }

    return (
        <div className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Clients</h1>
            {clients.length > 0 ? (
                <ul className="space-y-6">
                    {clients.map((client) => (
                        <li key={client.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                            <div className="flex justify-between items-center">
                                <Link
                                    href={`/clients/${client.id}`}
                                    className="text-green-600 hover:text-green-800 font-semibold text-xl"
                                >
                                    {client.first_name} {client.last_name}
                                </Link>
                                <span className="text-sm text-gray-500">{new Date(client.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-4 space-y-2">
                                <p><strong>Email:</strong> {client.contact}</p>
                            </div>
                            <div className="mt-4">
                                <Link
                                    href={`/clients/${client.id}`}
                                    className="text-green-600 hover:text-green-800 text-sm"
                                >
                                    View Details
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600">No clients found.</p>
            )}
        </div>
    );
}
