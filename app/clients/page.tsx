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
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Register New Client</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">Select Gender (Optional)</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <input
                    type="text"
                    name="contact"
                    placeholder="Email (johndoe@gmail.com)"
                    value={form.contact}
                    onChange={handleChange}
                    className="border border-gray-300 py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register Client"}
                </button>
            </form>
        </main>
    );
}
