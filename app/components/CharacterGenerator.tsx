// Composant principal du générateur de personnage Paranoia
import { useState } from 'react';
import { useParanoiaCharacter } from '../hooks/useParanoiaCharacter';
import Step1Name from './steps/Step1Name';
import Step2PrimaryAttributes from './steps/Step2PrimaryAttributes';
import Step3SecondaryAttributes from './steps/Step3SecondaryAttributes';
import Step4Service from './steps/Step4Service';
import Step5MutantPowers from './steps/Step5MutantPowers';
import Step6SecretSociety from './steps/Step6SecretSociety';
import Step7Skills from './steps/Step7Skills';
import Step8Equipment from './steps/Step8Equipment';
import Step9Clones from './steps/Step9Clones';
import CharacterSheet from './CharacterSheet';
import { DiceHistoryDisplay } from './DiceRoller';

const STEP_TITLES = [
  { number: 1, title: "Nommer le Personnage", description: "Prénom - R - Code d'Unité - Numéro de Clone" },
  { number: 2, title: "Déterminer les Attributs Principaux", description: "8 attributs avec les dés spécifiés" },
  { number: 3, title: "Déterminer les Attributs Secondaires", description: "Modificateurs calculés automatiquement" },
  { number: 4, title: "Déterminer le Service", description: "Corps de métier officiel (1D10)" },
  { number: 5, title: "Déterminer le(s) Pouvoir(s) Mutant(s)", description: "SECRET - Pouvoir(s) basé(s) sur les attributs" },
  { number: 6, title: "Déterminer la Société Secrète", description: "SECRET - Affiliation clandestine (1D100)" },
  { number: 7, title: "Choisir et Calculer les Compétences", description: "Répartir 6 points de compétence" },
  { number: 8, title: "Équipement et Crédits", description: "Matériel de base + 100 crédits" },
  { number: 9, title: "La Famille de Clones", description: "6 clones identiques prêts à servir" }
];

interface CharacterGeneratorProps {
  className?: string;
}

