'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Publication {
  url: string;
}

interface Metadata {
  titre: string | null;
  description: string | null;
  image: string | null;
}

interface PublicationsListClientProps {
  initialPublications: Publication[];
}

export default function PublicationsListClient({ initialPublications }: PublicationsListClientProps) {
  const [metadataList, setMetadataList] = useState<(Metadata | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const fetchMetadata = useCallback(async (url: string) => {
    try {
      if (!url || url === '/') {
        console.error('URL invalide:', url);
        return null;
      }
      const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      return await response.json() as Metadata;
    } catch (error) {
      console.error('Erreur lors de la récupération des métadonnées:', error);
      return null;
    }
  }, []);

  const loadNextBatch = useCallback(async () => {
    if (loadedCount >= initialPublications.length) return;

    setIsLoading(true);
    const newMetadata = await Promise.all(
      initialPublications.slice(loadedCount, loadedCount + 5).map(pub => pub && pub.url ? fetchMetadata(pub.url) : null)
    );
    setMetadataList(prev => [...prev, ...newMetadata]);
    setLoadedCount(prev => prev + newMetadata.length);
    setIsLoading(false);
  }, [initialPublications, loadedCount, fetchMetadata]);

  useEffect(() => {
    if (loadedCount === 0) {
      loadNextBatch();
    }
  }, [loadedCount, loadNextBatch]);

  const renderPublication = (metadata: Metadata | null, index: number) => {
    const publication = initialPublications[index];
    if (!publication || !publication.url) {
      return null; // Ne rien rendre si la publication ou l'URL est indéfinie
    }

    return (
      <div key={`${publication.url}-${index}`} className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        {metadata ? (
          <>
            {metadata.image && (
              <div className="w-full">
                <Image 
                  src={metadata.image} 
                  alt={metadata.titre || 'Image de la publication'} 
                  width={500}
                  height={300}
                  layout="responsive"
                  className="rounded-t-lg"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="font-semibold text-blue-400 text-xl mb-2">{metadata.titre || 'Titre non disponible'}</h3>
              <p className="text-gray-300 mb-4">{metadata.description || 'Description non disponible'}</p>
              <Link href={publication.url} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-colors">
                Accéder au contenu
              </Link>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-48">
            <p className="text-red-500 text-xl font-semibold">Indisponible</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {metadataList.map((metadata, index) => renderPublication(metadata, index)).filter(Boolean)}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      )}
      {loadedCount < initialPublications.length && !isLoading && (
        <div className="flex justify-center">
          <button 
            onClick={loadNextBatch}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
}
