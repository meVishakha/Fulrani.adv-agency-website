// Client Logos Management
class ClientLogos {
    constructor() {
        this.logos = [];
        this.init();
    }

    init() {
        // Generate logo objects for logos 1-10
        for (let i = 1; i <= 10; i++) {
            this.logos.push({
                src: `Client/logo${i}.png`,
                alt: `Client ${i}`,
                id: `client-logo-${i}`
            });
        }
    }

    // Generate HTML for client logos carousel
    generateCarouselHTML() {
        let html = `
        <section class="clients">
            <div class="container">
                <div class="section-header">
                    <h2>Our Clients</h2>
                    <p>Brands we've partnered with</p>
                </div>
                <div class="clients-carousel">
                    <div class="clients-track">
        `;

        // Add all logos
        this.logos.forEach(logo => {
            html += `
                        <div class="client-logo-item">
                            <img src="${logo.src}" alt="${logo.alt}" class="client-logo-img" id="${logo.id}">
                        </div>
            `;
        });

        // Add duplicates for seamless loop
        this.logos.forEach(logo => {
            html += `
                        <div class="client-logo-item">
                            <img src="${logo.src}" alt="${logo.alt}" class="client-logo-img" id="${logo.id}-duplicate">
                        </div>
            `;
        });

        html += `
                    </div>
                </div>
            </div>
        </section>
        `;

        return html;
    }

    // Insert client logos section into a specific element
    insertIntoElement(elementSelector) {
        const element = document.querySelector(elementSelector);
        if (element) {
            element.innerHTML = this.generateCarouselHTML();
            this.initCarousel();
        }
    }

    // Insert client logos section before a specific element
    insertBeforeElement(elementSelector) {
        const element = document.querySelector(elementSelector);
        if (element) {
            const carouselHTML = this.generateCarouselHTML();
            element.insertAdjacentHTML('beforebegin', carouselHTML);
            this.initCarousel();
        }
    }

    // Insert client logos section after a specific element
    insertAfterElement(elementSelector) {
        const element = document.querySelector(elementSelector);
        if (element) {
            const carouselHTML = this.generateCarouselHTML();
            element.insertAdjacentHTML('afterend', carouselHTML);
            this.initCarousel();
        }
    }

    // Initialize carousel animation
    initCarousel() {
        const track = document.querySelector('.clients-track');
        if (track) {
            // Add CSS animation if not already present
            if (!document.querySelector('#client-carousel-styles')) {
                const style = document.createElement('style');
                style.id = 'client-carousel-styles';
                style.textContent = `
                    .clients-carousel {
                        overflow: hidden;
                        position: relative;
                        width: 100%;
                    }
                    
                    .clients-track {
                        display: flex;
                        animation: scroll 30s linear infinite;
                        width: calc(200px * ${this.logos.length * 2});
                    }
                    
                    .client-logo-item {
                        flex-shrink: 0;
                        width: 200px;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0 20px;
                    }
                    
                    .client-logo-img {
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        filter: grayscale(100%);
                        transition: filter 0.3s ease;
                    }
                    
                    .client-logo-img:hover {
                        filter: grayscale(0%);
                    }
                    
                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(calc(-200px * ${this.logos.length}));
                        }
                    }
                    
                    @media (max-width: 768px) {
                        .clients-track {
                            animation-duration: 20s;
                        }
                        
                        .client-logo-item {
                            width: 150px;
                        }
                        
                        @keyframes scroll {
                            0% {
                                transform: translateX(0);
                            }
                            100% {
                                transform: translateX(calc(-150px * ${this.logos.length}));
                            }
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    // Get logos array
    getLogos() {
        return this.logos;
    }

    // Add a new logo
    addLogo(src, alt) {
        const newLogo = {
            src: src,
            alt: alt,
            id: `client-logo-${this.logos.length + 1}`
        };
        this.logos.push(newLogo);
    }

    // Remove a logo by index
    removeLogo(index) {
        if (index >= 0 && index < this.logos.length) {
            this.logos.splice(index, 1);
        }
    }
}

// Initialize client logos when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.clientLogos = new ClientLogos();
    
    // Auto-insert into elements with specific class or ID
    const autoInsertSelectors = [
        '.clients-section',
        '#clients-section',
        '[data-insert-clients]'
    ];
    
    autoInsertSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            window.clientLogos.insertIntoElement(selector);
        }
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClientLogos;
}