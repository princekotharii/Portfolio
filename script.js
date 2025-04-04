// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme)) {
        htmlElement.classList.add('dark-mode');
        themeSwitch.checked = true;
        updateParticlesForDarkMode(true);
        updateCanvasForDarkMode(true);
    } else {
        htmlElement.classList.remove('dark-mode');
        themeSwitch.checked = false;
        updateParticlesForDarkMode(false);
        updateCanvasForDarkMode(false);
    }
    
    // Theme switch event listener
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            updateParticlesForDarkMode(true);
            updateCanvasForDarkMode(true);
        } else {
            htmlElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            updateParticlesForDarkMode(false);
            updateCanvasForDarkMode(false);
        }
    });
    
    // Function to update particles.js colors for dark mode
    function updateParticlesForDarkMode(isDarkMode) {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const particlesJS = window.pJSDom[0].pJS;
            
            // Update particle colors based on theme
            if (isDarkMode) {
                particlesJS.particles.color.value = ["#8b84ff", "#ff7a94", "#64f4d4", "#ffd07e"];
                particlesJS.particles.line_linked.color = "#8b84ff";
            } else {
                particlesJS.particles.color.value = ["#6c63ff", "#ff6584", "#4ce3c2", "#ffbe5c"];
                particlesJS.particles.line_linked.color = "#6c63ff";
            }
            
            // Refresh particles
            particlesJS.fn.particlesRefresh();
        }
    }
    
    // Function to update canvas background for dark mode
    function updateCanvasForDarkMode(isDarkMode) {
        const canvas = document.getElementById('animated-bg');
        if (canvas && canvas.getContext) {
            if (isDarkMode) {
                canvas.style.backgroundColor = '#1a1a1a';
            } else {
                canvas.style.backgroundColor = '#f8f9fa';
            }
        }
    }

    // Initialize particles.js
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#6c63ff", "#ff6584", "#4ce3c2", "#ffbe5c"]
            },
            shape: {
                type: ["circle", "triangle", "polygon"],
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#6c63ff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Animated Background Canvas
    const canvas = document.getElementById('animated-bg');
    const ctx = canvas.getContext('2d');
    let width, height;

    // Set canvas size
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create gradient bubbles
    const bubbles = [];
    let colors = [
        'rgba(108, 99, 255, 0.1)', 
        'rgba(255, 101, 132, 0.1)', 
        'rgba(76, 227, 194, 0.1)', 
        'rgba(255, 190, 92, 0.1)'
    ];
    
    // Update colors based on theme
    function updateBubbleColors(isDarkMode) {
        if (isDarkMode) {
            colors = [
                'rgba(139, 132, 255, 0.05)', 
                'rgba(255, 122, 148, 0.05)', 
                'rgba(100, 244, 212, 0.05)', 
                'rgba(255, 208, 126, 0.05)'
            ];
        } else {
            colors = [
                'rgba(108, 99, 255, 0.1)', 
                'rgba(255, 101, 132, 0.1)', 
                'rgba(76, 227, 194, 0.1)', 
                'rgba(255, 190, 92, 0.1)'
            ];
        }
        
        // Update existing bubbles
        bubbles.forEach(bubble => {
            bubble.color = colors[Math.floor(Math.random() * colors.length)];
        });
    }
    
    themeSwitch.addEventListener('change', function() {
        updateBubbleColors(this.checked);
    });

    class Bubble {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 100 + 50;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize bubbles
    function initBubbles() {
        for (let i = 0; i < 15; i++) {
            bubbles.push(new Bubble());
        }
    }

    initBubbles();

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw bubbles
        bubbles.forEach(bubble => {
            bubble.update();
            bubble.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Typing animation
    const phrases = [
        "Web Developer",
        "UI/UX Designer",
        "Creative Coder",
        "Problem Solver"
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentPhrase = phrases[currentPhraseIndex];
        const typedTextElement = document.querySelector('.typed-text');
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before starting new word
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(typeText, 1000);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(progress => {
            const value = progress.getAttribute('data-percent');
            progress.style.width = `${value}%`;
        });
    }

    // Scroll reveal animations for elements not using AOS
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        // Animate progress bars when skills section is in view
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const skillsSectionTop = skillsSection.getBoundingClientRect().top;
            
            if (skillsSectionTop < windowHeight - 100) {
                animateProgressBars();
            }
        }
    }
    
    // Initial check for elements in view
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to your server
            // For demo purposes, we'll just show a success message
            const formData = new FormData(contactForm);
            console.log('Form submitted with data:', Object.fromEntries(formData));
            
            // Show success message (you could implement a better UI for this)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Scroll indicator click event
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add current date to footer
    const footerBottomP = document.querySelector('.footer-bottom p');
    if (footerBottomP) {
        const currentYear = new Date().getFullYear();
        footerBottomP.innerHTML = `&copy; ${currentYear} Prince Kothari. All Rights Reserved.`;
    }
});