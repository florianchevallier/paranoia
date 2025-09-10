// Hook personnalisé pour gérer l'état du personnage Paranoia
import { useState, useCallback, useEffect } from 'react';
import type { ParanoiaCharacter, DiceRoll, PrimaryAttributes, SecondaryAttributes } from '../types/paranoia';
import { getAttributeModifier, SERVICES, NORMAL_MUTANT_POWERS, EXCEPTIONAL_MUTANT_POWERS, SECRET_SOCIETIES, BASIC_EQUIPMENT } from '../data/paranoia-tables';
import { calculateMutantPowerCount } from '../utils/dice';

// Configuration par défaut pour un nouveau personnage
const DEFAULT_CHARACTER: Partial<ParanoiaCharacter> = {
  firstName: '',
  clearanceLevel: 'R',
  unitCode: '',
  cloneNumber: 1,
  credits: 100,
  equipment: [...BASIC_EQUIPMENT],
  availableSkillPoints: 6,
  skills: [],
  currentStep: 1,
  isComplete: false,
  createdAt: new Date(),
  lastModified: new Date(),
  clones: Array.from({ length: 6 }, (_, i) => ({
    number: i + 1,
    isActive: i === 0, // Seul le premier clone est actif
    deathReason: undefined
  }))
};

export function useParanoiaCharacter() {
  const [character, setCharacter] = useState<Partial<ParanoiaCharacter>>(DEFAULT_CHARACTER);
  const [rollHistory, setRollHistory] = useState<DiceRoll[]>([]);
  
  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('paranoia-character');
    if (saved) {
      try {
        const parsedCharacter = JSON.parse(saved);
        // Reconstituer les dates
        if (parsedCharacter.createdAt) {
          parsedCharacter.createdAt = new Date(parsedCharacter.createdAt);
        }
        if (parsedCharacter.lastModified) {
          parsedCharacter.lastModified = new Date(parsedCharacter.lastModified);
        }
        setCharacter(parsedCharacter);
      } catch (error) {
        console.error('Erreur lors du chargement du personnage:', error);
      }
    }

    const savedHistory = localStorage.getItem('paranoia-roll-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Reconstituer les dates des lancers
        const historyWithDates = parsedHistory.map((roll: any) => ({
          ...roll,
          timestamp: new Date(roll.timestamp)
        }));
        setRollHistory(historyWithDates);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error);
      }
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement (obsolète - utilisé par import/export)
  const saveCharacter = useCallback((newCharacter: Partial<ParanoiaCharacter>) => {
    const updatedCharacter = {
      ...newCharacter,
      lastModified: new Date()
    };
    setCharacter(updatedCharacter);
    localStorage.setItem('paranoia-character', JSON.stringify(updatedCharacter));
  }, []);

  const saveRollHistory = useCallback((newHistory: DiceRoll[]) => {
    setRollHistory(newHistory);
    localStorage.setItem('paranoia-roll-history', JSON.stringify(newHistory));
  }, []);

  // Mettre à jour le personnage
  const updateCharacter = useCallback((updates: Partial<ParanoiaCharacter>) => {
    setCharacter(prevCharacter => {
      const updatedCharacter = { ...prevCharacter, ...updates, lastModified: new Date() };
      localStorage.setItem('paranoia-character', JSON.stringify(updatedCharacter));
      return updatedCharacter;
    });
  }, []);

  // Ajouter un lancer à l'historique
  const addRoll = useCallback((roll: DiceRoll) => {
    const newHistory = [...rollHistory, roll];
    saveRollHistory(newHistory);
  }, [rollHistory, saveRollHistory]);

  // Fonctions spécialisées pour chaque étape

  // Étape 1: Nommer le personnage
  const updateName = useCallback((firstName: string, unitCode: string) => {
    const normalizedFirstName = firstName.trim().toUpperCase();
    const normalizedUnitCode = unitCode.trim().toUpperCase().slice(0, 3);
    
    updateCharacter({
      firstName: normalizedFirstName,
      unitCode: normalizedUnitCode
    });
  }, [updateCharacter]);

  // Calculer les attributs secondaires basés sur les attributs principaux
  const calculateSecondaryAttributes = useCallback((primaryAttrs: Partial<PrimaryAttributes>): SecondaryAttributes => {
    const strModifier = getAttributeModifier(primaryAttrs.strength || 0);
    const endModifier = getAttributeModifier(primaryAttrs.endurance || 0);
    const agiModifier = getAttributeModifier(primaryAttrs.agility || 0);
    const dexModifier = getAttributeModifier(primaryAttrs.dexterity || 0);
    const adapModifier = getAttributeModifier(primaryAttrs.adaptability || 0);
    const aplombModifier = getAttributeModifier(primaryAttrs.aplomb || 0);
    const mechModifier = getAttributeModifier(primaryAttrs.mechanics || 0);

    return {
      transportCapacity: strModifier.transportCapacity,
      damageBonus: strModifier.damageBonus,
      machoBonus: endModifier.machoBonus,
      meleeBonus: agiModifier.meleeBonus,
      rangedBonus: dexModifier.rangedBonus,
      comprehensionBonus: adapModifier.comprehensionBonus,
      credibilityBonus: aplombModifier.credibilityBonus,
      repairBonus: mechModifier.repairBonus
    };
  }, []);

  // Étape 2: Attributs principaux
  const updatePrimaryAttributes = useCallback((attributes: Partial<PrimaryAttributes>) => {
    setCharacter(prevCharacter => {
      const currentAttributes = prevCharacter.primaryAttributes || {} as PrimaryAttributes;
      const updatedAttributes = { ...currentAttributes, ...attributes };
      
      // Recalculer les attributs secondaires automatiquement
      const secondaryAttributes = calculateSecondaryAttributes(updatedAttributes);
      
      const updatedCharacter = {
        ...prevCharacter,
        primaryAttributes: updatedAttributes,
        secondaryAttributes,
        lastModified: new Date()
      };
      
      localStorage.setItem('paranoia-character', JSON.stringify(updatedCharacter));
      return updatedCharacter;
    });
  }, [calculateSecondaryAttributes]);

  // Étape 4: Service
  const updateService = useCallback((serviceId: number) => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (service) {
      updateCharacter({
        service: {
          id: service.id,
          name: service.name,
          description: service.description
        }
      });
    }
  }, [updateCharacter]);

  // Étape 5: Pouvoirs mutants
  const updateMutantPowers = useCallback((powerIds: number[]) => {
    const allPowers = [...NORMAL_MUTANT_POWERS, ...EXCEPTIONAL_MUTANT_POWERS];
    const powers = powerIds.map(id => {
      const power = allPowers.find(p => p.id === id);
      return power ? {
        id: power.id,
        name: power.name,
        description: power.description,
        type: power.type,
        isLethal: power.isLethal
      } : null;
    }).filter(p => p !== null);

    updateCharacter({
      mutantPowers: powers as any[]
    });
  }, [updateCharacter]);

  // Déterminer automatiquement les pouvoirs mutants basés sur les attributs
  const determineMutantPowers = useCallback(() => {
    if (!character.primaryAttributes) return;

    const attributeSum = Object.values(character.primaryAttributes).reduce((sum, val) => sum + val, 0);
    const powerCount = calculateMutantPowerCount(attributeSum);

    // Cette fonction devrait être appelée avec des lancers de dés réels
    // Pour l'instant, on génère des IDs aléatoirement pour la démo
    const randomPowerIds: number[] = [];
    
    if (powerCount >= 1) {
      // Un pouvoir normal
      const normalId = Math.floor(Math.random() * NORMAL_MUTANT_POWERS.length) + 1;
      randomPowerIds.push(normalId);
    }
    
    if (powerCount >= 2) {
      // Un pouvoir exceptionnel
      const exceptionalId = Math.floor(Math.random() * EXCEPTIONAL_MUTANT_POWERS.length) + 101;
      randomPowerIds.push(exceptionalId);
    }
    
    if (powerCount >= 3) {
      // Un second pouvoir normal (différent du premier)
      let secondNormalId;
      do {
        secondNormalId = Math.floor(Math.random() * NORMAL_MUTANT_POWERS.length) + 1;
      } while (secondNormalId === randomPowerIds[0]);
      randomPowerIds.push(secondNormalId);
    }

    updateMutantPowers(randomPowerIds);
  }, [character.primaryAttributes, updateMutantPowers]);

  // Étape 6: Société secrète
  const updateSecretSociety = useCallback((societyId: number) => {
    const society = SECRET_SOCIETIES.find(s => s.id === societyId);
    if (society) {
      updateCharacter({
        secretSociety: {
          id: society.id,
          name: society.name,
          description: society.description,
          objectives: society.objectives
        }
      });
    }
  }, [updateCharacter]);

  // Étape 7: Compétences
  const updateSkills = useCallback((skills: any[], availablePoints: number) => {
    updateCharacter({
      skills,
      availableSkillPoints: availablePoints
    });
  }, [updateCharacter]);

  // Navigation entre les étapes
  const nextStep = useCallback(() => {
    setCharacter(prevCharacter => {
      const currentStep = prevCharacter.currentStep || 1;
      if (currentStep < 9) {
        const updatedCharacter = { ...prevCharacter, currentStep: currentStep + 1, lastModified: new Date() };
        localStorage.setItem('paranoia-character', JSON.stringify(updatedCharacter));
        return updatedCharacter;
      }
      return prevCharacter;
    });
  }, []);

  const previousStep = useCallback(() => {
    setCharacter(prevCharacter => {
      const currentStep = prevCharacter.currentStep || 1;
      if (currentStep > 1) {
        const updatedCharacter = { ...prevCharacter, currentStep: currentStep - 1, lastModified: new Date() };
        localStorage.setItem('paranoia-character', JSON.stringify(updatedCharacter));
        return updatedCharacter;
      }
      return prevCharacter;
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 9) {
      setCharacter(prevCharacter => {
        const updatedCharacter = { ...prevCharacter, currentStep: step, lastModified: new Date() };
        localStorage.setItem('paranoia-character', JSON.stringify(updatedCharacter));
        return updatedCharacter;
      });
    }
  }, []);

  // Validation de complétude pour chaque étape (sans useCallback pour éviter stale closures)
  const isStepComplete = (step: number): boolean => {
    const result = (() => {
      switch (step) {
        case 1: // Nom
          return !!(character.firstName && character.firstName.trim().length > 0 && 
                    character.unitCode && character.unitCode.trim().length === 3);
        case 2: // Attributs principaux
          return !!(character.primaryAttributes && 
            Object.values(character.primaryAttributes).every(val => val !== undefined && val > 0));
        case 3: // Attributs secondaires (automatiques)
          return !!character.secondaryAttributes;
        case 4: // Service
          return !!character.service;
        case 5: // Pouvoirs mutants
          return !!(character.mutantPowers && character.mutantPowers.length > 0);
        case 6: // Société secrète
          return !!character.secretSociety;
        case 7: // Compétences
          return !!(character.skills && character.availableSkillPoints === 0);
        case 8: // Équipement (toujours valide avec l'équipement de base)
          return !!(character.equipment && character.credits !== undefined);
        case 9: // Clones (automatique)
          return !!(character.clones && character.clones.length === 6);
        default:
          return false;
      }
    })();
    
    
    return result;
  };

  // Validation complète du personnage
  const isCharacterComplete = (): boolean => {
    return Array.from({ length: 9 }, (_, i) => i + 1).every(step => isStepComplete(step));
  };

  // Réinitialiser le personnage
  const resetCharacter = useCallback(() => {
    setCharacter(DEFAULT_CHARACTER);
    setRollHistory([]);
    localStorage.removeItem('paranoia-character');
    localStorage.removeItem('paranoia-roll-history');
  }, []);

  // Exporter le personnage
  const exportCharacter = useCallback(() => {
    const exportData = {
      character,
      rollHistory,
      exportedAt: new Date()
    };
    return JSON.stringify(exportData, null, 2);
  }, [character, rollHistory]);

  // Importer un personnage
  const importCharacter = useCallback((jsonData: string) => {
    try {
      const imported = JSON.parse(jsonData);
      if (imported.character) {
        // Reconstituer les dates
        if (imported.character.createdAt) {
          imported.character.createdAt = new Date(imported.character.createdAt);
        }
        if (imported.character.lastModified) {
          imported.character.lastModified = new Date(imported.character.lastModified);
        }
        saveCharacter(imported.character);
      }
      if (imported.rollHistory) {
        const historyWithDates = imported.rollHistory.map((roll: any) => ({
          ...roll,
          timestamp: new Date(roll.timestamp)
        }));
        saveRollHistory(historyWithDates);
      }
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'importation:', error);
      return false;
    }
  }, [saveCharacter, saveRollHistory]);

  return {
    // État
    character,
    rollHistory,
    
    // Actions
    updateCharacter,
    addRoll,
    
    // Actions spécialisées
    updateName,
    updatePrimaryAttributes,
    updateService,
    updateMutantPowers,
    determineMutantPowers,
    updateSecretSociety,
    updateSkills,
    
    // Navigation
    nextStep,
    previousStep,
    goToStep,
    
    // Validation
    isStepComplete,
    isCharacterComplete,
    
    // Utilitaires
    resetCharacter,
    exportCharacter,
    importCharacter,
    
    // Helpers calculés
    calculateSecondaryAttributes
  };
}