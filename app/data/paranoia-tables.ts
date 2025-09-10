// Tables de données pour le JDR Paranoia
// Basé sur les règles officielles du livret du joueur

export interface Service {
  id: number;
  name: string;
  description: string;
  competencyCategories: string[];
}

export interface MutantPower {
  id: number;
  name: string;
  description: string;
  type: 'normal' | 'exceptional';
  isLethal: boolean; // marqué d'un astérisque dans les règles
}

export interface SecretSociety {
  id: number;
  name: string;
  description: string;
  objectives: string;
  incompatibleWith?: string[];
}

export interface AttributeModifier {
  value: number;
  transportCapacity: number;
  damageBonus: number;
  machoBonus: number;
  meleeBonus: number;
  rangedBonus: number;
  comprehensionBonus: number;
  credibilityBonus: number;
  repairBonus: number;
}

// Table 3.3.1 - Modificateurs d'attributs secondaires
export const ATTRIBUTE_MODIFIERS: AttributeModifier[] = [
  { value: 2, transportCapacity: 25, damageBonus: 0, machoBonus: -5, meleeBonus: -25, rangedBonus: -25, comprehensionBonus: -30, credibilityBonus: -35, repairBonus: -30 },
  { value: 3, transportCapacity: 25, damageBonus: 0, machoBonus: -4, meleeBonus: -22, rangedBonus: -22, comprehensionBonus: -26, credibilityBonus: -30, repairBonus: -26 },
  { value: 4, transportCapacity: 25, damageBonus: 0, machoBonus: -3, meleeBonus: -19, rangedBonus: -19, comprehensionBonus: -22, credibilityBonus: -25, repairBonus: -22 },
  { value: 5, transportCapacity: 25, damageBonus: 0, machoBonus: -2, meleeBonus: -16, rangedBonus: -16, comprehensionBonus: -18, credibilityBonus: -20, repairBonus: -18 },
  { value: 6, transportCapacity: 25, damageBonus: 0, machoBonus: -1, meleeBonus: -13, rangedBonus: -13, comprehensionBonus: -14, credibilityBonus: -15, repairBonus: -14 },
  { value: 7, transportCapacity: 25, damageBonus: 0, machoBonus: -1, meleeBonus: -10, rangedBonus: -10, comprehensionBonus: -10, credibilityBonus: -10, repairBonus: -10 },
  { value: 8, transportCapacity: 25, damageBonus: 0, machoBonus: -1, meleeBonus: -7, rangedBonus: -7, comprehensionBonus: -6, credibilityBonus: -5, repairBonus: -6 },
  { value: 9, transportCapacity: 25, damageBonus: 0, machoBonus: -1, meleeBonus: -4, rangedBonus: -4, comprehensionBonus: -2, credibilityBonus: 0, repairBonus: -2 },
  { value: 10, transportCapacity: 25, damageBonus: 0, machoBonus: -1, meleeBonus: -1, rangedBonus: -1, comprehensionBonus: 2, credibilityBonus: 0, repairBonus: 2 },
  { value: 11, transportCapacity: 25, damageBonus: 0, machoBonus: 0, meleeBonus: 2, rangedBonus: 2, comprehensionBonus: 2, credibilityBonus: 3, repairBonus: 2 },
  { value: 12, transportCapacity: 25, damageBonus: 0, machoBonus: 0, meleeBonus: 3, rangedBonus: 3, comprehensionBonus: 2, credibilityBonus: 3, repairBonus: 2 },
  { value: 13, transportCapacity: 30, damageBonus: 0, machoBonus: 0, meleeBonus: 5, rangedBonus: 5, comprehensionBonus: 4, credibilityBonus: 5, repairBonus: 4 },
  { value: 14, transportCapacity: 35, damageBonus: 1, machoBonus: -1, meleeBonus: 7, rangedBonus: 7, comprehensionBonus: 5, credibilityBonus: 7, repairBonus: 5 },
  { value: 15, transportCapacity: 40, damageBonus: 1, machoBonus: -1, meleeBonus: 10, rangedBonus: 10, comprehensionBonus: 7, credibilityBonus: 10, repairBonus: 7 },
  { value: 16, transportCapacity: 45, damageBonus: 1, machoBonus: -1, meleeBonus: 12, rangedBonus: 12, comprehensionBonus: 10, credibilityBonus: 12, repairBonus: 10 },
  { value: 17, transportCapacity: 50, damageBonus: 1, machoBonus: -1, meleeBonus: 15, rangedBonus: 15, comprehensionBonus: 12, credibilityBonus: 15, repairBonus: 12 },
  { value: 18, transportCapacity: 55, damageBonus: 1, machoBonus: -1, meleeBonus: 17, rangedBonus: 17, comprehensionBonus: 15, credibilityBonus: 17, repairBonus: 15 },
  { value: 19, transportCapacity: 60, damageBonus: 2, machoBonus: -2, meleeBonus: 20, rangedBonus: 20, comprehensionBonus: 17, credibilityBonus: 20, repairBonus: 17 },
  { value: 20, transportCapacity: 65, damageBonus: 2, machoBonus: -2, meleeBonus: 22, rangedBonus: 22, comprehensionBonus: 20, credibilityBonus: 22, repairBonus: 20 },
];

