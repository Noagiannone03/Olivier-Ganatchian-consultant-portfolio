        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin, MotionPathPlugin);

        // Variables
        let cursor = document.querySelector('.cursor');
        let cursorFollower = document.querySelector('.cursor-follower');
        let navbar = document.getElementById('navbar');
        let scrollProgress = document.getElementById('scrollProgress');
        let scrollTop = document.getElementById('scrollTop');

        // Custom Cursor - Optimized
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Direct cursor movement
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.05,
                ease: 'none'
            });
            
            // Smooth follower
            gsap.to(cursorFollower, {
                x: mouseX - 20,
                y: mouseY - 20,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        // Magnetic effect for interactive elements
        document.querySelectorAll('a, button, .service-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 2, duration: 0.3 });
                gsap.to(cursorFollower, { scale: 0, duration: 0.3 });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
                gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
            });
        });

        // Vérifier si c'est un appareil mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Advanced Loading Animation
        let loaderBar = document.getElementById('loaderBar');
        let loader = document.getElementById('loader');
        
        // Désactiver certaines animations sur mobile
        if (isMobile) {
            document.documentElement.classList.add('is-mobile');
            // Désactiver les animations complexes sur mobile
            gsap.globalTimeline.timeScale(1.5); // Accélérer légèrement les animations sur mobile
        }
        
        let loadingTl = gsap.timeline();
        
        loadingTl
            .to(loaderBar, {
                width: '100%',
                duration: 2,
                ease: 'power2.inOut'
            })
            .to('.loader-text', {
                opacity: 0,
                y: -30,
                duration: 0.5,
                ease: 'power2.inOut'
            }, '-=0.5')
            .to(loader, {
                yPercent: -100,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    loader.style.display = 'none';
                    initAnimations();
                }
            });

        function initAnimations() {
            // Navbar entrance
            gsap.to(navbar, {
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            });

            // Hero animations with advanced sequencing
            let heroTl = gsap.timeline({ delay: 0.5 });
            
            heroTl
                .fromTo('.hero-badge', {
                    opacity: 0,
                    y: 30,
                    scale: 0.8
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'back.out(1.7)'
                })
                .fromTo('.hero-title', {
                    opacity: 0,
                    y: 50,
                    rotationX: 15
                }, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=0.8')
                .fromTo('.hero-subtitle', {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.6')
                .fromTo('.hero-cta-group', {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.4')
                .fromTo('.hero-image-container', {
                    opacity: 0,
                    x: 100,
                    rotationY: 45
                }, {
                    opacity: 1,
                    x: 0,
                    rotationY: 0,
                    duration: 1.5,
                    ease: 'power3.out'
                }, '-=1.2');

            // Parallax effects
            gsap.to('.hero-visual', {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });

            // Advanced section animations with proper spacing
            gsap.utils.toArray('.section').forEach((section, index) => {
                // Create proper spacing between sections
                gsap.set(section, { clearProps: "all" });
                
                // Section badge animation
                let badge = section.querySelector('.section-badge');
                if (badge) {
                    gsap.fromTo(badge, {
                        opacity: 0,
                        y: 20,
                        scale: 0.8
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: badge,
                            start: 'top 85%',
                            end: 'bottom 15%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }

                // Section title with split text effect
                let title = section.querySelector('.section-title');
                if (title) {
                    gsap.fromTo(title, {
                        opacity: 0,
                        y: 50,
                        rotationX: 25
                    }, {
                        opacity: 1,
                        y: 0,
                        rotationX: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 85%',
                            end: 'bottom 15%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }

                // Section subtitle
                let subtitle = section.querySelector('.section-subtitle');
                if (subtitle) {
                    gsap.fromTo(subtitle, {
                        opacity: 0,
                        y: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: subtitle,
                            start: 'top 85%',
                            end: 'bottom 15%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            });

            // About section morphing animations with better triggers
            gsap.utils.toArray('.about-text p').forEach((p, index) => {
                gsap.fromTo(p, {
                    opacity: 0,
                    x: -50,
                    rotationY: 15
                }, {
                    opacity: 1,
                    x: 0,
                    rotationY: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: p,
                        start: 'top 90%',
                        end: 'bottom 10%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Stats counter animation with better spacing
            gsap.utils.toArray('.stat-item').forEach((stat, index) => {
                gsap.fromTo(stat, {
                    opacity: 0,
                    y: 30,
                    scale: 0.8
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    }
                });

                // Number counter
                let number = stat.querySelector('.stat-number');
                if (number) {
                    let finalNumber = parseInt(number.textContent);
                    let obj = { number: 0 };
                    
                    gsap.to(obj, {
                        number: finalNumber,
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: () => {
                            number.textContent = Math.round(obj.number) + (number.textContent.includes('%') ? '%' : '+');
                        },
                        scrollTrigger: {
                            trigger: stat,
                            start: 'top 85%',
                            end: 'bottom 15%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            });

            // About visual with better timing
            gsap.fromTo('.about-visual', {
                opacity: 0,
                x: 50,
                rotationY: -15
            }, {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.about-visual',
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Liquid services animation with proper spacing
            gsap.utils.toArray('.service-card').forEach((card, index) => {
                // Paramètres d'animation différents pour mobile et desktop
                const animationVars = isMobile ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 95%',
                        end: 'bottom 5%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                } : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: index * 0.15,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        end: 'bottom 10%',
                        toggleActions: 'play none none reverse'
                    }
                };
                
                gsap.fromTo(card, {
                    opacity: 0,
                    y: isMobile ? 40 : 80,
                    scale: isMobile ? 0.95 : 0.8,
                    rotationX: isMobile ? 5 : 25
                }, animationVars);

                // Reduced floating animation intensity
                gsap.to(card, {
                    y: -5,
                    duration: 4,
                    ease: 'power1.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: index * 0.5
                });
            });

            // Timeline experimental animations with better control
            gsap.utils.toArray('.timeline-item').forEach((item, index) => {
                let isEven = index % 2 === 0;
                
                // Paramètres d'animation différents pour mobile et desktop
                const timelineVars = isMobile ? {
                    opacity: 1,
                    x: 0,
                    rotationY: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 95%',
                        end: 'bottom 5%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                } : {
                    opacity: 1,
                    x: 0,
                    rotationY: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    delay: index * 0.15,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        end: 'bottom 15%',
                        toggleActions: 'play none none reverse'
                    }
                };
                
                gsap.fromTo(item, {
                    opacity: 0,
                    x: isMobile ? 0 : (isEven ? -80 : 80),
                    rotationY: isMobile ? 0 : (isEven ? -10 : 10)
                }, timelineVars);

                // Subtle timeline dot pulse
                let dot = item.querySelector('.timeline-dot');
                if (dot) {
                    gsap.to(dot, {
                        scale: 1.1,
                        duration: 2,
                        ease: 'power1.inOut',
                        yoyo: true,
                        repeat: -1,
                        delay: index * 0.5,
                        scrollTrigger: {
                            trigger: dot,
                            start: 'top 85%',
                            end: 'bottom 15%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                }
            });

            // Trust items floating animation with better spacing
            gsap.utils.toArray('.trust-item').forEach((item, index) => {
                gsap.fromTo(item, {
                    opacity: 0,
                    y: 50,
                    rotationX: 30,
                    scale: 0.8
                }, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'back.out(1.7)',
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                        end: 'bottom 10%',
                        toggleActions: 'play none none reverse'
                    }
                });

                // Reduced continuous floating
                gsap.to(item, {
                    y: -8,
                    duration: 5,
                    ease: 'power1.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: index * 0.3
                });
            });

            // Sections color transitions without overlapping
            ScrollTrigger.create({
                trigger: '#services',
                start: 'top 100px',
                end: 'bottom 100px',
                onEnter: () => navbar.classList.add('dark'),
                onLeave: () => navbar.classList.remove('dark'),
                onEnterBack: () => navbar.classList.add('dark'),
                onLeaveBack: () => navbar.classList.remove('dark')
            });

            ScrollTrigger.create({
                trigger: '#trust',
                start: 'top 100px',
                end: 'bottom 100px',
                onEnter: () => navbar.classList.add('dark'),
                onLeave: () => navbar.classList.remove('dark'),
                onEnterBack: () => navbar.classList.add('dark'),
                onLeaveBack: () => navbar.classList.remove('dark')
            });
        }

        // Smooth scroll progress
        const setScrollProgress = gsap.quickTo(scrollProgress, 'scaleX', {
            duration: 0.18,
            ease: 'power2.out'
        });

        function updateScrollProgress() {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
            setScrollProgress(gsap.utils.clamp(0, 1, progress));
        }

        updateScrollProgress();
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        window.addEventListener('resize', updateScrollProgress);
        ScrollTrigger.addEventListener('refresh', updateScrollProgress);

        // Scroll to top button
        ScrollTrigger.create({
            start: 'top -300',
            end: 99999,
            toggleClass: { className: 'visible', targets: scrollTop }
        });
        
        // Gestion spécifique du bouton de retour en haut
        scrollTop.addEventListener('click', function(e) {
            e.preventDefault();
            
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: 0, autoKill: false },
                ease: 'power4.out'
            });
        });

        // Smooth scrolling amélioré
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (!target) return;
                
                // Calculer la position de défilement en tenant compte de la hauteur de la navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20; // 20px de marge
                
                // Animation de défilement plus fluide
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: targetPosition, autoKill: false },
                    ease: 'power3.inOut',
                    onComplete: () => {
                        // Réinitialiser l'URL sans déclencher de rechargement
                        window.history.pushState(null, null, href);
                        // Réinitialiser les animations ScrollTrigger après un court délai
                        setTimeout(() => {
                            ScrollTrigger.refresh();
                        }, 100);
                    }
                });
            });
        });

        // Advanced hover effects
        document.querySelectorAll('.hero-cta, .service-card, .timeline-content, .trust-item').forEach(el => {
            el.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            el.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Refresh ScrollTrigger on resize
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let button = this.querySelector('button');
            let originalText = button.innerHTML;
            
            button.innerHTML = 'Envoi en cours...';
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                button.innerHTML = 'Message envoyé ✓';
                button.style.background = '#22c55e';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.opacity = '1';
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Initialize if page already loaded
        if (document.readyState === 'complete') {
            loadingTl.progress(1);
        }
    
