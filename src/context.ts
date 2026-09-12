import { createContext, useContext } from 'react';
import type { Screen, Role } from './types';

interface AppContextType {
  screen: Screen;
  navigate: (s: Screen) => void;
  role: Role;
  setRole: (r: Role) => void;
}

export const AppContext = createContext<AppContextType>({
  screen: 'landing',
  navigate: () => {},
  role: null,
  setRole: () => {},
});

export const useApp = () => useContext(AppContext);
