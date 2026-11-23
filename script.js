'use strict';

/* Edit all image paths, music, and message copy here. */
const CONFIG = {
  images: {
    bmw: 'https://i.pinimg.com/736x/3f/cf/06/3fcf06129469f8e61ad7a8e11884cea5.jpg',
    bmwInterior: 'https://i.pinimg.com/736x/99/ce/4b/99ce4b3783c27831221110aeca7b413d.jpg',
    kitkat: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV9EoUHt8f1MwaCRRccZTdey8n45sCCa908ScLUCJ2VNdrWnNALhDKqX1_HSOsZWhD4-NSIlXiBkxL3xRRPqz7kq7zudxg6khosJo6SaXR&s=10',
    flowers: 'https://i.pinimg.com/564x/e4/9a/86/e49a865773d7a9055be6f5e3760de159.jpg',
    blackRose: './blackrose.jpg',
    rumaisa: './rumaisa.jpg',
    eyes: './eyes.jpg',
    myPhoto: './ahmad.jpg'
  },
  music: {
    src: './song.mp3',
    volume: 0.35
  },
  hero: {
    greetings: {
      morning: 'Good morning, Rumaisa',
      afternoon: 'Good afternoon, Rumaisa',
      evening: 'Good evening, Rumaisa',
      night: 'Good night, Rumaisa'
    },
    rotatingLines: [
      'Made with kindness...',
      'Made with care...',
      'Made with a little love...',
      'Made for you.'
    ],
    heartMessage: 'Someone is thinking of you today.'
  },
  captions: {
    bmw: "Some dreams don't need to hurry. They just wait, polished and patient, for the right day.",
    bmwInterior: 'Quiet light, soft leather, and a feeling that everything is going to be okay.',
    kitkat: 'Take a little break. You have earned it. (Sharing is optional. Ahmad is watching.)',
    flowers: 'Like roses that bloom even in the dark - some people simply make the world softer.',
    rumaisa: 'Out of everything I could have chosen, this is the one that makes me smile every single time.',
    rumaisaNote: 'No filter needed.',
    ahmad: 'Yes, this is the guy who built an entire website just to make you smile. Please ignore the hoodie, it is trying its best.',
    ahmadNote: 'Warning: this smile is for emergency bad-mood days only.',
    ahmadHover: 'Okay okay, one more smile and then back to work.',
    eyesNote: 'Some beauty is felt, not explained.'
  },
  shayari: [
    'Aankhon mein teri sukoon ka ek aasmaan hai,',
    'jahan lafz khamosh hain aur nazar bas mehmaan hai.',
    'Kuch khoobsuratiyan bayaan nahin hoti,',
    'bas dil ke kisi kone mein dua ban kar utar jaati hain.'
  ],
  letter: {
    greeting: 'Hey Rumaisa,',
    paragraphs: [
      'I know sometimes days can feel a little heavy, and things may not always go the way we hope.',
      'I just wanted to create a little moment of happiness for you.',
      'I hope this small surprise brings a smile to your face and reminds you that you deserve kindness, peace, beautiful moments, and all the happiness life has to offer.',
      'Take care of yourself, enjoy the little things, and never forget that your happiness matters.',
      'May your days ahead be filled with beautiful surprises, peaceful moments, and countless reasons to smile.'
    ],
    signoff: 'Sending you a little happiness, wrapped in burgundy and a few sweet surprises.'
  },
  dua: 'May Allah bring peace to your heart, happiness to your days, ease to every difficulty, and beautiful surprises into your life. May He protect you, guide you towards what is good for you, bless your future, and grant you happiness in this life and the hereafter. Ameen.',
  finalMessage: [
    'May life always bring you beautiful reasons to smile.',
    'You deserve happiness, peace, kindness, and beautiful moments.',
    'Take care of yourself.'
  ]
};

