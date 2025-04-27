
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';

    const { data, error } = await supabase
        .from('clients')
        .select('id, first_name, last_name, contact')
        .ilike('first_name', `%${query}%`); // case-insensitive search

    if (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error searching clients' }, { status: 500 });
    }

    return NextResponse.json({ clients: data });
}
