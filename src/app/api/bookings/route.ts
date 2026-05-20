import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.service || !body.date || !body.time) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      );
    }

    console.log('Booking submission:', body);

    return NextResponse.json(
      { success: true, message: 'Prenotazione confermata' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Errore durante la prenotazione' },
      { status: 500 }
    );
  }
}
