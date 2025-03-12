// DOM Elements
let modalContainer = null;
let activeModal = null;

// Create Modal Container if it doesn't exist
function ensureModalContainer() {
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        document.body.appendChild(modalContainer);
        
        // Add styles for modal container
        const style = document.createElement('style');
        style.textContent = `
            .modal-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
            }
            
            .modal-container.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal {
                background-color: var(--bg-color);
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                max-width: 90%;
                width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s, transform 0.3s;
            }
            
            .modal-container.active .modal {
                opacity: 1;
                transform: translateY(0);
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-title {
                margin: 0;
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-secondary);
            }