(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const intro = $('#intro');
  let revealObserver;
  let revealFallback;
  let toastTimer;
  let ameenTimer;
  let heroMotion;

  function toast(message) {
    const node = $('#toast');
    node.textContent = message;
    node.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => node.classList.remove('show'), 3600);
  }

  function usableImageSource(source) {
    return typeof source === 'string' && source.trim() !== '' && !source.includes('PASTE_MY_');
  }

  function initImages() {
    $$('img[data-image]').forEach((image) => {
      const frame = image.closest('.media');
      const source = CONFIG.images[image.dataset.image];
      const fail = () => {
        frame.classList.remove('loaded');
        frame.classList.add('failed');
      };
      const load = () => {
        if (!image.naturalWidth) return fail();
        frame.classList.remove('failed');
        frame.classList.add('loaded');
        image.classList.add('loaded');
      };

      image.addEventListener('load', load);
      image.addEventListener('error', fail);
      if (!usableImageSource(source)) {
        fail();
        return;
      }
      image.src = source;
      if (image.complete) image.naturalWidth ? load() : fail();
    });

    const roseImage = $('#blackRoseImage');
    if (roseImage && usableImageSource(CONFIG.images.blackRose)) {
      const roseFrame = roseImage.closest('.media');
      const fallback = $('#blackRoseFallback');
      roseImage.hidden = false;
      const showRosePhoto = () => {
        roseImage.classList.add('loaded');
        roseFrame.classList.add('loaded');
        fallback.hidden = true;
      };
      const showRoseFallback = () => {
        roseImage.hidden = true;
        roseImage.classList.remove('loaded');
        roseFrame.classList.remove('loaded');
        fallback.hidden = false;
      };
      roseImage.addEventListener('load', () => {
        if (roseImage.naturalWidth) showRosePhoto();
        else showRoseFallback();
      });
      roseImage.addEventListener('error', showRoseFallback);
      roseImage.src = CONFIG.images.blackRose;
      if (roseImage.complete) roseImage.naturalWidth ? showRosePhoto() : showRoseFallback();
    }
  }

  function initText() {
    $('#bmwCaption').textContent = CONFIG.captions.bmw;
    $('#interiorCaption').textContent = CONFIG.captions.bmwInterior;
    $('#kitkatCaption').textContent = CONFIG.captions.kitkat;
    $('#kitkatRevealCaption').textContent = CONFIG.captions.kitkat;
    $('#flowersCaption').textContent = CONFIG.captions.flowers;
    $('#rumaisaCaption').textContent = CONFIG.captions.rumaisa;
    $('#rumaisaNote').textContent = CONFIG.captions.rumaisaNote;
    $('#ahmadCaption').textContent = CONFIG.captions.ahmad;
    $('#ahmadNote').textContent = CONFIG.captions.ahmadNote;
    $('#ahmadHoverNote').textContent = CONFIG.captions.ahmadHover;
    $('#eyesNote').textContent = CONFIG.captions.eyesNote;

    const shayari = $('#eyesShayari');
    CONFIG.shayari.forEach((line) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      shayari.appendChild(paragraph);
    });

    $('#letterGreeting').textContent = CONFIG.letter.greeting;
    const letterBody = $('#letterBody');
    CONFIG.letter.paragraphs.forEach((line) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      letterBody.appendChild(paragraph);
    });
    $('#letterSignoff').textContent = CONFIG.letter.signoff;
    $('#duaText').textContent = CONFIG.dua;

    const finalMessage = $('#finalMessage');
    CONFIG.finalMessage.forEach((line) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = line;
      finalMessage.appendChild(paragraph);
    });
  }

  function initReveals() {
    const items = $$('.reveal, .reveal-clip');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach((item) => item.classList.add('in'));
      return;
    }

    body.classList.add('js-reveal-ready');
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px 120px 0px' });
    items.forEach((item) => revealObserver.observe(item));

    revealFallback = window.setTimeout(() => {
      window.clearTimeout(revealFallback);
      if (revealObserver) revealObserver.disconnect();
      items.forEach((item) => item.classList.add('in'));
    }, 3500);
  }

  function initAmbient() {
    const canvas = $('#fx');
    const context = canvas.getContext('2d');
    if (!context) return;

    const gold = ['#D4A373', '#E9C98F', '#F5E9E6'];
    const petals = ['#4A1025', '#74263F', '#C58A9D'];
    const parts = [];
    let width = 0;
    let height = 0;
    let ratio = 1;
    let animation = 0;
    let lastFrame = 0;

    const random = (min, max) => min + Math.random() * (max - min);
    const pick = (items) => items[Math.floor(Math.random() * items.length)];

    function resize() {
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function addStar(initial = false) {
      parts.push({
        kind: 'star', x: random(0, width), y: initial ? random(0, height) : height + 5,
        radius: random(.5, 1.5), speed: random(.08, .3), phase: random(0, 6.28), color: pick(gold)
      });
    }

    function addPetal(initial = false) {
      parts.push({
        kind: 'petal', x: random(0, width), y: initial ? random(0, height) : -random(15, 120),
        size: random(4, 8), speed: random(.3, .85), sway: random(.35, 1.2), phase: random(0, 6.28),
        angle: random(0, 6.28), turn: random(-.015, .015), color: pick(petals), alpha: random(.35, .7)
      });
    }

    function seed() {
      parts.length = 0;
      const small = width < 700;
      for (let i = 0; i < (small ? 24 : 44); i++) addStar(true);
      for (let i = 0; i < (small ? 4 : 7); i++) addPetal(true);
    }

    function drawPetal(part) {
      context.save();
      context.translate(part.x, part.y);
      context.rotate(part.angle);
      context.globalAlpha = part.alpha;
      context.fillStyle = part.color;
      context.beginPath();
      context.moveTo(0, -part.size);
      context.bezierCurveTo(part.size, -part.size * .4, part.size * .8, part.size * .7, 0, part.size);
      context.bezierCurveTo(-part.size * .8, part.size * .7, -part.size, -part.size * .4, 0, -part.size);
      context.fill();
      context.restore();
    }

    function draw(time) {
      animation = window.requestAnimationFrame(draw);
      if (time - lastFrame < (width < 700 ? 30 : 16)) return;
      const delta = Math.min((time - lastFrame) / 16.67, 2.5) || 1;
      lastFrame = time;
      context.clearRect(0, 0, width, height);

      for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        if (part.kind === 'star') {
          part.y -= part.speed * delta;
          part.phase += .025 * delta;
          if (part.y < -4) { parts.splice(i, 1); addStar(); continue; }
          context.globalAlpha = .2 + .55 * Math.abs(Math.sin(part.phase));
          context.fillStyle = part.color;
          context.beginPath();
          context.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
          context.fill();
        } else if (part.kind === 'petal') {
          part.phase += .02 * delta;
          part.angle += part.turn * delta;
          part.x += Math.sin(part.phase) * part.sway * delta;
          part.y += part.speed * delta;
          if (part.y > height + 18) { parts.splice(i, 1); addPetal(); continue; }
          drawPetal(part);
        } else {
          part.x += part.vx * delta;
          part.y += part.vy * delta;
          part.vy += .035 * delta;
          part.life -= .018 * delta;
          if (part.life <= 0) { parts.splice(i, 1); continue; }
          context.globalAlpha = part.life;
          context.fillStyle = part.color;
          context.beginPath();
          context.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    }

    function start() {
      if (reduceMotion || animation || document.hidden) return;
      lastFrame = performance.now();
      animation = window.requestAnimationFrame(draw);
    }

    function stop() {
      window.cancelAnimationFrame(animation);
      animation = 0;
    }

    function burst(x, y, count = 36) {
      if (reduceMotion) return;
      const amount = Math.min(count, width < 700 ? 22 : 36);
      for (let i = 0; i < amount; i++) {
        const angle = random(0, Math.PI * 2);
        const velocity = random(.7, 3.2);
        parts.push({
          kind: 'spark', x, y, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity - 1,
          radius: random(1, 2.5), life: 1, color: pick(gold)
        });
      }
    }

    function celebrate(element) {
      const rect = element.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 36);
      if (!reduceMotion) {
        for (let i = 0; i < (width < 700 ? 8 : 14); i++) addPetal();
      }
    }

    resize();
    seed();
    start();
    let resizeTimer;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { resize(); seed(); }, 180);
    }, { passive: true });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

    const cursor = $('.cursor-glow');
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let cursorFrame = 0;
      window.addEventListener('pointermove', (event) => {
        if (cursorFrame) return;
        cursorFrame = window.requestAnimationFrame(() => {
          cursor.style.left = `${event.clientX}px`;
          cursor.style.top = `${event.clientY}px`;
          cursor.classList.add('active');
          cursorFrame = 0;
        });
      }, { passive: true });
      window.addEventListener('pointerleave', () => cursor.classList.remove('active'));
    }

    return { burst, celebrate };
  }

  function initHero() {
    const hero = $('#home');
    const particleLayer = $('#heroParticles');
    const bokehLayer = $('.hero-bokeh');
    const bursts = $('#heroBursts');
    const greeting = $('#heroGreeting');
    const rotatingLine = $('#heroRotatingLine');
    const heartButton = $('#heroHeart');
    const heartMessage = $('#heroHeartMessage');
    const title = $('#heroTitle');
    const titleLines = $$('.hero-title > span', title);
    let heroVisible = false;
    let entranceTimer;
    let typeTimer;
    let greetingSwapTimer;
    let typeGeneration = 0;
    let lastTrailTime = 0;
    let previousParticleCount = 0;

    let titleCharacterIndex = 0;
    title.setAttribute('aria-hidden', 'false');
    titleLines.forEach((line) => {
      const text = line.textContent;
      line.setAttribute('aria-hidden', 'true');
      line.replaceChildren();
      Array.from(text).forEach((character) => {
        const letter = document.createElement('span');
        letter.className = 'hero-char';
        letter.textContent = character;
        letter.style.setProperty('--char-delay', `${titleCharacterIndex++ * 28}ms`);
        line.appendChild(letter);
      });
    });

    function currentGreeting() {
      const hour = new Date().getHours();
      if (hour < 5) return CONFIG.hero.greetings.night;
      if (hour < 12) return CONFIG.hero.greetings.morning;
      if (hour < 17) return CONFIG.hero.greetings.afternoon;
      if (hour < 21) return CONFIG.hero.greetings.evening;
      return CONFIG.hero.greetings.night;
    }

    function updateGreeting() {
      if (document.hidden) return;
      const next = currentGreeting();
      if (greeting.textContent === next) return;
      window.clearTimeout(greetingSwapTimer);
      if (!greeting.textContent) {
        greeting.textContent = next;
        return;
      }
      greeting.classList.remove('is-swapping');
      void greeting.offsetWidth;
      greeting.classList.add('is-swapping');
      greetingSwapTimer = window.setTimeout(() => {
        greeting.textContent = next;
        greetingSwapTimer = window.setTimeout(() => greeting.classList.remove('is-swapping'), reduceMotion ? 0 : 240);
      }, reduceMotion ? 0 : 240);
    }

    function addParticle(className, parent, index, total) {
      const particle = document.createElement('span');
      particle.className = className;
      particle.setAttribute('aria-hidden', 'true');
      particle.style.setProperty('--particle-left', `${(index + Math.random() * .8) / total * 100}%`);
      particle.style.setProperty('--particle-top', `${10 + Math.random() * 78}%`);
      particle.style.setProperty('--particle-delay', `${-Math.random() * 18}s`);
      particle.style.setProperty('--particle-duration', `${10 + Math.random() * 13}s`);
      particle.style.setProperty('--particle-sway', `${-35 + Math.random() * 70}px`);
      parent.appendChild(particle);
    }

    function buildParticles() {
      const small = window.innerWidth <= 700;
      const count = small ? 6 : 10;
      if (count === previousParticleCount) return;
      previousParticleCount = count;
      particleLayer.replaceChildren();
      bokehLayer.replaceChildren();
      for (let i = 0; i < (small ? 2 : 4); i++) addParticle('hero-bokeh-orb', bokehLayer, i, small ? 2 : 4);
      for (let i = 0; i < count; i++) addParticle('hero-floating-heart', particleLayer, i, count);
      for (let i = 0; i < (small ? 3 : 5); i++) addParticle('hero-falling-petal', particleLayer, i, small ? 3 : 5);
      for (let i = 0; i < (small ? 4 : 7); i++) addParticle('hero-firefly', particleLayer, i, small ? 4 : 7);
    }

    function syncMotion() {
      hero.classList.toggle('hero-motion-active', heroVisible && !document.hidden && body.classList.contains('opened'));
    }

    function burstAt(clientX, clientY, trail = false) {
      if (reduceMotion || document.hidden) return;
      const rect = hero.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const addBurstParticle = (className, dx, dy, delay = 0) => {
        const particle = document.createElement('span');
        particle.className = className;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--burst-dx', `${dx}px`);
        particle.style.setProperty('--burst-dy', `${dy}px`);
        particle.style.setProperty('--burst-delay', `${delay}ms`);
        particle.addEventListener('animationend', () => particle.remove(), { once: true });
        bursts.appendChild(particle);
      };

      const count = trail ? 1 : 9;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = trail ? 10 : 24 + Math.random() * 74;
        addBurstParticle('hero-burst-spark', Math.cos(angle) * distance, Math.sin(angle) * distance, i * 18);
      }
      if (trail && Math.random() < .24) {
        addBurstParticle('hero-burst-heart', 7 + Math.random() * 12, -8 - Math.random() * 12);
      } else if (!trail) {
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI * 2 * i) / 4 + Math.random() * .5;
          const distance = 35 + Math.random() * 45;
          addBurstParticle('hero-burst-heart', Math.cos(angle) * distance, Math.sin(angle) * distance - 14, i * 45);
        }
        for (let i = 0; i < 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          addBurstParticle('hero-burst-petal', Math.cos(angle) * 55, Math.sin(angle) * 55 - 18, i * 60);
        }
      }
    }

    function stopTypewriter() {
      typeGeneration++;
      window.clearTimeout(typeTimer);
    }

    function startTypewriter() {
      stopTypewriter();
      const lines = CONFIG.hero.rotatingLines;
      if (reduceMotion) {
        rotatingLine.textContent = lines[lines.length - 1];
        rotatingLine.classList.add('is-final');
        return;
      }

      rotatingLine.textContent = '';
      rotatingLine.classList.remove('is-final');
      const generation = typeGeneration;
      function typeLine(lineIndex) {
        if (generation !== typeGeneration) return;
        const text = lines[lineIndex];
        let character = 0;
        rotatingLine.textContent = '';
        const typeNext = () => {
          if (generation !== typeGeneration) return;
          rotatingLine.textContent = text.slice(0, ++character);
          if (character < text.length) {
            typeTimer = window.setTimeout(typeNext, 42);
          } else if (lineIndex < lines.length - 1) {
            typeTimer = window.setTimeout(erase, 1250);
          } else {
            rotatingLine.classList.add('is-final');
          }
        };
        const erase = () => {
          if (generation !== typeGeneration) return;
          rotatingLine.textContent = rotatingLine.textContent.slice(0, -1);
          if (rotatingLine.textContent) typeTimer = window.setTimeout(erase, 22);
          else typeLine(lineIndex + 1);
        };
        typeNext();
      }
      typeTimer = window.setTimeout(() => typeLine(0), 3200);
    }

    function start() {
      window.clearTimeout(entranceTimer);
      hero.classList.remove('is-entering', 'is-settled');
      void hero.offsetWidth;
      updateGreeting();
      if (reduceMotion) {
        hero.classList.add('is-settled');
        startTypewriter();
        syncMotion();
        return;
      }
      hero.classList.add('is-entering');
      syncMotion();
      startTypewriter();
      entranceTimer = window.setTimeout(() => {
        hero.classList.remove('is-entering');
        hero.classList.add('is-settled');
      }, 5200);
    }

    function reset() {
      window.clearTimeout(entranceTimer);
      stopTypewriter();
      hero.classList.remove('is-entering', 'is-settled');
      heartButton.classList.remove('is-revealed');
      heartButton.setAttribute('aria-pressed', 'false');
      heartMessage.hidden = true;
      rotatingLine.textContent = '';
      rotatingLine.classList.remove('is-final');
      syncMotion();
    }

    buildParticles();
    updateGreeting();
    window.setInterval(updateGreeting, 60000);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        syncMotion();
      }, { threshold: 0.01 });
      observer.observe(hero);
    } else {
      const updateVisibility = () => {
        const rect = hero.getBoundingClientRect();
        heroVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        syncMotion();
      };
      window.addEventListener('scroll', updateVisibility, { passive: true });
      window.addEventListener('resize', updateVisibility, { passive: true });
      updateVisibility();
    }
    document.addEventListener('visibilitychange', () => {
      updateGreeting();
      syncMotion();
    });
    window.addEventListener('resize', buildParticles, { passive: true });

    hero.addEventListener('pointerdown', (event) => {
      if (event.target.closest('#heroHeart')) return;
      burstAt(event.clientX, event.clientY);
    });
    hero.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'mouse' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const now = performance.now();
      if (now - lastTrailTime < 85) return;
      lastTrailTime = now;
      burstAt(event.clientX, event.clientY, true);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      hero.style.removeProperty('--hero-parallax-x');
      hero.style.removeProperty('--hero-parallax-y');
    });
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--hero-parallax-x', `${((event.clientX - rect.left) / rect.width - .5) * 16}px`);
        hero.style.setProperty('--hero-parallax-y', `${((event.clientY - rect.top) / rect.height - .5) * 16}px`);
      }, { passive: true });
    }
    heartButton.addEventListener('click', () => {
      heartButton.classList.add('is-revealed');
      heartButton.setAttribute('aria-pressed', 'true');
      heartMessage.textContent = CONFIG.hero.heartMessage;
      heartMessage.hidden = false;
      const rect = heartButton.getBoundingClientRect();
      burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });

    return { start, reset };
  }

  function initNavigation() {
    const nav = $('#nav');
    const toggle = $('#navToggle');
    const links = $$('.nav-links a');
    const targets = links.map((link) => $(link.getAttribute('href'))).filter(Boolean);

    function setMenu(open) {
      nav.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    toggle.addEventListener('click', () => setMenu(!nav.classList.contains('menu-open')));
    links.forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) setMenu(false);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      const byId = new Map(links.map((link) => [link.hash.slice(1), link]));
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            const active = byId.get(entry.target.id) === link;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-40% 0px -52% 0px', threshold: .01 });
      targets.forEach((target) => observer.observe(target));
    } else {
      window.addEventListener('scroll', () => {
        let current = targets[0];
        targets.forEach((target) => {
          if (target.getBoundingClientRect().top <= window.innerHeight * .4) current = target;
        });
        links.forEach((link) => link.classList.toggle('active', link.hash === `#${current.id}`));
      }, { passive: true });
    }
  }

  function initSubtleMotion() {
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    $$('.tilt-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty('--tilt-x', `${(-y * 2.4).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 2.4).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--tilt-x');
        card.style.removeProperty('--tilt-y');
      });
    });

    $$('.btn').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .035;
        const y = (event.clientY - rect.top - rect.height / 2) * .035;
        button.style.setProperty('--mag-x', `${x.toFixed(2)}px`);
        button.style.setProperty('--mag-y', `${y.toFixed(2)}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.removeProperty('--mag-x');
        button.style.removeProperty('--mag-y');
      });
    });
  }

  function initParallax() {
    if (reduceMotion) return;
    const targets = $$('.media.parallax');
    let frame = 0;

    function update() {
      frame = 0;
      const viewport = window.innerHeight;
      targets.forEach((media) => {
        const rect = media.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > viewport + 80) return;
        const offset = (rect.top + rect.height / 2 - viewport / 2) / viewport;
        media.style.setProperty('--py', `${(-offset * rect.height * .035).toFixed(1)}px`);
      });
    }

    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();
  }

  function initMusic() {
    const button = $('#musicBtn');
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = CONFIG.music.volume;
    let unavailable = false;

    function update() {
      const playing = !audio.paused && !unavailable;
      button.classList.toggle('playing', playing);
      button.classList.toggle('unavailable', unavailable);
      button.setAttribute('aria-pressed', String(playing));
      const label = unavailable ? 'Music unavailable' : playing ? 'Pause background music' : 'Play background music';
      button.setAttribute('aria-label', label);
      button.title = unavailable ? 'Add song.mp3 beside index.html to enable music' : label;
    }

    function markUnavailable() {
      if (unavailable) return;
      unavailable = true;
      update();
      toast('Music is optional. Add song.mp3 beside index.html to enable it.');
    }

    async function toggleMusic() {
      if (unavailable) {
        toast('Add song.mp3 beside index.html to enable music.');
        return;
      }
      if (!audio.src) audio.src = CONFIG.music.src;
      if (!audio.paused) {
        audio.pause();
        return;
      }
      try {
        await audio.play();
      } catch (error) {
        if (error && error.name === 'NotAllowedError') toast('Tap the music button again to start playback.');
        else markUnavailable();
      }
      update();
    }

    audio.addEventListener('error', markUnavailable);
    audio.addEventListener('play', update);
    audio.addEventListener('pause', update);
    button.addEventListener('click', toggleMusic);
    update();
  }

  function openExperience() {
    if (body.classList.contains('opened')) return;
    scrollToTopImmediately();
    intro.classList.add('leaving');
    body.classList.remove('locked');
    body.classList.add('opened');
    heroMotion.start();
    FX && FX.celebrate(intro);
    window.setTimeout(() => { intro.hidden = true; }, 1050);
  }

  const FX = initAmbient();

  function scrollToTopImmediately() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  function initGifts() {
    const kitButton = $('#kitBtn');
    const kitGift = $('#kitGift');
    const kitCard = $('#kitCard');
    const kitLabel = kitButton.textContent.trim();
    kitButton.addEventListener('click', () => {
      if (kitButton.disabled) return;
      kitButton.disabled = true;
      kitGift.classList.add('open');
      if (FX) FX.celebrate(kitGift);
      window.setTimeout(() => {
        kitGift.classList.add('gone');
        kitCard.classList.add('show');
        kitButton.textContent = 'A little happiness, unwrapped';
      }, reduceMotion ? 0 : 850);
    });

    const finalButton = $('#finalBtn');
    const finalGift = $('#finalGift');
    const finalMessage = $('#finalMessage');
    const replayButton = $('#replayBtn');
    finalButton.addEventListener('click', () => {
      if (finalButton.disabled) return;
      finalButton.disabled = true;
      finalGift.classList.add('open');
      if (FX) FX.celebrate(finalGift);
      window.setTimeout(() => {
        finalGift.classList.add('gone');
        finalMessage.classList.add('show');
        finalButton.hidden = true;
        replayButton.hidden = false;
      }, reduceMotion ? 0 : 950);
    });

    return () => {
      kitButton.disabled = false;
      kitButton.textContent = kitLabel;
      kitGift.classList.remove('open', 'gone');
      kitCard.classList.remove('show');
      finalGift.classList.remove('open', 'gone');
      finalMessage.classList.remove('show');
      finalButton.disabled = false;
      finalButton.hidden = false;
      replayButton.hidden = true;
    };
  }

  function initLetter() {
    const stage = $('#letterStage');
    const envelope = $('#envelope');
    const openButton = $('#letterBtn');
    const closeButton = $('#letterClose');
    const seal = $('#sealBtn');
    let busy = false;

    function openLetter() {
      if (busy || stage.classList.contains('is-open')) return;
      busy = true;
      stage.classList.add('is-open');
      envelope.classList.add('opening');
      openButton.setAttribute('aria-expanded', 'true');
      seal.setAttribute('aria-expanded', 'true');
      $('#paper').setAttribute('aria-hidden', 'false');
      openButton.hidden = true;
      closeButton.hidden = false;
      closeButton.focus();
      const rect = envelope.getBoundingClientRect();
      if (FX) FX.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
      window.setTimeout(() => { busy = false; }, reduceMotion ? 0 : 850);
    }

    function closeLetter() {
      stage.classList.remove('is-open');
      envelope.classList.remove('opening');
      openButton.setAttribute('aria-expanded', 'false');
      seal.setAttribute('aria-expanded', 'false');
      $('#paper').setAttribute('aria-hidden', 'true');
      closeButton.hidden = true;
      openButton.hidden = false;
      openButton.focus();
    }

    openButton.addEventListener('click', openLetter);
    seal.addEventListener('click', openLetter);
    envelope.addEventListener('click', openLetter);
    closeButton.addEventListener('click', closeLetter);
  }

  function initDua() {
    const sky = $('#duaSky');
    const total = window.innerWidth < 700 ? 28 : 52;
    for (let i = 0; i < total; i++) {
      const star = document.createElement('i');
      star.className = 'dua-star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${1.5 + Math.random() * 2.5}px`;
      star.style.height = star.style.width;
      star.style.setProperty('--delay', `${Math.random() * 3}s`);
      sky.appendChild(star);
    }

    const section = $('#dua');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        section.classList.add('stars-on');
        observer.disconnect();
      }, { threshold: .08 });
      observer.observe(section);
    } else {
      section.classList.add('stars-on');
    }

    $('#ameenBtn').addEventListener('click', () => {
      section.classList.add('ameen');
      $('#ameenResponse').textContent = 'Ameen, ya Rabb.';
      window.clearTimeout(ameenTimer);
      ameenTimer = window.setTimeout(() => {
        section.classList.remove('ameen');
        $('#ameenResponse').textContent = '';
      }, 4200);
      if (FX) FX.celebrate($('#duaMoon'));
    });
  }

  function initFlowers() {
    const flowers = $('#flowers');
    if (!('IntersectionObserver' in window) || reduceMotion) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      if (FX) FX.celebrate(flowers);
      observer.disconnect();
    }, { threshold: .15 });
    observer.observe(flowers);
  }

  function resetJourney(resetGifts) {
    resetGifts();
    $('#letterStage').classList.remove('is-open');
    $('#envelope').classList.remove('opening');
    $('#paper').setAttribute('aria-hidden', 'true');
    $('#sealBtn').setAttribute('aria-expanded', 'false');
    $('#letterBtn').setAttribute('aria-expanded', 'false');
    $('#letterClose').hidden = true;
    $('#letterBtn').hidden = false;
    $('#dua').classList.remove('ameen');
    $('#ameenResponse').textContent = '';
    $('#nav').classList.remove('menu-open');
    $('#navToggle').setAttribute('aria-expanded', 'false');
    $('#navToggle').setAttribute('aria-label', 'Open menu');
    scrollToTopImmediately();
    body.classList.remove('opened');
    body.classList.add('locked');
    heroMotion.reset();
    intro.hidden = false;
    intro.classList.remove('leaving');
  }

  initText();
  initImages();
  initReveals();
  initNavigation();
  initSubtleMotion();
  initParallax();
  initMusic();
  initLetter();
  initDua();
  initFlowers();
  const resetGifts = initGifts();
  heroMotion = initHero();

  $('#openBtn').addEventListener('click', openExperience);
  $('#replayBtn').addEventListener('click', () => resetJourney(resetGifts));
})();
