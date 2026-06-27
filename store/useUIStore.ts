import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  isMenuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      isMenuOpen: false,
      setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
    }),
    {
      name: "ui-store",
    }
  )
);
