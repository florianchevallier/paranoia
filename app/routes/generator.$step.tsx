import { useParams, useOutletContext } from "react-router";
import { useCharacter } from "~/context/CharacterContext";
import Step1Name from "~/components/steps/Step1Name";
import Step2PrimaryAttributes from "~/components/steps/Step2PrimaryAttributes";
import Step3SecondaryAttributes from "~/components/steps/Step3SecondaryAttributes";
import Step4Service from "~/components/steps/Step4Service";
import Step5MutantPowers from "~/components/steps/Step5MutantPowers";
import Step6SecretSociety from "~/components/steps/Step6SecretSociety";
import Step7Skills from "~/components/steps/Step7Skills";
import Step8Equipment from "~/components/steps/Step8Equipment";
import Step9Clones from "~/components/steps/Step9Clones";

type OutletCtx = { showSecrets: boolean };

export default function GeneratorStep() {
  const { step } = useParams<"step">();
  const n = Number(step);
  const { character, updateCharacter, addRoll, updateName, updatePrimaryAttributes, updateService, updateMutantPowers, determineMutantPowers, updateSecretSociety, updateSkills } = useCharacter();
  const { showSecrets } = useOutletContext<OutletCtx>();

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
    updateSkills,
  } as const;

  switch (n) {
    case 1: return <Step1Name character={character} updateName={updateName} />;
    case 2: return <Step2PrimaryAttributes {...stepProps} />;
    case 3: return <Step3SecondaryAttributes {...stepProps} />;
    case 4: return <Step4Service {...stepProps} />;
    case 5: return <Step5MutantPowers {...stepProps} showSecrets={showSecrets} />;
    case 6: return <Step6SecretSociety {...stepProps} showSecrets={showSecrets} />;
    case 7: return <Step7Skills character={character} updateSkills={updateSkills} />;
    case 8: return <Step8Equipment {...stepProps} />;
    case 9: return <Step9Clones {...stepProps} />;
    default:
      return <div>Étape inconnue</div>;
  }
}
