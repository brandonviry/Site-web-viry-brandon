import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ erreur: 'URL invalide' }, { status: 400 });
  }

  try {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const titre = $('meta[property="og:title"]').attr('content') || 
                  $('meta[name="twitter:title"]').attr('content') || 
                  $('title').text() || 
                  null;

    const description = $('meta[property="og:description"]').attr('content') || 
                        $('meta[name="twitter:description"]').attr('content') || 
                        $('meta[name="description"]').attr('content') || 
                        null;

    const image = $('meta[property="og:image"]').attr('content') || 
                  $('meta[name="twitter:image"]').attr('content') || 
                  $('link[rel="image_src"]').attr('href') || 
                  null;

    return NextResponse.json({ titre, description, image });
  } catch (erreur) {
    console.error('Erreur lors de la récupération des métadonnées:', erreur);
    return NextResponse.json({ erreur: 'Échec de la récupération des métadonnées' }, { status: 500 });
  }
}
