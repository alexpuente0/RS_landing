// Modal functionality for service cards
document.addEventListener('DOMContentLoaded', function() {
    // Get all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');

    // Service content data
    const serviceData = {
        'whispering_wind': {
            title: 'The Whispering Wind Cut',
            description: 'A bespoke cut tailored to your hair\'s natural flow and your soul\'s unspoken yearnings.',
            image: '../public/images/whispering_wind.png'
        },
        'lunar_lustre': {
            title: 'The Lunar Lustre Treatment',
            description: 'An ancient blend of rare oils and botanical extracts, infused under the full moon to impart unparalleled shine and vitality.',
            image: '../public/images/lunar_lustre_treatment.png'
        },
        'sunstone_sculpt': {
            title: 'The Sunstone Sculpt',
            description: 'Bold and architectural styles that capture the light and command attention. For hair that dares to be seen.',
            image: '../public/images/sunstone_sculpt.png'
        },
        'shadow_silk': {
            title: 'The Shadow Silk Smoothing',
            description: 'Taming unruly textures with a secret technique that leaves hair impossibly smooth and ethereally soft.',
            image: '../public/images/shadow_silk_smoothing.png'
        },
        'ephemeral_elixir': {
            title: 'The Ephemeral Elixir Consultation',
            description: 'A private audience with Raul Sergio to diagnose your hair\'s unique needs and prescribe a personalized path to follicular nirvana.',
            image: '../public/images/ephemeral_elixir.png'
        }
    };

    // Add click event to each service card
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            const service = serviceData[serviceId];
            
            // Populate modal content
            modalContent.innerHTML = `
                <h2 class="modal-title">${service.title}</h2>
                <div class="modal-body">
                    <div class="modal-image-container">
                        <img src="${service.image}" alt="${service.title}" class="modal-image">
                    </div>
                    <div class="modal-text">
                        <p>${service.description}</p>
                        <button class="cta-button request-service" data-service="${service.title}">Request Service</button>
                    </div>
                </div>
            `;
            
            // Add event listener to new button
            document.querySelector('.request-service').addEventListener('click', function() {
                // Close service modal
                const scrollY = document.body.style.top;
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.documentElement.style.scrollBehavior = '';
                document.body.style.top = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
                
                // Open contact modal and preselect service
                const contactModal = document.getElementById('contactModal');
                contactModal.style.display = 'block';
                document.body.classList.add('modal-open');
                document.body.style.top = `-${window.scrollY}px`;
                document.getElementById('service').value = service.title;
            });
            
            // Show modal and prevent body scrolling
            const scrollY = window.scrollY; // Store current scroll position
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
            document.body.style.top = `-${scrollY}px`; // Offset body position
            document.documentElement.style.scrollBehavior = 'auto';
        });
    });

    // Close modals when X is clicked
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const scrollY = document.body.style.top;
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.classList.remove('modal-open');
            document.documentElement.style.scrollBehavior = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        });
    });

    // Close modal when clicking outside content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            const scrollY = document.body.style.top;
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.documentElement.style.scrollBehavior = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    });

    // Language switcher functionality
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                if (lang === 'es') {
                    window.location.href = '../es/index.html';
                } else if (lang === 'en') {
                    window.location.href = '../en/index.html';
                }
            }
        });
    }

    // Handle "Submit Your Request" button in contact section
    const submitRequestBtn = document.querySelector('.contact .cta-button');
    if (submitRequestBtn) {
        submitRequestBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactModal = document.getElementById('contactModal');
            contactModal.style.display = 'block';
            document.body.classList.add('modal-open');
            document.body.style.top = `-${window.scrollY}px`;
            document.getElementById('service').value = '';
        });
    }
});
