document.addEventListener('DOMContentLoaded', function() {
    // Инициализация сетки узлов для технологической анимации
    const nodesContainer = document.querySelector('.nodes-animation');
    if (!nodesContainer) return;
    
    // Создаем массив для узлов и связей
    const nodes = [];
    const connections = [];
    const maxNodes = 30; // Количество узлов в сетке
    const connectionDistance = 150; // Максимальное расстояние для соединения узлов
    
    // Получаем размеры контейнера
    const containerWidth = nodesContainer.clientWidth;
    const containerHeight = nodesContainer.clientHeight;
    
    // Создаем узлы в случайных позициях
    for (let i = 0; i < maxNodes; i++) {
        createNode();
    }
    
    // Обновляем связи между узлами
    updateConnections();
    
    // Начинаем анимацию
    requestAnimationFrame(animateNodes);
    
    // Функция для создания нового узла
    function createNode() {
        const node = document.createElement('div');
        node.className = 'node';
        
        // Задаем случайную позицию
        const x = Math.random() * containerWidth;
        const y = Math.random() * containerHeight;
        
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        
        // Задаем скорость движения
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        
        // Сохраняем данные о узле
        nodes.push({
            element: node,
            x: x,
            y: y,
            speedX: speedX,
            speedY: speedY
        });
        
        // Добавляем узел в контейнер
        nodesContainer.appendChild(node);
    }
    
    // Функция для обновления связей между узлами
    function updateConnections() {
        // Удаляем существующие связи
        connections.forEach(connection => {
            if (connection.element.parentNode) {
                connection.element.parentNode.removeChild(connection.element);
            }
        });
        
        connections.length = 0;
        
        // Создаем новые связи между близкими узлами
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeA = nodes[i];
                const nodeB = nodes[j];
                
                // Вычисляем расстояние между узлами
                const dx = nodeB.x - nodeA.x;
                const dy = nodeB.y - nodeA.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Если узлы достаточно близко, создаем связь
                if (distance < connectionDistance) {
                    createConnection(nodeA, nodeB, distance);
                }
            }
        }
    }
    
    // Функция для создания связи между узлами
    function createConnection(nodeA, nodeB, distance) {
        const connection = document.createElement('div');
        connection.className = 'connection';
        
        // Вычисляем положение и размер связи
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        // Применяем стили для связи
        connection.style.width = `${distance}px`;
        connection.style.left = `${nodeA.x}px`;
        connection.style.top = `${nodeA.y}px`;
        connection.style.transform = `rotate(${angle}deg)`;
        
        // Устанавливаем прозрачность в зависимости от расстояния
        const opacity = 1 - (distance / connectionDistance);
        connection.style.opacity = opacity.toFixed(2);
        
        // Сохраняем данные о связи
        connections.push({
            element: connection,
            nodeA: nodeA,
            nodeB: nodeB
        });
        
        // Добавляем связь в контейнер
        nodesContainer.appendChild(connection);
    }
    
    // Функция анимации узлов
    function animateNodes() {
        // Обновляем позиции узлов
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Обновляем позицию узла
            node.x += node.speedX;
            node.y += node.speedY;
            
            // Проверяем границы контейнера и меняем направление при необходимости
            if (node.x <= 0 || node.x >= containerWidth) {
                node.speedX *= -1;
                node.x = Math.max(0, Math.min(node.x, containerWidth));
            }
            
            if (node.y <= 0 || node.y >= containerHeight) {
                node.speedY *= -1;
                node.y = Math.max(0, Math.min(node.y, containerHeight));
            }
            
            // Обновляем позицию элемента
            node.element.style.left = `${node.x}px`;
            node.element.style.top = `${node.y}px`;
        }
        
        // Обновляем связи каждые 10 кадров для производительности
        if (Math.random() < 0.1) {
            updateConnections();
        }
        
        // Продолжаем анимацию
        requestAnimationFrame(animateNodes);
    }
    
    // Добавляем анимацию для блока кода
    const codeBlock = document.querySelector('.code-block');
    if (codeBlock) {
        // Имитируем печатание кода
        const codeContent = codeBlock.innerHTML;
        codeBlock.innerHTML = '';
        
        let charIndex = 0;
        
        function typeCode() {
            if (charIndex < codeContent.length) {
                codeBlock.innerHTML = codeContent.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeCode, 50);
            } else {
                // После печатания кода, добавляем мигающий курсор
                const cursor = document.createElement('span');
                cursor.className = 'code-cursor';
                cursor.innerHTML = '|';
                cursor.style.animation = 'blink 1s infinite';
                codeBlock.appendChild(cursor);
                
                // Создаем стиль для мигающего курсора
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                    .code-cursor {
                        display: inline-block;
                        color: var(--primary-color);
                        font-weight: bold;
                        margin-left: 2px;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // Запускаем печатание с задержкой
        setTimeout(typeCode, 500);
    }
    
    // Добавляем анимацию для технологических иконок
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach((icon, index) => {
        // Задаем случайное начальное положение
        const x = Math.random() * containerWidth * 0.8 + containerWidth * 0.1;
        const y = Math.random() * containerHeight * 0.8 + containerHeight * 0.1;
        
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
        
        // Задаем анимацию с задержкой
        icon.style.animationDelay = `${index * 0.5}s`;
        
        // Добавляем небольшое случайное движение
        setInterval(() => {
            const newX = x + (Math.random() - 0.5) * 30;
            const newY = y + (Math.random() - 0.5) * 30;
            
            icon.style.transition = 'left 3s ease, top 3s ease';
            icon.style.left = `${newX}px`;
            icon.style.top = `${newY}px`;
        }, 3000 + index * 500);
    });
});