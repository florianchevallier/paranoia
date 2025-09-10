// Étape 4: Déterminer le Service
import { useState, useEffect } from 'react';
import { TableRoller } from '../DiceRoller';
import { SERVICES } from '../../data/paranoia-tables';
import type { DiceRoll, ParanoiaCharacter } from '../../types/paranoia';

interface Step4ServiceProps {
  character: Partial<ParanoiaCharacter>;
  updateService: (serviceId: number) => void;
  addRoll: (roll: DiceRoll) => void;
  updateCharacter: (updates: Partial<ParanoiaCharacter>) => void;
}

export default function Step4Service({ character, updateService, addRoll, updateCharacter }: Step4ServiceProps) {
  const [rolledValue, setRolledValue] = useState<number | undefined>(character.serviceRoll);

  // Synchroniser l'état local avec les données sauvegardées
  useEffect(() => {
    if (character.serviceRoll !== undefined) {
      setRolledValue(character.serviceRoll);
    }
  }, [character.serviceRoll]);
  
  const handleServiceRoll = (roll: DiceRoll) => {
    addRoll(roll);
    setRolledValue(roll.total);
    
    // Sauvegarder le lancer dans le character pour persistence
    updateCharacter({ serviceRoll: roll.total });
    
    // Mapper le résultat sur les services (1D10 → 8 services avec certains plus probables)
    let serviceId: number;
    
    switch (roll.total) {
      case 1: serviceId = 1; break; // Sécurité Interne
      case 2: serviceId = 2; break; // Services Techniques  
      case 3: case 4: serviceId = 3; break; // PDH&CM (plus probable)
      case 5: serviceId = 4; break; // Forces Armées
      case 6: case 7: serviceId = 5; break; // PLI (plus probable)
      case 8: serviceId = 6; break; // Service de l'Energie
      case 9: serviceId = 7; break; // Recherche et Conception
      case 10: serviceId = 8; break; // Unité Centrale de Traitement
      default: serviceId = 1; break;
    }
    
    updateService(serviceId);
  };

  const selectedService = character.service ? SERVICES.find(s => s.id === character.service!.id) : undefined;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Détermination du Service :</h3>
        <p className="text-red-400 mb-3">
          Votre Service est votre corps de métier officiel. Il détermine votre formation 
          et votre rôle dans le Complexe Alpha.
        </p>
        <p className="text-sm text-red-500">
          Lancez 1D10 et consultez le tableau ci-dessous pour connaître votre affectation.
        </p>
      </div>

      {/* Lancer de dés */}
      <div className="bg-black/50 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-200 mb-4">Lancer pour le Service</h4>
        <TableRoller
          tableType="service"
          onRoll={handleServiceRoll}
          value={rolledValue}
          disabled={!!character.service}
        />
      </div>

      {/* Tableau des services */}
      <div className="bg-black border border-red-600 rounded-lg overflow-hidden">
        <div className="bg-red-900 p-4">
          <h3 className="font-bold text-red-100 text-lg text-center">
            Table des Services (1D10)
          </h3>
        </div>
        
        <div className="divide-y divide-red-800">
          <div className="p-4 bg-red-950/30 grid grid-cols-4 gap-4 font-bold text-red-300 text-sm">
            <div>Résultat</div>
            <div>Service</div>
            <div>Description</div>
            <div>Compétences</div>
          </div>
          
          <div className="p-2 text-xs text-red-500">1</div>
          <div className={`p-4 ${selectedService?.id === 1 ? 'bg-green-900/50 border-l-4 border-green-500' : ''}`}>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-red-200">1</div>
              <div className="font-bold text-red-100">Sécurité Interne</div>
              <div className="text-red-400">La police secrète, crainte de tous</div>
              <div className="text-red-300">Activités de Base</div>
            </div>
          </div>

          <div className={`p-4 ${selectedService?.id === 2 ? 'bg-green-900/50 border-l-4 border-green-500' : ''}`}>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-red-200">2</div>
              <div className="font-bold text-red-100">Services Techniques</div>
              <div className="text-red-400">Les réparateurs et ingénieurs</div>
              <div className="text-red-300">Services Techniques</div>
            </div>
          </div>

          <div className={`p-4 ${selectedService?.id === 3 ? 'bg-green-900/50 border-l-4 border-green-500' : ''}`}>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-red-200">3-4</div>
              <div className="font-bold text-red-100">PDH&amp;CM</div>
              <div className="text-red-400">Bureaucrates et psychologues</div>
              <div className="text-red-300">Développement Personnel</div>
            </div>
          </div>

          <div className={`p-4 ${selectedService?.id === 4 ? 'bg-green-900/50 border-l-4 border-green-500' : ''}`}>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-red-200">5</div>
              <div className="font-bold text-red-100">Forces Armées</div>
              <div className="text-red-400">Les militaires</div>
              <div className="text-red-300">Activités de Base OU Véhiculaires OU Environnement</div>
            </div>
          </div>

          <div className={`p-4 ${selectedService?.id === 5 ? 'bg-green-900/50 border-l-4 border-green-500' : ''}`}>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-red-200">6-7</div>
              <div className="font-bold text-red-100">PLI</div>
              <div className="text-red-400">Gèrent nourriture et matériel</div>
              <div className="text-red-300">Services Techniques OU Véhiculaires</div>
            </div>
          </div>

          <div className={`p-4 ${selectedService?.id === 6 ? 'bg-green-900/50 border-l-4 border-green-500' : ''}`}>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-red-200">8</div>
              <div className="font-bold text-red-100">Service de l'Energie</div>
              <div className="text-red-400">Gèrent réacteurs et transport</div>
              <div className="text-red-300">Services Techniques OU Véhiculaires</div>
            </div>
          </div>

          <div className={`p-4 ${selectedService?.id === 7 ? 'bg-green-900/50 border-l-4 border-green-500' : ''}`}>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-red-200">9</div>
              <div className="font-bold text-red-100">Recherche et Conception</div>
              <div className="text-red-400">Les scientifiques fous</div>
              <div className="text-red-300">Services Techniques</div>
            </div>
          </div>

          <div className={`p-4 ${selectedService?.id === 8 ? 'bg-green-900/50 border-l-4 border-green-500' : ''}`}>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-red-200">10</div>
              <div className="font-bold text-red-100">Unité Centrale de Traitement</div>
              <div className="text-red-400">Assistants directs de l'Ordinateur</div>
              <div className="text-red-300">N'importe quelle catégorie</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service sélectionné */}
      {selectedService && (
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
          <h3 className="font-bold text-green-300 mb-3">✅ Service Assigné</h3>
          <div className="space-y-3">
            <div>
              <span className="font-bold text-green-200 text-lg">{selectedService.name}</span>
              <p className="text-green-400 mt-1">{selectedService.description}</p>
            </div>
            
            <div>
              <span className="font-bold text-green-300">Catégories de compétences autorisées:</span>
              <div className="mt-1">
                {selectedService.competencyCategories.map((category, index) => (
                  <span key={index} className="inline-block bg-green-800 text-green-200 px-2 py-1 rounded text-sm mr-2 mb-1">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Informations sur les services */}
      <div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-300 mb-3">Informations sur les Services :</h4>
        <div className="text-sm text-red-400 space-y-2">
          <p>
            <strong>Sécurité Interne :</strong> La police secrète du Complexe. Redoutée de tous, 
            y compris des autres membres de la Sécurité Interne.
          </p>
          <p>
            <strong>PDH&amp;CM :</strong> "Préservation et Développement de l'Habitat et Contrôle Mental". 
            Les bureaucrates qui gèrent la vie quotidienne et la "rééducation".
          </p>
          <p>
            <strong>PLI :</strong> "Production, Logistique et Intendance". Ils contrôlent 
            la nourriture, les ressources et l'équipement. Très corrompus.
          </p>
          <p>
            <strong>Unité Centrale de Traitement :</strong> Les plus proches de l'Ordinateur. 
            Privilégiés mais sous surveillance constante.
          </p>
        </div>
      </div>
    </div>
  );
}
