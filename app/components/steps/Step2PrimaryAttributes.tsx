// Étape 2: Déterminer les Attributs Principaux
import { AttributeRoller } from '../DiceRoller';
import type { DiceRoll, PrimaryAttributes, ParanoiaCharacter } from '../../types/paranoia';

const ATTRIBUTE_INFO = {
  strength: {
    name: "Force",
    description: "Puissance physique brute. Influence les dégâts au corps à corps et la capacité de transport.",
    diceType: "1D10+8",
    range: "9-18"
  },
  endurance: {
    name: "Endurance", 
    description: "Résistance à la douleur, aux blessures et à la fatigue.",
    diceType: "1D10+8",
    range: "9-18"
  },
  agility: {
    name: "Agilité",
    description: "Coordination, équilibre, vitesse et esquive. Influence le combat au corps à corps.",
    diceType: "2D10",
    range: "2-20"
  },
  dexterity: {
    name: "Dextérité",
    description: "Habileté manuelle, précision. Influence le combat avec les armes de tir.",
    diceType: "2D10", 
    range: "2-20"
  },
  adaptability: {
    name: "Adaptabilité",
    description: "Capacité à comprendre des concepts nouveaux ou étranges et à remarquer des détails.",
    diceType: "2D10",
    range: "2-20"
  },
  aplomb: {
    name: "Aplomb",
    description: "Charisme, confiance en soi, et surtout, l'art de mentir et de manipuler.",
    diceType: "2D10",
    range: "2-20"
  },
  mechanics: {
    name: "Sens de la Mécanique",
    description: "Compréhension et utilisation des technologies.",
    diceType: "2D10",
    range: "2-20"
  },
  powerIndex: {
    name: "Indice de Pouvoir",
    description: "La puissance brute de votre pouvoir mutant (gardé secret pour l'instant).",
    diceType: "1D10+5",
    range: "6-15"
  }
};

interface Step2PrimaryAttributesProps {
  character: Partial<ParanoiaCharacter>;
  updatePrimaryAttributes: (attributes: Partial<PrimaryAttributes>) => void;
  addRoll: (roll: DiceRoll) => void;
}

