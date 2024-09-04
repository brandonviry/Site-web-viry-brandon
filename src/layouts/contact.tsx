"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormSchema } from '@/schemas/contactFormSchema';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    try {
      const res = await fetch('/api/contact', { // Notez l'URL correcte ici
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        const errorText = await res.text();
        setSubmitStatus('error');
        setErrorMessage(`Erreur du serveur : ${errorText}`);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(`Échec de l'envoi du message. Veuillez réessayer plus tard. Détails : ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Me contacter</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nom</label>
          <input
            id="name"
            type="text"
            {...register('nom')}
            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm p-2 text-gray-100"
          />
          {errors.nom && <p className="text-red-400 text-sm mt-1">{errors.nom.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-md shadow-sm p-2"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
          <textarea
            id="message"
            {...register('message')}
            className="mt-1 block w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-md shadow-sm p-2"
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-2 px-4 rounded ${
            isSubmitting 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>

      {submitStatus === 'success' && (
        <p className="text-green-400 mt-4">Message envoyé avec succès !</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-400 mt-4">{errorMessage}</p>
      )}
    </section>
  );
}
