import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Campi obbligatori mancanti' },
        { status: 400 }
      );
    }

    console.log('Contact form submission:', body);

    return NextResponse.json(
      { success: true, message: 'Messaggio ricevuto' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'invio del messaggio' },
      { status: 500 }
    );
  }
}
