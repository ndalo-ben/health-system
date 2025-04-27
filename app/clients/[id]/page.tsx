import { notFound } from 'next/navigation';

interface ClientProfilePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ClientProfilePage({ params }: ClientProfilePageProps) {
    const { id } = await params;

    // Fetch the client data from your API
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/clients/${id}`, {
        method: 'GET',
        cache: 'no-store', // Always fetch fresh
    });

    if (!res.ok) {
        notFound();
    }

    const { client } = await res.json();

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-900">{client.first_name} {client.last_name}</h1>
            <div className="space-y-4 text-gray-700 text-lg">
                <div><span className="font-semibold">Email:</span> {client.contact}</div>
                <div><span className="font-semibold">Date of Birth:</span> {client.dob}</div>
                <div><span className="font-semibold">Gender:</span> {client.gender}</div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Enrolled Programs:</h2>
                {client.programs && client.programs.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                        {client.programs.map((entry: { programs: { name: string } }) => (
                            <li key={entry.programs.name} className="text-gray-800">
                                {entry.programs.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No programs enrolled yet.</p>
                )}
            </div>
        </div>
    );
}
