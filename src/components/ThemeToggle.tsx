import { useTheme } from "../context/ThemeContext";
import styles from "./styles.module.css" ;

const ThemeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    const isDark = theme === 'light' ? false: true;

    return (
        <label 
            className={`${styles.container} ${isDark ? styles.IsDark : styles.IsLight}`} 
            title={isDark ? "Activate light mode" : "Activate dark mode"}
            aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
        >
            <input 
                type="checkbox"
                defaultChecked ={!isDark}
                onChange={toggleTheme}
            />
            <div />
        </label>
    );
}

export default ThemeToggle;