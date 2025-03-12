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
        const closeBtn = card.querySelector('.demo-close');
        
        // Если нашли кнопку закрытия, добавляем обработчик
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Останавливаем всплытие события
                demoPanel.style.opacity = '0';
                demoPanel.style.transform = 'translateY(20px)';
                
                // Восстанавливаем взаимодействие через 300мс (после завершения анимации)
                setTimeout(() => {
                    demoPanel.style.pointerEvents = 'none';
                }, 300);
            });
        }
        
        // Когда пользователь кликает по карточке, показываем демо
        card.addEventListener('click', function() {
            // Только если демо панель существует и не отображается
            if (demoPanel && demoPanel.style.opacity !== '1') {
                demoPanel.style.opacity = '1';
                demoPanel.style.transform = 'translateY(0)';
                demoPanel.style.pointerEvents = 'auto';
                
                // Добавляем анимацию появления
                animateDemoContent(demoPanel);
            }
        });
        
        // Альтернативный способ: при наведении показываем демо с задержкой
        let hoverTimer;
        
        card.addEventListener('mouseenter', function() {
            // Устанавливаем таймер для показа мини-демо
            hoverTimer = setTimeout(() => {
                if (demoPanel && demoPanel.style.opacity !== '1') {
                    demoPanel.style.opacity = '1';
                    demoPanel.style.transform = 'translateY(0)';
                    demoPanel.style.pointerEvents = 'auto';
                    
                    // Добавляем анимацию появления
                    animateDemoContent(demoPanel);
                }
            }, 600); // Задержка перед появлением
        });
        
        card.addEventListener('mouseleave', function() {
            // Очищаем таймер, если мышь убрали раньше
            clearTimeout(hoverTimer);
            
            // Скрываем мини-демо
            if (demoPanel && demoPanel.style.opacity === '1') {
                demoPanel.style.opacity = '0';
                demoPanel.style.transform = 'translateY(20px)';
                
                // Восстанавливаем взаимодействие через 300мс
                setTimeout(() => {
                    demoPanel.style.pointerEvents = 'none';
                }, 300);
            }
        });
    });
    
    // Функция для пошаговой анимации элементов внутри демо панели
    function animateDemoContent(demoPanel) {
        // Получаем все элементы, которые нужно анимировать
        const elements = demoPanel.querySelectorAll('.demo-content > div > *');
        
        // Для каждого элемента добавляем анимацию с задержкой
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Устанавливаем таймер для появления каждого элемента
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 50)); // Постепенное появление
        });
    }
    
    // Настройка интерактивности в демо блоках
    setupFeatureDemoInteractions();
});

