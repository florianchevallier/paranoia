// Étape 7: Choisir et Calculer les Compétences
import React, { useState, useCallback } from 'react';
import { SkillCategory, type ParanoiaCharacter } from '~/types/paranoia';
import { calculateSkillPercentage } from '~/data/paranoia-tables';

interface Step7SkillsProps {
  character: Partial<ParanoiaCharacter>;
  updateSkills: (skills: any[], availablePoints: number) => void;
}

// Définition des compétences par catégorie
const SKILL_CATEGORIES = {
  [SkillCategory.BASIC_ACTIVITIES]: {
    name: "Activités de Base",
    skills: [
      { id: 'activites-de-base', name: 'Activités de Base', level: 1, bonus: 'credibilityBonus' },
      { id: 'combat-corps-a-corps', name: 'Combat corps à corps', level: 1, bonus: 'meleeBonus' },
      { id: 'combat-armes-de-tir', name: 'Combat armes de tir', level: 1, bonus: 'rangedBonus' }
    ]
  },
  [SkillCategory.PERSONAL_DEVELOPMENT]: {
    name: "Développement Personnel",
    skills: [
      { id: 'developpement-personnel', name: 'Développement Personnel', level: 1, bonus: 'credibilityBonus' },
      { id: 'charme', name: 'Charme', level: 1, bonus: 'credibilityBonus' },
      { id: 'intimidation', name: 'Intimidation', level: 1, bonus: 'credibilityBonus' },
      { id: 'bureaucratie', name: 'Bureaucratie', level: 1, bonus: 'credibilityBonus' }
    ]
  },
  [SkillCategory.TECHNICAL_SERVICES]: {
    name: "Services Techniques",
    skills: [
      { id: 'reparation-mecanique', name: 'Réparation mécanique', level: 1, bonus: 'repairBonus' },
      { id: 'reparation-electronique', name: 'Réparation électronique', level: 1, bonus: 'repairBonus' },
      { id: 'programmation', name: 'Programmation', level: 1, bonus: 'repairBonus' },
      { id: 'recherche-bibliotheque', name: 'Recherche & bibliothèque', level: 1, bonus: 'comprehensionBonus' }
    ]
  },
  [SkillCategory.VEHICLE_SERVICES]: {
    name: "Services Véhiculaires",
    skills: [
      { id: 'conduite', name: 'Conduite', level: 1, bonus: 'rangedBonus' },
      { id: 'pilotage', name: 'Pilotage', level: 1, bonus: 'rangedBonus' },
      { id: 'reparation-vehicule', name: 'Réparation de véhicule', level: 1, bonus: 'repairBonus' }
    ]
  },
  [SkillCategory.HOSTILE_ENVIRONMENT]: {
    name: "Environnement Hostile",
    skills: [
      { id: 'survie-exterieur', name: 'Survie extérieur', level: 1, bonus: 'comprehensionBonus' },
      { id: 'detection', name: 'Détection', level: 1, bonus: 'comprehensionBonus' },
      { id: 'demolition', name: 'Démolition', level: 1, bonus: 'comprehensionBonus' }
    ]
  }
};

// Spécialisations par service (basé sur les règles)
const SERVICE_SPECIALIZATIONS: { [key: string]: SkillCategory[] } = {
  "Sécurité Interne": [SkillCategory.BASIC_ACTIVITIES],
  "Services Techniques": [SkillCategory.TECHNICAL_SERVICES],
  "Préservation et Développement de l'Habitat et Contrôle Mental": [SkillCategory.PERSONAL_DEVELOPMENT],
  "Forces Armées": [SkillCategory.BASIC_ACTIVITIES, SkillCategory.VEHICLE_SERVICES, SkillCategory.HOSTILE_ENVIRONMENT],
  "Production, Logistique et Intendance": [SkillCategory.TECHNICAL_SERVICES, SkillCategory.VEHICLE_SERVICES],
  "Service de l'Energie": [SkillCategory.TECHNICAL_SERVICES, SkillCategory.VEHICLE_SERVICES],
  "Recherche et Conception": [SkillCategory.TECHNICAL_SERVICES],
  "Unité Centrale de Traitement": [SkillCategory.BASIC_ACTIVITIES, SkillCategory.PERSONAL_DEVELOPMENT, SkillCategory.TECHNICAL_SERVICES, SkillCategory.VEHICLE_SERVICES, SkillCategory.HOSTILE_ENVIRONMENT]
};

