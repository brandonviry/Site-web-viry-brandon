import { NextResponse } from 'next/server';
import { ajouterPageALaBaseDeDonnees } from '@/utils/notion';
import { contactFormSchema } from '@/schemas/contactFormSchema';

export async function POST(req: Request) {
  console.log('Début du traitement de la requête POST');
  try {
    const body = await req.json();
    console.log('Corps de la requête reçu:', body);

    const validatedData = contactFormSchema.parse(body);
    console.log('Données validées:', validatedData);

    await ajouterPageALaBaseDeDonnees(validatedData.nom, validatedData.email, validatedData.message);
    console.log('Données ajoutées à la base de données');

    return NextResponse.json({ message: 'Message envoyé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur détaillée:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: `Erreur: ${error.message}` }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erreur inconnue lors du traitement de la requête' }, { status: 400 });
  }
}