// Services disponibles (Table du livret)
export const SERVICES: Service[] = [
  {
    id: 1,
    name: "Sécurité Interne",
    description: "La police secrète, crainte de tous",
    competencyCategories: ["Activités de Base"]
  },
  {
    id: 2,
    name: "Services Techniques",
    description: "Les réparateurs et ingénieurs",
    competencyCategories: ["Services Techniques"]
  },
  {
    id: 3,
    name: "Préservation et Développement de l'Habitat et Contrôle Mental",
    description: "Bureaucrates et psychologues",
    competencyCategories: ["Développement Personnel"]
  },
  {
    id: 4,
    name: "Forces Armées",
    description: "Les militaires",
    competencyCategories: ["Activités de Base", "Services Véhiculaires", "Environnement hostile"]
  },
  {
    id: 5,
    name: "Production, Logistique et Intendance",
    description: "Ceux qui gèrent la nourriture et le matériel",
    competencyCategories: ["Services Techniques", "Services Véhiculaires"]
  },
  {
    id: 6,
    name: "Service de l'Energie",
    description: "Gèrent les réacteurs et le transport",
    competencyCategories: ["Services Techniques", "Services Véhiculaires"]
  },
  {
    id: 7,
    name: "Recherche et Conception",
    description: "Les scientifiques fous",
    competencyCategories: ["Services Techniques"]
  },
  {
    id: 8,
    name: "Unité Centrale de Traitement",
    description: "Les assistants directs de l'Ordinateur",
    competencyCategories: ["N'importe quelle catégorie"]
  }
];

