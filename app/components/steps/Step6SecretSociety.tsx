// Étape 6: Déterminer la Société Secrète - SECRET
import { useState, useEffect } from 'react';
import { TableRoller } from '../DiceRoller';
import { SECRET_SOCIETIES } from '../../data/paranoia-tables';
import type { DiceRoll, ParanoiaCharacter } from '../../types/paranoia';

interface Step6SecretSocietyProps {
  showSecrets?: boolean;
  character: Partial<ParanoiaCharacter>;
  updateSecretSociety: (societyId: number) => void;
  addRoll: (roll: DiceRoll) => void;
  updateCharacter: (updates: Partial<ParanoiaCharacter>) => void;
}

export default function Step6SecretSociety({ showSecrets = false, character, updateSecretSociety, addRoll, updateCharacter }: Step6SecretSocietyProps) {
  const [rolledValue, setRolledValue] = useState<number | undefined>(character.secretSocietyRoll);

  // Synchroniser l'état local avec les données sauvegardées
  useEffect(() => {
    if (character.secretSocietyRoll !== undefined) {
      setRolledValue(character.secretSocietyRoll);
    }
  }, [character.secretSocietyRoll]);
  
  const handleSocietyRoll = (roll: DiceRoll) => {
    addRoll(roll);
    setRolledValue(roll.total);
    
    // Sauvegarder le lancer dans le character pour persistence
    updateCharacter({ secretSocietyRoll: roll.total });
    
    // Mapper le résultat sur les sociétés (1-100 réparti sur 10 sociétés)
    const societyIndex = Math.min(Math.floor((roll.total - 1) / 10), SECRET_SOCIETIES.length - 1);
    const society = SECRET_SOCIETIES[societyIndex];
    
    updateSecretSociety(society.id);
  };

  const selectedSociety = character.secretSociety ? 
    SECRET_SOCIETIES.find(s => s.id === character.secretSociety!.id) : undefined;

  return (
    <div className="space-y-6">
      {/* Avertissement SECRET */}
      {!showSecrets && (
        <div className="bg-red-900 border-2 border-red-500 rounded-lg p-6 text-center">
          <div className="text-3xl mb-3">🚨 INFORMATION CLASSIFIÉE 🚨</div>
          <div className="text-xl font-bold text-red-100 mb-3">
            APPARTENANCE À UNE SOCIÉTÉ SECRÈTE = HAUTE TRAHISON
          </div>
          <div className="text-red-300">
            Cette affiliation doit rester STRICTEMENT SECRÈTE !
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Détermination de la Société Secrète :</h3>
        <p className="text-red-400 mb-3">
          Votre société secrète représente vos véritables loyautés, cachées de l'Ordinateur 
          et des autres citoyens.
        </p>
        <p className="text-sm text-red-500">
          Lancez 1D100 sur la Table 3.6.1 pour découvrir votre affiliation clandestine.
        </p>
      </div>

      {/* Lancer de dés */}
      {!character.secretSociety && (
        <div className="bg-black/50 border border-red-700 rounded-lg p-4">
          <h4 className="font-bold text-red-200 mb-4">Lancer pour la Société Secrète</h4>
          <TableRoller
            tableType="secret-society"
            onRoll={handleSocietyRoll}
            value={rolledValue}
          />
        </div>
      )}

      {/* Société déterminée */}
      {selectedSociety && (
        <div className={`border rounded-lg p-4 ${showSecrets ? 'bg-green-900/30 border-green-600' : 'bg-yellow-900/50 border-yellow-600'}`}>
          <h3 className={`font-bold mb-3 ${showSecrets ? 'text-green-300' : 'text-yellow-300'}`}>
            {showSecrets ? '✅ Société Secrète Assignée' : '🔒 Affiliation Secrète'}
          </h3>
          
          {showSecrets ? (
            <div className="space-y-4">
              <div>
                <div className="font-bold text-green-200 text-xl mb-2">
                  {selectedSociety.name}
                </div>
                <p className="text-green-400 mb-3">{selectedSociety.description}</p>
                
                <div className="bg-green-800/30 border border-green-700 rounded p-3">
                  <div className="font-bold text-green-300 mb-1">Objectifs :</div>
                  <p className="text-green-400 text-sm">{selectedSociety.objectives}</p>
                </div>

                {selectedSociety.incompatibleWith && selectedSociety.incompatibleWith.length > 0 && (
                  <div className="mt-3 bg-red-900/30 border border-red-700 rounded p-3">
                    <div className="font-bold text-red-300 mb-1">Incompatible avec :</div>
                    <div className="text-red-400 text-sm">
                      {selectedSociety.incompatibleWith.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🔒</div>
              <div className="text-yellow-300 font-bold">
                Affiliation secrète déterminée
              </div>
              <div className="text-yellow-400 text-sm mt-2">
                Activez le mode MJ pour révéler
              </div>
            </div>
          )}
        </div>
      )}

      {/* Liste des sociétés (information générale) */}
      <div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-300 mb-3">Sociétés Secrètes Connues :</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-400">
          <div className="space-y-2">
            <div><strong className="text-red-300">Communistes :</strong> Égalité pour tous</div>
            <div><strong className="text-red-300">Capitalistes :</strong> Profit et libre marché</div>
            <div><strong className="text-red-300">Anti-Mutant :</strong> Purifier le Complexe</div>
            <div><strong className="text-red-300">Psion :</strong> Libérer les mutants</div>
            <div><strong className="text-red-300">Purge :</strong> Nettoyage par la violence</div>
          </div>
          <div className="space-y-2">
            <div><strong className="text-red-300">FCCC-P :</strong> Milice patriote</div>
            <div><strong className="text-red-300">Romantics :</strong> Retrouver l'humanité</div>
            <div><strong className="text-red-300">Death Leopard :</strong> Culte destructeur</div>
            <div><strong className="text-red-300">Sierra Club :</strong> Écologistes radicaux</div>
            <div><strong className="text-red-300">Illuminati :</strong> Contrôle secret</div>
          </div>
        </div>
      </div>

      {/* Conseils tactiques */}
      <div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-300 mb-3">Conseils de Survie :</h4>
        <div className="text-sm text-red-400 space-y-2">
          <p>
            <strong>Dissimulation :</strong> Votre société secrète est votre véritable loyauté. 
            Gardez-la cachée à tout prix.
          </p>
          <p>
            <strong>Missions secrètes :</strong> Votre société vous donnera des objectifs 
            qui peuvent contredire vos ordres officiels.
          </p>
          <p>
            <strong>Autres traîtres :</strong> Les autres joueurs ont aussi des sociétés secrètes. 
            Méfiez-vous de tout le monde.
          </p>
          <p>
            <strong>Conflit d'intérêts :</strong> Si vos loyautés entrent en conflit, 
            choisissez soigneusement... ou trouvez un moyen créatif de servir deux maîtres.
          </p>
        </div>
      </div>

      {/* Rappel de sécurité */}
      <div className="bg-red-800/50 border border-red-500 rounded-lg p-4">
        <h4 className="font-bold text-red-200 mb-2">🛡️ PROTOCOLES DE SÉCURITÉ :</h4>
        <div className="text-sm text-red-300 space-y-1">
          <p>1. Ne révélez JAMAIS votre société secrète aux autres</p>
          <p>2. Accomplissez discrètement les missions de votre société</p>
          <p>3. Si découvert, niez tout et éliminez les témoins</p>
          <p>4. Servez fidèlement l'Ordinateur... en public</p>
        </div>
      </div>
    </div>
  );
}