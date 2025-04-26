import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabase
        .from("clients")
        .select("id, first_name, last_name");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ clients: data });
}
