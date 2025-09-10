import type { Route } from "./+types/generator";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useMemo, useState } from "react";
import { CharacterProvider, useCharacter } from "~/context/CharacterContext";
import { DiceHistoryDisplay } from "~/components/DiceRoller";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Générateur Paranoia - Créer un Personnage" },
    { name: "description", content: "Créez votre Clarificateur d'Accréditation ROUGE pour le JDR Paranoia" },
  ];
}

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

function GeneratorLayoutInner() {
  const location = useLocation();
  const {
    character,
    isStepComplete,
    isCharacterComplete,
    exportCharacter,
    importCharacter,
    resetCharacter,
  } = useCharacter();

  const [showSecrets, setShowSecrets] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const currentStep = useMemo(() => {
    const last = location.pathname.split("/").filter(Boolean).pop();
    const n = Number(last);
    return Number.isFinite(n) && n >= 1 && n <= 9 ? n : 1;
  }, [location.pathname]);

  const currentStepInfo = STEP_TITLES.find(s => s.number === currentStep);

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
    event.target.value = '';
  };

  return (
    <div className="character-generator min-h-screen bg-black text-red-400">
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
        <aside className="lg:col-span-1">
          <div className="bg-red-950/50 border border-red-600 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-300 mb-4">Progression</h3>
            <div className="space-y-2">
              {STEP_TITLES.map((step) => {
                const isComplete = isStepComplete(step.number);
                const isCurrent = step.number === currentStep;
                return (
                  <NavLink
                    key={step.number}
                    to={`/generator/${step.number}`}
                    className={({ isActive }) => `
                      block w-full text-left p-2 rounded text-sm transition-all
                      ${(isActive || isCurrent)
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
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="bg-red-950/50 border border-red-600 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-red-300 mb-4">Contrôles</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={showSecrets} onChange={(e) => setShowSecrets(e.target.checked)} className="accent-red-600" />
                <span>Mode MJ (révéler secrets)</span>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={showHistory} onChange={(e) => setShowHistory(e.target.checked)} className="accent-red-600" />
                <span>Afficher historique des dés</span>
              </label>

              <div className="pt-4 space-y-2">
                <Link
                  to={`/generator/sheet`}
                  onClick={(e) => { if (!isCharacterComplete()) e.preventDefault(); }}
                  className={`
                    block text-center w-full px-3 py-2 rounded font-bold uppercase text-sm
                    ${isCharacterComplete() ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
                  `}
                >
                  Fiche Complète
                </Link>

                <button onClick={handleExport} className="w-full px-3 py-2 rounded font-bold uppercase text-sm bg-blue-600 hover:bg-blue-500 text-white">
                  Exporter
                </button>

                <label className="block">
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                  <div className="w-full px-3 py-2 rounded font-bold uppercase text-sm bg-purple-600 hover:bg-purple-500 text-white text-center cursor-pointer">
                    Importer
                  </div>
                </label>

                <button onClick={resetCharacter} className="w-full px-3 py-2 rounded font-bold uppercase text-sm bg-red-700 hover:bg-red-600 text-white">
                  Recommencer
                </button>
              </div>
            </div>
          </div>

          {showHistory && <DiceHistoryDisplay maxItems={10} showDetails={true} />}
        </aside>

        <main className="lg:col-span-3">
          <div className="bg-red-950/30 border border-red-600 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-red-200">Étape {currentStep}: {currentStepInfo?.title}</h2>
              <div className="text-sm text-red-400">{currentStep}/9</div>
            </div>
            <p className="text-red-400">{currentStepInfo?.description}</p>
            {(currentStep === 5 || currentStep === 6) && !showSecrets && (
              <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-600 rounded">
                <p className="text-yellow-300 text-sm font-bold">⚠️ ATTENTION: Cette information doit rester SECRÈTE !</p>
                <p className="text-yellow-400 text-xs">Ne révélez jamais votre {currentStep === 5 ? 'pouvoir mutant' : 'société secrète'} aux autres joueurs.</p>
              </div>
            )}
          </div>

          <div className="bg-black border border-red-600 rounded-lg p-6">
            {/* Pass showSecrets to child via context bridge (render prop pattern) */}
            <Outlet context={{ showSecrets }} />
          </div>

          <div className="flex justify-between items-center mt-6">
            {currentStep > 1 ? (
              <Link to={`/generator/${currentStep - 1}`} className="px-6 py-3 rounded font-bold uppercase bg-red-600 hover:bg-red-500 text-white">← Étape Précédente</Link>
            ) : (
              <button disabled className="px-6 py-3 rounded font-bold uppercase bg-gray-700 text-gray-500 cursor-not-allowed">← Étape Précédente</button>
            )}

            <div className="text-center">
              <div className="text-sm text-red-400">Étape complétée: {isStepComplete(currentStep) ? '✅' : '❌'}</div>
            </div>

            {currentStep < 9 && isStepComplete(currentStep) ? (
              <Link to={`/generator/${currentStep + 1}`} className="px-6 py-3 rounded font-bold uppercase bg-red-600 hover:bg-red-500 text-white">Étape Suivante →</Link>
            ) : (
              <button disabled className="px-6 py-3 rounded font-bold uppercase bg-gray-700 text-gray-500 cursor-not-allowed">Étape Suivante →</button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function GeneratorLayout() {
  return (
    <CharacterProvider>
      <GeneratorLayoutInner />
    </CharacterProvider>
  );
}
