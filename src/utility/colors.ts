// utility/colors.ts
import { ThemeMode } from "../context/ThemeContext";

export const baseColors = {
    black: '#000000',
    white: '#ffffff',
    gray: {
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },
    blue: {
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A',
    }
};

export const lightColors = {
    background: '#ffffffff',
    text: '#111827',
    reverseBackground: '#000000ff',
    reverseText: '#ecf2ffff',
    placeholder: '#9CA3AF',
    subtitle: '#6B7280', // gray-500
    buttonText: '#ffffffff', // white
    label: '#374151', // gray-700

    // Semantic colors
    primary: '#3B82F6', // blue-500
    secondary: '#6B7280', // gray-500
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',

    // Border and divider
    border: '#D1D5DB', // gray-300
    divider: '#E5E7EB', // gray-200

    // Input background
    inputBackground: '#ffffffff',
};

export const darkColors = {
    background: '#000000ff',
    text: '#E6EEF3',
    reverseBackground: '#ffffffff',
    reverseText: '#000000ff',
    placeholder: '#9CA3AF',

    // Additional colors for text variants
    subtitle: '#9CA3AF', // gray-400
    buttonText: '#000000ff', // black
    label: '#D1D5DB', // gray-300

    // Semantic colors
    primary: '#60A5FA', // blue-400
    secondary: '#9CA3AF', // gray-400
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
    info: '#60A5FA',

    // Border and divider
    border: '#4B5563', // gray-600
    divider: '#374151', // gray-700

    // Input background
    inputBackground: '#111827', // gray-900
};

// function that picks theme colors
export const getColors = (mode: ThemeMode) => {
    return {
        ...baseColors,
        ...(mode === 'dark' ? darkColors : lightColors),
    };
};