// Pouvoirs mutants normaux (Table 3.5.1) - 100 entrées complètes
export const NORMAL_MUTANT_POWERS: MutantPower[] = [
  // 01-04
  { id: 1, name: "Ouïe Développée", description: "Perception auditive exceptionnelle", type: 'normal', isLethal: false },
  { id: 2, name: "Ouïe Développée", description: "Perception auditive exceptionnelle", type: 'normal', isLethal: false },
  { id: 3, name: "Ouïe Développée", description: "Perception auditive exceptionnelle", type: 'normal', isLethal: false },
  { id: 4, name: "Ouïe Développée", description: "Perception auditive exceptionnelle", type: 'normal', isLethal: false },
  
  // 05-08
  { id: 5, name: "Vision Développée", description: "Capacité visuelle améliorée", type: 'normal', isLethal: false },
  { id: 6, name: "Vision Développée", description: "Capacité visuelle améliorée", type: 'normal', isLethal: false },
  { id: 7, name: "Vision Développée", description: "Capacité visuelle améliorée", type: 'normal', isLethal: false },
  { id: 8, name: "Vision Développée", description: "Capacité visuelle améliorée", type: 'normal', isLethal: false },
  
  // 09-12
  { id: 9, name: "Toucher Développé", description: "Sens tactile hypersensible", type: 'normal', isLethal: false },
  { id: 10, name: "Toucher Développé", description: "Sens tactile hypersensible", type: 'normal', isLethal: false },
  { id: 11, name: "Toucher Développé", description: "Sens tactile hypersensible", type: 'normal', isLethal: false },
  { id: 12, name: "Toucher Développé", description: "Sens tactile hypersensible", type: 'normal', isLethal: false },
  
  // 13-16
  { id: 13, name: "Goût Développé", description: "Analyse gustative précise", type: 'normal', isLethal: false },
  { id: 14, name: "Goût Développé", description: "Analyse gustative précise", type: 'normal', isLethal: false },
  { id: 15, name: "Goût Développé", description: "Analyse gustative précise", type: 'normal', isLethal: false },
  { id: 16, name: "Goût Développé", description: "Analyse gustative précise", type: 'normal', isLethal: false },
  
  // 17-20
  { id: 17, name: "Odorat Développé", description: "Capacité olfactive exceptionnelle", type: 'normal', isLethal: false },
  { id: 18, name: "Odorat Développé", description: "Capacité olfactive exceptionnelle", type: 'normal', isLethal: false },
  { id: 19, name: "Odorat Développé", description: "Capacité olfactive exceptionnelle", type: 'normal', isLethal: false },
  { id: 20, name: "Odorat Développé", description: "Capacité olfactive exceptionnelle", type: 'normal', isLethal: false },
  
  // 21-24
  { id: 21, name: "Force Supérieure", description: "Puissance physique améliorée", type: 'normal', isLethal: false },
  { id: 22, name: "Force Supérieure", description: "Puissance physique améliorée", type: 'normal', isLethal: false },
  { id: 23, name: "Force Supérieure", description: "Puissance physique améliorée", type: 'normal', isLethal: false },
  { id: 24, name: "Force Supérieure", description: "Puissance physique améliorée", type: 'normal', isLethal: false },
  
  // 25-28
  { id: 25, name: "Agilité Supérieure", description: "Coordination exceptionnelle", type: 'normal', isLethal: false },
  { id: 26, name: "Agilité Supérieure", description: "Coordination exceptionnelle", type: 'normal', isLethal: false },
  { id: 27, name: "Agilité Supérieure", description: "Coordination exceptionnelle", type: 'normal', isLethal: false },
  { id: 28, name: "Agilité Supérieure", description: "Coordination exceptionnelle", type: 'normal', isLethal: false },
  
  // 29-32
  { id: 29, name: "Endurance Supérieure", description: "Résistance physique accrue", type: 'normal', isLethal: false },
  { id: 30, name: "Endurance Supérieure", description: "Résistance physique accrue", type: 'normal', isLethal: false },
  { id: 31, name: "Endurance Supérieure", description: "Résistance physique accrue", type: 'normal', isLethal: false },
  { id: 32, name: "Endurance Supérieure", description: "Résistance physique accrue", type: 'normal', isLethal: false },
  
  // 33-36
  { id: 33, name: "Dextérité Supérieure", description: "Habileté manuelle exceptionnelle", type: 'normal', isLethal: false },
  { id: 34, name: "Dextérité Supérieure", description: "Habileté manuelle exceptionnelle", type: 'normal', isLethal: false },
  { id: 35, name: "Dextérité Supérieure", description: "Habileté manuelle exceptionnelle", type: 'normal', isLethal: false },
  { id: 36, name: "Dextérité Supérieure", description: "Habileté manuelle exceptionnelle", type: 'normal', isLethal: false },
  
  // 37-40
  { id: 37, name: "Indice de Pouvoir Supérieur", description: "Puissance mutante accrue", type: 'normal', isLethal: false },
  { id: 38, name: "Indice de Pouvoir Supérieur", description: "Puissance mutante accrue", type: 'normal', isLethal: false },
  { id: 39, name: "Indice de Pouvoir Supérieur", description: "Puissance mutante accrue", type: 'normal', isLethal: false },
  { id: 40, name: "Indice de Pouvoir Supérieur", description: "Puissance mutante accrue", type: 'normal', isLethal: false },
  
  // 41-44
  { id: 41, name: "Régénération", description: "Guérison accélérée", type: 'normal', isLethal: false },
  { id: 42, name: "Régénération", description: "Guérison accélérée", type: 'normal', isLethal: false },
  { id: 43, name: "Régénération", description: "Guérison accélérée", type: 'normal', isLethal: false },
  { id: 44, name: "Régénération", description: "Guérison accélérée", type: 'normal', isLethal: false },
  
  // 45-48
  { id: 45, name: "Mimétisme", description: "Imitation d'apparence", type: 'normal', isLethal: false },
  { id: 46, name: "Mimétisme", description: "Imitation d'apparence", type: 'normal', isLethal: false },
  { id: 47, name: "Mimétisme", description: "Imitation d'apparence", type: 'normal', isLethal: false },
  { id: 48, name: "Mimétisme", description: "Imitation d'apparence", type: 'normal', isLethal: false },
  
  // 49-52
  { id: 49, name: "Charme", description: "Influence naturelle sur autrui", type: 'normal', isLethal: false },
  { id: 50, name: "Charme", description: "Influence naturelle sur autrui", type: 'normal', isLethal: false },
  { id: 51, name: "Charme", description: "Influence naturelle sur autrui", type: 'normal', isLethal: false },
  { id: 52, name: "Charme", description: "Influence naturelle sur autrui", type: 'normal', isLethal: false },
  
  // 53-56
  { id: 53, name: "Sens Magnétique", description: "Perception des champs magnétiques", type: 'normal', isLethal: false },
  { id: 54, name: "Sens Magnétique", description: "Perception des champs magnétiques", type: 'normal', isLethal: false },
  { id: 55, name: "Sens Magnétique", description: "Perception des champs magnétiques", type: 'normal', isLethal: false },
  { id: 56, name: "Sens Magnétique", description: "Perception des champs magnétiques", type: 'normal', isLethal: false },
  
  // 57-60
  { id: 57, name: "Sens de la Mécanique Supérieur", description: "Compréhension technologique avancée", type: 'normal', isLethal: false },
  { id: 58, name: "Sens de la Mécanique Supérieur", description: "Compréhension technologique avancée", type: 'normal', isLethal: false },
  { id: 59, name: "Sens de la Mécanique Supérieur", description: "Compréhension technologique avancée", type: 'normal', isLethal: false },
  { id: 60, name: "Sens de la Mécanique Supérieur", description: "Compréhension technologique avancée", type: 'normal', isLethal: false },
  
  // 61-64
  { id: 61, name: "Adaptabilité Supérieure", description: "Compréhension situationnelle exceptionnelle", type: 'normal', isLethal: false },
  { id: 62, name: "Adaptabilité Supérieure", description: "Compréhension situationnelle exceptionnelle", type: 'normal', isLethal: false },
  { id: 63, name: "Adaptabilité Supérieure", description: "Compréhension situationnelle exceptionnelle", type: 'normal', isLethal: false },
  { id: 64, name: "Adaptabilité Supérieure", description: "Compréhension situationnelle exceptionnelle", type: 'normal', isLethal: false },
  
  // 65-68
  { id: 65, name: "Aplomb Supérieur", description: "Charisme et manipulation avancés", type: 'normal', isLethal: false },
  { id: 66, name: "Aplomb Supérieur", description: "Charisme et manipulation avancés", type: 'normal', isLethal: false },
  { id: 67, name: "Aplomb Supérieur", description: "Charisme et manipulation avancés", type: 'normal', isLethal: false },
  { id: 68, name: "Aplomb Supérieur", description: "Charisme et manipulation avancés", type: 'normal', isLethal: false },
  
  // 69-72
  { id: 69, name: "Esprit Combatif", description: "Mentalité guerrière naturelle", type: 'normal', isLethal: false },
  { id: 70, name: "Esprit Combatif", description: "Mentalité guerrière naturelle", type: 'normal', isLethal: false },
  { id: 71, name: "Esprit Combatif", description: "Mentalité guerrière naturelle", type: 'normal', isLethal: false },
  { id: 72, name: "Esprit Combatif", description: "Mentalité guerrière naturelle", type: 'normal', isLethal: false },
  
  // 73-76
  { id: 73, name: "Empathie", description: "Perception des émotions d'autrui", type: 'normal', isLethal: false },
  { id: 74, name: "Empathie", description: "Perception des émotions d'autrui", type: 'normal', isLethal: false },
  { id: 75, name: "Empathie", description: "Perception des émotions d'autrui", type: 'normal', isLethal: false },
  { id: 76, name: "Empathie", description: "Perception des émotions d'autrui", type: 'normal', isLethal: false },
  
  // 77-80
  { id: 77, name: "Intuition Mécanique", description: "Compréhension instinctive des machines", type: 'normal', isLethal: false },
  { id: 78, name: "Intuition Mécanique", description: "Compréhension instinctive des machines", type: 'normal', isLethal: false },
  { id: 79, name: "Intuition Mécanique", description: "Compréhension instinctive des machines", type: 'normal', isLethal: false },
  { id: 80, name: "Intuition Mécanique", description: "Compréhension instinctive des machines", type: 'normal', isLethal: false },
  
  // 81-84
  { id: 81, name: "Sens Télépathique", description: "Perception mentale limitée", type: 'normal', isLethal: false },
  { id: 82, name: "Sens Télépathique", description: "Perception mentale limitée", type: 'normal', isLethal: false },
  { id: 83, name: "Sens Télépathique", description: "Perception mentale limitée", type: 'normal', isLethal: false },
  { id: 84, name: "Sens Télépathique", description: "Perception mentale limitée", type: 'normal', isLethal: false },
  
  // 85-88
  { id: 85, name: "Ecran Mental", description: "Protection contre les intrusions psioniques", type: 'normal', isLethal: false },
  { id: 86, name: "Ecran Mental", description: "Protection contre les intrusions psioniques", type: 'normal', isLethal: false },
  { id: 87, name: "Ecran Mental", description: "Protection contre les intrusions psioniques", type: 'normal', isLethal: false },
  { id: 88, name: "Ecran Mental", description: "Protection contre les intrusions psioniques", type: 'normal', isLethal: false },
  
  // 89-92
  { id: 89, name: "Précognition", description: "Aperçu limité du futur proche", type: 'normal', isLethal: false },
  { id: 90, name: "Précognition", description: "Aperçu limité du futur proche", type: 'normal', isLethal: false },
  { id: 91, name: "Précognition", description: "Aperçu limité du futur proche", type: 'normal', isLethal: false },
  { id: 92, name: "Précognition", description: "Aperçu limité du futur proche", type: 'normal', isLethal: false },
  
  // 93-96
  { id: 93, name: "Télékinésie", description: "Manipulation d'objets par la pensée", type: 'normal', isLethal: false },
  { id: 94, name: "Télékinésie", description: "Manipulation d'objets par la pensée", type: 'normal', isLethal: false },
  { id: 95, name: "Télékinésie", description: "Manipulation d'objets par la pensée", type: 'normal', isLethal: false },
  { id: 96, name: "Télékinésie", description: "Manipulation d'objets par la pensée", type: 'normal', isLethal: false },
  
  // 97-00 (redirect vers table exceptionnelle)
  { id: 97, name: "Pouvoir Exceptionnel", description: "Relancer sur la table des pouvoirs exceptionnels", type: 'normal', isLethal: false },
  { id: 98, name: "Pouvoir Exceptionnel", description: "Relancer sur la table des pouvoirs exceptionnels", type: 'normal', isLethal: false },
  { id: 99, name: "Pouvoir Exceptionnel", description: "Relancer sur la table des pouvoirs exceptionnels", type: 'normal', isLethal: false },
  { id: 100, name: "Pouvoir Exceptionnel", description: "Relancer sur la table des pouvoirs exceptionnels", type: 'normal', isLethal: false },
];

