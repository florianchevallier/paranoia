// Composant de lancer de dés interactif pour Paranoia
import { useState } from 'react';
import type { DiceRoll } from '../types/paranoia';
import { rollDice, formatDiceResult, diceHistory } from '../utils/dice';

interface DiceRollerProps {
  diceType: string;        // "1D10+8", "2D10", etc.
  label: string;           // Nom de l'attribut
  onRoll: (result: DiceRoll) => void;
  autoAssign?: boolean;    // Assigner automatiquement le résultat
  disabled?: boolean;
  value?: number;          // Valeur actuelle si déjà roulée
  className?: string;
}

export default function DiceRoller({
  diceType,
  label,
  onRoll,
  autoAssign = false,
  disabled = false,
  value,
  className = ""
}: DiceRollerProps) {
  const [lastRoll, setLastRoll] = useState<DiceRoll | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = async () => {
    if (disabled) return;
    
    setIsRolling(true);
    
    // Animation de roulement (délai pour l'effet visuel)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
      const result = rollDice(diceType);
      setLastRoll(result);
      diceHistory.addRoll(result);
      onRoll(result);
      
      setIsRolling(false);
    } catch (error) {
      console.error('Erreur lors du lancer de dés:', error);
      setIsRolling(false);
    }
  };

  const hasValue = value !== undefined && value !== null;
  const displayValue = hasValue ? value : lastRoll?.total;

  return (
    <div className={`dice-roller flex items-center gap-4 p-4 border border-red-600 rounded-lg bg-black text-red-400 ${className}`}>
      {/* Label de l'attribut */}
      <div className="flex-1">
        <label className="font-bold text-red-300 uppercase tracking-wide">
          {label}
        </label>
        <div className="text-sm text-red-500">
          {diceType}
        </div>
      </div>
      
      {/* Affichage du résultat */}
      <div className="flex items-center gap-3">
        {displayValue && (
          <div className="result bg-red-900/50 px-3 py-2 rounded border border-red-600">
            <div className="text-xl font-bold text-red-100">
              {displayValue}
            </div>
            {lastRoll && (
              <div className="text-xs text-red-400 mt-1">
                {formatDiceResult(lastRoll)}
              </div>
            )}
          </div>
        )}
        
        {/* Bouton de lancer */}
        <button
          onClick={handleRoll}
          disabled={disabled || isRolling}
          className={`
            dice-button px-4 py-2 rounded font-bold uppercase tracking-wide transition-all
            ${disabled 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : isRolling
                ? 'bg-yellow-600 text-black animate-pulse cursor-wait'
                : 'bg-red-600 hover:bg-red-500 text-white hover:shadow-lg hover:shadow-red-500/50'
            }
          `}
        >
          {isRolling ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin">🎲</div>
              <span>Lancement...</span>
            </div>
          ) : hasValue ? (
            "Relancer"
          ) : (
            `Lancer ${diceType}`
          )}
        </button>
      </div>
      
      {/* Indicateur de statut */}
      {hasValue && !disabled && (
        <div className="text-green-400 text-sm">
          ✓ Défini
        </div>
      )}
    </div>
  );
}

// Composant spécialisé pour les attributs principaux
interface AttributeRollerProps {
  attribute: 'strength' | 'endurance' | 'agility' | 'dexterity' | 'adaptability' | 'aplomb' | 'mechanics' | 'powerIndex';
  value?: number;
  onRoll: (attribute: string, result: DiceRoll) => void;
  disabled?: boolean;
}

export function AttributeRoller({ attribute, value, onRoll, disabled }: AttributeRollerProps) {
  const attributeConfig = {
    strength: { label: "Force", diceType: "1D10+8" },
    endurance: { label: "Endurance", diceType: "1D10+8" },
    agility: { label: "Agilité", diceType: "2D10" },
    dexterity: { label: "Dextérité", diceType: "2D10" },
    adaptability: { label: "Adaptabilité", diceType: "2D10" },
    aplomb: { label: "Aplomb", diceType: "2D10" },
    mechanics: { label: "Sens de la Mécanique", diceType: "2D10" },
    powerIndex: { label: "Indice de Pouvoir", diceType: "1D10+5" }
  };

  const config = attributeConfig[attribute];

  return (
    <DiceRoller
      diceType={config.diceType}
      label={config.label}
      value={value}
      onRoll={(result) => onRoll(attribute, result)}
      disabled={disabled}
      autoAssign={true}
    />
  );
}

// Composant pour les tables (Service, Pouvoirs, Sociétés secrètes)
interface TableRollerProps {
  tableType: 'service' | 'mutant-power' | 'secret-society';
  onRoll: (result: DiceRoll) => void;
  value?: number;
  disabled?: boolean;
}

export function TableRoller({ tableType, onRoll, value, disabled }: TableRollerProps) {
  const tableConfig = {
    'service': { label: "Service", diceType: "1D10" },
    'mutant-power': { label: "Pouvoir Mutant", diceType: "1D100" },
    'secret-society': { label: "Société Secrète", diceType: "1D100" }
  };

  const config = tableConfig[tableType];

  return (
    <DiceRoller
      diceType={config.diceType}
      label={config.label}
      value={value}
      onRoll={onRoll}
      disabled={disabled}
      autoAssign={true}
    />
  );
}

// Composant d'historique des lancers
interface DiceHistoryProps {
  maxItems?: number;
  showDetails?: boolean;
}

export function DiceHistoryDisplay({ maxItems = 5, showDetails = false }: DiceHistoryProps) {
  const history = diceHistory.getHistory().slice(-maxItems).reverse();
  
  if (history.length === 0) {
    return (
      <div className="dice-history p-4 border border-red-600 rounded-lg bg-black text-red-400">
        <h3 className="font-bold mb-2">Historique des Lancers</h3>
        <p className="text-red-500 italic">Aucun lancer effectué</p>
      </div>
    );
  }

  return (
    <div className="dice-history p-4 border border-red-600 rounded-lg bg-black text-red-400">
      <h3 className="font-bold mb-2">Historique des Lancers</h3>
      <div className="space-y-2">
        {history.map((roll, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-red-300">{roll.type}:</span>
            <span className="font-mono text-red-100">
              {formatDiceResult(roll)}
            </span>
            {showDetails && (
              <span className="text-xs text-red-500">
                {roll.timestamp.toLocaleTimeString()}
              </span>
            )}
          </div>
        ))}
      </div>
      
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-red-800 text-xs text-red-500">
          Total des lancers: {diceHistory.getHistory().length}
        </div>
      )}
    </div>
  );
}