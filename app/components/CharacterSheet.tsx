// Fiche de personnage finale pour Paranoia
import { useParanoiaCharacter } from '../hooks/useParanoiaCharacter';
import type { ParanoiaCharacter } from '../types/paranoia';

interface CharacterSheetProps {
  character: Partial<ParanoiaCharacter>;
  showSecrets?: boolean;
  onBack: () => void;
}

export default function CharacterSheet({ character, showSecrets = false, onBack }: CharacterSheetProps) {
  const fullName = character.firstName && character.unitCode ? 
    `${character.firstName}-R-${character.unitCode}-1` : 'PERSONNAGE INCOMPLET';

  const attributeSum = character.primaryAttributes ? 
    Object.values(character.primaryAttributes).reduce((sum, val) => sum + val, 0) : 0;

  return (
    <div className="min-h-screen bg-black text-red-400 p-6">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-100">Fiche de Personnage Paranoia</h1>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-bold"
          >
            ← Retour
          </button>
        </div>

        {/* Informations principales */}
        <div className="bg-red-950/30 border border-red-600 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold font-mono text-red-100 tracking-wider">
              {fullName}
            </h2>
            <div className="text-red-300 mt-2">
              Clarificateur d'Accréditation ROUGE
            </div>
          </div>

          {character.service && (
            <div className="text-center">
              <span className="bg-red-600 text-red-100 px-4 py-2 rounded font-bold">
                {character.service.name}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attributs Principaux */}
          <div className="bg-black border border-red-600 rounded-lg p-4">
            <h3 className="font-bold text-red-300 mb-4 text-center">Attributs Principaux</h3>
            {character.primaryAttributes && (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex justify-between">
                  <span>Force:</span>
                  <span className="font-bold text-red-100">{character.primaryAttributes.strength}</span>
                </div>
                <div className="flex justify-between">
                  <span>Endurance:</span>
                  <span className="font-bold text-red-100">{character.primaryAttributes.endurance}</span>
                </div>
                <div className="flex justify-between">
                  <span>Agilité:</span>
                  <span className="font-bold text-red-100">{character.primaryAttributes.agility}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dextérité:</span>
                  <span className="font-bold text-red-100">{character.primaryAttributes.dexterity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Adaptabilité:</span>
                  <span className="font-bold text-red-100">{character.primaryAttributes.adaptability}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aplomb:</span>
                  <span className="font-bold text-red-100">{character.primaryAttributes.aplomb}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mécanique:</span>
                  <span className="font-bold text-red-100">{character.primaryAttributes.mechanics}</span>
                </div>
                <div className="flex justify-between">
                  <span>Indice Pouvoir:</span>
                  <span className="font-bold text-red-100">{character.primaryAttributes.powerIndex}</span>
                </div>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-red-800 text-center">
              <span className="text-red-300">Total: </span>
              <span className="font-bold text-red-100">{attributeSum}</span>
            </div>
          </div>

          {/* Attributs Secondaires */}
          <div className="bg-black border border-red-600 rounded-lg p-4">
            <h3 className="font-bold text-red-300 mb-4 text-center">Modificateurs</h3>
            {character.secondaryAttributes && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Transport:</span>
                  <span className="font-bold text-green-300">{character.secondaryAttributes.transportCapacity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Dommages:</span>
                  <span className="font-bold text-green-300">{character.secondaryAttributes.damageBonus > 0 ? '+' : ''}{character.secondaryAttributes.damageBonus || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Macho:</span>
                  <span className="font-bold text-green-300">{character.secondaryAttributes.machoBonus > 0 ? '+' : ''}{character.secondaryAttributes.machoBonus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mêlée:</span>
                  <span className="font-bold text-green-300">{character.secondaryAttributes.meleeBonus > 0 ? '+' : ''}{character.secondaryAttributes.meleeBonus}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tir:</span>
                  <span className="font-bold text-green-300">{character.secondaryAttributes.rangedBonus > 0 ? '+' : ''}{character.secondaryAttributes.rangedBonus}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Compréhension:</span>
                  <span className="font-bold text-green-300">{character.secondaryAttributes.comprehensionBonus > 0 ? '+' : ''}{character.secondaryAttributes.comprehensionBonus}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Crédibilité:</span>
                  <span className="font-bold text-green-300">{character.secondaryAttributes.credibilityBonus > 0 ? '+' : ''}{character.secondaryAttributes.credibilityBonus}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Réparation:</span>
                  <span className="font-bold text-green-300">{character.secondaryAttributes.repairBonus > 0 ? '+' : ''}{character.secondaryAttributes.repairBonus}%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Équipement et Crédits */}
        <div className="mt-6 bg-black border border-red-600 rounded-lg p-4">
          <h3 className="font-bold text-red-300 mb-4">Équipement et Ressources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-red-200 mb-2">Équipement Standard</h4>
              <div className="text-sm space-y-1">
                {character.equipment?.map((item, index) => (
                  <div key={index} className="text-red-400">• {item}</div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-red-200 mb-2">Crédits</h4>
              <div className="text-3xl font-bold text-green-300">{character.credits || 100} ¢</div>
            </div>
          </div>
        </div>

        {/* Secrets (seulement si révélés) */}
        {showSecrets && (
          <div className="mt-6 bg-red-900 border-2 border-red-500 rounded-lg p-6">
            <h3 className="font-bold text-red-100 mb-4 text-center">
              🚨 INFORMATIONS CLASSIFIÉES 🚨
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pouvoirs Mutants */}
              {character.mutantPowers && character.mutantPowers.length > 0 && (
                <div>
                  <h4 className="font-bold text-red-200 mb-3">Pouvoirs Mutants</h4>
                  <div className="space-y-3">
                    {character.mutantPowers.map((power, index) => (
                      <div key={index} className="bg-red-800/50 rounded p-3">
                        <div className="font-bold text-red-100">
                          {power.name}{power.isLethal ? ' *' : ''}
                        </div>
                        <div className="text-red-300 text-sm mt-1">{power.description}</div>
                        <div className="text-xs text-red-400 mt-1 uppercase">{power.type}</div>
                        {power.isLethal && (
                          <div className="text-xs text-yellow-400 mt-1">
                            * Exécution immédiate si découvert !
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Société Secrète */}
              {character.secretSociety && (
                <div>
                  <h4 className="font-bold text-red-200 mb-3">Société Secrète</h4>
                  <div className="bg-red-800/50 rounded p-3">
                    <div className="font-bold text-red-100">{character.secretSociety.name}</div>
                    <div className="text-red-300 text-sm mt-1">{character.secretSociety.description}</div>
                    <div className="text-red-400 text-xs mt-2">
                      <strong>Objectifs:</strong> {character.secretSociety.objectives}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Famille de Clones */}
        <div className="mt-6 bg-black border border-red-600 rounded-lg p-4">
          <h3 className="font-bold text-red-300 mb-4 text-center">Famille de Clones</h3>
          <div className="grid grid-cols-6 gap-2">
            {character.clones?.map((clone) => (
              <div
                key={clone.number}
                className={`text-center p-3 rounded border ${
                  clone.isActive 
                    ? 'bg-green-900/50 border-green-600 text-green-300'
                    : clone.deathReason
                      ? 'bg-red-900/50 border-red-600 text-red-400'
                      : 'bg-gray-900/50 border-gray-600 text-gray-400'
                }`}
              >
                <div className="font-bold">{clone.number}</div>
                <div className="text-xs">
                  {clone.isActive ? 'Actuel' : clone.deathReason ? 'Mort' : 'Prêt'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pied de page */}
        <div className="mt-6 text-center text-red-600 text-sm">
          <p>L'Ordinateur est votre ami. L'Ordinateur veut que vous soyez heureux.</p>
          <p>Le bonheur est obligatoire. Servez bien.</p>
        </div>
      </div>
    </div>
  );
}