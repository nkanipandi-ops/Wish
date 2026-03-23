// ======================================================================
// 🎈 USER SETTINGS - EASY TO EDIT
// ======================================================================

// 1. Change the birthday name here:
const BIRTHDAY_NAME = "Pavi";

// 2. Change the date badge here:
const BADGE_DATE = "Apr 16, 2026";

// 3. Edit the rotating sweet birthday wishes below (they will cycle automatically):
const ROTATING_WISHES = [
    "Wishing you love, joy, and endless happiness 💖",
    "May your day be as beautiful as your smile ✨",
    "You deserve all the happiness in the world 🌟",
    "A year older, a year more wonderful! 🎂",
    "Sending you the sweetest birthday hugs 🧸"
];

// 4. Edit the beautiful birthday letter popup that appears when clicking "Read a Note":
const LETTER_TEXT = `Dear ${BIRTHDAY_NAME}, <br><br>
This is a very special day because the world was gifted with you!
May all your dreams come true, may your path be paved with joy, 
and may you always find reasons to smile and be happy. <br><br>
Never forget how magical and loved you are! Have the most wonderful birthday! ✨
<br><br>With lots of love! 💖`;

// 5. Change the photo captions (these match the 10 photos in order):
const PHOTO_CAPTIONS = [
    "cute day", "sweet smile", "lovely moment", "happy times", "beautiful",
    "forever memory", "so pretty", "sunny day", "best day", "magical"
];

// 6. Put all your birthday images inside the assets folder and name them img1.jpg to img10.jpg
const photos = [
    "assets/pic1.jpeg",
    "assets/pic2.jpeg",
    "assets/pic3.jpeg",
    "assets/pic4.jpeg",
    "assets/pic5.jpeg",
    "assets/pic6.jpeg",
    "assets/pic7.jpeg",
    "assets/pic8.jpeg",
    "assets/pic9.jpeg",
    "assets/pic10.jpeg"
];

