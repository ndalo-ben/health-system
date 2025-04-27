import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default async function ClientsListPage() {
    const { data: clients, error } = await supabase
        .from('clients')
        .select('id, first_name');

    if (error) {
        console.error('Supabase Error:', error.message); // better debug
        throw new Error('Failed to fetch clients');
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Clients</h1>
            {clients.length > 0 ? (
                <ul className="space-y-4">
                    {clients.map((client) => (
                        <li key={client.id}>
                            <Link href={`/clients/${client.id}`} className="text-blue-600 hover:underline text-lg">
                                {client.first_name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No clients found.</p>
            )}
        </div>
    );
}