export default function Step7Skills({ character, updateSkills }: Step7SkillsProps) {
  
  // État local pour les points de compétences alloués
  const [allocatedSkills, setAllocatedSkills] = useState<{[key: string]: number}>(() => {
    // Initialiser avec les compétences obligatoires
    const initial: {[key: string]: number} = {
      'activites-de-base': 1,
      'combat-armes-de-tir': 2,
      'developpement-personnel': 1
    };
    
    // Ajouter les compétences existantes du personnage
    if (character.skills) {
      character.skills.forEach(skill => {
        initial[skill.id] = skill.level;
      });
    }
    
    return initial;
  });

  // Calculer les points utilisés
  const usedPoints = Object.values(allocatedSkills).reduce((sum, level) => sum + level, 0);
  const remainingPoints = 6 - usedPoints;

  // Obtenir les catégories autorisées pour ce service
  const allowedCategories = character.service 
    ? SERVICE_SPECIALIZATIONS[character.service.name] || []
    : [];

  // Calculer le pourcentage d'une compétence
  const getSkillPercentage = useCallback((skillId: string, level: number) => {
    const skill = Object.values(SKILL_CATEGORIES)
      .flatMap(cat => cat.skills)
      .find(s => s.id === skillId);
    
    if (!skill || !character.secondaryAttributes) return 15 + (level * 5);
    
    const bonusKey = skill.bonus as keyof typeof character.secondaryAttributes;
    const attributeBonus = character.secondaryAttributes[bonusKey] || 0;
    
    return calculateSkillPercentage(level, attributeBonus);
  }, [character.secondaryAttributes]);

  // Allouer des points à une compétence
  const allocateSkill = useCallback((skillId: string) => {
    if (remainingPoints <= 0) return;
    
    setAllocatedSkills(prev => ({
      ...prev,
      [skillId]: (prev[skillId] || 0) + 1
    }));
  }, [remainingPoints]);

  // Retirer des points d'une compétence
  const deallocateSkill = useCallback((skillId: string) => {
    setAllocatedSkills(prev => {
      const currentLevel = prev[skillId] || 0;
      if (currentLevel <= 0) return prev;
      
      const newAllocation = { ...prev };
      if (currentLevel === 1) {
        delete newAllocation[skillId];
      } else {
        newAllocation[skillId] = currentLevel - 1;
      }
      
      return newAllocation;
    });
  }, []);

  // Sauvegarder les compétences
  const saveSkills = useCallback(() => {
    const skills = Object.entries(allocatedSkills).map(([skillId, level]) => {
      const skill = Object.values(SKILL_CATEGORIES)
        .flatMap(cat => cat.skills)
        .find(s => s.id === skillId);
      
      if (!skill) return null;
      
      return {
        id: skillId,
        name: skill.name,
        level,
        percentage: getSkillPercentage(skillId, level),
        category: Object.keys(SKILL_CATEGORIES).find(catKey => 
          SKILL_CATEGORIES[catKey as SkillCategory].skills.some(s => s.id === skillId)
        ) as SkillCategory
      };
    }).filter(s => s !== null);
    
    updateSkills(skills, remainingPoints);
  }, [allocatedSkills, getSkillPercentage, remainingPoints, updateSkills]);

  // Sauvegarder automatiquement quand l'allocation change
  React.useEffect(() => {
    saveSkills();
  }, [allocatedSkills]);

  return (
    <div className="space-y-6">
      {/* En-tête avec les règles */}
      <div className="bg-red-900/30 border border-red-600 rounded-lg p-4">
        <h3 className="font-bold text-red-300 mb-2">Système de Compétences</h3>
        <div className="text-sm text-red-400 space-y-2">
          <p><strong>Points disponibles :</strong> 6 au total</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div className="bg-red-950/50 p-3 rounded">
              <h4 className="font-bold text-red-300 mb-1">Points Obligatoires (3)</h4>
              <ul className="text-xs space-y-1">
                <li>• Activités de Base (1)</li>
                <li>• Combat Armes de Tir (2)</li>
                <li>• Développement Personnel (1)</li>
              </ul>
            </div>
            <div className="bg-red-950/50 p-3 rounded">
              <h4 className="font-bold text-red-300 mb-1">Spécialité Service (2)</h4>
              <p className="text-xs">
                Dans les catégories autorisées par votre service : <strong>{character.service?.name || "Non défini"}</strong>
              </p>
            </div>
            <div className="bg-red-950/50 p-3 rounded">
              <h4 className="font-bold text-red-300 mb-1">Point Optionnel (1)</h4>
              <p className="text-xs">Où vous voulez, en respectant la hiérarchie</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compteur de points */}
      <div className="bg-black border-2 border-red-600 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-red-100 mb-2">
          Points restants : <span className={remainingPoints === 0 ? "text-green-400" : "text-red-400"}>
            {remainingPoints}
          </span> / 6
        </div>
        <div className="text-sm text-red-400">
          Points utilisés : {usedPoints}
        </div>
      </div>

      {/* Compétences obligatoires */}
      <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
        <h3 className="font-bold text-yellow-300 mb-3">Compétences Obligatoires</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-yellow-950/30 rounded">
            <div>
              <span className="font-semibold text-yellow-200">Activités de Base (1)</span>
              <div className="text-sm text-yellow-400">Pourcentage : {getSkillPercentage('activites-de-base', 1)}%</div>
            </div>
            <div className="text-yellow-300">✅ Obligatoire</div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-yellow-950/30 rounded">
            <div>
              <span className="font-semibold text-yellow-200">Combat Armes de Tir (2)</span>
              <div className="text-sm text-yellow-400">Pourcentage : {getSkillPercentage('combat-armes-de-tir', 2)}%</div>
            </div>
            <div className="text-yellow-300">✅ Obligatoire</div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-yellow-950/30 rounded">
            <div>
              <span className="font-semibold text-yellow-200">Développement Personnel (1)</span>
              <div className="text-sm text-yellow-400">Pourcentage : {getSkillPercentage('developpement-personnel', 1)}%</div>
            </div>
            <div className="text-yellow-300">✅ Obligatoire</div>
          </div>
        </div>
      </div>

      {/* Catégories de compétences disponibles */}
      {Object.entries(SKILL_CATEGORIES).map(([categoryKey, category]) => {
        const isAllowed = allowedCategories.includes(categoryKey as SkillCategory) || 
                         character.service?.name === "Unité Centrale de Traitement";
        
        if (!isAllowed && categoryKey !== SkillCategory.BASIC_ACTIVITIES && categoryKey !== SkillCategory.PERSONAL_DEVELOPMENT) {
          return null;
        }

        return (
          <div key={categoryKey} className="bg-red-950/20 border border-red-700 rounded-lg p-4">
            <h3 className="font-bold text-red-300 mb-3 flex items-center justify-between">
              {category.name}
              {isAllowed && (
                <span className="text-xs bg-green-800 px-2 py-1 rounded text-green-200">
                  Autorisé par votre service
                </span>
              )}
            </h3>
            
            <div className="grid gap-3">
              {category.skills.map((skill) => {
                const currentLevel = allocatedSkills[skill.id] || 0;
                const canAllocate = remainingPoints > 0;
                const canDeallocate = currentLevel > 0 && skill.id !== 'activites-de-base' && 
                                    skill.id !== 'combat-armes-de-tir' && skill.id !== 'developpement-personnel';
                
                return (
                  <div key={skill.id} className="flex justify-between items-center p-3 bg-red-900/30 rounded">
                    <div className="flex-1">
                      <div className="font-semibold text-red-200">
                        {skill.name} ({currentLevel || 0})
                      </div>
                      <div className="text-sm text-red-400">
                        Pourcentage : {getSkillPercentage(skill.id, currentLevel || 1)}%
                      </div>
                    </div>
                    
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => deallocateSkill(skill.id)}
                        disabled={!canDeallocate}
                        className="w-8 h-8 bg-red-700 hover:bg-red-600 disabled:bg-red-900 disabled:text-red-600 text-white rounded font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-red-200 font-bold">{currentLevel || 0}</span>
                      <button
                        onClick={() => allocateSkill(skill.id)}
                        disabled={!canAllocate}
                        className="w-8 h-8 bg-red-700 hover:bg-red-600 disabled:bg-red-900 disabled:text-red-600 text-white rounded font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Validation */}
      {remainingPoints === 0 && (
        <div className="text-center p-4 bg-green-900/50 border border-green-600 rounded-lg">
          <p className="text-green-300 font-bold">
            ✅ Tous les points de compétences ont été alloués !
          </p>
          <p className="text-sm text-green-400 mt-1">
            Formule de calcul : Pourcentage = 15% + (Niveau × 5%) + Bonus d'attribut
          </p>
        </div>
      )}
    </div>
  );
}