import type { Route } from "./+types/generator";
import CharacterGenerator from "../components/CharacterGenerator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Générateur Paranoia - Créer un Personnage" },
    { name: "description", content: "Créez votre Clarificateur d'Accréditation ROUGE pour le JDR Paranoia" },
  ];
}

export default function GeneratorPage() {
  return <CharacterGenerator />;
}