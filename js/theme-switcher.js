// DOM Elements
const toggleSwitch = document.querySelector('#checkbox');
const themeStylesheet = document.querySelector('#theme-style');
const rootElement = document.documentElement;
const slider = document.querySelector('.slider');

// Function to set theme with animation
function setTheme(theme, animate = true) {
    if (animate) {
        // Add transition class for smooth page transition
        document.body.classList.add('theme-transition');
        
        // Remove the transition class after the transition has completed
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    }
    
    if (theme === 'dark') {
        themeStylesheet.href = 'css/dark-theme.css';
        rootElement.classList.remove('light-theme');
        rootElement.classList.add('dark-theme');
        toggleSwitch.checked = true;
        
        // Add animation class for dark mode
        if (slider) {
            slider.classList.add('night-animation');
            setTimeout(() => {
                slider.classList.remove('night-animation');
            }, 1500);
        }
    } else {
        themeStylesheet.href = 'css/light-theme.css';
        rootElement.classList.remove('dark-theme');
        rootElement.classList.add('light-theme');
        toggleSwitch.checked = false;
        
        // Add animation class for light mode
        if (slider) {
            slider.classList.add('day-animation');
            setTimeout(() => {
                slider.classList.remove('day-animation');
            }, 1500);
        }
    }
    
    // Save user preference to localStorage
    localStorage.setItem('devspace-theme', theme);
}

// Event listener for theme switch with animation
toggleSwitch.addEventListener('change', function() {
    // Add sound effect if wanted
    // const clickSound = new Audio('sounds/switch-click.mp3');
    // clickSound.play();
    
    // Show ripple effect
    if (slider) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        slider.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
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
        // Use saved preference, but don't animate on initial load
        setTheme(savedTheme, false);
    } else {
        // Check if system prefers dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            setTheme('dark', false);
        } else {
            setTheme('light', false);
        }
    }
    
    // Make theme switch visible after theme is set to prevent flash
    if (toggleSwitch.parentElement) {
        toggleSwitch.parentElement.style.opacity = '1';
    }
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const newTheme = e.matches ? 'dark' : 'light';
    // Only apply if user hasn't set a preference
    if (!localStorage.getItem('devspace-theme')) {
        setTheme(newTheme);
    }
});