/* ==========================================================================
   ANSHAD & ASNA WEDDING INVITATION - CUSTOM JAVASCRIPT (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       1. PRELOADER & LOADING BAR
       -------------------------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    
    // Simulate loading progress
    let width = 0;
    const loadingInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(loadingInterval);
            // Add a small delay for smooth visual transition
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 400);
        } else {
            width += Math.floor(Math.random() * 15) + 5;
            if (width > 100) width = 100;
            preloaderBar.style.width = width + '%';
        }
    }, 80);

    /* --------------------------------------------------------------------------
       2. DYNAMIC STAR GENERATION (Starfield in Hero)
       -------------------------------------------------------------------------- */
    const starfield = document.getElementById('starfield');
    const numStars = 60;

    if (starfield) {
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random positioning
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            
            // Random sizes (0.5px to 2px)
            const size = Math.random() * 1.5 + 0.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Random animation delay
            const delay = Math.random() * 4;
            star.style.animationDelay = `${delay}s`;
            
            starfield.appendChild(star);
        }
    }

    /* --------------------------------------------------------------------------
       3. SCROLL PROGRESS BAR & NAVBAR TRANSFORM
       -------------------------------------------------------------------------- */
    const scrollBar = document.getElementById('scroll-bar');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress bar percentage
        if (docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollBar.style.width = scrollPercent + '%';
        }

        // Navbar blur and shrink
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Nav Link Highlight based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // offset for nav bar height
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* --------------------------------------------------------------------------
       4. MOBILE HAMBURGER MENU DRAWER
       -------------------------------------------------------------------------- */
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            const expanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
            hamburgerMenu.setAttribute('aria-expanded', !expanded);
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu drawer when links are clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.setAttribute('aria-expanded', 'false');
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* --------------------------------------------------------------------------
       5. AUDIO BACKGROUND CONTROLLER
       -------------------------------------------------------------------------- */
    const musicBtn = document.getElementById('music-btn');
    const musicPlayIcon = document.getElementById('music-play');
    const musicPauseIcon = document.getElementById('music-pause');
    const bgAudio = document.getElementById('bg-audio');

    if (musicBtn && bgAudio) {
        // Lower default volume for pleasant ambiance
        bgAudio.volume = 0.35;

        // A lock variable to prevent rapid click interruption (AbortError)
        let isTransitioning = false;

        musicBtn.addEventListener('click', async () => {
            if (isTransitioning) return;
            isTransitioning = true;

            try {
                if (bgAudio.paused) {
                    // Await the play promise to resolve before allowing further actions
                    await bgAudio.play();
                    musicPlayIcon.classList.add('hidden');
                    musicPauseIcon.classList.remove('hidden');
                } else {
                    bgAudio.pause();
                    musicPlayIcon.classList.remove('hidden');
                    musicPauseIcon.classList.add('hidden');
                }
            } catch (err) {
                // Gracefully handle playback issues without throwing loud console errors
                if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
                    console.warn("Audio playback failed: ", err);
                }
            } finally {
                isTransitioning = false;
            }
        });
    }

    /* --------------------------------------------------------------------------
       6. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .zoom-in');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: Stop observing once revealed to boost performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // trigger when 15% of element is in viewport
        rootMargin: '0px 0px -50px 0px' // adjust bottom margin slightly
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* --------------------------------------------------------------------------
       7. MANUAL SMOOTH PARALLAX SCROLLING
       -------------------------------------------------------------------------- */
    const heroBgLayer = document.getElementById('hero-bg-layer');
    const lanternLayer = document.querySelector('.lantern-container');
    const coupleCards = document.querySelectorAll('.couple-card');

    window.addEventListener('scroll', () => {
        const scrolledY = window.scrollY;

        // Parallax hero background layer (moves slower)
        if (heroBgLayer && scrolledY < window.innerHeight) {
            const speed = heroBgLayer.getAttribute('data-speed');
            heroBgLayer.style.transform = `translateY(${scrolledY * speed}px)`;
        }

        // Parallax lanterns (moves at a slightly different pace)
        if (lanternLayer && scrolledY < window.innerHeight) {
            const speed = lanternLayer.getAttribute('data-speed');
            lanternLayer.style.transform = `translateY(${scrolledY * speed}px)`;
        }
    });

    // Mouse Parallax on Hero Content
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            const calligraphy = document.querySelector('.hero-calligraphy');
            const names = document.querySelector('.hero-names');
            
            if (calligraphy) calligraphy.style.transform = `translateX(${x}px) translateY(${y}px)`;
            if (names) names.style.transform = `translateX(${x * 1.5}px) translateY(${y * 1.5}px)`;
        });
        
        // Reset when mouse leaves
        heroSection.addEventListener('mouseleave', () => {
            const calligraphy = document.querySelector('.hero-calligraphy');
            const names = document.querySelector('.hero-names');
            if (calligraphy) calligraphy.style.transform = 'none';
            if (names) names.style.transform = 'none';
        });
    }

    /* --------------------------------------------------------------------------
       8. SACRED NIKAH LIVE COUNTDOWN
       -------------------------------------------------------------------------- */
    // Targets: Sunday, July 26, 2026, 11:00 AM (Anshad & Asna Nikah)
    const weddingDate = new Date('July 26, 2026 11:00:00').getTime();

    const daysVal = document.getElementById('days');
    const hoursVal = document.getElementById('hours');
    const minutesVal = document.getElementById('minutes');
    const secondsVal = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft <= 0) {
            // Wedding has arrived/passed
            if (daysVal) daysVal.innerText = '00';
            if (hoursVal) hoursVal.innerText = '00';
            if (minutesVal) minutesVal.innerText = '00';
            if (secondsVal) secondsVal.innerText = '00';
            return;
        }

        // Calculations
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Format to double digits
        if (daysVal) daysVal.innerText = String(days).padStart(2, '0');
        if (hoursVal) hoursVal.innerText = String(hours).padStart(2, '0');
        if (minutesVal) minutesVal.innerText = String(minutes).padStart(2, '0');
        if (secondsVal) secondsVal.innerText = String(seconds).padStart(2, '0');
    }

    updateCountdown(); // Run once initially
    setInterval(updateCountdown, 1000);

    /* --------------------------------------------------------------------------
       9. VANILLA CUSTOM LIGHTBOX FOR GALLERY
       -------------------------------------------------------------------------- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let activeIndex = 0;
    const imagesSrcList = [];
    const captionsList = [];

    // Populate gallery source and alt caption collections
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            imagesSrcList.push(img.src);
            captionsList.push(img.alt || 'Wedding Gallery Image');
            
            item.addEventListener('click', () => {
                activeIndex = index;
                openLightbox();
            });
        }
    });

    function openLightbox() {
        if (!lightbox) return;
        updateLightboxContent();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // stop page scroll
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // restore scroll
    }

    function showNextImage() {
        activeIndex = (activeIndex + 1) % imagesSrcList.length;
        updateLightboxContent();
    }

    function showPrevImage() {
        activeIndex = (activeIndex - 1 + imagesSrcList.length) % imagesSrcList.length;
        updateLightboxContent();
    }

    function updateLightboxContent() {
        if (lightboxImg && lightboxCaption) {
            lightboxImg.src = imagesSrcList[activeIndex];
            lightboxCaption.innerText = captionsList[activeIndex];
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

    // Close on overlay background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });

    /* --------------------------------------------------------------------------
       10. RSVP FORM VALIDATION & CONFIRMATION MODAL
       -------------------------------------------------------------------------- */
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpModal = document.getElementById('rsvp-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalResponseText = document.getElementById('modal-response-text');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const nameInput = document.getElementById('rsvp-name');
            const phoneInput = document.getElementById('rsvp-phone');
            const guestsSelect = document.getElementById('rsvp-guests');
            const attendanceInputs = document.getElementsByName('attendance');
            
            let isFormValid = true;

            // Name Validation
            if (!nameInput.value.trim()) {
                showInputError(nameInput, 'name-error');
                isFormValid = false;
            } else {
                hideInputError(nameInput, 'name-error');
            }

            // Phone Validation (simple digit & plus check)
            const phonePattern = /^[\d\s\-\+\(\)]+$/;
            if (!phoneInput.value.trim() || !phonePattern.test(phoneInput.value.trim())) {
                showInputError(phoneInput, 'phone-error');
                isFormValid = false;
            } else {
                hideInputError(phoneInput, 'phone-error');
            }

            // Guests Validation
            if (!guestsSelect.value) {
                showInputError(guestsSelect, 'guests-error');
                isFormValid = false;
            } else {
                hideInputError(guestsSelect, 'guests-error');
            }

            if (isFormValid) {
                // Get selected attendance option
                let selectedAttendance = 'accept';
                for (const option of attendanceInputs) {
                    if (option.checked) {
                        selectedAttendance = option.value;
                        break;
                    }
                }

                // Construct confirmation messages
                const visitorName = nameInput.value.trim();
                const guestCount = guestsSelect.value;
                
                if (selectedAttendance === 'accept') {
                    modalResponseText.innerHTML = `JazakAllah Khair, <strong>${visitorName}</strong>! Your RSVP response has been received. We have reserved seats for <strong>${guestCount}</strong>. We look forward to seeing you at our Nikah!`;
                } else {
                    modalResponseText.innerHTML = `JazakAllah Khair, <strong>${visitorName}</strong>. Thank you for letting us know. We will miss you on our special day, and we request your prayers for our union.`;
                }

                // Trigger success modal
                if (rsvpModal) {
                    rsvpModal.classList.add('active');
                    rsvpModal.setAttribute('aria-hidden', 'false');
                }
                
                // Reset form
                rsvpForm.reset();
            }
        });
    }

    function showInputError(inputEl, errorId) {
        inputEl.classList.add('invalid');
        const errorEl = document.getElementById(errorId);
        if (errorEl) errorEl.style.display = 'block';
    }

    function hideInputError(inputEl, errorId) {
        inputEl.classList.remove('invalid');
        const errorEl = document.getElementById(errorId);
        if (errorEl) errorEl.style.display = 'none';
    }

    // Modal Close
    if (modalCloseBtn && rsvpModal) {
        modalCloseBtn.addEventListener('click', () => {
            rsvpModal.classList.remove('active');
            rsvpModal.setAttribute('aria-hidden', 'true');
        });
    }
    
    if (rsvpModal) {
        rsvpModal.addEventListener('click', (e) => {
            if (e.target === rsvpModal) {
                rsvpModal.classList.remove('active');
                rsvpModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /* --------------------------------------------------------------------------
       11. LUXURY BUTTON RIPPLE EFFECT
       -------------------------------------------------------------------------- */
    const rippleButtons = document.querySelectorAll('.ripple');

    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-element');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
