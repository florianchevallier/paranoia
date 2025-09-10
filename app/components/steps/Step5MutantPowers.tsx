// Étape 5: Déterminer le(s) Pouvoir(s) Mutant(s) - SECRET
import { useState, useEffect } from 'react';
import { TableRoller } from '../DiceRoller';
import { NORMAL_MUTANT_POWERS, EXCEPTIONAL_MUTANT_POWERS } from '../../data/paranoia-tables';
import { calculateMutantPowerCount } from '../../utils/dice';
import type { DiceRoll, ParanoiaCharacter } from '../../types/paranoia';

interface Step5MutantPowersProps {
  showSecrets?: boolean;
  character: Partial<ParanoiaCharacter>;
  updateMutantPowers: (powerIds: number[]) => void;
  addRoll: (roll: DiceRoll) => void;
  updateCharacter: (updates: Partial<ParanoiaCharacter>) => void;
}

export default function Step5MutantPowers({ showSecrets = false, character, updateMutantPowers, addRoll, updateCharacter }: Step5MutantPowersProps) {
  
  // Récupérer les lancers depuis le character s'ils existent
  const savedRolls = character.mutantPowerRolls || [];
  const [rolls, setRolls] = useState<{ type: string; value: number }[]>(savedRolls);
  
  // Synchroniser l'état local avec les données sauvegardées
  useEffect(() => {
    if (character.mutantPowerRolls) {
      setRolls(character.mutantPowerRolls);
    }
  }, [character.mutantPowerRolls]);
  
  const primaryAttributes = character.primaryAttributes;
  const attributeSum = primaryAttributes ? Object.values(primaryAttributes).reduce((sum, val) => sum + val, 0) : 0;
  const powerCount = calculateMutantPowerCount(attributeSum);

  const handlePowerRoll = (roll: DiceRoll) => {
    addRoll(roll);
    
    // Déterminer le type de pouvoir basé sur l'ordre des lancers
    const currentRolls = [...rolls];
    let powerType: string;
    
    if (powerCount === 1) {
      powerType = 'normal';
    } else if (powerCount === 2) {
      powerType = currentRolls.length === 0 ? 'normal' : 'exceptional';
    } else { // powerCount === 3
      if (currentRolls.length === 0 || currentRolls.length === 1) {
        powerType = 'normal';
      } else {
        powerType = 'exceptional';
      }
    }
    
    const newRoll = { type: powerType, value: roll.total };
    const newRolls = [...currentRolls, newRoll];
    setRolls(newRolls);
    
    // Sauvegarder les lancers dans le character pour persistence
    updateCharacter({ mutantPowerRolls: newRolls });
    
    // Convertir les lancers en IDs de pouvoirs
    const powerIds = newRolls.map(r => {
      if (r.type === 'normal') {
        // Pour les pouvoirs normaux, mapper 1-100 sur les indices des pouvoirs normaux
        const index = Math.min(r.value - 1, NORMAL_MUTANT_POWERS.length - 1);
        return NORMAL_MUTANT_POWERS[index].id;
      } else {
        // Pour les pouvoirs exceptionnels, mapper 1-100 sur les indices des pouvoirs exceptionnels  
        const index = Math.min(r.value - 1, EXCEPTIONAL_MUTANT_POWERS.length - 1);
        return EXCEPTIONAL_MUTANT_POWERS[index].id;
      }
    });
    
    updateMutantPowers(powerIds);
  };

  const needsMoreRolls = rolls.length < powerCount;
  const currentPowers = character.mutantPowers || [];

  if (!primaryAttributes) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          ⚠️ Les attributs principaux doivent d'abord être déterminés à l'étape 2.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Avertissement SECRET */}
      {!showSecrets && (
        <div className="bg-red-900 border-2 border-red-500 rounded-lg p-6 text-center">
          <div className="text-3xl mb-3">🚨 INFORMATION CLASSIFIÉE 🚨</div>
          <div className="text-xl font-bold text-red-100 mb-3">
            POSSESSION DE POUVOIRS MUTANTS = HAUTE TRAHISON
          </div>
          <div className="text-red-300">
            Cette information doit rester STRICTEMENT SECRÈTE !<br/>
            Ne la révélez JAMAIS aux autres joueurs ou personnages.
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Détermination des Pouvoirs Mutants :</h3>
        <p className="text-red-400 mb-3">
          Basé sur votre somme d'attributs ({attributeSum}), vous aurez {powerCount} pouvoir(s) mutant(s).
        </p>
        <div className="text-sm text-red-500 space-y-1">
          {powerCount === 1 && <p>• 1 pouvoir NORMAL (1D100 sur Table 3.5.1)</p>}
          {powerCount === 2 && (
            <>
              <p>• 1 pouvoir NORMAL (1D100 sur Table 3.5.1)</p>
              <p>• 1 pouvoir EXCEPTIONNEL (1D100 sur Table 3.5.2)</p>
            </>
          )}
          {powerCount === 3 && (
            <>
              <p>• 2 pouvoirs NORMAUX (2x 1D100 sur Table 3.5.1)</p>
              <p>• 1 pouvoir EXCEPTIONNEL (1D100 sur Table 3.5.2)</p>
            </>
          )}
        </div>
      </div>

      {/* Lancers de dés pour les pouvoirs */}
      {needsMoreRolls && (
        <div className="bg-black/50 border border-red-700 rounded-lg p-4">
          <h4 className="font-bold text-red-200 mb-4">
            Lancer #{rolls.length + 1} pour {powerCount === 1 ? 'Pouvoir Normal' : 
              (powerCount === 2 ? (rolls.length === 0 ? 'Pouvoir Normal' : 'Pouvoir Exceptionnel') :
              (rolls.length < 2 ? 'Pouvoir Normal' : 'Pouvoir Exceptionnel'))}
          </h4>
          <TableRoller
            tableType="mutant-power"
            onRoll={handlePowerRoll}
          />
        </div>
      )}

      {/* Historique des lancers */}
      {rolls.length > 0 && (
        <div className="bg-black border border-red-600 rounded-lg p-4">
          <h4 className="font-bold text-red-200 mb-3">Lancers Effectués:</h4>
          <div className="space-y-2">
            {rolls.map((roll, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-red-900/30 rounded">
                <span className="text-red-300">Lancer #{index + 1} ({roll.type}):</span>
                <span className="font-mono text-red-100 font-bold">{roll.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pouvoirs déterminés */}
      {currentPowers.length > 0 && (
        <div className={`border rounded-lg p-4 ${showSecrets ? 'bg-green-900/30 border-green-600' : 'bg-yellow-900/50 border-yellow-600'}`}>
          <h3 className="font-bold mb-3 ${showSecrets ? 'text-green-300' : 'text-yellow-300'}">
            {showSecrets ? '✅ Pouvoirs Mutants Déterminés' : '🔒 Pouvoirs Secrets'}
          </h3>
          
          {showSecrets ? (
            <div className="space-y-4">
              {currentPowers.map((power, index) => (
                <div key={index} className="border border-green-700 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-bold text-green-200 text-lg">
                      {power.name}{power.isLethal ? ' *' : ''}
                    </div>
                    <div className="text-xs bg-green-800 text-green-200 px-2 py-1 rounded uppercase">
                      {power.type}
                    </div>
                  </div>
                  <p className="text-green-400 text-sm">{power.description}</p>
                  {power.isLethal && (
                    <div className="mt-2 text-xs text-red-400">
                      <strong>* ATTENTION :</strong> Ce pouvoir causera votre exécution immédiate s'il est découvert !
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🔒</div>
              <div className="text-yellow-300 font-bold">
                Pouvoirs secrets déterminés
              </div>
              <div className="text-yellow-400 text-sm mt-2">
                {currentPowers.length} pouvoir(s) assigné(s)<br/>
                Activez le mode MJ pour les révéler
              </div>
            </div>
          )}
        </div>
      )}

      {/* Exemples de pouvoirs (pour information) */}
      <div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-300 mb-3">Exemples de Pouvoirs Mutants :</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-400">
          <div>
            <div className="font-bold text-red-300 mb-2">Pouvoirs Normaux :</div>
            <ul className="space-y-1 text-xs">
              <li>• Adhérence - Coller aux surfaces</li>
              <li>• Camouflage - Se fondre dans l'environnement</li>
              <li>• Télépathie - Lire dans les pensées *</li>
              <li>• Régénération - Guérir rapidement</li>
              <li>• Vision nocturne - Voir dans le noir</li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-red-300 mb-2">Pouvoirs Exceptionnels :</div>
            <ul className="space-y-1 text-xs">
              <li>• Contrôle des Machines - Commander aux robots *</li>
              <li>• Duplication - Créer des copies de soi *</li>
              <li>• Invulnérabilité Partielle - Résister aux dégâts</li>
              <li>• Contrôle du Temps - Manipuler le temps</li>
              <li>• Téléportation - Se déplacer instantanément</li>
            </ul>
          </div>
        </div>
        <div className="mt-3 text-xs text-red-600">
          <strong>* Pouvoirs marqués d'une astérisque :</strong> Causent l'exécution immédiate si découverts !
        </div>
      </div>

      {/* Rappel de sécurité */}
      <div className="bg-red-800/50 border border-red-500 rounded-lg p-4">
        <h4 className="font-bold text-red-200 mb-2">🛡️ PROTOCOLES DE SÉCURITÉ :</h4>
        <div className="text-sm text-red-300 space-y-1">
          <p>1. Ne révélez JAMAIS vos pouvoirs aux autres joueurs ou personnages</p>
          <p>2. Utilisez vos pouvoirs discrètement et seulement en cas d'absolue nécessité</p>
          <p>3. Si quelqu'un découvre vos pouvoirs, éliminez-le ou fuyez immédiatement</p>
          <p>4. Méfiez-vous des détecteurs de mutants et des tests de dépistage</p>
          <p>5. Restez loyal envers l'Ordinateur... en apparence</p>
        </div>
      </div>
    </div>
  );
}