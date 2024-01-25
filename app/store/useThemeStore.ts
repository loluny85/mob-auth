import {create} from'zustand';
import themes, {Theme, ThemeKey} from '../config/themes';

type TState = {
    theme: Theme;
    setTheme: (countryCode: ThemeKey) => void;
    isRtl: boolean;
    setIsRtl: (countryCode: ThemeKey) => void
}

const useThemeStore = create<TState>(set => ({
    theme: themes['default'],
    setTheme: (countryCode: ThemeKey) => {set({ theme: themes[countryCode] ?? themes['default'] })},
    isRtl: false,
    setIsRtl: (countryCode: ThemeKey) => set({ isRtl: countryCode === 'ar'})
}));

export default useThemeStore;