/* ApplicaTech static preview — routing, motion and interaction.
   No external runtime dependencies. */
(() => {
  "use strict";

  const C = window.APPLICA_CONTENT;
  if (!C) return;

  /* CRM/webhook integration point. Leave empty for the static preview.
     Set to a real endpoint before launch; the form uses POST + JSON. */
  const FORM_ENDPOINT = "";

  const MOTION = Object.freeze({
    EASE: "cubic-bezier(0.22, 1, 0.36, 1)",
    DUR: Object.freeze({ reveal: 0.55, body: 0.45, counter: 1.2, wipe: 0.4 }),
    STAGGER: 0.045
  });

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
  const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}<\/script>`;

  const state = {
    currentPath: null,
    lang: "en",
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    isTouch: window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0,
    wiping: false,
    wipeToken: 0,
    navOpen: false,
    lastFocus: null,
    scrollTicking: false,
    subnavObserver: null,
    cursorTarget: null,
    activeMagnet: null
  };

  let revealObserver = null;
  let counterObserver = null;

  /* ------------------------------------------------------------------
     Initial boot
     ------------------------------------------------------------------ */
  function init() {
    renderMetrics();
    setupMegaMenus();
    setupMobileNav();
    setupRail();
    setupTestimonials();
    setupGlobalEvents();
    setupScrollEngine();
    setupCustomCursor();

    applyLanguage(readStoredLanguage());
    createObservers();
    initReveals(document);
    initCounters(document);
    handleHashChange(true);
  }

  /* ------------------------------------------------------------------
     Content rendering — metrics and testimonials
     ------------------------------------------------------------------ */
  function renderMetrics() {
    const host = $("#metrics-grid");
    if (!host) return;
    host.innerHTML = C.METRICS.map((m) => `
      <article class="metric-item ${m.verified ? "" : "metric-item--verify"} reveal">
        <span class="metric-status mono">${m.verified ? "PUBLISHED FIGURE" : "PROPOSED BENCHMARK / [VERIFY]"}</span>
        <span class="metric-value" aria-label="${esc(m.prefix + m.value + m.suffix)}">
          <span class="metric-prefix">${esc(m.prefix)}</span><span data-counter="${m.value}">0</span><span class="metric-suffix">${esc(m.suffix)}</span>
        </span>
        <p class="metric-label">${esc(m.label)}</p>
        <p class="metric-source">${esc(m.source)}</p>
      </article>`).join("");
  }

  function setupTestimonials() {
    setQuote(0, false);
  }

  function setQuote(index, animate = true) {
    const stage = $("#quote-stage");
    const dots = $$("#quote-dots [data-quote]");
    const item = C.TESTIMONIALS[index];
    if (!stage || !item) return;

    const paint = () => {
      stage.innerHTML = `
        <blockquote>
          <p class="display">${esc(item.quote)}</p>
          <footer>
            <strong>${esc(item.name)}</strong>
            <span>${esc(item.role)}</span>
            <span class="mono">${esc(item.meta)}</span>
          </footer>
        </blockquote>`;
      stage.style.opacity = "1";
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", String(active));
      });
    };

    if (animate && !state.reducedMotion) {
      stage.style.opacity = "0";
      window.setTimeout(paint, 140);
    } else {
      paint();
    }
  }

  /* ------------------------------------------------------------------
     Reveal words, counters and reduced motion
     ------------------------------------------------------------------ */
  function createObservers() {
    if (!("IntersectionObserver" in window)) {
      revealObserver = null;
      counterObserver = null;
      showAllReveals(document);
      setAllCountersFinal(document);
      return;
    }

    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -12% 0px" });

    counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.7 });
  }

  function splitWords(el, force = false) {
    if (!el || (el.dataset.splitDone === "true" && !force)) return;
    el.dataset.splitDone = "false";
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeValue && node.nodeValue.trim()) textNodes.push(node);
    }

    let wordIndex = 0;
    textNodes.forEach((node) => {
      const parts = node.nodeValue.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        const mask = document.createElement("span");
        mask.className = "word-mask";
        const word = document.createElement("span");
        word.className = "word";
        word.textContent = part;
        word.style.setProperty("--word-delay", `${Math.min(wordIndex * MOTION.STAGGER, 0.24).toFixed(3)}s`);
        mask.appendChild(word);
        frag.appendChild(mask);
        wordIndex += 1;
      });
      node.replaceWith(frag);
    });
    el.dataset.splitDone = "true";
  }

  function initReveals(root = document) {
    const targets = $$(".reveal, [data-split]", root);
    targets.forEach((el, index) => {
      if (el.hasAttribute("data-split")) splitWords(el);
      if (!el.style.getPropertyValue("--reveal-delay")) {
        el.style.setProperty("--reveal-delay", `${Math.min((index % 4) * 0.06, 0.18).toFixed(2)}s`);
      }
      if (state.reducedMotion || !revealObserver) {
        el.classList.add("is-visible");
        return;
      }
      if (el.dataset.revealBound === "true") return;
      el.dataset.revealBound = "true";
      revealObserver.observe(el);
    });
  }

  function initCounters(root = document) {
    $$("[data-counter]", root).forEach((el) => {
      if (state.reducedMotion || !counterObserver) {
        setCounterFinal(el);
        return;
      }
      if (el.dataset.counterBound === "true") return;
      el.dataset.counterBound = "true";
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    const target = Number(el.dataset.counter || 0);
    const start = performance.now();
    const duration = MOTION.DUR.counter * 1000;
    const formatter = new Intl.NumberFormat("en-US");
    const tick = (now) => {
      const t = clamp((now - start) / duration, 0, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = formatter.format(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function setCounterFinal(el) {
    el.textContent = new Intl.NumberFormat("en-US").format(Number(el.dataset.counter || 0));
  }

  function setAllCountersFinal(root = document) {
    $$("[data-counter]", root).forEach(setCounterFinal);
  }

  function showAllReveals(root = document) {
    $$(".reveal, [data-split]", root).forEach((el) => el.classList.add("is-visible"));
    $$("[data-parallax]", root).forEach((el) => { el.style.transform = ""; });
  }

  /* ------------------------------------------------------------------
     Header, mega menus, mobile sheet and language switch
     ------------------------------------------------------------------ */
  function setupMegaMenus() {
    $$("[data-mega-trigger]").forEach((btn) => {
      const item = btn.closest(".nav-item");
      if (!item) return;
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        openMega(item);
      });
      item.addEventListener("pointerenter", () => {
        if (window.innerWidth > 1024) openMega(item);
      });
      item.addEventListener("pointerleave", (event) => {
        if (!item.contains(event.relatedTarget)) closeMega(item);
      });
      item.addEventListener("focusin", () => openMega(item));
      item.addEventListener("focusout", (event) => {
        if (!item.contains(event.relatedTarget)) closeMega(item);
      });
    });
  }

  function openMega(item) {
    $$(".nav-item.has-mega.is-open").forEach((other) => {
      if (other !== item) closeMega(other);
    });
    item.classList.add("is-open");
    const btn = $("[data-mega-trigger]", item);
    if (btn) btn.setAttribute("aria-expanded", "true");
  }

  function closeMega(item) {
    item.classList.remove("is-open");
    const btn = $("[data-mega-trigger]", item);
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function closeAllMegas() {
    $$(".nav-item.has-mega.is-open").forEach(closeMega);
  }

  function setupMobileNav() {
    const toggle = $("#nav-toggle");
    const close = $("#sheet-close");
    const sheet = $("#mobile-nav");
    if (!toggle || !sheet) return;

    toggle.addEventListener("click", () => {
      if (state.navOpen) closeMobileNav();
      else openMobileNav();
    });
    if (close) close.addEventListener("click", closeMobileNav);
    sheet.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMobileNav();
    });
  }

  function openMobileNav() {
    const toggle = $("#nav-toggle");
    const sheet = $("#mobile-nav");
    if (!toggle || !sheet) return;
    state.lastFocus = document.activeElement;
    state.navOpen = true;
    sheet.hidden = false;
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    window.setTimeout(() => {
      const first = $("a, button", sheet);
      if (first) first.focus();
    }, 30);
  }

  function closeMobileNav() {
    const toggle = $("#nav-toggle");
    const sheet = $("#mobile-nav");
    if (!toggle || !sheet || sheet.hidden) return;
    state.navOpen = false;
    sheet.hidden = true;
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (state.lastFocus && typeof state.lastFocus.focus === "function") state.lastFocus.focus();
  }

  function trapMobileFocus(event) {
    if (!state.navOpen || event.key !== "Tab") return;
    const sheet = $("#mobile-nav");
    if (!sheet) return;
    const focusables = $$("a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])", sheet)
      .filter((el) => el.getClientRects().length > 0);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function readStoredLanguage() {
    try { return localStorage.getItem("aplicatech-lang") || "en"; }
    catch (_) { return "en"; }
  }

  function storeLanguage(lang) {
    try { localStorage.setItem("aplicatech-lang", lang); }
    catch (_) { /* Browser storage may be unavailable in file previews. */ }
  }

  function applyLanguage(lang) {
    state.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    translateTree(document);
    $$("[data-lang]").forEach((btn) => {
      const active = btn.dataset.lang === state.lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    storeLanguage(state.lang);

    const hero = $("[data-i18n-html][data-split]");
    if (hero) {
      hero.classList.remove("is-visible");
      splitWords(hero, true);
      requestAnimationFrame(() => hero.classList.add("is-visible"));
    }
    if (state.currentPath) updateTitle(state.currentPath);
  }

  function translateTree(root = document) {
    const dict = C.I18N[state.lang] || C.I18N.en;
    $$("[data-i18n]", root).forEach((el) => {
      const value = dict[el.dataset.i18n] || C.I18N.en[el.dataset.i18n];
      if (value) setI18nText(el, value);
    });
    $$("[data-i18n-html]", root).forEach((el) => {
      const value = dict[el.dataset.i18nHtml] || C.I18N.en[el.dataset.i18nHtml];
      if (value) el.innerHTML = value;
    });
    $$("[data-i18n-placeholder]", root).forEach((el) => {
      const value = dict[el.dataset.i18nPlaceholder] || C.I18N.en[el.dataset.i18nPlaceholder];
      if (value) el.setAttribute("placeholder", value);
    });
  }

  function setI18nText(el, value) {
    if (!el.children.length) {
      el.textContent = value;
      return;
    }
    const textNodes = Array.from(el.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim());
    if (textNodes.length) textNodes[textNodes.length - 1].nodeValue = ` ${value}`;
    else el.appendChild(document.createTextNode(` ${value}`));
  }

  /* ------------------------------------------------------------------
     Horizontal industry rail
     ------------------------------------------------------------------ */
  function setupRail() {
    const rail = $("#industry-rail");
    const dotsHost = $("#rail-dots");
    const fill = $("#rail-progress-fill");
    const prev = $("#rail-prev");
    const next = $("#rail-next");
    if (!rail || !dotsHost || !fill) return;

    const cards = $$(".industry-card", rail);
    dotsHost.innerHTML = cards.map((_, i) => `<button type="button" data-dot="${i}" aria-label="Go to industry card ${i + 1}"></button>`).join("");
    const dots = $$("[data-dot]", dotsHost);
    const sign = () => document.documentElement.dir === "rtl" ? -1 : 1;

    const step = () => {
      const first = cards[0];
      const second = cards[1];
      if (!first) return rail.clientWidth * 0.8;
      const gap = second ? second.offsetLeft - first.offsetLeft - first.offsetWidth : 1;
      return first.offsetWidth + Math.abs(gap || 1);
    };

    const update = () => {
      const max = Math.max(1, rail.scrollWidth - rail.clientWidth);
      const x = Math.abs(rail.scrollLeft);
      const ratio = clamp(x / max, 0, 1);
      fill.style.width = `${Math.round(10 + ratio * 90)}%`;
      const active = Math.round(ratio * (dots.length - 1));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
    };

    const goTo = (i) => {
      const card = cards[clamp(i, 0, cards.length - 1)];
      if (!card) return;
      rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: state.reducedMotion ? "auto" : "smooth" });
    };

    if (prev) prev.addEventListener("click", () => rail.scrollBy({ left: -step() * sign(), behavior: state.reducedMotion ? "auto" : "smooth" }));
    if (next) next.addEventListener("click", () => rail.scrollBy({ left: step() * sign(), behavior: state.reducedMotion ? "auto" : "smooth" }));
    dots.forEach((dot) => dot.addEventListener("click", () => goTo(Number(dot.dataset.dot))));

    rail.addEventListener("scroll", update, { passive: true });
    rail.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        rail.scrollBy({ left: direction * step() * sign(), behavior: state.reducedMotion ? "auto" : "smooth" });
      }
    });

    let down = false;
    let startX = 0;
    let startScroll = 0;
    let dragged = false;
    rail.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      down = true;
      dragged = false;
      startX = event.clientX;
      startScroll = rail.scrollLeft;
      rail.setPointerCapture(event.pointerId);
    });
    rail.addEventListener("pointermove", (event) => {
      if (!down) return;
      const dx = event.clientX - startX;
      if (Math.abs(dx) > 5) {
        dragged = true;
        rail.classList.add("is-dragging");
      }
      rail.scrollLeft = startScroll - dx;
    });
    const endDrag = () => {
      down = false;
      rail.classList.remove("is-dragging");
      window.setTimeout(() => { dragged = false; }, 80);
    };
    rail.addEventListener("pointerup", endDrag);
    rail.addEventListener("pointercancel", endDrag);
    rail.addEventListener("click", (event) => {
      if (dragged) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);

    window.addEventListener("resize", update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------
     Scroll engine: sticky header, restrained parallax, plan progress
     ------------------------------------------------------------------ */
  function setupScrollEngine() {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      state.isTouch = window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0;
      if (window.innerWidth > 1024) closeMobileNav();
      onScroll();
    }, { passive: true });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", (event) => {
        state.reducedMotion = event.matches;
        if (event.matches) {
          showAllReveals(document);
          setAllCountersFinal(document);
          onScroll();
        }
      });
    }
    onScroll();
  }

  function onScroll() {
    if (state.scrollTicking) return;
    state.scrollTicking = true;
    requestAnimationFrame(() => {
      updateHeader();
      updateParallax();
      updatePlanProgress();
      state.scrollTicking = false;
    });
  }

  function updateHeader() {
    const header = $("#site-header");
    if (!header) return;
    const solid = window.scrollY > 24 || document.body.classList.contains("inner-route");
    header.classList.toggle("is-solid", solid);
  }

  function updateParallax() {
    const home = $("#home-view");
    if (!home || home.hidden) return;
    const parallax = $$("[data-parallax]");
    if (state.reducedMotion || window.innerWidth < 768 || state.isTouch) {
      parallax.forEach((el) => { el.style.transform = ""; });
      return;
    }
    const vh = window.innerHeight;
    parallax.forEach((el) => {
      const section = el.closest("section") || el.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      const amount = Number(el.dataset.parallax || 0);
      const y = (progress - 0.5) * amount * 2;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}%, 0)`;
    });
  }

  function updatePlanProgress() {
    const steps = $$(".plan-step");
    const fill = $("#plan-progress-fill");
    const label = $("#plan-progress-label");
    if (!steps.length || !fill) return;
    const home = $("#home-view");
    if (!home || home.hidden) return;
    let current = 1;
    let nearest = Infinity;
    steps.forEach((step, index) => {
      const rect = step.getBoundingClientRect();
      const distance = Math.abs((rect.top + rect.height / 2) - window.innerHeight * 0.55);
      if (distance < nearest) {
        nearest = distance;
        current = index + 1;
      }
    });
    steps.forEach((step, index) => step.classList.toggle("is-current", index + 1 === current));
    fill.style.width = `${(current / steps.length) * 100}%`;
    if (label) label.textContent = `STOP ${String(current).padStart(2, "0")} / ${String(steps.length).padStart(2, "0")}`;
  }

  /* ------------------------------------------------------------------
     Custom cursor and magnetic buttons
     ------------------------------------------------------------------ */
  function setupCustomCursor() {
    if (state.reducedMotion || state.isTouch) return;
    const cursor = $("#cursor-dot");
    const label = $("#cursor-label");
    if (!cursor || !label) return;

    document.addEventListener("pointermove", (event) => {
      cursor.classList.add("is-visible");
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      const target = event.target.closest("[data-cursor-label]");
      if (target) {
        cursor.classList.add("has-label");
        label.textContent = target.dataset.cursorLabel || "Open";
        state.cursorTarget = target;
      } else if (state.cursorTarget) {
        cursor.classList.remove("has-label");
        label.textContent = "";
        state.cursorTarget = null;
      }

      const magnet = event.target.closest(".magnetic");
      if (magnet !== state.activeMagnet) {
        resetMagnet();
        state.activeMagnet = magnet;
      }
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const x = clamp(((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 8, -4, 4);
        const y = clamp(((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 8, -4, 4);
        magnet.style.transform = `translate(${x.toFixed(2)}px, ${(y - 2).toFixed(2)}px)`;
      }
    }, { passive: true });

    document.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget) {
        cursor.classList.remove("is-visible", "has-label");
        resetMagnet();
      }
    });
  }

  function resetMagnet() {
    if (state.activeMagnet) state.activeMagnet.style.transform = "";
    state.activeMagnet = null;
  }

  /* ------------------------------------------------------------------
     Global events: routing, anchors, accordions, quotes, language, forms
     ------------------------------------------------------------------ */
  function setupGlobalEvents() {
    window.addEventListener("hashchange", () => handleHashChange(false));

    document.addEventListener("click", (event) => {
      const langButton = event.target.closest("[data-lang]");
      if (langButton) {
        applyLanguage(langButton.dataset.lang);
        return;
      }

      const quoteButton = event.target.closest("[data-quote]");
      if (quoteButton) {
        setQuote(Number(quoteButton.dataset.quote));
        return;
      }

      const summary = event.target.closest("summary");
      if (summary) {
        const details = summary.parentElement;
        const group = details ? details.closest('[data-accordion="single"]') : null;
        if (group && details && !details.open) {
          window.setTimeout(() => {
            $$("details[open]", group).forEach((other) => {
              if (other !== details) other.open = false;
            });
          }, 0);
        }
      }

      const anchor = event.target.closest('a[href^="#"]:not([href^="#/"])');
      if (anchor) {
        const href = anchor.getAttribute("href");
        const id = href && href.length > 1 ? decodeURIComponent(href.slice(1)) : "";
        if (id) {
          event.preventDefault();
          const isSubnav = Boolean(anchor.dataset.scroll || anchor.closest(".subnav"));
          if (!isSubnav) history.replaceState(null, "", `#${id}`);
          scrollToId(id, true);
        }
        return;
      }

      const routeLink = event.target.closest('a[href^="#/"]');
      if (routeLink) {
        closeAllMegas();
        closeMobileNav();
        const href = routeLink.getAttribute("href");
        const currentHash = location.hash || "#/";
        if (href === currentHash && state.currentPath) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: state.reducedMotion ? "auto" : "smooth" });
        }
      } else if (!event.target.closest(".nav-item.has-mega")) {
        closeAllMegas();
      }
    });

    document.addEventListener("submit", (event) => {
      const form = event.target.closest('form[data-form="audit"]');
      if (form) {
        event.preventDefault();
        handleAuditSubmit(form);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAllMegas();
        closeMobileNav();
      }
      trapMobileFocus(event);
    });
  }

  function scrollToId(id, renderHomeIfNeeded = false) {
    let target = document.getElementById(id);
    const hiddenAncestor = target ? target.closest("[hidden]") : null;
    if ((!target || hiddenAncestor) && renderHomeIfNeeded && state.currentPath !== "/") {
      renderRoute("/", false);
      target = document.getElementById(id);
    }
    if (!target) return;
    const header = $("#site-header");
    const subnav = $(".subnav:not([hidden])");
    const offset = (header ? header.offsetHeight : 56) + (subnav ? subnav.offsetHeight : 0) + 16;
    const top = window.scrollY + target.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: state.reducedMotion ? "auto" : "smooth" });
  }

  function handleAuditSubmit(form) {
    const status = $("[data-form-status]", form);
    const button = $("button[type='submit']", form);
    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");
    const honeypot = form.elements.namedItem("website");

    clearFieldErrors(form);
    setFormStatus(form, "", "");

    if (honeypot && honeypot.value.trim()) {
      setFormStatus(form, "Submission blocked by the spam filter.", "is-error");
      return;
    }

    const errors = {};
    if (!name || name.value.trim().length < 2) errors.name = "Enter at least 2 characters.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.email = "Enter a valid work email address.";
    if (!message || message.value.trim().length < 12) errors.message = "Tell us in at least 12 characters what needs attention.";

    if (Object.keys(errors).length) {
      Object.entries(errors).forEach(([field, text]) => {
        const error = $(`[data-error-for="${field}"]`, form);
        const input = form.elements.namedItem(field);
        if (error) error.textContent = text;
        if (input) input.setAttribute("aria-invalid", "true");
      });
      setFormStatus(form, "Fix the highlighted fields, then send again.", "is-error");
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const now = Date.now();
    let last = 0;
    try { last = Number(localStorage.getItem("aplicatech-last-submit") || 0); }
    catch (_) { last = 0; }
    if (now - last < 30000) {
      setFormStatus(form, "Please wait 30 seconds before sending another request.", "is-error");
      return;
    }
    try { localStorage.setItem("aplicatech-last-submit", String(now)); }
    catch (_) { /* Storage is optional in the preview. */ }

    if (!FORM_ENDPOINT) {
      setFormStatus(form, "Preview mode — nothing was sent. Connect FORM_ENDPOINT in script.js to your CRM or webhook before launch.", "is-warning");
      return;
    }

    const payload = {
      source: "aplicatech-static-preview",
      submittedAt: new Date().toISOString(),
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim()
    };

    if (button) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = "Sending…";
    }
    setFormStatus(form, "Sending your request…", "");

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then((response) => {
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setFormStatus(form, "Request received. We will reply within one business day. [VERIFY]", "");
    }).catch(() => {
      setFormStatus(form, "We could not send the request. Email sales@aplicatech.com instead.", "is-error");
    }).finally(() => {
      if (button) {
        button.disabled = false;
        button.textContent = button.dataset.originalText || "Book a 30-min systems audit";
      }
    });
  }

  function clearFieldErrors(form) {
    $$("[data-error-for]", form).forEach((el) => { el.textContent = ""; });
    $$("input, textarea", form).forEach((el) => el.removeAttribute("aria-invalid"));
  }

  function setFormStatus(form, message, className) {
    const status = $("[data-form-status]", form);
    if (!status) return;
    status.textContent = message;
    status.className = `form-status ${className || ""}`.trim();
  }

  /* ------------------------------------------------------------------
     Hash router and page rendering
     ------------------------------------------------------------------ */
  function handleHashChange(initial = false) {
    const parsed = parseHash();
    if (parsed.type === "anchor") {
      if (state.currentPath === null) renderRoute("/", false);
      const target = document.getElementById(parsed.id);
      if ((!target || target.closest("[hidden]")) && state.currentPath !== "/") renderRoute("/", false);
      window.setTimeout(() => scrollToId(parsed.id, true), 30);
      return;
    }

    const path = parsed.path;
    if (initial || state.currentPath === null) {
      renderRoute(path, false);
      return;
    }
    if (path === state.currentPath) {
      window.scrollTo({ top: 0, behavior: state.reducedMotion ? "auto" : "smooth" });
      return;
    }
    pageWipe(() => renderRoute(path, true));
  }

  function parseHash() {
    const hash = location.hash || "";
    if (hash.startsWith("#/")) return { type: "route", path: normalizePath(hash.slice(1)) };
    if (hash.startsWith("#") && hash.length > 1) {
      try { return { type: "anchor", id: decodeURIComponent(hash.slice(1)) }; }
      catch (_) { return { type: "anchor", id: hash.slice(1) }; }
    }
    return { type: "route", path: "/" };
  }

  function normalizePath(path) {
    let p = (path || "/").split("?")[0].trim();
    if (!p.startsWith("/")) p = `/${p}`;
    p = p.replace(/\/+$/, "") || "/";
    return p;
  }

  function pageWipe(callback) {
    if (state.reducedMotion) {
      callback();
      return;
    }
    const wipe = $("#page-wipe");
    if (!wipe) {
      callback();
      return;
    }
    const token = ++state.wipeToken;
    state.wiping = true;
    wipe.classList.remove("is-active");
    void wipe.offsetWidth;
    wipe.classList.add("is-active");
    window.setTimeout(() => {
      if (token === state.wipeToken) callback();
    }, Math.round(MOTION.DUR.wipe * 1000 * 0.45));
    window.setTimeout(() => {
      if (token !== state.wipeToken) return;
      wipe.classList.remove("is-active");
      state.wiping = false;
    }, MOTION.DUR.wipe * 1000 + 30);
  }

  function renderRoute(path, scrollTop = true) {
    state.currentPath = path;
    const home = $("#home-view");
    const page = $("#page-view");
    if (!home || !page) return;

    document.body.classList.toggle("inner-route", path !== "/");
    if (path === "/") {
      page.hidden = true;
      page.innerHTML = "";
      home.hidden = false;
      if (state.subnavObserver) state.subnavObserver.disconnect();
      initReveals(home);
    } else {
      home.hidden = true;
      page.innerHTML = renderPage(path);
      page.hidden = false;
      translateTree(page);
      initReveals(page);
      initCounters(page);
      initSubnavObserver(page);
    }

    updateActiveNav(path);
    updateTitle(path);
    updateHeader();
    updatePlanProgress();
    if (scrollTop) window.scrollTo({ top: 0, behavior: "auto" });
  }

  function renderPage(path) {
    if (C.LEGAL[path]) return renderLegal(path, C.LEGAL[path]);
    if (C.HUBS[path]) return renderHub(C.HUBS[path], path);

    const caseSlug = path.startsWith("/work/") ? path.slice("/work/".length) : "";
    if (caseSlug && C.CASES[caseSlug]) return renderCaseDetail(C.CASES[caseSlug]);

    const articleSlug = path.startsWith("/insights/") ? path.slice("/insights/".length) : "";
    if (articleSlug && C.ARTICLES[articleSlug]) return renderArticle(C.ARTICLES[articleSlug]);

    const roleSlug = path.startsWith("/careers/") ? path.slice("/careers/".length) : "";
    if (roleSlug && C.ROLES[roleSlug]) return renderRole(C.ROLES[roleSlug]);

    if (C.DETAILS[path]) return renderDetail(path, C.DETAILS[path]);
    if (findParentPath(path) !== "/") return renderStubDetail(path);
    return render404(path);
  }

  function renderBreadcrumb(items) {
    return `<nav class="breadcrumb" aria-label="Breadcrumb">${items.map((item, i) => `
      ${i ? '<span aria-hidden="true">/</span>' : ""}
      ${item.href ? `<a href="${esc(item.href)}">${esc(item.label)}</a>` : `<span>${esc(item.label)}</span>`}
    `).join("")}</nav>`;
  }

  function renderSubnav(links) {
    return `<div class="subnav"><div class="container subnav-inner">${links.map((link, i) => `
      <a href="#${esc(link.id)}" data-scroll="#${esc(link.id)}" class="${i === 0 ? "is-active" : ""}">${esc(link.label)}</a>
    `).join("")}</div></div>`;
  }

  function renderBuyers(items) {
    return `<div class="buyer-strip">${items.map((item) => `
      <article class="buyer-item reveal">
        <span class="mono">${esc(item.label)}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.copy)}</p>
      </article>`).join("")}</div>`;
  }

  function renderMetricTrio(items) {
    return `<div class="metric-trio">${items.map((item) => `
      <article class="metric-trio-item reveal">
        <strong>${esc(item.value)}</strong>
        <span>${esc(item.label)}</span>
        <p class="mono">${esc(item.source)}</p>
      </article>`).join("")}</div>`;
  }

  function renderCapabilities(items) {
    return `<div class="capability-list">${items.map((item, i) => `
      <article class="capability-row reveal">
        <span class="mono">${String(i + 1).padStart(2, "0")}</span>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.copy)}</p>
      </article>`).join("")}</div>`;
  }

  function renderIndexTable(items, heading = "ROUTES IN THIS SECTION") {
    if (!items || !items.length) return "";
    return `<div class="index-table">${items.map((item) => `
      <a href="${esc(item.href)}">
        <span class="mono">${esc(item.code || "—")}</span>
        <span class="mono">${esc(item.tag || "—")}</span>
        <strong>${esc(item.title)}</strong>
        <i aria-hidden="true">→</i>
      </a>`).join("")}</div><p class="inner-note">${esc(heading)} · SELECT A ROUTE TO PREVIEW ITS TEMPLATE.</p>`;
  }

  function renderCaseCard(item) {
    if (!item) return "";
    return `<a class="case-card reveal" href="${esc(item.href)}">
      <div class="case-card-visual" aria-hidden="true"><span class="display">${esc(String(item.client || "CASE").split(" ")[0].slice(0, 2).toUpperCase())}</span></div>
      <div class="case-card-body">
        <p class="eyebrow mono">RELEVANT WORK / ${esc(item.client)}</p>
        <h3>${esc(item.title)}</h3>
        <p>${esc(item.copy)}</p>
        <span class="text-link">Open the case <span aria-hidden="true">→</span></span>
      </div>
    </a>`;
  }

  function renderFAQ(items) {
    return `<div class="faq-list">${items.map((item) => `
      <details>
        <summary>${esc(item.q)}</summary>
        <div class="accordion-body"><p>${esc(item.a)}</p></div>
      </details>`).join("")}</div>`;
  }

  function formMarkup(prefix) {
    return `<div class="page-form"><form class="audit-form reveal" data-form="audit" novalidate>
      <div class="form-head"><span class="mono">AUDIT REQUEST / 03 FIELDS</span><span class="mono">NO NDA NEEDED</span></div>
      <div class="field">
        <label for="${prefix}-name" data-i18n="form.name">Name</label>
        <input id="${prefix}-name" name="name" type="text" autocomplete="name" required data-i18n-placeholder="form.namePlaceholder" placeholder="Your full name">
        <p class="field-error" data-error-for="name" aria-live="polite"></p>
      </div>
      <div class="field">
        <label for="${prefix}-email" data-i18n="form.email">Work email</label>
        <input id="${prefix}-email" name="email" type="email" autocomplete="email" required data-i18n-placeholder="form.emailPlaceholder" placeholder="name@company.com">
        <p class="field-error" data-error-for="email" aria-live="polite"></p>
      </div>
      <div class="field">
        <label for="${prefix}-message" data-i18n="form.message">What's breaking?</label>
        <textarea id="${prefix}-message" name="message" rows="4" required data-i18n-placeholder="form.messagePlaceholder" placeholder="Month-end, data migration, support, or something else."></textarea>
        <p class="field-error" data-error-for="message" aria-live="polite"></p>
      </div>
      <div class="hp-field" aria-hidden="true"><label for="${prefix}-website">Leave this empty</label><input id="${prefix}-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
      <button class="btn btn--primary btn--block magnetic" type="submit" data-i18n="cta.longAudit">Book a 30-min systems audit</button>
      <p class="form-status" data-form-status aria-live="polite"></p>
      <p class="form-note mono">PREVIEW FORM: CONNECT FORM_ENDPOINT IN SCRIPT.JS BEFORE LAUNCH.</p>
    </form></div>`;
  }

  function renderClosingCTA(title, copy, cta, href = "#/contact", scroll = false) {
    return `<section class="closing-cta" id="talk" data-observe="talk">
      <div class="container closing-cta-grid">
        <div><p class="eyebrow mono reveal">NEXT STEP / NO GENERIC DEMO</p><h2 class="reveal" data-split>${esc(title)}</h2><p class="reveal">${esc(copy)}</p></div>
        ${scroll
          ? `<a class="btn btn--primary magnetic" href="${esc(href)}" data-scroll="${esc(href)}">${esc(cta)} <span aria-hidden="true">→</span></a>`
          : `<a class="btn btn--primary magnetic" href="${esc(href)}">${esc(cta)} <span aria-hidden="true">→</span></a>`}
      </div>
    </section>`;
  }

  function renderHub(hub, path, options = {}) {
    const parentPath = options.parentPath || "";
    const parentHub = parentPath ? C.HUBS[parentPath] : null;
    const crumbs = [{ label: "Home", href: "#/" }];
    if (parentHub) crumbs.push({ label: parentHub.nav, href: `#${parentPath}` });
    crumbs.push({ label: hub.pageTitle || hub.nav });
    const indexLinks = options.indexLinks || hub.index || [];
    const subnavLinks = [
      { id: "overview", label: "Overview" },
      { id: "fit", label: "Who this is for" },
      { id: "metrics", label: "Metrics" },
      { id: "capabilities", label: "Capabilities" }
    ];
    if (indexLinks.length) subnavLinks.push({ id: "index", label: "Routes" });
    subnavLinks.push({ id: "case", label: "Case" }, { id: "faq", label: "FAQ" });
    if (hub.form) subnavLinks.push({ id: "request-form", label: "Request" });
    subnavLinks.push({ id: "talk", label: "Talk" });

    const ctaHref = hub.form ? "#request-form" : "#/contact";
    const stub = options.stub ? `<p class="inner-note">[TEMPLATE STUB — TODO: REPLACE WITH APPROVED COPY]</p>` : "";
    const faqJson = jsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": hub.faqs.map((item) => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } }))
    });
    const breadcrumbJson = jsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": crumbs.map((item, i) => ({ "@type": "ListItem", "position": i + 1, "name": item.label }))
    });

    return `${faqJson}${breadcrumbJson}
    <section class="inner-hero" id="overview" data-observe="overview">
      <div class="container">
        ${renderBreadcrumb(crumbs)}
        <div class="inner-hero-grid">
          <div>
            <p class="eyebrow mono reveal">${esc(hub.eyebrow)}</p>
            <h1 class="inner-title" data-split>${esc(hub.title)}</h1>
            <p class="inner-dek reveal">${esc(hub.dek)}</p>
            <a class="btn btn--primary magnetic reveal" href="${hub.form ? "#request-form" : "#/contact"}" ${hub.form ? 'data-scroll="#request-form"' : ""}>${esc(hub.heroCta)} <span aria-hidden="true">→</span></a>
          </div>
          <aside class="inner-hero-side reveal"><span class="mono">WHAT HAPPENS FIRST</span><p>${esc(hub.heroNote)}</p>${stub}</aside>
        </div>
      </div>
    </section>
    ${renderSubnav(subnavLinks)}

    <section class="inner-section" id="fit" data-observe="fit">
      <div class="container">
        <div class="inner-section-head"><p class="eyebrow mono reveal">WHO THIS IS FOR</p><h2 data-split class="reveal">Specific buyers. Not “decision makers”.</h2></div>
        ${renderBuyers(hub.buyers)}
      </div>
    </section>

    <section class="inner-section" id="metrics" data-observe="metrics">
      <div class="container">
        <div class="inner-section-head"><p class="eyebrow mono reveal">OUTCOME METRICS / SOURCE LINES</p><h2 data-split class="reveal">Numbers with their assumptions attached.</h2></div>
        ${renderMetricTrio(hub.metrics)}
        <p class="inner-note">${esc(hub.note || "Every number on this page needs a source line before launch. [VERIFY]")}</p>
      </div>
    </section>

    <section class="inner-section" id="capabilities" data-observe="capabilities">
      <div class="container">
        <div class="inner-section-head"><p class="eyebrow mono reveal">CAPABILITY BREAKDOWN</p><h2 data-split class="reveal">The work, line by line.</h2></div>
        ${renderCapabilities(hub.capabilities)}
      </div>
    </section>

    ${indexLinks.length ? `<section class="inner-section" id="index" data-observe="index"><div class="container">
      <div class="inner-section-head"><p class="eyebrow mono reveal">CHILD ROUTES</p><h2 data-split class="reveal">Pick the next page.</h2></div>
      ${renderIndexTable(indexLinks, "PREVIEW ROUTES")}
    </div></section>` : ""}

    <section class="inner-section" id="case" data-observe="case">
      <div class="container">
        <div class="inner-section-head"><p class="eyebrow mono reveal">RELEVANT WORK</p><h2 data-split class="reveal">Proof belongs beside the claim.</h2></div>
        ${renderCaseCard(hub.caseStudy)}
      </div>
    </section>

    <section class="inner-section" id="faq" data-observe="faq">
      <div class="container">
        <div class="inner-section-head"><p class="eyebrow mono reveal">OBJECTION-LED FAQ</p><h2 data-split class="reveal">The questions buyers actually ask.</h2></div>
        ${renderFAQ(hub.faqs)}
      </div>
    </section>

    ${hub.form ? `<section class="inner-section" id="request-form" data-observe="request-form"><div class="container">
      <div class="inner-section-head"><p class="eyebrow mono reveal">START THE CONVERSATION</p><h2 data-split class="reveal">Three fields. No newsletter signup.</h2></div>
      ${formMarkup("page")}
    </div></section>` : ""}

    ${renderClosingCTA(hub.offer.title, hub.offer.copy, hub.offer.cta, ctaHref, Boolean(hub.form))}`;
  }

  function renderDetail(path, detail) {
    const parentPath = detail.parent || findParentPath(path);
    const parent = C.HUBS[parentPath] || C.HUBS["/platforms"];
    const related = (parent.index || []).filter((item) => item.href !== `#${path}`).slice(0, 5);
    const derived = {
      nav: detail.title,
      pageTitle: detail.title,
      eyebrow: `CHILD / ${parent.nav.toUpperCase()}`,
      title: detail.title,
      dek: detail.dek,
      heroCta: detail.offer ? detail.offer.cta : parent.heroCta,
      heroNote: detail.heroNote || parent.heroNote,
      buyers: detail.buyers || parent.buyers,
      metrics: detail.metrics || parent.metrics,
      capabilities: detail.capabilities || parent.capabilities,
      index: related,
      caseStudy: detail.caseStudy || parent.caseStudy,
      faqs: detail.faqs || parent.faqs,
      offer: detail.offer || parent.offer,
      note: detail.note || parent.note,
      form: Boolean(detail.form)
    };
    return renderHub(derived, path, {
      parentPath,
      indexLinks: related,
      stub: !detail.built
    });
  }

  function renderStubDetail(path) {
    const parentPath = findParentPath(path);
    const parent = C.HUBS[parentPath];
    if (!parent) return render404(path);
    const link = (parent.index || []).find((item) => item.href === `#${path}`);
    const title = link ? link.title : prettifySlug(path.split("/").pop());
    const detail = {
      parent: parentPath,
      built: false,
      title,
      dek: `A templated child page for ${title}. This route proves the navigation and page pattern until approved copy is supplied.`,
      heroNote: "This is a labelled template stub. Replace the copy, metrics, case card and FAQ with approved content before launch.",
      capabilities: parent.capabilities.slice(0, 5),
      faqs: parent.faqs.slice(0, 5),
      offer: parent.offer,
      note: "[TEMPLATE STUB — TODO: REPLACE WITH APPROVED COPY]"
    };
    return renderDetail(path, detail);
  }

  function findParentPath(path) {
    return Object.keys(C.HUBS).find((hubPath) => hubPath !== "/" && path.startsWith(`${hubPath}/`)) || "/";
  }

  function prettifySlug(slug) {
    return String(slug || "").split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  function renderCaseDetail(item) {
    const links = [
      { id: "overview", label: "Overview" },
      { id: "situation", label: "Situation" },
      { id: "approach", label: "Approach" },
      { id: "architecture", label: "Architecture" },
      { id: "results", label: "Results" },
      { id: "quote", label: "Quote" },
      { id: "reflection", label: "Reflection" },
      { id: "related", label: "Related" }
    ];
    const crumbs = [
      { label: "Home", href: "#/" },
      { label: "Work", href: "#/work" },
      { label: item.client }
    ];
    const facts = [
      ["CLIENT", item.client], ["SECTOR", item.sector], ["REGION", item.region],
      ["TIMELINE", item.timeline], ["TEAM", item.team], ["PLATFORM", item.stack]
    ];
    return `${jsonLd({ "@context": "https://schema.org", "@type": "Article", "headline": item.title, "about": item.sector, "author": { "@type": "Organization", "name": "Aplica Technologies" } })}
    <section class="case-detail-hero inner-hero" id="overview" data-observe="overview">
      <div class="container">
        ${renderBreadcrumb(crumbs)}
        <p class="eyebrow mono reveal">[DRAFT — CONFIRM WITH CLIENT]</p>
        <h1 class="inner-title" data-split>${esc(item.title)}</h1>
        <p class="inner-dek reveal">${esc(item.dek)}</p>
        <div class="case-facts reveal">${facts.map(([label, value]) => `<div><span class="mono">${esc(label)}</span><span>${esc(value)}</span></div>`).join("")}</div>
      </div>
    </section>
    ${renderSubnav(links)}
    <section class="case-detail-section" id="situation" data-observe="situation">
      <div><span class="mono">01 / THE SITUATION</span><h2 data-split class="reveal">What was breaking.</h2></div>
      <p class="reveal">${esc(item.situation)}</p>
    </section>
    <section class="case-detail-section" id="approach" data-observe="approach">
      <div><span class="mono">02 / THE APPROACH</span><h2 data-split class="reveal">Phased, with a named output.</h2></div>
      <ol class="reveal">${item.approach.map((step) => `<li>${step}</li>`).join("")}</ol>
    </section>
    <section class="case-detail-section" id="architecture" data-observe="architecture">
      <div><span class="mono">03 / ARCHITECTURE</span><h2 data-split class="reveal">System and ownership map.</h2></div>
      <div class="architecture-map reveal">${item.architecture.map((node) => `<div><span class="mono">${esc(node.code)}</span><strong>${esc(node.name)}</strong></div>`).join("")}</div>
    </section>
    <section class="case-detail-section" id="results" data-observe="results">
      <div><span class="mono">04 / RESULTS</span><h2 data-split class="reveal">Numbers with method notes.</h2></div>
      <div class="reveal"><div class="result-grid">${item.results.map((result) => `<div><strong>${esc(result.value)}</strong><span>${esc(result.label)}</span><p class="mono">${esc(result.method)}</p></div>`).join("")}</div><p class="inner-note">All figures on this page are draft placeholders. Written client approval required. [VERIFY]</p></div>
    </section>
    <section class="case-detail-section" id="quote" data-observe="quote">
      <div><span class="mono">05 / CLIENT QUOTE</span><h2 data-split class="reveal">Paraphrased, not invented.</h2></div>
      <div class="reveal"><blockquote class="case-quote" style="border-left:2px solid var(--accent-deep);padding-left:22px;margin:0">“${esc(item.quote.replace(/^“|”$/g, ""))}”<cite style="display:block;margin-top:16px;font-family:var(--font-mono);font-style:normal;font-size:.62rem;line-height:1.6;color:var(--muted-light);text-transform:uppercase">${esc(item.attribution)}</cite></blockquote></div>
    </section>
    <section class="case-detail-section" id="reflection" data-observe="reflection">
      <div><span class="mono">06 / REFLECTION</span><h2 data-split class="reveal">What we would do differently.</h2></div>
      <p class="reveal">${esc(item.reflection)}</p>
    </section>
    <section class="case-detail-section" id="related" data-observe="related">
      <div><span class="mono">07 / RELATED WORK</span><h2 data-split class="reveal">Continue reading.</h2></div>
      <div class="reveal">${renderIndexTable(item.related.map((slug, i) => ({ code: String(i + 1).padStart(2, "0"), tag: "CASE", title: C.CASES[slug] ? `${C.CASES[slug].client} — ${C.CASES[slug].sector}` : slug, href: `#/work/${slug}` })), "RELATED DRAFT CASES")}</div>
    </section>
    ${renderClosingCTA("Need the source pack behind this draft?", "We will mark every number, quote and timeline that needs written approval.", "Request source data", "#/contact")}`;
  }

  function renderArticle(item) {
    const crumbs = [
      { label: "Home", href: "#/" },
      { label: "Insights", href: "#/insights" },
      { label: item.title }
    ];
    const links = [{ id: "article-start", label: "Start" }].concat(item.sections.map((section) => ({ id: section.id, label: section.title.split(" ").slice(0, 3).join(" ") })));
    links.push({ id: "talk", label: "Talk" });
    return `${jsonLd({ "@context": "https://schema.org", "@type": "Article", "headline": item.title, "description": item.dek, "articleSection": item.category, "author": { "@type": "Organization", "name": "Aplica Technologies" } })}
    <section class="inner-hero" id="article-start" data-observe="article-start">
      <div class="container">
        ${renderBreadcrumb(crumbs)}
        <div class="inner-hero-grid">
          <div>
            <p class="eyebrow mono reveal">${esc(item.category.toUpperCase())} · ${esc(item.readTime.toUpperCase())}</p>
            <h1 class="inner-title" data-split>${esc(item.title)}</h1>
            <p class="inner-dek reveal">${esc(item.dek)}</p>
            <a class="btn btn--primary magnetic reveal" href="#/insights">All insights <span aria-hidden="true">→</span></a>
          </div>
          <aside class="inner-hero-side reveal"><span class="mono">WORKING PAPER</span><p>Original draft article text for this static preview. Regulatory references need legal review before publication. [VERIFY]</p></aside>
        </div>
      </div>
    </section>
    ${renderSubnav(links)}
    <section class="inner-section">
      <div class="container article-layout">
        <aside class="article-aside reveal">
          <span class="mono">IN THIS ARTICLE</span>
          <ol>${item.sections.map((section) => `<li><a href="#${esc(section.id)}" data-scroll="#${esc(section.id)}">${esc(section.title)}</a></li>`).join("")}</ol>
        </aside>
        <article class="article-body">
          <p class="reveal">${esc(item.intro)}</p>
          ${item.sections.map((section) => `
            <section id="${esc(section.id)}" data-observe="${esc(section.id)}" class="reveal">
              <h2>${esc(section.title)}</h2>
              ${section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
              ${section.pullquote ? `<blockquote>${esc(section.pullquote)}</blockquote>` : ""}
            </section>`).join("")}
          <p class="inner-note">Article text is draft. Add author, publication date, sources and legal review before launch. [VERIFY]</p>
        </article>
      </div>
    </section>
    ${renderClosingCTA("Send us the objection your steering committee keeps repeating.", "We will turn the useful ones into the next field note.", "Get the next field note", "#/contact")}`;
  }

  function renderRole(role) {
    const crumbs = [
      { label: "Home", href: "#/" },
      { label: "Careers", href: "#/careers" },
      { label: role.title }
    ];
    const links = [
      { id: "overview", label: "Overview" },
      { id: "responsibilities", label: "Responsibilities" },
      { id: "requirements", label: "Requirements" },
      { id: "apply", label: "Apply" }
    ];
    const list = (items) => `<ul style="padding-left:20px;line-height:1.8;color:var(--muted-light)">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
    return `${jsonLd({ "@context": "https://schema.org", "@type": "JobPosting", "title": role.title, "description": role.summary, "hiringOrganization": { "@type": "Organization", "name": "Aplica Technologies (India) Private Limited" }, "employmentType": "FULL_TIME", "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Bangalore", "addressCountry": "IN" } } })}
    <section class="inner-hero" id="overview" data-observe="overview">
      <div class="container">
        ${renderBreadcrumb(crumbs)}
        <div class="inner-hero-grid">
          <div><p class="eyebrow mono reveal">${esc(role.team.toUpperCase())}</p><h1 class="inner-title" data-split>${esc(role.title)}</h1><p class="inner-dek reveal">${esc(role.summary)}</p><a class="btn btn--primary magnetic reveal" href="mailto:hr@aplicatech.com?subject=${encodeURIComponent(role.title)}">Apply by email <span aria-hidden="true">→</span></a></div>
          <aside class="inner-hero-side reveal"><span class="mono">ROLE FACTS</span><p>${esc(role.location)}<br>${esc(role.type)}<br>Vacancy status to be confirmed by HR. [VERIFY]</p></aside>
        </div>
      </div>
    </section>
    ${renderSubnav(links)}
    <section class="inner-section" id="responsibilities" data-observe="responsibilities"><div class="container case-detail-section" style="border:0;padding-block:0"><div><span class="mono">01 / WHAT YOU OWN</span><h2 data-split class="reveal">Responsibilities.</h2></div><div class="reveal">${list(role.responsibilities)}</div></div></section>
    <section class="inner-section" id="requirements" data-observe="requirements"><div class="container case-detail-section" style="border:0;padding-block:0"><div><span class="mono">02 / WHAT YOU BRING</span><h2 data-split class="reveal">Requirements.</h2></div><div class="reveal">${list(role.requirements)}</div></div></section>
    <section class="inner-section" id="apply" data-observe="apply"><div class="container case-detail-section" style="border:0;padding-block:0"><div><span class="mono">03 / HOW TO APPLY</span><h2 data-split class="reveal">One email. One example.</h2></div><div class="reveal"><p style="font-size:1.08rem;line-height:1.7;color:var(--muted-light)">${esc(role.apply)}</p><a class="text-link" href="mailto:hr@aplicatech.com?subject=${encodeURIComponent(role.title)}">hr@aplicatech.com <span aria-hidden="true">→</span></a></div></div></section>
    ${renderClosingCTA("Want to work on problems that reach the ledger?", "Read the case drafts before you send a CV. They show the kind of work you would own.", "See the work", "#/work")}`;
  }

  function renderLegal(path, doc) {
    const crumbs = [{ label: "Home", href: "#/" }, { label: doc.title }];
    return `${renderBreadcrumb(crumbs)}
    <section class="inner-hero" id="overview"><div class="container"><p class="eyebrow mono reveal">${esc(doc.eyebrow)}</p><h1 class="inner-title" data-split>${esc(doc.title)}</h1><p class="inner-dek reveal">${esc(doc.intro)}</p></div></section>
    <section class="inner-section"><div class="container legal-body">${doc.sections.map(([title, body]) => `<section class="reveal"><h2>${esc(title)}</h2><p>${esc(body)}</p></section>`).join("")}<p class="inner-note">Draft legal copy for preview only. Replace with counsel-approved text before launch. [VERIFY]</p></div></section>
    ${renderClosingCTA("Questions about this draft?", "Use the sales address until a legal or privacy contact is published.", "Email sales", "mailto:sales@aplicatech.com")}`;
  }

  function render404(path) {
    return `<section class="route-stub"><div><p class="eyebrow mono">404 / ROUTE NOT FOUND</p><h1>404</h1><p>No preview page exists at <span class="mono">${esc(path)}</span>. Use the navigation or return to the homepage.</p><p><a class="btn btn--primary magnetic" href="#/">Return home</a></p></div></section>`;
  }

  function initSubnavObserver(root) {
    if (state.subnavObserver) state.subnavObserver.disconnect();
    if (!("IntersectionObserver" in window)) return;
    const sections = $$("[data-observe]", root);
    if (!sections.length) return;
    state.subnavObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.dataset.observe;
        $$(".subnav a", root).forEach((link) => link.classList.toggle("is-active", link.dataset.scroll === `#${id}`));
      });
    }, { rootMargin: "-24% 0px -66% 0px", threshold: 0 });
    sections.forEach((section) => state.subnavObserver.observe(section));
  }

  function updateActiveNav(path) {
    const currentHash = path === "/" ? "#/" : `#${path}`;
    $$('a[href^="#/"]').forEach((link) => {
      const raw = link.getAttribute("href") || "";
      const href = raw.length > 2 ? raw.replace(/\/+$/, "") : raw;
      const exact = href === currentHash;
      const parent = href !== "#/" && currentHash.startsWith(`${href}/`);
      const active = exact || parent;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function updateTitle(path) {
    const label = getPageLabel(path);
    if (path === "/" && state.lang === "ar") {
      document.title = "ApplicaTech — ERP سحابي خلال 100 يوم";
      return;
    }
    document.title = path === "/" ? "ApplicaTech — Cloud ERP, live in 100 days" : `${label} — ApplicaTech`;
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", getPageDescription(path));
  }

  function getPageLabel(path) {
    if (C.HUBS[path]) return C.HUBS[path].pageTitle;
    if (C.LEGAL[path]) return C.LEGAL[path].title;
    if (C.DETAILS[path]) return C.DETAILS[path].title;
    const caseSlug = path.startsWith("/work/") ? path.slice(6) : "";
    if (C.CASES[caseSlug]) return C.CASES[caseSlug].client;
    const articleSlug = path.startsWith("/insights/") ? path.slice(10) : "";
    if (C.ARTICLES[articleSlug]) return C.ARTICLES[articleSlug].title;
    const roleSlug = path.startsWith("/careers/") ? path.slice(9) : "";
    if (C.ROLES[roleSlug]) return C.ROLES[roleSlug].title;
    const parentPath = findParentPath(path);
    if (parentPath !== "/") {
      const link = (C.HUBS[parentPath].index || []).find((item) => item.href === `#${path}`);
      if (link) return link.title;
      return prettifySlug(path.split("/").pop());
    }
    return "Page not found";
  }

  function getPageDescription(path) {
    if (C.HUBS[path]) return C.HUBS[path].dek;
    if (C.DETAILS[path]) return C.DETAILS[path].dek;
    if (C.LEGAL[path]) return C.LEGAL[path].intro;
    const caseSlug = path.startsWith("/work/") ? path.slice(6) : "";
    if (C.CASES[caseSlug]) return C.CASES[caseSlug].dek;
    const articleSlug = path.startsWith("/insights/") ? path.slice(10) : "";
    if (C.ARTICLES[articleSlug]) return C.ARTICLES[articleSlug].dek;
    const roleSlug = path.startsWith("/careers/") ? path.slice(9) : "";
    if (C.ROLES[roleSlug]) return C.ROLES[roleSlug].summary;
    return "Aplica Technologies implements Microsoft Dynamics 365, Azure and Power Platform across India and the UAE.";
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
