import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { first_name, last_name, dob, gender, contact } = body;

        if (!first_name || !last_name || !dob) {
            return NextResponse.json({ error: "First name, last name, and date of birth are required." }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("clients")
            .insert([{ first_name, last_name, dob, gender, contact }])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ client: data }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
