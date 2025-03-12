document.addEventListener('DOMContentLoaded', function() {
    // 3D tilt effect for cards
    const tiltCards = document.querySelectorAll('.tilt-effect');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', tiltEffect);
        card.addEventListener('mouseleave', resetTilt);
    });

    function tiltEffect(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        const centerX = cardRect.left + cardWidth / 2;
        const centerY = cardRect.top + cardHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateX = (mouseY / (cardHeight / 2)) * -10;
        const rotateY = (mouseX / (cardWidth / 2)) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }

    function resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }

    // Card 3D effect
    const card3dElements = document.querySelectorAll('.card-3d');
    card3dElements.forEach(card => {
        card.addEventListener('mousemove', card3dEffect);
        card.addEventListener('mouseleave', resetCard3d);
    });

    function card3dEffect(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        const mouseX = e.clientX - cardRect.left;
        const mouseY = e.clientY - cardRect.top;
        const rotateY = ((mouseX / cardWidth) - 0.5) * 20;
        const rotateX = ((mouseY / cardHeight) - 0.5) * -20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function resetCard3d() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }

    // Parallax scrolling effect
    const parallaxSection = document.querySelector('.parallax-section');
    if (parallaxSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxSection.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
        });
    }

    // Handle scroll animations in a more efficient way
    const handleScrollAnimations = () => {
        const animElements = document.querySelectorAll('.fade-in-scroll, .scale-in-center, .text-focus-in, .tracking-in');
        const scrollPosition = window.scrollY + window.innerHeight * 0.8;
        
        animElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            
            if (scrollPosition > elementPosition && !element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Handle different animation types
                if (element.classList.contains('fade-in-scroll')) {
                    element.classList.add('visible');
                }
                
                if (element.classList.contains('scale-in-center') || 
                    element.classList.contains('text-focus-in') || 
                    element.classList.contains('tracking-in')) {
                    element.style.animationPlayState = 'running';
                }
            }
        });
    };
    
    // Initial check for elements in viewport
    setTimeout(handleScrollAnimations, 100);
    
    // Handle scroll events with debounce for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScrollAnimations, 10);
    });
    
    // Add animated underline effect to navigation links
    const navLinks = document.querySelectorAll('.hover-underline');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        link.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
    
    // Код для работы с мини-демо при наведении на блоки функций
    // Находим все карточки с функциями
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Для каждой карточки настраиваем интерактивность
    featureCards.forEach(card => {
        const demoPanel = card.querySelector('.feature-demo');
        
        // Переменная для хранения таймера задержки
        let hoverTimer;
        
        // При наведении на карточку
        card.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimer); // Очищаем предыдущий таймер
            
            // Устанавливаем небольшую задержку перед показом демо
            hoverTimer = setTimeout(() => {
                if (demoPanel) {
                    demoPanel.classList.add('active');
                    demoPanel.style.opacity = '1';
                    demoPanel.style.transform = 'translateY(0)';
                    
                    // Делаем содержимое демо скроллируемым
                    const demoContent = demoPanel.querySelector('.demo-content');
                    if (demoContent) {
                        demoContent.style.overflowY = 'auto';
                    }
                    
                    // Анимируем элементы внутри демо
                    animateDemoContent(demoPanel);
                }
            }, 200); // Уменьшенная задержка до 200мс
        });
        
        // При уходе курсора с карточки
        card.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimer); // Очищаем таймер
            
            if (demoPanel) {
                demoPanel.classList.remove('active');
                demoPanel.style.opacity = '0';
                demoPanel.style.transform = 'translateY(10px)';
                
                // Сбрасываем прокрутку содержимого
                const demoContent = demoPanel.querySelector('.demo-content');
                if (demoContent) {
                    // Возвращаем скролл вверх с задержкой
                    setTimeout(() => {
                        demoContent.scrollTop = 0;
                    }, 300);
                }
            }
        });
        
        // Предотвращаем закрытие демо при скролле внутри него
        if (demoPanel) {
            demoPanel.addEventListener('wheel', function(e) {
                e.stopPropagation(); // Останавливаем всплытие события прокрутки
            });
            
            demoPanel.addEventListener('touchmove', function(e) {
                e.stopPropagation(); // Останавливаем всплытие события для тачскринов
            });
        }
    });
    
    // Улучшенная функция для анимации появления контента в демо
    function animateDemoContent(demoPanel) {
        const elements = demoPanel.querySelectorAll('.demo-content > div > *');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            
            // Используем requestAnimationFrame для более плавной анимации
            requestAnimationFrame(() => {
                // Добавляем минимальную задержку для более плавного появления
                setTimeout(() => {
                    el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 30 * index); // Очень короткая задержка между элементами
            });
        });
    }
    
    // Настройка интерактивности в демо блоках
    setupDemoInteractions();
});