// Функция для настройки интерактивности в демо блоках
function setupFeatureDemoInteractions() {
    // Интерактивность для фильтров активности
    const activityFilters = document.querySelectorAll('.activity-filters .filter-button');
    
    activityFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем закрытие демо
            
            // Убираем активный класс у всех фильтров
            activityFilters.forEach(f => f.classList.remove('active'));
            
            // Добавляем активный класс нажатому фильтру
            this.classList.add('active');
        });
    });
    
    // Интерактивность для табов в топе проектов
    const topTabs = document.querySelectorAll('.top-tab');
    
    topTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем закрытие демо
            
            // Убираем активный класс у всех табов
            topTabs.forEach(t => t.classList.remove('active'));
            
            // Добавляем активный класс нажатому табу
            this.classList.add('active');
        });
    });
    
    // Интерактивность для кнопок связи в сообществе
    const connectionButtons = document.querySelectorAll('.connection-button');
    
    connectionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем закрытие демо
            
            // Изменяем текст кнопки
            const originalText = this.textContent;
            this.textContent = 'Запрос отправлен';
            this.style.backgroundColor = 'var(--success-color, #00b894)';
            
            // Возвращаем исходный текст через 2 секунды
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Добавляем эффект набора текста в поле поиска
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        const searchText = "react";
        
        // Функция для симуляции набора текста
        function typeSearchText() {
            // Сбрасываем значение поля
            searchInput.value = "";
            
            // Постепенно набираем текст
            for (let i = 0; i < searchText.length; i++) {
                setTimeout(() => {
                    searchInput.value += searchText.charAt(i);
                    
                    // Добавляем эффект мигающего курсора после завершения набора
                    if (i === searchText.length - 1) {
                        searchInput.classList.add('cursor-blink');
                    }
                }, 150 * i); // Время между нажатиями клавиш
            }
        }
        
        // Обсервер для запуска эффекта набора, когда блок поиска появляется в видимой области
        const searchDemo = document.querySelector('.search-demo');
        
        if (searchDemo) {
            // Проверяем, доступен ли IntersectionObserver
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Запускаем набор текста с небольшой задержкой
                            setTimeout(typeSearchText, 500);
                            
                            // Отключаем наблюдатель после первого срабатывания
                            observer.disconnect();
                        }
                    });
                }, { threshold: 0.1 });
                
                // Начинаем наблюдение за блоком поиска
                observer.observe(searchDemo);
            } else {
                // Запасной вариант, если IntersectionObserver не поддерживается
                setTimeout(typeSearchText, 1000);
            }
        }
    }
    
    // Добавляем анимацию прогресс-баров в достижениях
    const progressBars = document.querySelectorAll('.achievement-progress .progress-bar');
    
    progressBars.forEach(progressBar => {
        // Сохраняем исходную ширину
        const targetWidth = progressBar.style.width;
        
        // Сбрасываем ширину
        progressBar.style.width = '0';
        
        // Проверяем, доступен ли IntersectionObserver
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Анимируем ширину до целевого значения
                        setTimeout(() => {
                            progressBar.style.transition = 'width 1s ease-out';
                            progressBar.style.width = targetWidth;
                        }, 300);
                        
                        // Отключаем наблюдатель после первого срабатывания
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.1 });
            
            // Начинаем наблюдение за прогресс-баром
            observer.observe(progressBar);
        } else {
            // Запасной вариант, если IntersectionObserver не поддерживается
            setTimeout(() => {
                progressBar.style.transition = 'width 1s ease-out';
                progressBar.style.width = targetWidth;
            }, 1000);
        }
    });
    
    // Добавляем "живую" анимацию для блока геймификации
    const gamificationDemo = document.querySelector('.gamification-demo');
    
    if (gamificationDemo) {
        // Проверяем, доступен ли IntersectionObserver
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Добавляем анимацию "уведомления" к достижениям
                        setTimeout(() => {
                            const firstAchievement = gamificationDemo.querySelector('.achievement-item:first-child');
                            if (firstAchievement) {
                                // Создаем эффект пульсации
                                firstAchievement.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                                firstAchievement.style.transform = 'scale(1.05)';
                                firstAchievement.style.boxShadow = '0 0 15px rgba(108, 92, 231, 0.5)';
                                
                                // Возвращаем в нормальное состояние
                                setTimeout(() => {
                                    firstAchievement.style.transform = '';
                                    firstAchievement.style.boxShadow = '';
                                }, 1000);
                            }
                        }, 1500);
                        
                        // Отключаем наблюдатель после первого срабатывания
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.1 });
            
            // Начинаем наблюдение за блоком геймификации
            observer.observe(gamificationDemo);
        } else {
            // Запасной вариант, если IntersectionObserver не поддерживается
            setTimeout(() => {
                const firstAchievement = gamificationDemo.querySelector('.achievement-item:first-child');
                if (firstAchievement) {
                    firstAchievement.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                    firstAchievement.style.transform = 'scale(1.05)';
                    firstAchievement.style.boxShadow = '0 0 15px rgba(108, 92, 231, 0.5)';
                    
                    setTimeout(() => {
                        firstAchievement.style.transform = '';
                        firstAchievement.style.boxShadow = '';
                    }, 1000);
                }
            }, 2000);
        }
    }
}