export default function CharacterGenerator({ className = "" }: CharacterGeneratorProps) {
  const {
    character,
    rollHistory,
    nextStep,
    previousStep,
    goToStep,
    isStepComplete,
    isCharacterComplete,
    resetCharacter,
    exportCharacter,
    importCharacter,
    updateCharacter,
    addRoll,
    updateName,
    updatePrimaryAttributes,
    updateService,
    updateMutantPowers,
    determineMutantPowers,
    updateSecretSociety,
    updateSkills
  } = useParanoiaCharacter();

  const [showSecrets, setShowSecrets] = useState(false); // Pour le MJ uniquement
  const [showHistory, setShowHistory] = useState(false);
  const [showCharacterSheet, setShowCharacterSheet] = useState(false);

  const currentStep = character.currentStep || 1;
  const currentStepInfo = STEP_TITLES.find(s => s.number === currentStep);

  // Gestion de l'export/import
  const handleExport = () => {
    const data = exportCharacter();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.firstName || 'personnage'}-paranoia.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (importCharacter(content)) {
          alert('Personnage importé avec succès !');
        } else {
          alert('Erreur lors de l\'importation du fichier.');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = '';
  };

  const renderCurrentStep = () => {
    // Passer les props du hook aux composants Step
    const stepProps = {
      character,
      updateCharacter,
      addRoll,
      updateName,
      updatePrimaryAttributes,
      updateService,
      updateMutantPowers,
      determineMutantPowers,
      updateSecretSociety,
      updateSkills
    };

    switch (currentStep) {
      case 1: return <Step1Name {...stepProps} />;
      case 2: return <Step2PrimaryAttributes {...stepProps} />;
      case 3: return <Step3SecondaryAttributes {...stepProps} />;
      case 4: return <Step4Service {...stepProps} />;
      case 5: return <Step5MutantPowers {...stepProps} showSecrets={showSecrets} />;
      case 6: return <Step6SecretSociety {...stepProps} showSecrets={showSecrets} />;
      case 7: return <Step7Skills {...stepProps} />;
      case 8: return <Step8Equipment {...stepProps} />;
      case 9: return <Step9Clones {...stepProps} />;
      default: return <div>Étape inconnue</div>;
    }
  };

  if (showCharacterSheet) {
    return (
      <div className={`character-generator ${className}`}>
        <CharacterSheet 
          character={character}
          showSecrets={showSecrets}
          onBack={() => setShowCharacterSheet(false)}
        />
      </div>
    );
  }

  return (
    <div className={`character-generator min-h-screen bg-black text-red-400 ${className}`}>
      {/* En-tête thématique Paranoia */}
      <header className="bg-red-900 text-red-100 p-6 border-b-4 border-red-600">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold uppercase tracking-wide mb-2">
            🎲 Générateur de Personnage PARANOIA
          </h1>
          <p className="text-red-300 text-lg">
            Clarificateur d'Accréditation ROUGE - Prêt à servir l'Ordinateur
          </p>
          <p className="text-red-400 text-sm mt-2">
            L'Ordinateur est votre ami. L'Ordinateur veut que vous soyez heureux.
          </p>
        </div>
      </header>

      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Barre de progression et navigation */}
        <aside className="lg:col-span-1">
          {/* Progression */}
          <div className="bg-red-950/50 border border-red-600 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-300 mb-4">Progression</h3>
            <div className="space-y-2">
              {STEP_TITLES.map((step) => {
                const isComplete = isStepComplete(step.number);
                const isCurrent = step.number === currentStep;
                
                return (
                  <button
                    key={step.number}
                    onClick={() => goToStep(step.number)}
                    className={`
                      w-full text-left p-2 rounded text-sm transition-all
                      ${isCurrent 
                        ? 'bg-red-600 text-white font-bold' 
                        : isComplete
                          ? 'bg-green-900 text-green-300 hover:bg-green-800'
                          : 'bg-red-900/30 text-red-500 hover:bg-red-900/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{step.number}.</span>
                      {isComplete && <span className="text-green-400">✓</span>}
                      {isCurrent && <span className="text-yellow-400">→</span>}
                      <span className="flex-1">{step.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contrôles */}
          <div className="bg-red-950/50 border border-red-600 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-300 mb-4">Contrôles</h3>
            <div className="space-y-2">
              {/* Toggle secrets pour MJ */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showSecrets}
                  onChange={(e) => setShowSecrets(e.target.checked)}
                  className="accent-red-600"
                />
                <span>Mode MJ (révéler secrets)</span>
              </label>

              {/* Toggle historique */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showHistory}
                  onChange={(e) => setShowHistory(e.target.checked)}
                  className="accent-red-600"
                />
                <span>Afficher historique des dés</span>
              </label>

              {/* Boutons d'action */}
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => setShowCharacterSheet(true)}
                  disabled={!isCharacterComplete()}
                  className={`
                    w-full px-3 py-2 rounded font-bold uppercase text-sm
                    ${isCharacterComplete()
                      ? 'bg-green-600 hover:bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Fiche Complète
                </button>

                <button
                  onClick={handleExport}
                  className="w-full px-3 py-2 rounded font-bold uppercase text-sm bg-blue-600 hover:bg-blue-500 text-white"
                >
                  Exporter
                </button>

                <label className="block">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                  <div className="w-full px-3 py-2 rounded font-bold uppercase text-sm bg-purple-600 hover:bg-purple-500 text-white text-center cursor-pointer">
                    Importer
                  </div>
                </label>

                <button
                  onClick={resetCharacter}
                  className="w-full px-3 py-2 rounded font-bold uppercase text-sm bg-red-700 hover:bg-red-600 text-white"
                >
                  Recommencer
                </button>
              </div>
            </div>
          </div>

          {/* Historique des dés */}
          {showHistory && (
            <DiceHistoryDisplay maxItems={10} showDetails={true} />
          )}
        </aside>

        {/* Contenu principal */}
        <main className="lg:col-span-3">
          {/* En-tête de l'étape actuelle */}
          <div className="bg-red-950/30 border border-red-600 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-red-200">
                Étape {currentStep}: {currentStepInfo?.title}
              </h2>
              <div className="text-sm text-red-400">
                {currentStep}/9
              </div>
            </div>
            <p className="text-red-400">
              {currentStepInfo?.description}
            </p>
            
            {/* Avertissement pour les étapes secrètes */}
            {(currentStep === 5 || currentStep === 6) && !showSecrets && (
              <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-600 rounded">
                <p className="text-yellow-300 text-sm font-bold">
                  ⚠️ ATTENTION: Cette information doit rester SECRÈTE !
                </p>
                <p className="text-yellow-400 text-xs">
                  Ne révélez jamais votre {currentStep === 5 ? 'pouvoir mutant' : 'société secrète'} aux autres joueurs.
                </p>
              </div>
            )}
          </div>

          {/* Contenu de l'étape */}
          <div className="bg-black border border-red-600 rounded-lg p-6">
            {renderCurrentStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={previousStep}
              disabled={currentStep <= 1}
              className={`
                px-6 py-3 rounded font-bold uppercase
                ${currentStep <= 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white'
                }
              `}
            >
              ← Étape Précédente
            </button>

            <div className="text-center">
              <div className="text-sm text-red-400">
                Étape complétée: {isStepComplete(currentStep) ? '✅' : '❌'}
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep >= 9 || !isStepComplete(currentStep)}
              className={`
                px-6 py-3 rounded font-bold uppercase
                ${(currentStep >= 9 || !isStepComplete(currentStep))
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-500 text-white'
                }
              `}
            >
              Étape Suivante →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}