// Функция для настройки интерактивности в демо блоках
function setupDemoInteractions() {
    // Интерактивность для фильтров активности
    const activityFilters = document.querySelectorAll('.activity-filters .filter-button');
    
    activityFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие
            
            activityFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Интерактивность для табов в топе проектов
    const topTabs = document.querySelectorAll('.top-tab');
    
    topTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие
            
            topTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Интерактивность для кнопок связи в сообществе
    const connectionButtons = document.querySelectorAll('.connection-button');
    
    connectionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие
            
            const originalText = this.textContent;
            this.textContent = 'Запрос отправлен';
            this.style.backgroundColor = 'var(--success-color, #00b894)';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1500); // Сократил время показа до 1.5 секунд
        });
    });
    
    // Набор текста в поле поиска
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        const demoPanel = input.closest('.feature-demo');
        
        if (demoPanel) {
            // Отслеживаем, когда демо становится видимым
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.target.classList.contains('active') || 
                        parseFloat(getComputedStyle(mutation.target).opacity) > 0) {
                        typeSearchText(input);
                        observer.disconnect(); // Отключаем после первого срабатывания
                    }
                });
            });
            
            // Наблюдаем за изменениями классов и стилей
            observer.observe(demoPanel, {
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
    });
    
    // Функция для имитации набора текста
    function typeSearchText(input) {
        if (!input) return;
        
        const searchText = "react";
        input.value = ""; // Сбрасываем текущее значение
        
        // Используем requestAnimationFrame для более плавной анимации
        requestAnimationFrame(() => {
            for (let i = 0; i < searchText.length; i++) {
                setTimeout(() => {
                    input.value += searchText.charAt(i);
                    
                    if (i === searchText.length - 1) {
                        input.classList.add('cursor-blink');
                    }
                }, 80 * i); // Ускоренный набор
            }
        });
    }
    
    // Анимация прогресс-баров
    const progressBars = document.querySelectorAll('.achievement-progress .progress-bar');
    
    progressBars.forEach(progressBar => {
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0';
        
        const demoPanel = progressBar.closest('.feature-demo');
        
        if (demoPanel) {
            // Отслеживаем, когда демо становится видимым
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.target.classList.contains('active') || 
                        parseFloat(getComputedStyle(mutation.target).opacity) > 0) {
                        // Добавляем минимальную задержку перед анимацией
                        setTimeout(() => {
                            progressBar.style.transition = 'width 0.8s ease-out';
                            progressBar.style.width = targetWidth;
                        }, 100);
                        
                        observer.disconnect(); // Отключаем после первого срабатывания
                    }
                });
            });
            
            // Наблюдаем за изменениями классов и стилей
            observer.observe(demoPanel, {
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
    });
    
    // Анимация достижений
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    achievementItems.forEach((item, index) => {
        const demoPanel = item.closest('.feature-demo');
        
        if (demoPanel && index === 0) { // Анимируем только первое достижение
            // Отслеживаем, когда демо становится видимым
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.target.classList.contains('active') || 
                        parseFloat(getComputedStyle(mutation.target).opacity) > 0) {
                        // Добавляем пульсацию с задержкой
                        setTimeout(() => {
                            item.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
                            item.style.transform = 'scale(1.03)';
                            item.style.boxShadow = '0 0 15px rgba(108, 92, 231, 0.3)';
                            
                            setTimeout(() => {
                                item.style.transform = '';
                                item.style.boxShadow = '';
                            }, 800);
                        }, 500);
                        
                        observer.disconnect(); // Отключаем после первого срабатывания
                    }
                });
            });
            
            // Наблюдаем за изменениями классов и стилей
            observer.observe(demoPanel, {
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }
    });
}