// DOM Elements
const featureCards = document.querySelectorAll('.fade-in-scroll');
const popInElements = document.querySelectorAll('.pop-in');

// Function to handle scroll animations
function handleScrollAnimations() {
    // Get current scroll position
    const scrollPosition = window.scrollY + window.innerHeight * 0.8;
    
    // Loop through all feature cards and check if they are in view
    featureCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition > cardPosition) {
            card.classList.add('visible');
        }
    });
    
    // Check if pop-in elements are in view
    popInElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition > elementPosition && !element.classList.contains('animated')) {
            element.classList.add('animated');
            element.style.animationPlayState = 'running';
        }
    });
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    // Initial check for elements in viewport
    setTimeout(handleScrollAnimations, 100);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Here you would typically send a request to your backend
            console.log('Login attempt:', { email });
            
            // For demo purposes, simulate a successful login
            alert('Вход выполнен успешно!');
            // Redirect to dashboard or home page
            // window.location.href = 'index.html';
        });
    }
    
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }
            
            // Here you would typically send a request to your backend
            console.log('Signup attempt:', { name, email });
            
            // For demo purposes, simulate a successful registration
            alert('Регистрация выполнена успешно!');
            // Redirect to login page or dashboard
            // window.location.href = 'login.html';
        });
    }
});

// Handle scroll events
window.addEventListener('scroll', handleScrollAnimations);