import { createContext, useContext, useState, ReactNode } from 'react';

// 테마 타입 정의
type Theme = 'light' | 'dark';

// Context 타입 정의
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// 기본값 없이 Context 생성 (타입 안전을 위해 undefined 허용)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider 컴포넌트
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 커스텀 훅으로 간편하게 Context 사용
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error('useTheme은 ThemeProvider 내부에서 사용해야 합니다.');
  return context;
}
