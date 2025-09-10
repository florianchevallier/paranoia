import React, { createContext, useContext, useMemo } from 'react';
import { useParanoiaCharacter } from "~/hooks/useParanoiaCharacter";

type CharacterContextValue = ReturnType<typeof useParanoiaCharacter>;

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const value = useParanoiaCharacter();
  const memo = useMemo(() => value, [value.character, value.rollHistory]);
  return (
    <CharacterContext.Provider value={memo}>{children}</CharacterContext.Provider>
  );
}

export function useCharacter() {
  const ctx = useContext(CharacterContext);
  if (!ctx) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return ctx;
}

