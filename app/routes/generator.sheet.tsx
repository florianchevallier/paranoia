import { useNavigate, useOutletContext } from "react-router";
import { useCharacter } from "~/context/CharacterContext";
import CharacterSheet from "~/components/CharacterSheet";

type OutletCtx = { showSecrets: boolean };

export default function GeneratorSheet() {
  const { character } = useCharacter();
  const { showSecrets } = useOutletContext<OutletCtx>();
  const navigate = useNavigate();
  return <CharacterSheet character={character} showSecrets={showSecrets} onBack={() => navigate(-1)} />;
}
