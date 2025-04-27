"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BarChart3, Users, Activity } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import ClientSearch from "./components/Searhcbar";

export default function DashboardPage() {
  const [clients, setClients] = useState<{ id: number; first_name: string; created_at: string }[]>([]);
  const [programs, setPrograms] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('id, first_name, created_at')
        .order('created_at', { ascending: false });

      const { data: programsData, error: programsError } = await supabase
        .from('programs')
        .select('id, name');

      if (!clientsError && clientsData) {
        setClients(clientsData);
      }
      if (!programsError && programsData) {
        setPrograms(programsData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const clientCount = clients.length;
  const programCount = programs.length;
  const recentClients = clients.slice(0, 5);

  const dataGrowth = [
    { month: "Jan", clients: Math.floor(clientCount * 0.2) },
    { month: "Feb", clients: Math.floor(clientCount * 0.4) },
    { month: "Mar", clients: Math.floor(clientCount * 0.6) },
    { month: "Apr", clients: Math.floor(clientCount * 0.8) },
    { month: "May", clients: clientCount },
  ];

  const programData = programs.map((program) => ({
    name: program.name,
    value: Math.floor(Math.random() * 100) + 10, // Optional: Replace with real enrollment data later
  }));

  const COLORS = ['#00A6A6', '#007C7C', '#38BDF8', '#5EEAD4', '#FBBF24', '#34D399'];

  if (loading) {
    return <main className="flex w-full items-center justify-center h-screen">Loading...</main>;
  }

  return (
    <main className="py-16 mx-auto md:px-6 min-h-screen">
      <ClientSearch />
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <Users className="text-[#00A6A6]" size={32} />
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">{clientCount}</h2>
            <p className="text-sm text-[#64748B]">Total Clients</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <BarChart3 className="text-[#007C7C]" size={32} />
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">{programCount}</h2>
            <p className="text-sm text-[#64748B]">Programs Offered</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4">
          <Activity className="text-[#38BDF8]" size={32} />
          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">
              {Math.min(clientCount, 5)}
            </h2>
            <p className="text-sm text-[#64748B]">Active Today</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-2xl">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#1E293B]">Clients Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dataGrowth}>
                <Line type="monotone" dataKey="clients" stroke="#00A6A6" strokeWidth={3} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#1E293B]">Program Enrollment</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={programData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {programData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Clients */}
      <div className="bg-white shadow-md rounded-2xl mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-[#1E293B]">Recent Clients</h2>
          <ul className="space-y-4">
            {recentClients.length > 0 ? (
              recentClients.map((client, idx) => (
                <li key={idx} className="flex justify-between text-[#64748B]">
                  <span>{client.first_name}</span>
                  <span className="text-sm">{new Date(client.created_at).toLocaleDateString()}</span>
                </li>
              ))
            ) : (
              <li className="text-center text-[#64748B]">No clients yet</li>
            )}
          </ul>
        </div>
      </div>

    </main>
  );
}
