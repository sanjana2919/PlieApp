import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext<ThemeMode>('light');

export function ThemeProvider({ children }: { children: ReactNode }) {
    const system = useColorScheme(); // 'light' | 'dark' | null
    const [mode, setMode] = useState<ThemeMode>('light');

    useEffect(() => {
        setMode(system === 'dark' ? 'dark' : 'light');
    }, [system]);

    return <ThemeContext.Provider value={mode}>{children}</ThemeContext.Provider>;
}

export function useThemeMode(): ThemeMode {
    return useContext(ThemeContext);
}
