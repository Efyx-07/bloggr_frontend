import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';

// Route pour supprimer une image de vercel blob
// ===========================================================================================
export async function DELETE(request: Request) {
  const json = await request.json();
  console.log({ json });
  await del(json.url);
  return NextResponse.json({});
}

// Route pour ajouter une image à vercel blob
// ===========================================================================================
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || '';

  if (filename && request.body) {
    const blob = await put(filename, request.body, {
      access: 'public',
    });
    return NextResponse.json(blob);
  } else {
    return NextResponse.json({ message: 'no file detected' });
  }
}
