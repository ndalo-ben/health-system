"use client";

import { useEffect, useState } from "react";

interface Client {
    id: string;
    first_name: string;
    last_name: string;
}

interface Program {
    id: string;
    name: string;
}

export default function EnrollPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [selectedClient, setSelectedClient] = useState<string>("");
    const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const clientsRes = await fetch("/api/clients-list");
            const clientsData = await clientsRes.json();
            setClients(clientsData.clients);

            const programsRes = await fetch("/api/programs-list");
            const programsData = await programsRes.json();
            setPrograms(programsData.programs);
        }
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClient || selectedPrograms.length === 0) {
            alert("Select a client and at least one program.");
            return;
        }
        setLoading(true);

        const res = await fetch("/api/client-programs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ client_id: selectedClient, program_ids: selectedPrograms }),
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            alert("Client enrolled successfully!");
            setSelectedClient("");
            setSelectedPrograms([]);
        } else {
            alert(data.error || "Something went wrong");
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Enroll Client into Programs</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6">
                <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                >
                    <option value="">Select a Client</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.first_name} {client.last_name}
                        </option>
                    ))}
                </select>

                <div className="flex flex-col gap-2">
                    {programs.map((program) => (
                        <label key={program.id} className="flex items-center gap-2 text-gray-700">
                            <input
                                type="checkbox"
                                value={program.id}
                                checked={selectedPrograms.includes(program.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedPrograms([...selectedPrograms, program.id]);
                                    } else {
                                        setSelectedPrograms(selectedPrograms.filter((id) => id !== program.id));
                                    }
                                }}
                                className="focus:ring-green-500"
                            />
                            {program.name}
                        </label>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    disabled={loading}
                >
                    {loading ? "Enrolling..." : "Enroll Client"}
                </button>
            </form>
        </main>
    );
}