export default function Step2PrimaryAttributes({ character, updatePrimaryAttributes, addRoll }: Step2PrimaryAttributesProps) {
  
  const primaryAttributes = character.primaryAttributes || {} as PrimaryAttributes;

  const handleAttributeRoll = (attribute: string, roll: DiceRoll) => {
    addRoll(roll);
    updatePrimaryAttributes({ [attribute]: roll.total } as Partial<PrimaryAttributes>);
  };

  // Calculer la somme totale des attributs
  const attributeSum = Object.values(primaryAttributes).reduce((sum, val) => sum + (val || 0), 0);
  const allAttributesRolled = Object.keys(ATTRIBUTE_INFO).every(attr => 
    primaryAttributes[attr as keyof PrimaryAttributes] !== undefined
  );

  // Lancer tous les attributs automatiquement
  const rollAllAttributes = () => {
    // Cette fonction pourrait être implémentée pour lancer tous les dés d'un coup
    // Pour l'instant, on encourage l'utilisateur à lancer un par un
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Instructions :</h3>
        <p className="text-red-400 mb-3">
          Lancez les dés pour chacun des 8 attributs principaux selon le type de dé spécifié.
          Ces valeurs définissent les capacités innées de votre personnage.
        </p>
        <div className="text-sm text-red-500">
          <p>• <strong>Force & Endurance :</strong> 1D10+8 (résultat de 9 à 18)</p>
          <p>• <strong>Autres attributs :</strong> 2D10 (résultat de 2 à 20)</p>
          <p>• <strong>Indice de Pouvoir :</strong> 1D10+5 (résultat de 6 à 15)</p>
        </div>
      </div>

      {/* Liste des attributs avec lancers de dés */}
      <div className="space-y-4">
        {Object.entries(ATTRIBUTE_INFO).map(([key, info]) => (
          <div key={key} className="bg-black/50 border border-red-700 rounded-lg p-4">
            <div className="mb-3">
              <h4 className="font-bold text-red-200 text-lg">{info.name}</h4>
              <p className="text-red-400 text-sm">{info.description}</p>
              <p className="text-red-500 text-xs mt-1">
                Dé à lancer: {info.diceType} (valeur de {info.range})
              </p>
            </div>
            
            <AttributeRoller
              attribute={key as keyof PrimaryAttributes}
              value={primaryAttributes[key as keyof PrimaryAttributes]}
              onRoll={handleAttributeRoll}
            />
          </div>
        ))}
      </div>

      {/* Résumé des attributs */}
      {allAttributesRolled && (
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
          <h3 className="font-bold text-green-300 mb-3">✅ Résumé des Attributs</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {Object.entries(ATTRIBUTE_INFO).map(([key, info]) => {
              const value = primaryAttributes[key as keyof PrimaryAttributes];
              return (
                <div key={key} className="text-center">
                  <div className="font-bold text-green-200">{info.name}</div>
                  <div className="text-2xl font-mono text-green-100">{value}</div>
                </div>
              );
            })}
          </div>
          
          <div className="border-t border-green-600 pt-4">
            <div className="text-center">
              <p className="text-green-300 font-bold">
                Somme totale des attributs: {attributeSum}
              </p>
              <div className="mt-2 text-sm text-green-400">
                {attributeSum >= 80 && (
                  <p>→ Total supérieur à 80: Vous aurez 1 pouvoir mutant (normal)</p>
                )}
                {attributeSum >= 65 && attributeSum < 80 && (
                  <p>→ Total 65-79: Vous aurez 2 pouvoirs mutants (1 normal + 1 exceptionnel)</p>
                )}
                {attributeSum < 65 && (
                  <p>→ Total {"<"} 65: Vous aurez 3 pouvoirs mutants (2 normaux + 1 exceptionnel)</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conseils et explications */}
      <div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-300 mb-2">Conseils tactiques :</h4>
        <div className="text-sm text-red-400 space-y-2">
          <p>
            <strong>Force élevée :</strong> Transporter plus d'équipement et infliger plus de dégâts au corps à corps.
            Utile pour les services militaires ou de sécurité.
          </p>
          <p>
            <strong>Endurance élevée :</strong> Résister aux blessures et à la fatigue. 
            Essentiel pour survivre aux "accidents" fréquents dans le Complexe Alpha.
          </p>
          <p>
            <strong>Agilité & Dextérité :</strong> Esquiver les tirs et viser avec précision.
            Critique pour éviter la "terminaison" par des collègues paranoïaques.
          </p>
          <p>
            <strong>Adaptabilité :</strong> Comprendre les situations complexes et remarquer les détails.
            Peut vous éviter de tomber dans des pièges bureaucratiques mortels.
          </p>
          <p>
            <strong>Aplomb :</strong> Mentir de façon convaincante. L'attribut le plus important dans Paranoia !
            Vous aurez besoin de cacher vos secrets en permanence.
          </p>
          <p>
            <strong>Sens de la Mécanique :</strong> Réparer et utiliser la technologie défaillante du Complexe.
            Les machines sont presque aussi dangereuses que les humains.
          </p>
        </div>
      </div>

      {/* Avertissement sur l'Indice de Pouvoir */}
      <div className="bg-yellow-900/50 border border-yellow-600 rounded-lg p-4">
        <h4 className="font-bold text-yellow-300 mb-2">⚠️ ATTENTION - Indice de Pouvoir</h4>
        <p className="text-yellow-400 text-sm">
          L'Indice de Pouvoir détermine la puissance de votre pouvoir mutant. 
          Cette information est <strong>STRICTEMENT CONFIDENTIELLE</strong>. 
          Révéler l'existence de pouvoirs mutants est un acte de haute trahison 
          puni par la vaporisation immédiate !
        </p>
      </div>
    </div>
  );
}