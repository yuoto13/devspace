// DOM Elements
const toggleSwitch = document.querySelector('#checkbox');
const themeStylesheet = document.querySelector('#theme-style');
const rootElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        themeStylesheet.href = 'css/dark-theme.css';
        rootElement.classList.remove('light-theme');
        rootElement.classList.add('dark-theme');
        toggleSwitch.checked = true;
    } else {
        themeStylesheet.href = 'css/light-theme.css';
        rootElement.classList.remove('dark-theme');
        rootElement.classList.add('light-theme');
        toggleSwitch.checked = false;
    }
    
    // Save user preference to localStorage
    localStorage.setItem('devspace-theme', theme);
}

// Event listener for theme switch
toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Initial theme setup - check for saved preference or use system preference
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('devspace-theme');
    
    if (savedTheme) {
        // Use saved preference
        setTheme(savedTheme);
    } else {
        // Check if system prefers dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
    
    // Make theme switch visible after theme is set to prevent flash
    toggleSwitch.parentElement.style.opacity = '1';
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const newTheme = e.matches ? 'dark' : 'light';
    // Only apply if user hasn't set a preference
    if (!localStorage.getItem('devspace-theme')) {
        setTheme(newTheme);
    }
});