// Étape 8: Équipement et Crédits
import { BASIC_EQUIPMENT } from '../../data/paranoia-tables';
import type { ParanoiaCharacter } from '../../types/paranoia';

interface Step8EquipmentProps {
  character: Partial<ParanoiaCharacter>;
}

export default function Step8Equipment({ character }: Step8EquipmentProps) {
  const credits = character.credits ?? 100;

  return (
    <div className="space-y-6">
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Équipement de Base :</h3>
        <p className="text-red-400">
          Tout Clarificateur d'Accréditation ROUGE reçoit l'équipement standard 
          et 100 crédits pour ses frais personnels.
        </p>
      </div>

      <div className="bg-green-900/30 border border-green-600 rounded-lg p-4">
        <h3 className="font-bold text-green-300 mb-4">✅ Équipement Standard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {BASIC_EQUIPMENT.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-green-400">
              <span className="text-green-300">•</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black border border-red-600 rounded-lg p-4 text-center">
        <h3 className="font-bold text-red-300 mb-2">Crédits Disponibles</h3>
        <div className="text-4xl font-bold text-green-300">{credits} ¢</div>
        <p className="text-red-400 text-sm mt-2">
          Gardez vos crédits pour les amendes inévitables !
        </p>
      </div>
    </div>
  );
}