// ======================================================================
// DO NOT EDIT BELOW THIS LINE UNLESS YOU KNOW WHAT YOU'RE DOING
// ======================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- References ---
    const introScreen = document.getElementById('intro-screen');
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownNumber = document.getElementById('countdown-number');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');

    // Set UI constants
    document.getElementById('badge-name').innerText = BIRTHDAY_NAME;
    document.getElementById('badge-date-text').innerText = BADGE_DATE;
    document.getElementById('footer-name').innerText = BIRTHDAY_NAME;
    document.getElementById('letter-text').innerHTML = LETTER_TEXT;

    let isPlaying = false;
    let hasStarted = false;

    // --- Confetti Generation ---
    function triggerConfetti() {
        if (typeof confetti === 'function') {
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ffb6c1', '#ffd700', '#ffcccb', '#dda0dd'] });
                confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ffb6c1', '#ffd700', '#ffcccb', '#dda0dd'] });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        }
    }

    // --- Typing Effect Setup ---
    const textToType = "Happy Birthday ";
    const typeTarget = document.getElementById('type-text');
    const nameTarget = document.getElementById('name-text');
    let typeIndex = 0;

    nameTarget.innerText = BIRTHDAY_NAME;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typeTarget.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 120);
        } else {
            typeTarget.classList.remove('cursor');
            nameTarget.style.display = 'inline-block';
            triggerConfetti(); // Boom! Name reveals.
        }
    }

    // --- Start Celebration & Countdown ---
    openBtn.addEventListener('click', () => {
        if (hasStarted) return;
        hasStarted = true;

        // Hide intro, show countdown
        introScreen.classList.add('hidden');
        countdownScreen.classList.remove('hidden');

        let count = 3;
        countdownNumber.innerText = count;

        const countInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNumber.style.animation = 'none';
                void countdownNumber.offsetWidth; // trigger reflow
                countdownNumber.style.animation = 'pulseCount 1s infinite alternate';
                countdownNumber.innerText = count;
            } else if (count === 0) {
                countdownNumber.innerText = "Surprise!";
                triggerConfetti();

                // Play Audio securely via interaction
                bgMusic.play().catch(e => console.log('Audio error:', e));
                isPlaying = true;
                musicBtn.innerHTML = '⏸️ Pause Music';
            } else {
                clearInterval(countInterval);

                // Hide countdown, reveal main page
                countdownScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');

                typeTarget.classList.add('cursor');

                // Launch main animations
                setTimeout(typeWriter, 800);
                setTimeout(() => { startSlideshow('left-cards'); setTimeout(() => startSlideshow('right-cards'), 1000); }, 500);
                createFloatingEmbellishments();
            }
        }, 1000);
    });

    // --- Music Toggle ---
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause(); musicBtn.innerHTML = '🎵 Play Birthday Music';
        } else {
            bgMusic.play().catch(e => console.log('Audio error:', e)); musicBtn.innerHTML = '⏸️ Pause Music';
        }
        isPlaying = !isPlaying;
    });

    // --- Rotating Wishes ---
    const wishEl = document.getElementById('rotating-wish');
    let currentWishIndex = 0;
    wishEl.innerText = ROTATING_WISHES[0];

    setInterval(() => {
        wishEl.style.opacity = '0';
        setTimeout(() => {
            currentWishIndex = (currentWishIndex + 1) % ROTATING_WISHES.length;
            wishEl.innerText = ROTATING_WISHES[currentWishIndex];
            wishEl.style.opacity = '1';
        }, 800);
    }, 5000);

    // --- Polaroids & Spotlight Effect ---
    const leftImages = []; const rightImages = [];
    photos.forEach((photo, idx) => {
        if (idx % 2 === 0) leftImages.push({ src: photo, cap: PHOTO_CAPTIONS[idx] });
        else rightImages.push({ src: photo, cap: PHOTO_CAPTIONS[idx] });
    });

    function createPolaroids(containerId, imageData) {
        const container = document.getElementById(containerId);
        if (imageData.length === 0) imageData = [{ src: 'https://via.placeholder.com/400x600', cap: 'No Image' }];

        imageData.forEach((data, idx) => {
            const card = document.createElement('div');
            card.className = 'card';
            const tilt = (Math.random() * 8) - 4;
            card.style.setProperty('--tilt', `${tilt}deg`);

            const imgDiv = document.createElement('div');
            imgDiv.className = 'card-img';
            const finalSrc = data.src.includes('unsplash.com') ? `${data.src}?auto=format&fit=crop&w=400&q=80` : data.src;
            imgDiv.style.backgroundImage = `url('${finalSrc}')`;

            const capDiv = document.createElement('div');
            capDiv.className = 'card-caption';
            capDiv.innerText = data.cap || '';

            card.appendChild(imgDiv);
            card.appendChild(capDiv);

            if (idx === 0) card.classList.add('active');
            container.appendChild(card);
        });
    }

    createPolaroids('left-cards', leftImages);
    createPolaroids('right-cards', rightImages);

    function startSlideshow(containerId) {
        const container = document.getElementById(containerId);
        let currentIndex = 0;
        const cards = container.querySelectorAll('.card');
        const total = cards.length;
        if (total <= 1) return;

        setInterval(() => {
            const currentCard = cards[currentIndex];
            const nextIndex = (currentIndex + 1) % total;
            const nextCard = cards[nextIndex];

            currentCard.classList.remove('active', 'spotlight');
            currentCard.classList.add('prev');
            nextCard.classList.remove('prev');
            nextCard.classList.add('active');

            setTimeout(() => { currentCard.classList.remove('prev'); }, 1200);
            currentIndex = nextIndex;
        }, 3000); // 3 seconds to fully appreciate large image
    }

    // Auto-Spotlight System
    setInterval(() => {
        if (!hasStarted) return;
        const activeCards = document.querySelectorAll('.card.active');
        if (activeCards.length > 0) {
            const randomCard = activeCards[Math.floor(Math.random() * activeCards.length)];
            randomCard.classList.add('spotlight');
            setTimeout(() => randomCard.classList.remove('spotlight'), 2500); // glow for 2.5s
        }
    }, 6000);

    // --- Floating Balloons & Hearts ---
    const colors = [
        { c1: '#ffb6c1', c2: '#ff8da1' }, { c1: '#ffdab9', c2: '#ffcba4' },
        { c1: '#fffdd0', c2: '#f0e68c' }, { c1: '#f5f5dc', c2: '#e3e3b3' },
        { c1: '#e6e6fa', c2: '#d8bfd8' }, { c1: '#ffffff', c2: '#f0f0f0' },
        { c1: '#d2b48c', c2: '#cdaa7d' }
    ];

    function createFloatingEmbellishments() {
        const floatContainer = document.getElementById('floating-elements');
        // Balloons
        for (let i = 0; i < 25; i++) {
            const b = document.createElement('div'); b.classList.add('balloon-item');
            const color = colors[Math.floor(Math.random() * colors.length)];
            b.style.setProperty('--bc1', color.c1); b.style.setProperty('--bc2', color.c2);
            b.style.left = `${Math.random() * 95}%`;
            b.style.setProperty('--dur', `${15 + Math.random() * 20}s`);
            b.style.animationDelay = `-${Math.random() * 20}s`;
            b.style.setProperty('--scale', `${0.6 + Math.random() * 0.5}`);
            b.style.setProperty('--drift', `${(Math.random() - 0.5) * 150}`);
            if (Math.random() < 0.3) {
                const el = document.createElement('div'); el.style.position = 'absolute'; el.style.width = '25px'; el.style.height = '25px'; el.style.borderRadius = '50%'; el.style.top = '-5px'; el.style.left = '-8px'; el.style.background = `radial-gradient(circle at 8px 8px, ${color.c1}, ${color.c2})`;
                const er = document.createElement('div'); er.style.position = 'absolute'; er.style.width = '25px'; er.style.height = '25px'; er.style.borderRadius = '50%'; er.style.top = '-5px'; er.style.right = '-8px'; er.style.background = `radial-gradient(circle at 8px 8px, ${color.c1}, ${color.c2})`;
                b.appendChild(el); b.appendChild(er);
            }
            floatContainer.appendChild(b);
        }
        // Hearts
        for (let j = 0; j < 20; j++) {
            const h = document.createElement('div'); h.classList.add('heart-item');
            const color = colors[Math.floor(Math.random() * colors.length)];
            h.style.setProperty('--bc1', color.c1);
            h.style.left = `${Math.random() * 95}%`;
            h.style.setProperty('--dur', `${12 + Math.random() * 18}s`);
            h.style.animationDelay = `-${Math.random() * 18}s`;
            h.style.setProperty('--scale', `${0.4 + Math.random() * 0.6}`);
            h.style.setProperty('--drift', `${(Math.random() - 0.5) * 100}`);
            floatContainer.appendChild(h);
        }
    }

    // --- Interactive Mouse Trail & Parallax ---
    const trailContainer = document.getElementById('mouse-trail-container');
    window.addEventListener('mousemove', (e) => {
        // Parallax
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        document.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            layer.style.transform = `translate(${x * speed * 100}px, ${y * speed * 100}px)`;
        });

        // Mouse Trail (throttle slightly)
        if (Math.random() < 0.4) {
            const trail = document.createElement('div');
            trail.className = 'trail-particle';
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            // random pastel colors
            const ptColor = colors[Math.floor(Math.random() * colors.length)].c1;
            trail.style.background = `radial-gradient(circle, ${ptColor}, transparent)`;
            trailContainer.appendChild(trail);
            setTimeout(() => trail.remove(), 800);
        }
    });

    // --- Cake Candles ---
    // (Candle element removed)

    // --- Fireflies ---
    const firefliesContainer = document.getElementById('fireflies');
    for (let f = 0; f < 30; f++) {
        const fly = document.createElement('div');
        fly.className = 'firefly';
        fly.style.left = `${Math.random() * 100}%`;
        fly.style.top = `${Math.random() * 100}%`;
        fly.style.setProperty('--dur', `${2 + Math.random() * 4}s`);
        fly.style.setProperty('--dx', `${(Math.random() - 0.5) * 200}px`);
        fly.style.setProperty('--dy', `${(Math.random() - 0.5) * 200}px`);
        fly.style.animationDelay = `-${Math.random() * 5}s`;
        firefliesContainer.appendChild(fly);
    }

    // --- Popup & Interactivity ---
    const popup = document.getElementById('letter-popup');
    const readBtn = document.getElementById('read-note-btn');
    const closeBtn = document.getElementById('close-popup');
    const heartBtn = document.getElementById('heart-btn');

    if (readBtn && popup && closeBtn) {
        readBtn.addEventListener('click', () => popup.classList.remove('hidden'));
        closeBtn.addEventListener('click', () => popup.classList.add('hidden'));
        popup.addEventListener('click', (e) => { if (e.target === popup) popup.classList.add('hidden'); });
    }

    if (heartBtn && popup) {
        heartBtn.addEventListener('click', () => popup.classList.remove('hidden'));
    }

    // Teddy 
    const teddyBtn = document.getElementById('teddy-btn');
    if (teddyBtn) {
        teddyBtn.addEventListener('click', () => triggerConfetti());
    }

    // Gift Corners
    document.querySelectorAll('.gift-corner').forEach(corner => {
        corner.addEventListener('click', function () {
            const msg = this.querySelector('.gift-message');
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 3000);
        });
    });
});
