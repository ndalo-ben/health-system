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
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Create Health Program</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Program Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Program Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Program"}
                </button>
            </form>
        </main>
    );
}
