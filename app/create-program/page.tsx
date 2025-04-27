"use client";

import { useState } from "react";

export default function Dashboard() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/programs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description }),
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            alert(`Program "${data.program.name}" created successfully!`);
            setName("");
            setDescription("");
        } else {
            alert(data.error || "Something went wrong");
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">Create Health Program</h1>
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Program Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Program Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-gradient-to-l hover:from-green-500 hover:to-green-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Program"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
