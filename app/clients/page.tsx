"use client";

import { useState } from "react";

export default function ClientsPage() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
        contact: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            alert(`Client "${data.client.first_name} ${data.client.last_name}" registered successfully!`);
            setForm({ first_name: "", last_name: "", dob: "", gender: "", contact: "" });
        } else {
            alert(data.error || "Something went wrong");
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Register New Client</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Gender (Optional)</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="text"
                    name="contact"
                    placeholder="Contact (Optional)"
                    value={form.contact}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register Client"}
                </button>
            </form>
        </main>
    );
}