// Pouvoirs mutants exceptionnels (Table 3.5.2) - Table complète
export const EXCEPTIONAL_MUTANT_POWERS: MutantPower[] = [
  // 01-05
  { id: 101, name: "Adaptabilité respiratoire", description: "S'adapter à n'importe quelle atmosphère", type: 'exceptional', isLethal: false },
  { id: 102, name: "Adaptabilité respiratoire", description: "S'adapter à n'importe quelle atmosphère", type: 'exceptional', isLethal: false },
  { id: 103, name: "Adaptabilité respiratoire", description: "S'adapter à n'importe quelle atmosphère", type: 'exceptional', isLethal: false },
  { id: 104, name: "Adaptabilité respiratoire", description: "S'adapter à n'importe quelle atmosphère", type: 'exceptional', isLethal: false },
  { id: 105, name: "Adaptabilité respiratoire", description: "S'adapter à n'importe quelle atmosphère", type: 'exceptional', isLethal: false },
  
  // 06-10
  { id: 106, name: "Adaptabilité nutritionnelle", description: "Digérer n'importe quelle matière organique", type: 'exceptional', isLethal: false },
  { id: 107, name: "Adaptabilité nutritionnelle", description: "Digérer n'importe quelle matière organique", type: 'exceptional', isLethal: false },
  { id: 108, name: "Adaptabilité nutritionnelle", description: "Digérer n'importe quelle matière organique", type: 'exceptional', isLethal: false },
  { id: 109, name: "Adaptabilité nutritionnelle", description: "Digérer n'importe quelle matière organique", type: 'exceptional', isLethal: false },
  { id: 110, name: "Adaptabilité nutritionnelle", description: "Digérer n'importe quelle matière organique", type: 'exceptional', isLethal: false },
  
  // 11-15
  { id: 111, name: "Polymorphisme", description: "Changer de forme physique", type: 'exceptional', isLethal: false },
  { id: 112, name: "Polymorphisme", description: "Changer de forme physique", type: 'exceptional', isLethal: false },
  { id: 113, name: "Polymorphisme", description: "Changer de forme physique", type: 'exceptional', isLethal: false },
  { id: 114, name: "Polymorphisme", description: "Changer de forme physique", type: 'exceptional', isLethal: false },
  { id: 115, name: "Polymorphisme", description: "Changer de forme physique", type: 'exceptional', isLethal: false },
  
  // 16-20
  { id: 116, name: "Contrôle de l'adrénaline", description: "Maîtriser ses réactions de stress", type: 'exceptional', isLethal: false },
  { id: 117, name: "Contrôle de l'adrénaline", description: "Maîtriser ses réactions de stress", type: 'exceptional', isLethal: false },
  { id: 118, name: "Contrôle de l'adrénaline", description: "Maîtriser ses réactions de stress", type: 'exceptional', isLethal: false },
  { id: 119, name: "Contrôle de l'adrénaline", description: "Maîtriser ses réactions de stress", type: 'exceptional', isLethal: false },
  { id: 120, name: "Contrôle de l'adrénaline", description: "Maîtriser ses réactions de stress", type: 'exceptional', isLethal: false },
  
  // 21-25
  { id: 121, name: "Electrochoc", description: "Générer des décharges électriques", type: 'exceptional', isLethal: false },
  { id: 122, name: "Electrochoc", description: "Générer des décharges électriques", type: 'exceptional', isLethal: false },
  { id: 123, name: "Electrochoc", description: "Générer des décharges électriques", type: 'exceptional', isLethal: false },
  { id: 124, name: "Electrochoc", description: "Générer des décharges électriques", type: 'exceptional', isLethal: false },
  { id: 125, name: "Electrochoc", description: "Générer des décharges électriques", type: 'exceptional', isLethal: false },
  
  // 26-30
  { id: 126, name: "Ralentissement métabolique", description: "Ralentir ses fonctions vitales", type: 'exceptional', isLethal: false },
  { id: 127, name: "Ralentissement métabolique", description: "Ralentir ses fonctions vitales", type: 'exceptional', isLethal: false },
  { id: 128, name: "Ralentissement métabolique", description: "Ralentir ses fonctions vitales", type: 'exceptional', isLethal: false },
  { id: 129, name: "Ralentissement métabolique", description: "Ralentir ses fonctions vitales", type: 'exceptional', isLethal: false },
  { id: 130, name: "Ralentissement métabolique", description: "Ralentir ses fonctions vitales", type: 'exceptional', isLethal: false },
  
  // 31-35
  { id: 131, name: "Bosse des maths", description: "Capacités mathématiques extraordinaires", type: 'exceptional', isLethal: false },
  { id: 132, name: "Bosse des maths", description: "Capacités mathématiques extraordinaires", type: 'exceptional', isLethal: false },
  { id: 133, name: "Bosse des maths", description: "Capacités mathématiques extraordinaires", type: 'exceptional', isLethal: false },
  { id: 134, name: "Bosse des maths", description: "Capacités mathématiques extraordinaires", type: 'exceptional', isLethal: false },
  { id: 135, name: "Bosse des maths", description: "Capacités mathématiques extraordinaires", type: 'exceptional', isLethal: false },
  
  // 36-40
  { id: 136, name: "Mémoire Eidétique", description: "Mémoire photographique parfaite", type: 'exceptional', isLethal: false },
  { id: 137, name: "Mémoire Eidétique", description: "Mémoire photographique parfaite", type: 'exceptional', isLethal: false },
  { id: 138, name: "Mémoire Eidétique", description: "Mémoire photographique parfaite", type: 'exceptional', isLethal: false },
  { id: 139, name: "Mémoire Eidétique", description: "Mémoire photographique parfaite", type: 'exceptional', isLethal: false },
  { id: 140, name: "Mémoire Eidétique", description: "Mémoire photographique parfaite", type: 'exceptional', isLethal: false },
  
  // 41-45
  { id: 141, name: "Suggestion", description: "Implanter des idées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 142, name: "Suggestion", description: "Implanter des idées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 143, name: "Suggestion", description: "Implanter des idées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 144, name: "Suggestion", description: "Implanter des idées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 145, name: "Suggestion", description: "Implanter des idées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  
  // 46-50
  { id: 146, name: "Sens de la Machine", description: "Communication directe avec les machines", type: 'exceptional', isLethal: true },
  { id: 147, name: "Sens de la Machine", description: "Communication directe avec les machines", type: 'exceptional', isLethal: true },
  { id: 148, name: "Sens de la Machine", description: "Communication directe avec les machines", type: 'exceptional', isLethal: true },
  { id: 149, name: "Sens de la Machine", description: "Communication directe avec les machines", type: 'exceptional', isLethal: true },
  { id: 150, name: "Sens de la Machine", description: "Communication directe avec les machines", type: 'exceptional', isLethal: true },
  
  // 51-55
  { id: 151, name: "Paralysation", description: "Paralyser temporairement une cible", type: 'exceptional', isLethal: false },
  { id: 152, name: "Paralysation", description: "Paralyser temporairement une cible", type: 'exceptional', isLethal: false },
  { id: 153, name: "Paralysation", description: "Paralyser temporairement une cible", type: 'exceptional', isLethal: false },
  { id: 154, name: "Paralysation", description: "Paralyser temporairement une cible", type: 'exceptional', isLethal: false },
  { id: 155, name: "Paralysation", description: "Paralyser temporairement une cible", type: 'exceptional', isLethal: false },
  
  // 56-60
  { id: 156, name: "Transetéléportatrice", description: "Téléportation sur de courtes distances", type: 'exceptional', isLethal: false },
  { id: 157, name: "Transetéléportatrice", description: "Téléportation sur de courtes distances", type: 'exceptional', isLethal: false },
  { id: 158, name: "Transetéléportatrice", description: "Téléportation sur de courtes distances", type: 'exceptional', isLethal: false },
  { id: 159, name: "Transetéléportatrice", description: "Téléportation sur de courtes distances", type: 'exceptional', isLethal: false },
  { id: 160, name: "Transetéléportatrice", description: "Téléportation sur de courtes distances", type: 'exceptional', isLethal: false },
  
  // 61-65
  { id: 161, name: "Lévitation", description: "Flotter dans les airs par la volonté", type: 'exceptional', isLethal: false },
  { id: 162, name: "Lévitation", description: "Flotter dans les airs par la volonté", type: 'exceptional', isLethal: false },
  { id: 163, name: "Lévitation", description: "Flotter dans les airs par la volonté", type: 'exceptional', isLethal: false },
  { id: 164, name: "Lévitation", description: "Flotter dans les airs par la volonté", type: 'exceptional', isLethal: false },
  { id: 165, name: "Lévitation", description: "Flotter dans les airs par la volonté", type: 'exceptional', isLethal: false },
  
  // 66-70
  { id: 166, name: "Projection télépathique", description: "Projeter ses pensées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 167, name: "Projection télépathique", description: "Projeter ses pensées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 168, name: "Projection télépathique", description: "Projeter ses pensées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 169, name: "Projection télépathique", description: "Projeter ses pensées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 170, name: "Projection télépathique", description: "Projeter ses pensées dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  
  // 71-75
  { id: 171, name: "Pénétration mentale", description: "Lire profondément dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 172, name: "Pénétration mentale", description: "Lire profondément dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 173, name: "Pénétration mentale", description: "Lire profondément dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 174, name: "Pénétration mentale", description: "Lire profondément dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  { id: 175, name: "Pénétration mentale", description: "Lire profondément dans l'esprit d'autrui", type: 'exceptional', isLethal: false },
  
  // 76-80
  { id: 176, name: "Foudre mentale", description: "Attaque psychique destructrice", type: 'exceptional', isLethal: false },
  { id: 177, name: "Foudre mentale", description: "Attaque psychique destructrice", type: 'exceptional', isLethal: false },
  { id: 178, name: "Foudre mentale", description: "Attaque psychique destructrice", type: 'exceptional', isLethal: false },
  { id: 179, name: "Foudre mentale", description: "Attaque psychique destructrice", type: 'exceptional', isLethal: false },
  { id: 180, name: "Foudre mentale", description: "Attaque psychique destructrice", type: 'exceptional', isLethal: false },
  
  // 81-85
  { id: 181, name: "Pyrokinésie", description: "Contrôle et génération du feu", type: 'exceptional', isLethal: false },
  { id: 182, name: "Pyrokinésie", description: "Contrôle et génération du feu", type: 'exceptional', isLethal: false },
  { id: 183, name: "Pyrokinésie", description: "Contrôle et génération du feu", type: 'exceptional', isLethal: false },
  { id: 184, name: "Pyrokinésie", description: "Contrôle et génération du feu", type: 'exceptional', isLethal: false },
  { id: 185, name: "Pyrokinésie", description: "Contrôle et génération du feu", type: 'exceptional', isLethal: false },
  
  // 86-90
  { id: 186, name: "Guérison empathique", description: "Guérir en absorbant les blessures", type: 'exceptional', isLethal: false },
  { id: 187, name: "Guérison empathique", description: "Guérir en absorbant les blessures", type: 'exceptional', isLethal: false },
  { id: 188, name: "Guérison empathique", description: "Guérir en absorbant les blessures", type: 'exceptional', isLethal: false },
  { id: 189, name: "Guérison empathique", description: "Guérir en absorbant les blessures", type: 'exceptional', isLethal: false },
  { id: 190, name: "Guérison empathique", description: "Guérir en absorbant les blessures", type: 'exceptional', isLethal: false },
  
  // 91-95
  { id: 191, name: "Empathie envers les machines", description: "Ressentir les émotions des machines", type: 'exceptional', isLethal: true },
  { id: 192, name: "Empathie envers les machines", description: "Ressentir les émotions des machines", type: 'exceptional', isLethal: true },
  { id: 193, name: "Empathie envers les machines", description: "Ressentir les émotions des machines", type: 'exceptional', isLethal: true },
  { id: 194, name: "Empathie envers les machines", description: "Ressentir les émotions des machines", type: 'exceptional', isLethal: true },
  { id: 195, name: "Empathie envers les machines", description: "Ressentir les émotions des machines", type: 'exceptional', isLethal: true },
  
  // 96-00
  { id: 196, name: "Chance", description: "Manipulation subtile de la probabilité", type: 'exceptional', isLethal: false },
  { id: 197, name: "Chance", description: "Manipulation subtile de la probabilité", type: 'exceptional', isLethal: false },
  { id: 198, name: "Chance", description: "Manipulation subtile de la probabilité", type: 'exceptional', isLethal: false },
  { id: 199, name: "Chance", description: "Manipulation subtile de la probabilité", type: 'exceptional', isLethal: false },
  { id: 200, name: "Chance", description: "Manipulation subtile de la probabilité", type: 'exceptional', isLethal: false },
];

// Sociétés secrètes (Table 3.6.1)
export const SECRET_SOCIETIES: SecretSociety[] = [
  {
    id: 1,
    name: "Les Illuminati",
    description: "Contrôler secrètement le Complexe Alpha",
    objectives: "Remplacer l'Ordinateur par leur propre hiérarchie secrète",
    incompatibleWith: ["Anti-Mutant"]
  },
  {
    id: 2,
    name: "Communistes",
    description: "Instaurer un système égalitaire",
    objectives: "Renverser la hiérarchie basée sur les couleurs d'accréditation",
    incompatibleWith: ["Capitalistes", "Fascistes"]
  },
  {
    id: 3,
    name: "Capitalistes",
    description: "Établir un libre marché",
    objectives: "Créer un système économique basé sur le profit privé",
    incompatibleWith: ["Communistes"]
  },
  {
    id: 4,
    name: "Anti-Mutant",
    description: "Éliminer tous les mutants",
    objectives: "Purifier le Complexe Alpha de la menace mutante",
    incompatibleWith: ["Psion", "FCCC-P"]
  },
  {
    id: 5,
    name: "Psion",
    description: "Libérer le potentiel mutant",
    objectives: "Révéler au grand jour les pouvoirs mutants et les utiliser librement",
    incompatibleWith: ["Anti-Mutant"]
  },
  {
    id: 6,
    name: "Purge",
    description: "Purification par la violence",
    objectives: "Nettoyer le Complexe par l'élimination des impurs",
    incompatibleWith: []
  },
  {
    id: 7,
    name: "Corps Franc de Citoyens Concernés (FCCC-P)",
    description: "Milice citoyenne patriote",
    objectives: "Protéger les vrais citoyens contre les traîtres",
    incompatibleWith: ["Anti-Mutant", "Communistes"]
  },
  {
    id: 8,
    name: "Romantics",
    description: "Restaurer l'humanité perdue",
    objectives: "Retrouver les émotions et l'art d'avant la guerre",
    incompatibleWith: []
  },
  {
    id: 9,
    name: "Death Leopard",
    description: "Culte de la mort et de la destruction",
    objectives: "Semer le chaos et la destruction dans le Complexe",
    incompatibleWith: []
  },
  {
    id: 10,
    name: "Sierra Club",
    description: "Écologistes radicaux",
    objectives: "Détruire la technologie pour sauver la nature",
    incompatibleWith: []
  }
];

// Équipement de base du Clarificateur
export const BASIC_EQUIPMENT = [
  "Armure reflec rouge",
  "Pistolet laser",
  "Chargeur pour pistolet laser (à bande rouge)",
  "Combinaison (uniforme)",
  "Ceinture à poches tous usages",
  "Com-unit I (radio/vidéo portable)",
  "Couteau",
  "Carnet et stylo"
];

// Calculer les modificateurs d'attributs secondaires
export function getAttributeModifier(attributeValue: number): AttributeModifier {
  const modifier = ATTRIBUTE_MODIFIERS.find(mod => mod.value === attributeValue);
  if (modifier) return modifier;
  
  // Si la valeur n'est pas dans la table, calculer approximativement
  if (attributeValue > 20) {
    const baseModifier = ATTRIBUTE_MODIFIERS[ATTRIBUTE_MODIFIERS.length - 1];
    const extraLevels = attributeValue - 20;
    return {
      value: attributeValue,
      transportCapacity: baseModifier.transportCapacity + (extraLevels * 5),
      damageBonus: baseModifier.damageBonus + Math.floor(extraLevels / 2),
      machoBonus: baseModifier.machoBonus - Math.floor(extraLevels / 2),
      meleeBonus: baseModifier.meleeBonus + (extraLevels * 2),
      rangedBonus: baseModifier.rangedBonus + (extraLevels * 2),
      comprehensionBonus: baseModifier.comprehensionBonus + (extraLevels * 2),
      credibilityBonus: baseModifier.credibilityBonus + (extraLevels * 2),
      repairBonus: baseModifier.repairBonus + (extraLevels * 2),
    };
  }
  
  // Valeur par défaut si en dessous de 2
  return ATTRIBUTE_MODIFIERS[0];
}

// Calculer le pourcentage de base d'une compétence
export function calculateSkillPercentage(skillLevel: number, attributeBonus: number = 0): number {
  const basePercentage = 15 + (skillLevel * 5);
  return basePercentage + attributeBonus;
}