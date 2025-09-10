import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Paranoia - Générateur de Personnage" },
    { name: "description", content: "Créez votre personnage pour le JDR Paranoia dans le Complexe Alpha" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-red-400 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 text-center">
        {/* En-tête principal */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-red-100 mb-4 tracking-wider">
            PARANOIA
          </h1>
          <div className="text-2xl text-red-300 mb-2">
            Générateur de Personnage
          </div>
          <div className="text-lg text-red-500">
            Complexe Alpha - Accréditation ROUGE
          </div>
        </div>

        {/* Message thématique */}
        <div className="bg-red-900/30 border border-red-600 rounded-lg p-6 mb-8">
          <div className="text-xl text-red-200 mb-3">
            🎯 L'Ordinateur est votre ami.
          </div>
          <div className="text-lg text-red-300 mb-3">
            L'Ordinateur veut que vous soyez heureux.
          </div>
          <div className="text-red-400">
            Le bonheur est obligatoire. Êtes-vous heureux, citoyen ?
          </div>
        </div>

        {/* Description */}
        <div className="text-red-400 mb-8 max-w-2xl mx-auto">
          <p className="mb-4">
            Bienvenue dans le Complexe Alpha ! Ce générateur vous aidera à créer 
            votre Clarificateur d'Accréditation ROUGE, prêt à servir l'Ordinateur 
            et à survivre aux dangers du Complexe.
          </p>
          <p className="text-sm text-red-500">
            Suivez les 9 étapes de création officielle basées sur les règles 
            du livret du joueur Paranoia.
          </p>
        </div>

        {/* Bouton principal */}
        <div className="mb-8">
          <Link
            to="/generator"
            className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 shadow-lg hover:shadow-red-500/50 uppercase tracking-wide"
          >
            🎲 Créer un Personnage
          </Link>
        </div>

        {/* Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-black/50 border border-red-700 rounded-lg p-4">
            <div className="text-red-300 font-bold mb-2">
              ⚡ Lancers de Dés Interactifs
            </div>
            <div className="text-red-500">
              Boutons pour tous les types de dés requis (1D10+8, 2D10, 1D100)
            </div>
          </div>
          
          <div className="bg-black/50 border border-red-700 rounded-lg p-4">
            <div className="text-red-300 font-bold mb-2">
              🧮 Calculs Automatiques
            </div>
            <div className="text-red-500">
              Attributs secondaires et compétences calculés selon les règles officielles
            </div>
          </div>
          
          <div className="bg-black/50 border border-red-700 rounded-lg p-4">
            <div className="text-red-300 font-bold mb-2">
              🔒 Secrets Protégés
            </div>
            <div className="text-red-500">
              Pouvoirs mutants et sociétés secrètes cachés des autres joueurs
            </div>
          </div>
        </div>

        {/* Avertissement légal (thématique) */}
        <div className="mt-12 text-xs text-red-700 border border-red-800 rounded p-4">
          <p className="mb-2">
            ⚠️ AVERTISSEMENT: La création de personnages mutants est strictement réglementée. 
            Toute utilisation non autorisée sera rapportée à la Sécurité Interne.
          </p>
          <p>
            En utilisant ce générateur, vous acceptez de servir fidèlement l'Ordinateur 
            et de dénoncer toute activité traîtresse, y compris la vôtre.
          </p>
        </div>
      </div>
    </div>
  );
}
