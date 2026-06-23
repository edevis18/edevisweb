// Elementos del DOM
        const whatsappButton = document.getElementById('whatsapp-button');
        const notification = document.getElementById('whatsapp-notification');
        const badge = document.getElementById('whatsapp-badge');
        const chatContainer = document.getElementById('chatContainer');
        const closeChatBtn = document.getElementById('closeChatBtn');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendMessageBtn = document.getElementById('sendMessageBtn');

        let chatOpened = false;

        // --- Funciones del Chat ---

        // Añade un mensaje al chat
        const addMessage = (text, sender) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;

            const textSpan = document.createElement('span');
            textSpan.textContent = text;
            messageDiv.appendChild(textSpan);

            const metaDiv = document.createElement('div');
            metaDiv.className = 'message-meta';

            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            const timestampSpan = document.createElement('span');
            timestampSpan.className = 'timestamp';
            timestampSpan.textContent = timeString;
            metaDiv.appendChild(timestampSpan);

            let checkIcon = null;
            if (sender === 'user') {
                checkIcon = document.createElement('i');
                checkIcon.className = 'fas fa-check-double seen-check';
                metaDiv.appendChild(checkIcon);
            }

            messageDiv.appendChild(metaDiv);
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            return checkIcon; 
        };
        
        // Muestra el indicador de "escribiendo..."
        const showTypingIndicator = () => {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot typing-indicator';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        // Oculta el indicador de "escribiendo..."
        const hideTypingIndicator = () => {
            const indicator = document.querySelector('.typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        };
        
        // Simula la respuesta del bot
        const botResponse = () => {
            hideTypingIndicator();
            const responseText = "¡Excelente! Para ayudarte ya mismo puedes enviarme directamente a WhatsApp.";
            addMessage(responseText, 'bot');
            
            const whatsappLink = document.createElement('a');
            whatsappLink.href = "https://wa.me/5804246538309?text=Hola,%20necesito%20información.";
            whatsappLink.target = "_blank";
            whatsappLink.rel = "noopener noreferrer";
            whatsappLink.className = "mt-2 inline-block bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600";
            whatsappLink.innerHTML = '<i class="fab fa-whatsapp"></i> Continuar en WhatsApp';
            
            const messageContainer = document.createElement('div');
            messageContainer.className = 'message bot';
            messageContainer.style.paddingBottom = '0.5rem'; 
            messageContainer.appendChild(whatsappLink);
            chatMessages.appendChild(messageContainer);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };
        
        // Maneja el envío de mensajes del usuario
        const handleSendMessage = () => {
            const userText = chatInput.value.trim();
            if (userText === '') return;

            const checkIcon = addMessage(userText, 'user');
            chatInput.value = '';
            
            setTimeout(() => {
                if (checkIcon) {
                    checkIcon.classList.add('read');
                }
                
                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(botResponse, 2000); 
                }, 500);

            }, 3000); 
        };


        // --- Event Listeners ---

        whatsappButton.addEventListener('click', () => {
            if (!chatOpened) {
                notification.style.opacity = '0';
                badge.style.opacity = '0';
                setTimeout(() => {
                    notification.style.display = 'none';
                    badge.style.display = 'none';
                }, 300);
            }
            
            chatContainer.style.display = 'flex';

            if (!chatOpened) {
                 setTimeout(() => {
                    addMessage('Hola soy Edevis 👋, ¿cómo puedo ayudarte?', 'bot');
                 }, 1000);
                 chatOpened = true;
            }
        });

        closeChatBtn.addEventListener('click', () => {
            chatContainer.style.display = 'none';
        });

        sendMessageBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });