// Étape 3: Déterminer les Attributs Secondaires (calculés automatiquement)
import type { ParanoiaCharacter } from '../../types/paranoia';

interface Step3SecondaryAttributesProps {
  character: Partial<ParanoiaCharacter>;
}

export default function Step3SecondaryAttributes({ character }: Step3SecondaryAttributesProps) {
  
  const primaryAttributes = character.primaryAttributes;
  const secondaryAttributes = character.secondaryAttributes;

  if (!primaryAttributes || !secondaryAttributes) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          ⚠️ Les attributs principaux doivent d'abord être déterminés à l'étape 2.
        </div>
        <p className="text-red-400">
          Retournez à l'étape précédente pour lancer les dés des attributs principaux.
        </p>
      </div>
    );
  }

  const attributeMapping = [
    {
      source: 'Force',
      sourceValue: primaryAttributes.strength,
      targets: [
        { name: 'Capacité de Transport', value: secondaryAttributes.transportCapacity, unit: 'kg' },
        { name: 'Bonus aux Dommages', value: secondaryAttributes.damageBonus > 0 ? `+${secondaryAttributes.damageBonus}` : secondaryAttributes.damageBonus || '0' }
      ]
    },
    {
      source: 'Endurance', 
      sourceValue: primaryAttributes.endurance,
      targets: [
        { name: 'Bonus Macho', value: secondaryAttributes.machoBonus > 0 ? `+${secondaryAttributes.machoBonus}` : secondaryAttributes.machoBonus }
      ]
    },
    {
      source: 'Agilité',
      sourceValue: primaryAttributes.agility,
      targets: [
        { name: 'Bonus Mêlée', value: `${secondaryAttributes.meleeBonus > 0 ? '+' : ''}${secondaryAttributes.meleeBonus}%` }
      ]
    },
    {
      source: 'Dextérité',
      sourceValue: primaryAttributes.dexterity, 
      targets: [
        { name: 'Bonus Armes de Tir', value: `${secondaryAttributes.rangedBonus > 0 ? '+' : ''}${secondaryAttributes.rangedBonus}%` }
      ]
    },
    {
      source: 'Adaptabilité',
      sourceValue: primaryAttributes.adaptability,
      targets: [
        { name: 'Bonus Compréhension', value: `${secondaryAttributes.comprehensionBonus > 0 ? '+' : ''}${secondaryAttributes.comprehensionBonus}%` }
      ]
    },
    {
      source: 'Aplomb',
      sourceValue: primaryAttributes.aplomb,
      targets: [
        { name: 'Bonus Crédibilité', value: `${secondaryAttributes.credibilityBonus > 0 ? '+' : ''}${secondaryAttributes.credibilityBonus}%` }
      ]
    },
    {
      source: 'Sens de la Mécanique',
      sourceValue: primaryAttributes.mechanics,
      targets: [
        { name: 'Bonus Réparation', value: `${secondaryAttributes.repairBonus > 0 ? '+' : ''}${secondaryAttributes.repairBonus}%` }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Calcul Automatique :</h3>
        <p className="text-red-400 mb-3">
          Les attributs secondaires sont des modificateurs calculés automatiquement 
          à partir de vos attributs principaux selon la Table 3.3.1 du livret.
        </p>
        <p className="text-sm text-red-500">
          Ces modificateurs s'appliqueront à vos jets de compétences correspondantes.
        </p>
      </div>

      {/* Tableau récapitulatif */}
      <div className="bg-black border border-red-600 rounded-lg overflow-hidden">
        <div className="bg-red-900 p-4">
          <h3 className="font-bold text-red-100 text-lg text-center">
            Modificateurs d'Attributs Secondaires
          </h3>
        </div>
        
        <div className="p-4 space-y-4">
          {attributeMapping.map((mapping, index) => (
            <div key={index} className="border border-red-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-bold text-red-200">
                  {mapping.source}
                </div>
                <div className="text-2xl font-mono text-red-100 bg-red-900/50 px-3 py-1 rounded">
                  {mapping.sourceValue}
                </div>
              </div>
              
              <div className="space-y-2">
                {mapping.targets.map((target, targetIndex) => (
                  <div key={targetIndex} className="flex justify-between items-center text-sm">
                    <span className="text-red-300">→ {target.name}:</span>
                    <span className="font-bold text-green-300">{target.value}{target.unit || ''}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explication des modificateurs */}
      <div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-300 mb-3">Application des Modificateurs :</h4>
        <div className="text-sm text-red-400 space-y-2">
          <p>
            <strong>Bonus Armes de Tir :</strong> S'applique aux compétences "Combat à l'Arme de Tir", 
            "Armes de Véhicules" et "Armes de Tir Primitives".
          </p>
          <p>
            <strong>Bonus Mêlée :</strong> S'applique au "Corps à corps" et aux "Armes de Corps à Corps Primitives".
          </p>
          <p>
            <strong>Bonus Réparation :</strong> S'applique aux "Services Techniques" et "Services Véhiculaires" 
            (sauf armes).
          </p>
          <p>
            <strong>Bonus Compréhension :</strong> S'applique à "Environnement Hostile" (sauf armes).
          </p>
          <p>
            <strong>Bonus Crédibilité :</strong> S'applique au "Développement Personnel" (sauf perfectionnement).
          </p>
          <p>
            <strong>Capacité de Transport :</strong> Poids maximum que vous pouvez porter en kilogrammes.
          </p>
          <p>
            <strong>Bonus aux Dommages :</strong> Dégâts supplémentaires au corps à corps.
          </p>
          <p>
            <strong>Bonus Macho :</strong> Résistance aux effets de certaines blessures et intimidations.
          </p>
        </div>
      </div>

      {/* Validation */}
      <div className="text-center p-4 bg-green-900/50 border border-green-600 rounded-lg">
        <p className="text-green-300 font-bold">
          ✅ Attributs secondaires calculés automatiquement !
        </p>
        <p className="text-green-400 text-sm mt-2">
          Ces modificateurs seront utilisés pour calculer vos pourcentages de compétences à l'étape 7.
        </p>
      </div>
    </div>
  );
}