/* FILE: assets/js/main.js */

document.addEventListener('DOMContentLoaded', function() {

    // 1. ANIMAÇÃO DO CONTADOR
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats');

    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            const increment = target / 200; // Velocidade da animação

            if (count < target) {
                count += increment;
                // Formata o número para grandes valores
                if (target >= 1000000) {
                     el.innerText = (count / 1000000).toFixed(1) + 'M';
                } else {
                     el.innerText = Math.ceil(count);
                }
                requestAnimationFrame(updateCount);
            } else {
                if (target >= 1000000) {
                    el.innerText = (target / 1000000).toFixed(1) + 'M';
                } else {
                     el.innerText = target;
                }
            }
        };
        updateCount();
    };

    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    startCounter(counter);
                });
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    if(statsSection) {
       counterObserver.observe(statsSection);
    }


    // 2. FILTRO DE POSTS
    const filterContainer = document.querySelector('#filters');
    const postCards = document.querySelectorAll('.post-card');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            // Ativa/desativa botão
            const activeBtn = filterContainer.querySelector('.active');
            activeBtn.classList.remove('active');
            e.target.classList.add('active');

            const filter = e.target.getAttribute('data-filter');

            postCards.forEach(card => {
                const category = card.getAttribute('data-category');
                card.style.transition = 'transform 0.3s, opacity 0.3s';
                card.style.transform = 'scale(0.9)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                             card.style.transform = 'scale(1)';
                             card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    }


    // 3. CONFIGURAÇÃO DO PARTICLES.JS
    if(document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#8E8E8E"
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8E8E8E",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                 "modes": {
                    "grab": {
                      "distance": 140,
                      "line_linked": {
                        "opacity": 0.5
                      }
                    },
                 }
            },
            "retina_detect": true
        });
    }

    // 4. LÓGICA DO BANNER DE COOKIES
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('cookie-accept');

    // Verifica se o consentimento já foi dado
    if (!localStorage.getItem('cookieConsent')) {
        cookieBanner.removeAttribute('hidden');
    }

    acceptButton.addEventListener('click', () => {
        // Salva a preferência do usuário
        localStorage.setItem('cookieConsent', 'true');
        
        // Esconde o banner com uma transição
        cookieBanner.style.transform = 'translateY(100%)';

        // Opcional: remove o elemento do DOM após a transição
        setTimeout(() => {
            if (cookieBanner.parentNode) {
                cookieBanner.parentNode.removeChild(cookieBanner);
            }
        }, 500); // Tempo deve ser igual ao da transição CSS

        // Futuramente, aqui você pode carregar scripts que dependem de consentimento
        // ex: loadGoogleAnalytics();
    });

});

