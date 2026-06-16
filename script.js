const natureImages = [
            { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop", desc: "Instante de paz e conexão sob a luz dourada do sol." },
            { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop", desc: "O silêncio do fim de tarde nos diz tanto sobre nós." },
            { url: "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=600&auto=format&fit=crop", desc: "A beleza escondida nos detalhes mais simples da vida." },
            { url: "https://images.unsplash.com/photo-1510784722466-f2aa9c52eff6?q=80&w=600&auto=format&fit=crop", desc: "Onde o céu e a terra se encontram para testemunhar nossa união." },
            { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop", desc: "Caminhos que se cruzam na imensidão desse mundo lindo." },
            { url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&auto=format&fit=crop", desc: "Cada folha e cada brisa parecem sorrir para nós hoje." }
        ];

        // 12 Meses configurados com títulos e legendas românticas
        const monthsData = [
            { id: 1, label: "Mês 1", title: "No início do amor", subtitle: "Onde tudo começou a fazer sentido", desc: "Nossos primeiros sorrisos sinceros e a certeza que crescia aos poucos." },
            { id: 2, label: "Mês 2", title: "Crescendo juntos", subtitle: "Passo a passo, lado a lado", desc: "A doçura de perceber que a vida é muito mais leve quando compartilhada." },
            { id: 3, label: "Mês 3", title: "Cumplicidade eterna", subtitle: "Olhares que se entendem sem palavras", desc: "Aconchego nos dias frios e risadas nas tardes ensolaradas de outono." },
            { id: 4, label: "Mês 4", title: "Aventuras ao ar livre", subtitle: "Descobrindo novos horizontes", desc: "Nenhum caminho é longo demais quando estamos caminhando juntos." },
            { id: 5, label: "Mês 5", title: "Nossos momentos de paz", subtitle: "Encontrando abrigo no seu abraço", desc: "Entre todos os lugares do mundo, o meu favorito sempre será o seu abraço." },
            { id: 6, label: "Mês 6", title: "Meio ano de carinho", subtitle: "Seis meses de pura felicidade", desc: "Uma coleção de pequenos instantes que se transformaram em amor gigante." },
            { id: 7, label: "Mês 7", title: "Estações do ano", subtitle: "Renovando nossa promessa todos os dias", desc: "Como as cores da primavera, você trouxe vida e alegria para o meu viver." },
            { id: 8, label: "Mês 8", title: "Luz dos nossos dias", subtitle: "O brilho constante da nossa união", desc: "Mesmo nas noites mais escuras, a sua luz guia o meu coração com segurança." },
            { id: 9, label: "Mês 9", title: "Colhendo sorrisos", subtitle: "Construindo memórias inesquecíveis", desc: "Cada risada nossa gravada nas estrelas e guardada para sempre na memória." },
            { id: 10, label: "Mês 10", title: "Laços inabaláveis", subtitle: "Mais fortes e unidos do que nunca", desc: "Superando qualquer barreira com a força desse amor que nos protege." },
            { id: 11, label: "Mês 11", title: "Quase um ciclo completo", subtitle: "Contemplando a nossa linda jornada", desc: "Olhar para trás e ver tudo o que construímos me enche de orgulho e gratidão." },
            { id: 12, label: "Mês 12", title: "Nós atualmente", subtitle: "O início do nosso 'para sempre'", desc: "Aqui estamos nós, mais felizes, mais maduros e infinitamente mais apaixonados." }
        ];

        // Estado Global da Aplicação
        const appState = {};

        // Formatação automática do Input de Data (DD/MM/AAAA)
        const dateInput = document.getElementById('start-date');
        if (dateInput) {
            dateInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 8) value = value.slice(0, 8);
                
                let formattedValue = '';
                if (value.length > 0) {
                    formattedValue += value.substring(0, 2);
                    if (value.length > 2) {
                        formattedValue += '/' + value.substring(2, 4);
                        if (value.length > 4) {
                            formattedValue += '/' + value.substring(4, 8);
                        }
                    }
                }
                e.target.value = formattedValue;
            });
        }

        // Verifica a senha por data
        function checkDate() {
            if (!dateInput) return;
            const dateVal = dateInput.value;
            const errorMsg = document.getElementById('error-message');
            
            if (dateVal === "00/00/0000" || dateVal === "07/07/25") {
                if (errorMsg) errorMsg.classList.add('hidden');
                unlockSite();
            } else {
                if (errorMsg) errorMsg.classList.remove('hidden');
                dateInput.classList.add('border-red-500', 'animate-bounce');
                setTimeout(() => {
                    dateInput.classList.remove('border-red-500', 'animate-bounce');
                }, 1000);
            }
        }

        // Desbloqueia o site com animação suave
        function unlockSite() {
            const unlockScreen = document.getElementById('unlock-screen');
            const mainContent = document.getElementById('main-content');
            
            if (unlockScreen) unlockScreen.classList.add('opacity-0', 'pointer-events-none');
            if (mainContent) mainContent.classList.remove('hidden');
            
            // Música iniciará pausada , aguardando clique
            updateMusicUI(false);

            setTimeout(() => {
                if (unlockScreen) unlockScreen.classList.add('hidden');
                if (mainContent) mainContent.classList.add('opacity-100');
                if (typeof lucide !== 'undefined') lucide.createIcons();
                setupScrollSpy(); // Inicializa o monitorador de rolagem ativa com segurança
            }, 700);
        }

        // Função reutilizável para Rolagem Suave até o mês escolhido
        function scrollToMonth(monthId) {
            const section = document.getElementById(`section-month-${monthId}`);
            if (!section) return;
            
            // Altura do topo flexível conforme a tela
            const headerOffset = window.innerWidth < 768 ? 140 : 180;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        // Lógica de Abre/Fecha do Dropdown Mobile
        function toggleDropdown(forceState) {
            const options = document.getElementById('dropdown-options');
            const arrow = document.getElementById('dropdown-arrow-icon');
            if (!options) return;
            
            const isHidden = options.classList.contains('hidden');
            const shouldShow = forceState !== undefined ? forceState : isHidden;
            
            if (shouldShow) {
                options.classList.remove('hidden');
                if (arrow) arrow.classList.add('rotate-180');
            } else {
                options.classList.add('hidden');
                if (arrow) arrow.classList.remove('rotate-180');
            }
        }

        // Fechar dropdown se clicar fora dele
        window.addEventListener('click', (e) => {
            const container = document.getElementById('mobile-dropdown-container');
            if (container && !container.contains(e.target)) {
                toggleDropdown(false);
            }
        });

        // Inicialização dos Carrosséis e Navegações
        function initApp() {
            const desktopNavContainer = document.getElementById('month-nav-container-desktop');
            const dropdownOptionsContainer = document.getElementById('dropdown-options');
            const monthsContainer = document.getElementById('months-container');
            
            if (!monthsContainer) return;

            monthsData.forEach((month) => {
                appState[`month_${month.id}`] = 0;

                // 1. Criar Botão de Navegação Rápida (Desktop)
                if (desktopNavContainer) {
                    const navBtnDesktop = document.createElement('button');
                    navBtnDesktop.id = `nav-btn-month-${month.id}`;
                    navBtnDesktop.className = "px-3 py-1.5 bg-[#151a22] text-xs font-bold text-gray-400 border border-gray-800 rounded-lg hover:border-pink-500 hover:text-pink-500 transition-all text-center active:scale-95";
                    navBtnDesktop.textContent = month.label;
                    navBtnDesktop.onclick = () => scrollToMonth(month.id);
                    desktopNavContainer.appendChild(navBtnDesktop);
                }

                // 2. Criar Opção no Dropdown (Mobile)
                if (dropdownOptionsContainer) {
                    const optionBtn = document.createElement('button');
                    optionBtn.id = `dropdown-option-${month.id}`;
                    optionBtn.className = "w-full text-left px-4 py-3 text-xs font-medium text-gray-400 hover:text-pink-500 hover:bg-pink-500/5 transition-all flex items-center justify-between";
                    optionBtn.innerHTML = `
                        <div class="flex flex-col">
                            <span class="font-bold text-gray-300 text-[10px] uppercase tracking-wider">${month.label}</span>
                            <span class="text-xs text-gray-400 italic">${month.title}</span>
                        </div>
                        <i data-lucide="check" class="w-4 h-4 text-pink-500 opacity-0 transition-opacity"></i>
                    `;
                    optionBtn.onclick = () => {
                        scrollToMonth(month.id);
                        toggleDropdown(false); // Fecha o menu ao clicar
                    };
                    dropdownOptionsContainer.appendChild(optionBtn);
                }

                // 3. Criar Carrossel de Fotos para o Mês
                const section = document.createElement('section');
                section.id = `section-month-${month.id}`;
                section.className = "bg-[#151a22] border border-gray-800/60 rounded-2xl p-4 md:p-6 shadow-xl space-y-4 transition-all duration-300";
                
                const monthImages = getMonthImages(month.id);

                section.innerHTML = `
                    <!-- Header do Carrossel -->
                    <div class="flex items-center justify-between border-b border-gray-800/40 pb-3">
                        <div>
                            <span class="text-[10px] uppercase tracking-widest text-pink-500 font-bold">${month.label}</span>
                            <h3 class="text-lg md:text-xl font-bold text-white serif-font">${month.title}</h3>
                        </div>
                        <button onclick="openGalleryModal(${month.id})" title="Ver todas as fotos" 
                                class="p-2.5 bg-gray-800/40 hover:bg-pink-500/10 text-gray-400 hover:text-pink-500 rounded-full border border-gray-700/60 transition-all active:scale-90">
                            <i data-lucide="grid" class="w-4 h-4 md:w-5 md:h-5"></i>
                        </button>
                    </div>

                    <!-- Slide de Foto Única com Suporte a Swipe -->
                    <div class="relative group rounded-xl overflow-hidden bg-black/40 border border-gray-800/80">
                        
                        <div id="swipe-area-month-${month.id}" class="aspect-[4/3] md:aspect-[16/10] w-full flex items-center justify-center overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing">
                            <img id="img-month-${month.id}" src="${monthImages[0].url}" alt="Foto de recordação" 
                                 class="w-full h-full object-cover transition-all duration-350 select-none" draggable="false">
                        </div>

                        <!-- Seta Esquerda -->
                        <button onclick="prevImage(${month.id})" 
                                class="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur-sm border border-gray-700/50 text-white rounded-full hover:bg-pink-500 hover:border-pink-500 transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100 active:scale-90">
                            <i data-lucide="chevron-left" class="w-5 h-5"></i>
                        </button>

                        <!-- Seta Direita -->
                        <button onclick="nextImage(${month.id})" 
                                class="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black/70 backdrop-blur-sm border border-gray-700/50 text-white rounded-full hover:bg-pink-500 hover:border-pink-500 transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100 active:scale-90">
                            <i data-lucide="chevron-right" class="w-5 h-5"></i>
                        </button>

                        <!-- Indicador de página (X/6) -->
                        <div class="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-300 font-bold border border-gray-700/40 select-none">
                            <span id="counter-month-${month.id}">1 / 6</span>
                        </div>
                    </div>

                    <!-- Rodapé do Carrossel -->
                    <div class="space-y-1 pt-1 text-center md:text-left">
                        <p class="text-xs md:text-sm font-semibold text-pink-400">${month.subtitle}</p>
                        <p id="desc-month-${month.id}" class="text-xs md:text-sm text-gray-400 italic">
                            "${monthImages[0].desc}"
                        </p>
                    </div>
                `;

                monthsContainer.appendChild(section);
                setupSwipeEvents(month.id);
            });

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Retorna um set de 6 imagens baseadas no ID do mês
        function getMonthImages(monthId) {
            return natureImages.map((img, idx) => {
                const uniqueSeed = (monthId * 6) + idx;
                return {
                    url: `https://images.unsplash.com/photo-${1510000000000 + (uniqueSeed * 100000)}?q=80&w=600&auto=format&fit=crop&sig=${uniqueSeed}`,
                    desc: img.desc
                };
            });
        }

        // Navegação de Fotos: Próxima Imagem
        function nextImage(monthId) {
            const images = getMonthImages(monthId);
            let currentIdx = appState[`month_${monthId}`];
            currentIdx = (currentIdx + 1) % images.length;
            appState[`month_${monthId}`] = currentIdx;
            updateCarouselUI(monthId, images, currentIdx);
        }

        // Navegação de Fotos: Imagem Anterior
        function prevImage(monthId) {
            const images = getMonthImages(monthId);
            let currentIdx = appState[`month_${monthId}`];
            currentIdx = (currentIdx - 1 + images.length) % images.length;
            appState[`month_${monthId}`] = currentIdx;
            updateCarouselUI(monthId, images, currentIdx);
        }

        // Atualização visual do Carrossel específico com tratamentos de segurança
        function updateCarouselUI(monthId, images, idx) {
            const imgElement = document.getElementById(`img-month-${monthId}`);
            const counterElement = document.getElementById(`counter-month-${monthId}`);
            const descElement = document.getElementById(`desc-month-${monthId}`);

            if (!imgElement) return;

            imgElement.classList.add('opacity-30', 'scale-95');
            setTimeout(() => {
                if (imgElement) {
                    imgElement.src = images[idx].url;
                    imgElement.classList.remove('opacity-30', 'scale-95');
                }
                if (counterElement) counterElement.textContent = `${idx + 1} / ${images.length}`;
                if (descElement) descElement.textContent = `"${images[idx].desc}"`;
            }, 120);
        }

        // Gestos de Deslizar (Swipe)
        function setupSwipeEvents(monthId) {
            const swipeArea = document.getElementById(`swipe-area-month-${monthId}`);
            if (!swipeArea) return;
            
            let startX = 0;
            let endX = 0;

            swipeArea.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            }, { passive: true });

            swipeArea.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipeGesture();
            }, { passive: true });

            function handleSwipeGesture() {
                const threshold = 50; 
                const diff = startX - endX;

                if (Math.abs(diff) > threshold) {
                    if (diff > 0) {
                        nextImage(monthId);
                    } else {
                        prevImage(monthId);
                    }
                }
            }
        }

        // ScrollSpy Inteligente com verificações de segurança para prevenir erros 'classList of null'
        function setupScrollSpy() {
            const sections = monthsData.map(m => document.getElementById(`section-month-${m.id}`));
            const navButtonsDesktop = monthsData.map(m => document.getElementById(`nav-btn-month-${m.id}`));
            const dropdownOptions = monthsData.map(m => document.getElementById(`dropdown-option-${m.id}`));
            const dropdownTriggerText = document.getElementById('dropdown-current-month');

            window.addEventListener('scroll', () => {
                let currentMonthId = 1;
                const scrollPosition = window.scrollY + window.innerHeight / 2.5;

                sections.forEach((section, index) => {
                    if (section && section.offsetTop <= scrollPosition) {
                        currentMonthId = monthsData[index].id;
                    }
                });

                const currentMonthObj = monthsData.find(m => m.id === currentMonthId);

                // 1. Atualiza o texto do Botão Principal do Dropdown Mobile
                if (dropdownTriggerText && currentMonthObj) {
                    dropdownTriggerText.textContent = `${currentMonthObj.label}: ${currentMonthObj.title}`;
                }

                // 2. Atualiza Destaque dos Itens do Dropdown Mobile (com verificação preventiva de nulos)
                dropdownOptions.forEach((option, index) => {
                    if (!option) return;
                    const checkIcon = option.querySelector('i');
                    const textSpans = option.querySelectorAll('span');
                    const isCurrent = (index + 1) === currentMonthId;
                    
                    if (isCurrent) {
                        if (checkIcon) {
                            checkIcon.classList.remove('opacity-0');
                            checkIcon.classList.add('opacity-100');
                        }
                        option.classList.add('bg-pink-500/10', 'text-pink-500');
                        if (textSpans && textSpans[0]) {
                            textSpans[0].classList.add('text-pink-500');
                        }
                    } else {
                        if (checkIcon) {
                            checkIcon.classList.remove('opacity-100');
                            checkIcon.classList.add('opacity-0');
                        }
                        option.classList.remove('bg-pink-500/10', 'text-pink-500');
                        if (textSpans && textSpans[0]) {
                            textSpans[0].classList.remove('text-pink-500');
                        }
                    }
                });

                // 3. Atualiza Destaque dos Botões no Desktop (com verificação preventiva de nulos)
                navButtonsDesktop.forEach((btn, index) => {
                    if (!btn) return;
                    const isCurrent = (index + 1) === currentMonthId;
                    if (isCurrent) {
                        btn.classList.remove('bg-[#151a22]', 'text-gray-400', 'border-gray-800');
                        btn.classList.add('bg-pink-500/15', 'text-pink-500', 'border-pink-500/60', 'scale-105');
                    } else {
                        btn.classList.remove('bg-pink-500/15', 'text-pink-500', 'border-pink-500/60', 'scale-105');
                        btn.classList.add('bg-[#151a22]', 'text-gray-400', 'border-gray-800');
                    }
                });
            });
        }

        // Player de Música
        function toggleMusic() {
            const audio = document.getElementById('bg-music');
            if (!audio) return;
            if (audio.paused) {
                audio.play();
                updateMusicUI(true);
            } else {
                audio.pause();
                updateMusicUI(false);
            }
        }

        function updateMusicUI(isPlaying) {
            const icon = document.getElementById('music-icon');
            const btn = document.getElementById('music-btn');
            if (!icon || !btn) return;
            
            if (isPlaying) {
                icon.setAttribute('data-lucide', 'pause');
                btn.classList.remove('bg-pink-500/10', 'text-pink-500');
                btn.classList.add('bg-pink-500', 'text-white', 'animate-pulse');
            } else {
                icon.setAttribute('data-lucide', 'play');
                btn.classList.remove('bg-pink-500', 'text-white', 'animate-pulse');
                btn.classList.add('bg-pink-500/10', 'text-pink-500');
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Modal de Galeria Mosaico Completo
        function openGalleryModal(monthId) {
            const modal = document.getElementById('gallery-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalGrid = document.getElementById('modal-grid');
            if (!modal || !modalTitle || !modalGrid) return;
            
            const monthInfo = monthsData.find(m => m.id === monthId);
            const images = getMonthImages(monthId);

            modalTitle.textContent = `${monthInfo.label} - ${monthInfo.title}`;
            modalGrid.innerHTML = ''; 

            images.forEach((img, idx) => {
                const card = document.createElement('div');
                card.className = "group relative rounded-xl overflow-hidden border border-gray-800 bg-black/20 hover:border-pink-500/50 transition-all duration-300";
                card.innerHTML = `
                    <div class="aspect-square w-full overflow-hidden">
                        <img src="${img.url}" alt="Foto Mosaico" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-3">
                        <span class="text-[8px] md:text-[10px] text-pink-400 font-bold uppercase tracking-wider">Foto ${idx + 1} de 6</span>
                        <p class="text-[10px] md:text-xs text-gray-200 line-clamp-2 italic leading-tight">"${img.desc}"</p>
                    </div>
                `;
                modalGrid.appendChild(card);
            });

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }

        function closeGalleryModal() {
            const modal = document.getElementById('gallery-modal');
            if (modal) modal.classList.add('hidden');
            document.body.style.overflow = ''; 
        }

        // Inicializar aplicação ao carregar a página
        window.addEventListener('DOMContentLoaded', () => {
            initApp();
        });