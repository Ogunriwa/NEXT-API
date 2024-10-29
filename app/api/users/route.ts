
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse JSON data from the request body
    const data = await request.json();

    // Process the data (you can add your logic here)
    console.log('Received data:', data);

    // Return a JSON response
    return NextResponse.json(
      { message: 'Data received successfully', receivedData: data },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { message: 'Error processing request', error: error.message },
      { status: 400 }
    );
  }
}



// Optionally, handle other HTTP methods
export async function GET() {
    return NextResponse.json({ message: 'GET method not implemented' }, { status: 405 });
}