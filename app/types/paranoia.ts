// Types TypeScript pour le générateur de personnage Paranoia

export interface PrimaryAttributes {
  strength: number;        // Force (1D10 + 8)
  endurance: number;       // Endurance (1D10 + 8) 
  agility: number;         // Agilité (2D10)
  dexterity: number;       // Dextérité (2D10)
  adaptability: number;    // Adaptabilité (2D10)
  aplomb: number;          // Aplomb (2D10)
  mechanics: number;       // Sens de la Mécanique (2D10)
  powerIndex: number;      // Indice de Pouvoir (1D10 + 5)
}

export interface SecondaryAttributes {
  transportCapacity: number;    // Capacité de transport
  damageBonus: number;         // Bonus aux dommages
  machoBonus: number;          // Bonus Macho
  meleeBonus: number;          // Bonus Mêlée
  rangedBonus: number;         // Bonus armes de tir
  comprehensionBonus: number;  // Bonus compréhension
  credibilityBonus: number;    // Bonus Crédibilité
  repairBonus: number;         // Bonus réparation
}

export interface Skill {
  id: string;
  name: string;
  level: number;              // Le numéro entre parenthèses
  percentage: number;         // Pourcentage calculé
  category: SkillCategory;
  parentSkill?: string;       // Pour les sous-compétences
}

export enum SkillCategory {
  BASIC_ACTIVITIES = "Activités de Base",
  PERSONAL_DEVELOPMENT = "Développement Personnel", 
  TECHNICAL_SERVICES = "Services Techniques",
  VEHICLE_SERVICES = "Services Véhiculaires",
  HOSTILE_ENVIRONMENT = "Environnement hostile"
}

export interface Clone {
  number: number;    // 1 à 6
  isActive: boolean; // Clone actuel ou mort
  deathReason?: string;
}

export interface ParanoiaCharacter {
  // Étape 1: Nom
  firstName: string;
  clearanceLevel: string;    // Toujours "R" pour débutant
  unitCode: string;          // 3 lettres majuscules
  cloneNumber: number;       // 1-6
  
  // Étape 2: Attributs principaux
  primaryAttributes: PrimaryAttributes;
  
  // Étape 3: Attributs secondaires (calculés)
  secondaryAttributes: SecondaryAttributes;
  
  // Étape 4: Service
  service: {
    id: number;
    name: string;
    description: string;
  };
  serviceRoll?: number;
  
  // Étape 5: Pouvoir(s) mutant(s) - SECRET
  mutantPowers: Array<{
    id: number;
    name: string;
    description: string;
    type: 'normal' | 'exceptional';
    isLethal: boolean;
  }>;
  mutantPowerRolls?: Array<{
    type: string;
    value: number;
  }>;
  
  // Étape 6: Société secrète - SECRET
  secretSociety: {
    id: number;
    name: string;
    description: string;
    objectives: string;
  };
  secretSocietyRoll?: number;
  
  // Étape 7: Compétences
  skills: Skill[];
  availableSkillPoints: number;
  
  // Étape 8: Équipement et crédits
  equipment: string[];
  credits: number;
  
  // Étape 9: Famille de clones
  clones: Clone[];
  
  // Métadonnées
  createdAt: Date;
  lastModified: Date;
  isComplete: boolean;
  currentStep: number; // 1-9
}

// Types pour les lancers de dés
export interface DiceRoll {
  type: string;           // "1D10+8", "2D10", etc.
  dice: number[];         // Résultats individuels des dés
  modifier: number;       // Modificateur à ajouter
  total: number;          // Résultat final
  timestamp: Date;
}

// État global du générateur
export interface GeneratorState {
  character: Partial<ParanoiaCharacter>;
  rollHistory: DiceRoll[];
  currentStep: number;
  secretsRevealed: boolean; // Pour le MJ seulement
}

// Types pour les composants UI
export interface StepProps {
  character: Partial<ParanoiaCharacter>;
  onUpdate: (updates: Partial<ParanoiaCharacter>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isValid: boolean;
}

export interface DiceRollerProps {
  diceType: string;        // "1D10+8", "2D10", etc.
  label: string;
  onRoll: (result: DiceRoll) => void;
  autoAssign?: boolean;    // Assigner automatiquement le résultat
  disabled?: boolean;
}

// Enums pour les constantes
export enum ClearanceLevel {
  INFRARED = "IR",
  RED = "R", 
  ORANGE = "O",
  YELLOW = "Y",
  GREEN = "G",
  BLUE = "B",
  INDIGO = "I",
  VIOLET = "V",
  ULTRAVIOLET = "UV"
}

// Utilitaires de validation
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface CharacterValidation {
  step1: ValidationResult; // Nom valide
  step2: ValidationResult; // Attributs roulés
  step3: ValidationResult; // Attributs secondaires calculés
  step4: ValidationResult; // Service sélectionné
  step5: ValidationResult; // Pouvoir(s) mutant(s) déterminé(s)
  step6: ValidationResult; // Société secrète déterminée
  step7: ValidationResult; // Points de compétences répartis
  step8: ValidationResult; // Équipement et crédits OK
  step9: ValidationResult; // Clones configurés
}