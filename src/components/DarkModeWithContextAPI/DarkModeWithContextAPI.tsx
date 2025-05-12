import { ThemeProvider, useTheme } from './theme-context';
import './DarkModeWithContextAPI.css'; // light/dark 클래스를 여기서 스타일링

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>현재 테마: {theme} (클릭하여 전환)</button>
  );
}

function Page() {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <h1>Context로 다크모드 관리하기 🌗</h1>
      <ThemeToggleButton />
    </div>
  );
}

export default function DarkModeWithContextAPI() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}
