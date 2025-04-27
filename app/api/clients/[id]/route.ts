import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

type Props = {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Props) {
  try {
    const { id } = await params;

    const { data: client, error } = await supabase
      .from('clients')
      .select(`
        id,
        first_name,
        last_name,
        contact,
        dob,
        gender,
        programs:client_programs(programs(name))
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching client:', error); // Log the error details
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ client });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
