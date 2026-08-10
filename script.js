document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const toggleNavbar = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  toggleNavbar();
  window.addEventListener('scroll', toggleNavbar);

  const navToggle = document.getElementById('navToggle');
  const navLinksWrap = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinksWrap.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  
window.addEventListener("load", function () {
  setTimeout(function () {
    const intro = document.getElementById("introScreen");

    if (intro) {
      intro.remove();
    }
  }, 5000);
});
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksWrap.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${currentId}`);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink);
  
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  const skillBars = document.querySelectorAll('.skill-bar__fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level') || 0;
        bar.style.width = `${level}%`;
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  const statNumbers = document.querySelectorAll('.stat-card__number');

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  const roles = [
    'BCA Graduate',
    'Software Developer',
    'Web Developer',
    'Data & Technology Enthusiast'
  ];
  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedEl.textContent = currentRole.substring(0, charIndex);

    let delay = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1600; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeLoop, delay);
  };

  if (typedEl) {
    typedEl.textContent = '';
    setTimeout(typeLoop, 500);
  }

const terminalBody = document.getElementById("terminalBody");
const terminalEl = document.getElementById("terminal");
const terminalToggle = document.getElementById("terminalToggle");

const terminalLines = [
  {
    command: "whoami",
    output: "Govind Shrikant Bhajane"
  },
  {
    command: "cat role.txt",
    output: "BCA Graduate | Software Developer | Web Developer"
  },
  {
    command: "cat education.txt",
    output: "BCA — Rani Channamma University, Belagavi (2025)"
  },
  {
    command: "cat skills.txt",
    output: "Java · Python · PHP · JavaScript · MySQL"
  },
  {
    command: "status",
    output: "Open to software & web development opportunities ✔"
  }
];

let terminalRunning = false;
let terminalRunID = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTerminal() {

  if (!terminalBody || terminalRunning) return;

  terminalRunning = true;

  const thisRun = ++terminalRunID;

  terminalBody.replaceChildren();

  for (const item of terminalLines) {

    if (thisRun !== terminalRunID) return;
    const commandLine = document.createElement("p");

    const prompt = document.createElement("span");
    prompt.className = "terminal__prompt";
    prompt.textContent = "$";

    const command = document.createElement("span");

    commandLine.appendChild(prompt);
    commandLine.appendChild(
      document.createTextNode(" ")
    );
    commandLine.appendChild(command);

    terminalBody.appendChild(commandLine);

    for (
      let i = 0;
      i <= item.command.length;
      i++
    ) {

      if (thisRun !== terminalRunID) return;

      command.textContent =
        item.command.substring(0, i);

      await sleep(35);
    }

    await sleep(200);

    if (thisRun !== terminalRunID) return;

    const outputLine = document.createElement("p");

    outputLine.className = "terminal__output";

    outputLine.textContent = item.output;

    terminalBody.appendChild(outputLine);

    await sleep(250);
  }

  if (thisRun === terminalRunID) {

    const cursorLine = document.createElement("p");

    cursorLine.innerHTML = `
      <span class="terminal__prompt">$</span>
      <span class="terminal__cursor"></span>
    `;

    terminalBody.appendChild(cursorLine);
  }

  terminalRunning = false;
  setTimeout(() => {

  if (terminalEl) {
    terminalEl.classList.add("is-minimized");
  }

}, 2000);
}

if (terminalEl) {

  const terminalObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            runTerminal();

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.3
      }
    );

  terminalObserver.observe(terminalEl);
}

if (terminalToggle && terminalEl) {

  terminalToggle.addEventListener(
    "click",
    event => {

      event.stopPropagation();

      terminalEl.classList.toggle(
        "is-minimized"
      );

    }
  );
}

  const form = document.getElementById('contactForm');

  const showError = (inputId, errorId, message) => {
    document.getElementById(errorId).textContent = message;
    document.getElementById(inputId).closest('.form-group').classList.toggle('has-error', !!message);
  };

  const validateForm = () => {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name.length < 2) {
      showError('name', 'nameError', 'Please enter your full name.');
      isValid = false;
    } else {
      showError('name', 'nameError', '');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError('email', 'emailError', 'Please enter a valid email address.');
      isValid = false;
    } else {
      showError('email', 'emailError', '');
    }

    if (subject.length < 2) {
      showError('subject', 'subjectError', 'Please enter a subject.');
      isValid = false;
    } else {
      showError('subject', 'subjectError', '');
    }

    if (message.length < 10) {
      showError('message', 'messageError', 'Message should be at least 10 characters.');
      isValid = false;
    } else {
      showError('message', 'messageError', '');
    }

    return isValid;
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formNote = document.getElementById('formNote');

      if (validateForm()) {
        formNote.textContent = 'Thanks! This form is validated but not yet connected to a backend — see the comment in script.js.';
        formNote.style.color = 'var(--accent-cyan)';
        form.reset();
      }
    });
  }

  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});