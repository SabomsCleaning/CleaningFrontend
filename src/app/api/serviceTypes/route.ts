import { getServiceTypes } from '../../../../lib/api/serviceTypes';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getServiceTypes();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Fel i API-route:', error);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
