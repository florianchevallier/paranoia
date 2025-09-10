// Système de lancers de dés pour Paranoia
import type { DiceRoll } from '../types/paranoia';

// Fonction principale pour lancer les dés
export function rollDice(diceType: string): DiceRoll {
  const roll = parseDiceType(diceType);
  const dice: number[] = [];
  
  // Lancer chaque dé individuellement
  for (let i = 0; i < roll.count; i++) {
    dice.push(Math.floor(Math.random() * roll.sides) + 1);
  }
  
  // Calculer le total
  const diceSum = dice.reduce((sum, die) => sum + die, 0);
  const total = diceSum + roll.modifier;
  
  return {
    type: diceType,
    dice,
    modifier: roll.modifier,
    total,
    timestamp: new Date()
  };
}

// Analyser les types de dés (ex: "2D10", "1D10+8")
function parseDiceType(diceType: string): { count: number; sides: number; modifier: number } {
  // Nettoyer la chaîne
  const cleanType = diceType.toUpperCase().replace(/\s/g, '');
  
  // Pattern pour parser les dés: XdY+Z ou XdY-Z
  const dicePattern = /^(\d+)D(\d+)([+-]\d+)?$/;
  const match = cleanType.match(dicePattern);
  
  if (!match) {
    throw new Error(`Format de dés invalide: ${diceType}`);
  }
  
  const count = parseInt(match[1]);
  const sides = parseInt(match[2]);
  const modifier = match[3] ? parseInt(match[3]) : 0;
  
  return { count, sides, modifier };
}

// Fonctions spécialisées pour chaque type d'attribut Paranoia
export function rollStrength(): DiceRoll {
  return rollDice("1D10+8");
}

export function rollEndurance(): DiceRoll {
  return rollDice("1D10+8");
}

export function rollAgility(): DiceRoll {
  return rollDice("2D10");
}

export function rollDexterity(): DiceRoll {
  return rollDice("2D10");
}

export function rollAdaptability(): DiceRoll {
  return rollDice("2D10");
}

export function rollAplomb(): DiceRoll {
  return rollDice("2D10");
}

export function rollMechanics(): DiceRoll {
  return rollDice("2D10");
}

export function rollPowerIndex(): DiceRoll {
  return rollDice("1D10+5");
}

// Lancer pour déterminer le service (1D10)
export function rollService(): DiceRoll {
  return rollDice("1D10");
}

// Lancer pour les pouvoirs mutants (1D100)
export function rollMutantPower(): DiceRoll {
  return rollDice("1D100");
}

// Lancer pour la société secrète (1D100)
export function rollSecretSociety(): DiceRoll {
  return rollDice("1D100");
}

// Fonction utilitaire pour simuler un D100 avec 2D10
export function roll2D10AsD100(): DiceRoll {
  const tensRoll = rollDice("1D10");
  const unitsRoll = rollDice("1D10");
  
  // Le premier dé donne les dizaines (0, 10, 20, ..., 90)
  const tens = (tensRoll.total === 10 ? 0 : tensRoll.total) * 10;
  
  // Le second dé donne les unités (0, 1, 2, ..., 9)
  const units = unitsRoll.total === 10 ? 0 : unitsRoll.total;
  
  // Total de 1 à 100 (00 = 100)
  const total = tens + units === 0 ? 100 : tens + units;
  
  return {
    type: "2D10 (D100)",
    dice: [tensRoll.total, unitsRoll.total],
    modifier: 0,
    total,
    timestamp: new Date()
  };
}

// Calculer le nombre de pouvoirs mutants basé sur le total des attributs
export function calculateMutantPowerCount(attributeSum: number): number {
  if (attributeSum >= 80) {
    return 1; // Un seul pouvoir normal
  } else if (attributeSum >= 65) {
    return 2; // Un normal + un exceptionnel
  } else {
    return 3; // Deux normaux + un exceptionnel
  }
}

// Fonctions pour gérer l'historique des lancers
export class DiceHistory {
  private history: DiceRoll[] = [];
  
  addRoll(roll: DiceRoll): void {
    this.history.push(roll);
  }
  
  getHistory(): DiceRoll[] {
    return [...this.history];
  }
  
  getLastRoll(): DiceRoll | undefined {
    return this.history[this.history.length - 1];
  }
  
  clearHistory(): void {
    this.history = [];
  }
  
  // Obtenir tous les lancers d'un type spécifique
  getRollsByType(diceType: string): DiceRoll[] {
    return this.history.filter(roll => roll.type === diceType);
  }
  
  // Statistiques utiles pour le debug
  getStatistics(): {
    totalRolls: number;
    averageTotal: number;
    minTotal: number;
    maxTotal: number;
    rollsByType: Record<string, number>;
  } {
    if (this.history.length === 0) {
      return {
        totalRolls: 0,
        averageTotal: 0,
        minTotal: 0,
        maxTotal: 0,
        rollsByType: {}
      };
    }
    
    const totals = this.history.map(roll => roll.total);
    const rollsByType: Record<string, number> = {};
    
    this.history.forEach(roll => {
      rollsByType[roll.type] = (rollsByType[roll.type] || 0) + 1;
    });
    
    return {
      totalRolls: this.history.length,
      averageTotal: totals.reduce((sum, total) => sum + total, 0) / totals.length,
      minTotal: Math.min(...totals),
      maxTotal: Math.max(...totals),
      rollsByType
    };
  }
}

// Instance globale de l'historique (peut être remplacée par un contexte React)
export const diceHistory = new DiceHistory();

// Fonction utilitaire pour formater l'affichage des résultats
export function formatDiceResult(roll: DiceRoll): string {
  if (roll.modifier === 0) {
    return `[${roll.dice.join(', ')}] = ${roll.total}`;
  } else {
    const sign = roll.modifier > 0 ? '+' : '';
    return `[${roll.dice.join(', ')}] ${sign}${roll.modifier} = ${roll.total}`;
  }
}

// Vérifier si un résultat est dans les valeurs attendues
export function isValidResult(roll: DiceRoll, expectedMin: number, expectedMax: number): boolean {
  return roll.total >= expectedMin && roll.total <= expectedMax;
}

// Fonctions de validation spécifiques aux attributs Paranoia
export const AttributeValidation = {
  // Force et Endurance: 1D10+8 → 9-18
  strengthEndurance: (roll: DiceRoll) => isValidResult(roll, 9, 18),
  
  // Agilité, Dextérité, Adaptabilité, Aplomb, Sens de la Mécanique: 2D10 → 2-20
  standardAttribute: (roll: DiceRoll) => isValidResult(roll, 2, 20),
  
  // Indice de Pouvoir: 1D10+5 → 6-15
  powerIndex: (roll: DiceRoll) => isValidResult(roll, 6, 15),
  
  // Service: 1D10 → 1-10
  service: (roll: DiceRoll) => isValidResult(roll, 1, 10),
  
  // Tables D100: 1-100
  d100Table: (roll: DiceRoll) => isValidResult(roll, 1, 100)
};