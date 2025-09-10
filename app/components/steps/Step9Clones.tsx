// Étape 9: La Famille de Clones
import type { ParanoiaCharacter } from '../../types/paranoia';

interface Step9ClonesProps {
  character: Partial<ParanoiaCharacter>;
}

export default function Step9Clones({ character }: Step9ClonesProps) {
  
  const clones = character.clones || Array.from({ length: 6 }, (_, i) => ({
    number: i + 1,
    isActive: i === 0,
    deathReason: undefined
  }));

  const fullName = character.firstName && character.unitCode ? 
    `${character.firstName}-R-${character.unitCode}` : 'PERSONNAGE-R-XXX';

  return (
    <div className="space-y-6">
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Système de Clones :</h3>
        <p className="text-red-400 mb-3">
          Votre personnage est le premier d'une série de 6 clones identiques. 
          Si vous mourrez, le clone suivant prendra automatiquement la relève.
        </p>
        <p className="text-sm text-red-500">
          Chaque nouveau clone arrive avec les mêmes attributs et capacités de base, 
          mais sans l'expérience acquise par son prédécesseur.
        </p>
      </div>

      <div className="bg-black border border-red-600 rounded-lg overflow-hidden">
        <div className="bg-red-900 p-4">
          <h3 className="font-bold text-red-100 text-lg text-center">
            Famille de Clones - {fullName}
          </h3>
        </div>
        
        <div className="divide-y divide-red-800">
          {clones.map((clone) => (
            <div 
              key={clone.number} 
              className={`p-4 flex items-center justify-between ${
                clone.isActive ? 'bg-green-900/30' : clone.deathReason ? 'bg-red-900/30' : 'bg-gray-900/30'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="font-bold text-2xl font-mono">
                  {clone.isActive && <span className="text-green-300">→ </span>}
                  <span className={clone.isActive ? 'text-green-200' : clone.deathReason ? 'text-red-400' : 'text-gray-400'}>
                    {fullName}-{clone.number}
                  </span>
                </div>
                
                <div className="text-sm">
                  {clone.isActive && (
                    <span className="bg-green-700 text-green-200 px-2 py-1 rounded uppercase font-bold">
                      Actuel
                    </span>
                  )}
                  {clone.deathReason && (
                    <span className="bg-red-700 text-red-200 px-2 py-1 rounded uppercase">
                      Terminé
                    </span>
                  )}
                  {!clone.isActive && !clone.deathReason && (
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded uppercase">
                      En Attente
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-right text-sm">
                {clone.isActive && (
                  <div className="text-green-400">
                    Clone actif
                  </div>
                )}
                {clone.deathReason && (
                  <div className="text-red-400">
                    Cause: {clone.deathReason}
                  </div>
                )}
                {!clone.isActive && !clone.deathReason && (
                  <div className="text-gray-500">
                    Prêt à servir
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-900/50 border border-yellow-600 rounded-lg p-4">
        <h4 className="font-bold text-yellow-300 mb-3">⚠️ Important - Activation des Clones :</h4>
        <div className="text-sm text-yellow-400 space-y-2">
          <p>
            <strong>Nouvelle activation :</strong> Quand un clone meurt, le suivant est automatiquement 
            activé par le centre de clonage et arrive sur les lieux dans les plus brefs délais.
          </p>
          <p>
            <strong>Mémoire :</strong> Le nouveau clone conserve seulement les souvenirs jusqu'au moment 
            du dernier "backup" neuronal (généralement quelques jours avant la mort).
          </p>
          <p>
            <strong>Équipement :</strong> Chaque nouveau clone reçoit l'équipement de base standard, 
            mais pas l'équipement spécial acquis par son prédécesseur.
          </p>
          <p>
            <strong>Relations :</strong> Les autres personnages peuvent remarquer des "changements" 
            subtils de personnalité entre les clones.
          </p>
        </div>
      </div>

      <div className="bg-red-950/30 border border-red-700 rounded-lg p-4">
        <h4 className="font-bold text-red-300 mb-3">Conseils de Survie pour Clones :</h4>
        <div className="text-sm text-red-400 space-y-2">
          <p>
            <strong>Préservation :</strong> Essayez de garder vos clones en vie le plus longtemps possible. 
            Six morts = game over définitif !
          </p>
          <p>
            <strong>Apprentissage :</strong> Chaque clone peut apprendre des erreurs du précédent... 
            s'il découvre ce qui l'a tué.
          </p>
          <p>
            <strong>Continuité :</strong> Maintenez la cohérence de votre personnage même après 
            changement de clone. Les autres ne doivent pas s'en apercevoir.
          </p>
          <p>
            <strong>Paranoïa :</strong> Si un clone précédent avait des ennemis, le nouveau les hérite. 
            Méfiance permanente recommandée.
          </p>
        </div>
      </div>

      <div className="text-center p-4 bg-green-900/50 border border-green-600 rounded-lg">
        <p className="text-green-300 font-bold">
          ✅ Famille de clones configurée ! 6 vies à votre disposition.
        </p>
        <p className="text-green-400 text-sm mt-2">
          Servez l'Ordinateur avec fierté... et prudence.
        </p>
      </div>
    </div>
  );
}