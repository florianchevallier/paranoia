// Étape 1: Nommer le Personnage
import { useState, useEffect } from 'react';
import type { ParanoiaCharacter } from '../../types/paranoia';

interface Step1NameProps {
  character: Partial<ParanoiaCharacter>;
  updateName: (firstName: string, unitCode: string) => void;
}

export default function Step1Name({ character, updateName }: Step1NameProps) {
  
  const [firstName, setFirstName] = useState(character.firstName || '');
  const [unitCode, setUnitCode] = useState(character.unitCode || '');

  // Synchroniser les champs locaux avec les données du character
  useEffect(() => {
    if (character.firstName && character.firstName !== firstName) {
      setFirstName(character.firstName);
    }
    if (character.unitCode && character.unitCode !== unitCode) {
      setUnitCode(character.unitCode);
    }
  }, [character.firstName, character.unitCode]);

  // Mettre à jour le personnage quand les champs changent (avec debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      const normalizedFirstName = firstName.trim().toUpperCase();
      const normalizedUnitCode = unitCode.trim().toUpperCase().slice(0, 3);
      
      
      // Mettre à jour seulement si les valeurs ont vraiment changé
      if (character.firstName !== normalizedFirstName || 
          character.unitCode !== normalizedUnitCode) {
        updateName(firstName, unitCode);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [firstName, unitCode, character.firstName, character.unitCode, updateName]);

  // Générer un code d'unité aléatoire
  const generateRandomUnitCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomCode = Array.from({ length: 3 }, () => 
      letters[Math.floor(Math.random() * letters.length)]
    ).join('');
    setUnitCode(randomCode);
  };

  // Exemples de prénoms typiques de Paranoia
  const exampleNames = [
    'DAVID', 'ANNA', 'MAX', 'FRANK', 'JANE', 'BOB', 'MARY', 'JACK',
    'LISA', 'MIKE', 'SARA', 'PAUL', 'KIM', 'TOM', 'JOY', 'DAN',
    'AMY', 'RON', 'SUE', 'HAL', 'EVE', 'JIM', 'PAT', 'LEE'
  ];

  const selectRandomName = () => {
    const randomName = exampleNames[Math.floor(Math.random() * exampleNames.length)];
    setFirstName(randomName);
  };

  // Formatage du nom complet
  const fullName = firstName && unitCode ? 
    `${firstName.toUpperCase()}-R-${unitCode.toUpperCase()}-1` : 
    'Nom incomplet';

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Format du nom :</h3>
        <p className="text-red-400 mb-3">
          <code className="bg-black/50 px-2 py-1 rounded">
            Prénom - R - Code d'Unité - Numéro de Clone
          </code>
        </p>
        <div className="text-sm text-red-500 space-y-1">
          <p>• <strong>Prénom :</strong> Au choix du joueur (ex: DAVID, ANNA, MAX)</p>
          <p>• <strong>R :</strong> Niveau d'accréditation ROUGE (débutant)</p>
          <p>• <strong>Code d'Unité :</strong> 3 lettres majuscules de votre secteur</p>
          <p>• <strong>1 :</strong> Premier clone de votre lignée</p>
        </div>
      </div>

      {/* Aperçu du nom complet */}
      <div className="bg-black border-2 border-red-600 rounded-lg p-6 text-center">
        <h3 className="text-red-300 mb-2">Nom complet :</h3>
        <div className={`text-3xl font-bold font-mono tracking-wider ${
          firstName && unitCode ? 'text-red-100' : 'text-red-700'
        }`}>
          {fullName}
        </div>
      </div>

      {/* Formulaire de saisie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prénom */}
        <div className="space-y-3">
          <label className="block font-bold text-red-300 uppercase">
            Prénom
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value.toUpperCase())}
            placeholder="DAVID"
            maxLength={15}
            className="w-full px-4 py-3 bg-black border border-red-600 rounded text-red-100 uppercase placeholder-red-700 focus:border-red-400 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={selectRandomName}
              className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-sm font-bold uppercase"
            >
              🎲 Aléatoire
            </button>
            <div className="text-xs text-red-500 flex items-center">
              {firstName.length}/15 caractères
            </div>
          </div>
          
          {/* Exemples de noms */}
          <div className="text-xs text-red-600">
            <p className="mb-1">Exemples :</p>
            <div className="flex flex-wrap gap-1">
              {exampleNames.slice(0, 8).map(name => (
                <button
                  key={name}
                  onClick={() => setFirstName(name)}
                  className="px-2 py-1 bg-red-900/50 hover:bg-red-800 rounded text-red-300 text-xs"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Code d'Unité */}
        <div className="space-y-3">
          <label className="block font-bold text-red-300 uppercase">
            Code d'Unité (3 lettres)
          </label>
          <input
            type="text"
            value={unitCode}
            onChange={(e) => setUnitCode(e.target.value.toUpperCase().slice(0, 3))}
            placeholder="URK"
            maxLength={3}
            className="w-full px-4 py-3 bg-black border border-red-600 rounded text-red-100 uppercase placeholder-red-700 focus:border-red-400 focus:outline-none text-center text-2xl font-mono tracking-widest"
          />
          <div className="flex gap-2">
            <button
              onClick={generateRandomUnitCode}
              className="px-3 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-sm font-bold uppercase"
            >
              🎲 Générer
            </button>
            <div className="text-xs text-red-500 flex items-center">
              {unitCode.length}/3 lettres
            </div>
          </div>
          
          {/* Exemples de codes */}
          <div className="text-xs text-red-600">
            <p className="mb-1">Exemples :</p>
            <div className="flex flex-wrap gap-1">
              {['URK', 'CCL', 'OFX', 'ZAP', 'BUG', 'CPU', 'RAD', 'LAB'].map(code => (
                <button
                  key={code}
                  onClick={() => setUnitCode(code)}
                  className="px-2 py-1 bg-red-900/50 hover:bg-red-800 rounded text-red-300 text-xs font-mono"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Informations contextuelles */}
      <div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-300 mb-2">Informations sur le système de noms :</h4>
        <div className="text-sm text-red-400 space-y-2">
          <p>
            <strong>Niveau d'accréditation :</strong> Le "R" indique votre rang ROUGE, 
            le niveau de sécurité le plus bas dans le Complexe Alpha. 
            Vous n'avez accès qu'aux zones ROUGE et INFRAROUGE.
          </p>
          <p>
            <strong>Code d'Unité :</strong> Identifie votre secteur de résidence. 
            Chaque secteur a ses propres installations, règles et dangers particuliers.
          </p>
          <p>
            <strong>Numéro de Clone :</strong> Vous êtes le premier (et espérons-le pas le dernier) 
            d'une série de 6 clones identiques. En cas de "dysfonctionnement terminal", 
            le clone suivant prendra la relève.
          </p>
        </div>
      </div>

      {/* Validation */}
      {firstName && unitCode && (
        <div className="text-center p-4 bg-green-900/50 border border-green-600 rounded-lg">
          <p className="text-green-300 font-bold">
            ✅ Nom validé ! Citoyen {fullName} prêt à servir l'Ordinateur.
          </p>
        </div>
      )}
    </div>
  );
}