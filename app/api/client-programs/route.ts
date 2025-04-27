import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { client_id, program_ids } = body;

        if (!client_id || !Array.isArray(program_ids) || program_ids.length === 0) {
            return NextResponse.json({ error: "Client ID and at least one Program ID are required." }, { status: 400 });
        }

        const enrollments = program_ids.map((program_id: string) => ({
            client_id,
            program_id,
        }));

        const { error } = await supabase
            .from("client_programs")
            .insert(enrollments);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: "Client enrolled successfully." }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
