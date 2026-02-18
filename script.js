// Init VanillaTilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
    scale: 1.02
});

// Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Interactive hover expansion
const interactiveEls = document.querySelectorAll('a, button, .project-block, .tech-card, .cert-card, .profile-tag, .send-btn');
interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.borderColor = '#00e5ff';
        cursorOutline.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = 'rgba(255,255,255,0.5)';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// Flying Paper Plane Logic + EmailJS
function sendMail(event) {
    event.preventDefault(); 
    
    const btn = document.querySelector('.send-btn');
    const form = document.getElementById('contact-form');
    
    if (btn.classList.contains('active')) return;

    btn.classList.add('active');

    // Send Form Data (Replace with your actual Template ID & Public Key)
    emailjs.sendForm('service_1mhxjfn', 'template_adzovx3', form)
        .then(() => {
            setTimeout(() => {
                btn.classList.remove('active');
                const textSpan = btn.querySelector('.btn-text');
                const originalText = textSpan.innerText;
                textSpan.innerText = 'Sent!';
                form.reset();
                setTimeout(() => { textSpan.innerText = originalText; }, 2000);
            }, 2500);
        }, (error) => {
            console.error('FAILED...', error);
            btn.classList.remove('active');
            alert('Failed to send message. Please try again.');
        });
}

// Project Modal Logic
function openModal(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Skill Modal Logic
const skillData = {
    "C": { desc: "A powerful general-purpose programming language providing low-level access to memory.", tools: "GCC, Clang, Visual Studio", use: "System programming, Embedded systems, OS development.", companies: "Microsoft, Apple, NVIDIA" },
    "Java": { desc: "A high-level, class-based, object-oriented programming language.", tools: "IntelliJ IDEA, Eclipse, Spring Boot", use: "Enterprise backend systems, Android apps.", companies: "Google, Amazon, Netflix" },
    "Python": { desc: "An interpreted, high-level programming language known for readability.", tools: "PyCharm, Jupyter, TensorFlow, Django", use: "Data Science, AI/ML, Web Dev.", companies: "Google, Facebook, Spotify" },
    "Go": { desc: "Statically typed, compiled language designed at Google for scalability.", tools: "GoLand, VS Code, Docker", use: "Cloud-native microservices, Distributed systems.", companies: "Google, Uber, Twitch" },
    "JavaScript": { desc: "The world's most popular programming language for the web.", tools: "VS Code, Chrome DevTools, Node.js", use: "Frontend, Backend, Mobile apps.", companies: "All major tech companies" },
    "React": { desc: "A JavaScript library for building user interfaces.", tools: "Create React App, Next.js, Redux", use: "Single Page Applications, Interactive UIs.", companies: "Meta, Airbnb, Netflix" },
    "NodeJS": { desc: "A JavaScript runtime built on Chrome's V8 engine.", tools: "Express.js, NPM, Socket.io", use: "Scalable network apps, APIs.", companies: "LinkedIn, Uber, PayPal" },
    "HTML5": { desc: "Standard markup language for documents designed to be displayed in a browser.", tools: "VS Code, DevTools", use: "Web structure, SEO.", companies: "Every web company" },
    "CSS3": { desc: "Style sheet language used for describing the presentation of a document.", tools: "Sass, Tailwind, Bootstrap", use: "Web design, Responsive layouts.", companies: "Every web company" },
    "Bootstrap": { desc: "The most popular CSS framework for responsive, mobile-first sites.", tools: "Bootstrap Studio, CDN", use: "Rapid prototyping, UI components.", companies: "Twitter, Spotify" },
    "SQL": { desc: "Domain-specific language for managing data in RDBMS.", tools: "MySQL Workbench, PostgreSQL", use: "Data storage, Complex queries.", companies: "Facebook, Amazon, Microsoft" },
    "MongoDB": { desc: "A source-available cross-platform document-oriented database program.", tools: "Atlas, Compass", use: "Unstructured data storage, Real-time analytics.", companies: "Adobe, Google, EA" },
    "Git": { desc: "Distributed version control system for tracking changes.", tools: "GitHub, GitLab", use: "Source code management, Collaboration.", companies: "All software companies" },
    "Terminal": { desc: "Command-line interface for interacting with the OS.", tools: "Bash, Zsh, PowerShell", use: "Automation, Scripting, System admin.", companies: "Developers everywhere" },
    "GitHub": { desc: "Internet hosting for software development and version control.", tools: "Actions, Pages", use: "Code hosting, CI/CD.", companies: "Microsoft, Stripe" },
    "VS Code": { desc: "A code editor redefined and optimized for building modern web apps.", tools: "Extensions, Debugger", use: "Coding, Debugging.", companies: "Google, Meta, Microsoft" }
};

function openSkillModal(skillKey) {
    const data = skillData[skillKey];
    if (data) {
        document.getElementById('skill-title').innerText = skillKey;
        document.getElementById('skill-desc').innerText = data.desc;
        document.getElementById('skill-tools').innerText = data.tools;
        document.getElementById('skill-use').innerText = data.use;
        document.getElementById('skill-companies').innerText = data.companies;
        const modal = document.getElementById('skill-modal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSkillModal() {
    const modal = document.getElementById('skill-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Certificate Modal Logic (Preview Mode)
function openCertModal(url, title) {
    document.getElementById('cert-title').innerText = title;
    document.getElementById('cert-external-link').href = url;
    
    // Convert View URL to Preview URL
    let embedUrl = url;
    if (url.includes('drive.google.com')) {
        embedUrl = url.replace(/\/view.*/, '/preview');
    }
    
    document.getElementById('cert-iframe').src = embedUrl;
    const modal = document.getElementById('cert-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => { document.getElementById('cert-iframe').src = ""; }, 300);
}

// Window Click to Close Modals
window.onclick = function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        document.querySelectorAll('.modal-overlay').forEach(m => {
            m.classList.remove('active');
            if(m.id === 'cert-modal') {
                setTimeout(() => { document.getElementById('cert-iframe').src = ""; }, 300);
            }
        });
        document.body.style.overflow = 'auto';
    }
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-text > *", { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "power2.out" });
gsap.from(".hero-visual", { opacity: 0, x: 30, duration: 1, delay: 0.5, ease: "power2.out" });

gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: { trigger: title, start: "top 85%" },
        opacity: 0, y: 30, duration: 0.8
    });
});

gsap.utils.toArray('.glass-panel').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 90%" },
        opacity: 0, y: 30, duration: 0.5
    });
});