import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { ThemeMode } from '../lib/theme';
import type { AvatarConfig } from '../lib/supabase';

export type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_config: AvatarConfig;
  xp: number;
  level: number;
  streak: number;
};

type AppStore = {
  theme: ThemeMode;
  toggleTheme: () => void;
  session: any;
  profile: Profile | null;
  setSession: (session: any) => void;
  setProfile: (profile: Profile | null) => void;
  signOut: () => Promise<void>;
};

export const useStore = create<AppStore>((set) => ({
  theme: 'dark',
  toggleTheme: () =>
    set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  session: null,
  profile: null,
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, profile: null });
  },
}));
