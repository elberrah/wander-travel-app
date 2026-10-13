// --- GLOBAL VARIABLES & STATE ---
let currentCategory = "all";
let currentLocation = "all";
let searchQuery = "";

// --- DOM ELEMENTS ---
const offersGrid = document.getElementById("offers-grid");
const searchInput = document.getElementById("search-input");
const locationFilter = document.getElementById("location-filter");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");
const resetFiltersBtn = document.getElementById("reset-filters-btn");
const partnersAccordion = document.getElementById("partners-accordion");
const formDestinationSelect = document.getElementById("form-destination");
const detailsModal = document.getElementById("details-modal");
const closeModalBtn = document.querySelector(".close-modal-btn");
const modalBodyContent = document.getElementById("modal-body-content");
const bookingForm = document.getElementById("booking-request-form");
const toast = document.getElementById("toast");
const themeToggleBtn = document.getElementById("theme-toggle");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav");

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupEventListeners();
});

function initApp() {
    // 1. Render all offer cards
    renderOffers();
    
    // 2. Populate filters and form options
    populateFiltersAndForms();
    
    // 3. Render partners network accordion
    renderPartnersAccordion();
    
    // 4. Initialize theme from local storage
    initTheme();
}

// --- APP EVENT LISTENERS ---
function setupEventListeners() {
    // Live Search
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderOffers();
    });

    // Category Pill Filters
    const pills = document.querySelectorAll(".category-pills .pill");
    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            currentCategory = pill.getAttribute("data-category");
            renderOffers();
        });
    });

    // Location Select Filter
    locationFilter.addEventListener("change", (e) => {
        currentLocation = e.target.value;
        renderOffers();
    });

    // Reset Filters button
    resetFiltersBtn.addEventListener("click", () => {
        resetFilters();
    });

    // Close Modal Events
    closeModalBtn.addEventListener("click", () => {
        closeModal();
    });
    
    window.addEventListener("click", (e) => {
        if (e.target === detailsModal) {
            closeModal();
        }
    });

    // Handle quote form submit
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        submitQuoteRequest();
    });

    // Theme toggle button
    themeToggleBtn.addEventListener("click", () => {
        toggleTheme();
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener("click", () => {
        mobileNav.classList.toggle("open");
        const menuIcon = mobileMenuBtn.querySelector("i");
        if (mobileNav.classList.contains("open")) {
            menuIcon.className = "fa-solid fa-xmark";
        } else {
            menuIcon.className = "fa-solid fa-bars";
        }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-cta");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            mobileMenuBtn.querySelector("i").className = "fa-solid fa-bars";
        });
    });
}

// --- RENDER FUNCTIONS ---

// Render dynamic offer cards
function renderOffers() {
    // Load saved galleries from localStorage to keep main card images in sync
    const savedGalleries = JSON.parse(localStorage.getItem('wander_custom_galleries') || '{}');
    OFFERS_DATA.forEach(offer => {
        if (savedGalleries[offer.id] && savedGalleries[offer.id].length > 0) {
            offer.images = savedGalleries[offer.id];
            offer.image = savedGalleries[offer.id][0];
        }
    });

    // Filter logic
    const filteredOffers = OFFERS_DATA.filter(offer => {
        // Category check
        const categoryMatch = currentCategory === "all" || offer.category === currentCategory;
        
        // Location check
        const locationMatch = currentLocation === "all" || offer.location.includes(currentLocation);
        
        // Text Search match
        const searchMatch = searchQuery === "" || 
                            offer.title.toLowerCase().includes(searchQuery) ||
                            offer.location.toLowerCase().includes(searchQuery) ||
                            offer.description.toLowerCase().includes(searchQuery) ||
                            offer.equipments.some(e => e.toLowerCase().includes(searchQuery));
        
        return categoryMatch && locationMatch && searchMatch;
    });

    // Clear grid
    offersGrid.innerHTML = "";

    // Show/hide empty state
    if (filteredOffers.length === 0) {
        emptyState.classList.remove("hidden");
        resultsCount.textContent = "Aucune offre trouvée";
    } else {
        emptyState.classList.add("hidden");
        resultsCount.textContent = `${filteredOffers.length} offre${filteredOffers.length > 1 ? 's' : ''} disponible${filteredOffers.length > 1 ? 's' : ''}`;
        
        // Render cards
        filteredOffers.forEach(offer => {
            const card = document.createElement("div");
            card.className = "offer-card";
            
            // Format price
            const formattedPrice = offer.startingPrice == null ? '' : offer.startingPrice.toLocaleString('fr-FR');
            
            // Create tags markup
            const tagsMarkup = offer.equipments.map(eq => `<span class="equip-tag">${eq}</span>`).join("");
            
            card.innerHTML = `
                <a class="oc-media cat-${offer.category}" href="offre.html?id=${offer.id}" aria-label="${offer.title}">
                    <span class="oc-ph">${offer.title}</span>
                    ${offer.image ? `<img src="${offer.image}" alt="${offer.title}" loading="lazy" onerror="this.remove()">` : ''}
                    <span class="oc-stars">${offer.stars}</span>
                    <span class="oc-meal">${offer.meal}</span>
                </a>
                <div class="oc-body">
                    <span class="oc-loc">${offer.location}</span>
                    <h3 class="oc-title"><a href="offre.html?id=${offer.id}">${offer.title}</a></h3>
                    <div class="card-equipments">${tagsMarkup}</div>
                    <div class="oc-foot">
                        <div class="oc-price">${window.Wander ? Wander.priceHTML(offer) : ''}</div>
                        <a class="oc-cta" href="offre.html?id=${offer.id}">Voir l'offre <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
            
            offersGrid.appendChild(card);
        });
    }
}

// Populate filters and quote form destinations dropdown dynamically
function populateFiltersAndForms() {
    // Clear lists
    locationFilter.innerHTML = '<option value="all">Toutes les destinations</option>';
    
    // Extact unique locations
    const locations = [...new Set(OFFERS_DATA.map(o => o.location))].sort();
    
    // Populate select filters
    locations.forEach(loc => {
        const option = document.createElement("option");
        option.value = loc;
        option.textContent = loc;
        locationFilter.appendChild(option);
    });

    // Populate Quote request select options
    // Group active offers for dropdown selection
    const GROUPS = [["casa","Casablanca et environs"],["marrakech","Marrakech et région"],["sud","Agadir et Grand Sud"],["nord","Nord, Centre et Moyen-Atlas"],["dakhla","Dakhla"],["package","Istanbul & Égypte"],["omra","Programmes Omra 2026"]];
    GROUPS.forEach(([key, label]) => {
        const grp = document.createElement("optgroup");
        grp.label = label;
        OFFERS_DATA.filter(o => o.category === key).forEach(offer => {
            const option = document.createElement("option");
            option.value = offer.title;
            option.textContent = offer.title + " (" + offer.location + ")";
            grp.appendChild(option);
        });
        formDestinationSelect.appendChild(grp);
    });
}

// Render the partners accordion list (locked rates pending DRH conventions)
function renderPartnersAccordion() {
    if (!partnersAccordion) return;
    partnersAccordion.innerHTML = "";
    
    PARTNERS_NETWORK_DATA.forEach((cityGroup, index) => {
        const item = document.createElement("div");
        item.className = "accordion-item";
        
        // Generate grid items
        const hotelsGridMarkup = cityGroup.hotels.map(h => `
            <div class="partner-hotel-card">
                <span>${h}</span>
                <span class="lock-badge"><i class="fa-solid fa-lock"></i> Négocié</span>
            </div>
        `).join("");
        
        item.innerHTML = `
            <button class="accordion-header" onclick="toggleAccordion(this)">
                <div class="accordion-title-left">
                    <i class="fa-solid fa-hotel"></i>
                    <span>📍 ${cityGroup.city}</span>
                </div>
                <i class="fa-solid fa-chevron-down accordion-icon"></i>
            </button>
            <div class="accordion-content">
                <div class="accordion-body">
                    <div class="partners-grid">
                        ${hotelsGridMarkup}
                    </div>
                </div>
            </div>
        `;
        
        partnersAccordion.appendChild(item);
    });
}

// --- UTILITY LOGIC & INTERACTIONS ---

// Reset all search filters
function resetFilters() {
    searchInput.value = "";
    searchQuery = "";
    locationFilter.value = "all";
    currentLocation = "all";
    
    const pills = document.querySelectorAll(".category-pills .pill");
    pills.forEach(p => p.classList.remove("active"));
    document.querySelector('[data-category="all"]').classList.add("active");
    currentCategory = "all";
    
    renderOffers();
}

// Toggle Accordion Panel
window.toggleAccordion = function(button) {
    const item = button.parentElement;
    const content = button.nextElementSibling;
    
    // Toggle active state on item
    item.classList.toggle("active");
    
    if (item.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        content.style.maxHeight = 0;
    }
};

// Selection of card for Quick Quote form setup
window.selectOfferForQuote = function(title) {
    formDestinationSelect.value = title;
    
    // Scroll to form smoothly
    const devisSection = document.getElementById("devis");
    devisSection.scrollIntoView({ behavior: 'smooth' });
    
    // Highlight effect
    const formSide = document.querySelector(".quote-form-side");
    formSide.style.outline = "2px solid var(--gold)";
    setTimeout(() => {
        formSide.style.outline = "none";
    }, 1500);
};

// Open offer details Modal Dialog
window.openDetailsModal = function(id) {
    const offer = OFFERS_DATA.find(o => o.id === id);
    if (!offer) return;
    
    // Format Table Headers
    const headersHTML = offer.details.tableHeader.map(th => `<th>${th}</th>`).join("");
    
    // Format Table Rows
    const rowsHTML = offer.details.tableRows.map(row => {
        const rowCells = row.map((cell, idx) => {
            if (idx === row.length - 1 || (row.length === 3 && idx === 1)) {
                // Style prices bold
                return `<td class="bold-price">${cell}</td>`;
            }
            return `<td>${cell}</td>`;
        }).join("");
        return `<tr>${rowCells}</tr>`;
    }).join("");

    // Format Notes List
    const notesHTML = offer.details.notes.map(n => `<li>${n}</li>`).join("");

    // Load saved custom images from localStorage if any
    const savedGalleries = JSON.parse(localStorage.getItem('wander_custom_galleries') || '{}');
    if (savedGalleries[offer.id] && savedGalleries[offer.id].length > 0) {
        offer.images = savedGalleries[offer.id];
    } else if (!offer.images) {
        offer.images = [offer.image];
    }

    // Populate modal body
    modalBodyContent.innerHTML = `
        <div class="modal-header-block">
            <div class="modal-stars">${offer.stars}</div>
            <h2 class="modal-title">${offer.title}</h2>
            <div class="modal-location"><i class="fa-solid fa-location-dot"></i> ${offer.location} · Repas : ${offer.meal}</div>
        </div>
        
        <!-- Gallery Carrousel / Thumbnails -->
        <div class="modal-gallery-container">
            <div class="gallery-main-view">
                <img id="gallery-active-img-${offer.id}" src="${offer.images[0]}" alt="${offer.title}">
            </div>
            <div class="gallery-thumbnails-bar" id="gallery-thumbs-${offer.id}">
                ${renderThumbnailsHTML(offer.id, offer.images)}
            </div>
            <div class="gallery-admin-controls">
                <label class="btn-add-photo" for="upload-photo-input-${offer.id}">
                    <i class="fa-solid fa-plus-circle"></i> Ajouter une photo
                </label>
                <input type="file" id="upload-photo-input-${offer.id}" accept="image/*" multiple style="display:none;" onchange="handleHotelPhotoUpload('${offer.id}', event)">
                
                <button class="btn-delete-photo" onclick="deleteCurrentActivePhoto('${offer.id}')">
                    <i class="fa-solid fa-trash"></i> Supprimer la photo affichée
                </button>
                <button class="btn-save-gallery" onclick="saveHotelGallery('${offer.id}')">
                    <i class="fa-solid fa-floppy-disk"></i> Enregistrer les modifications
                </button>
            </div>
        </div>

        <p class="modal-subtitle-block">${offer.description}</p>
        
        <h3 class="modal-section-title"><i class="fa-solid fa-receipt"></i> Grille des Tarifs</h3>
        <div class="pricing-table-wrapper">
            <table class="pricing-table">
                <thead>
                    <tr>${headersHTML}</tr>
                </thead>
                <tbody>
                    ${rowsHTML}
                </tbody>
            </table>
        </div>
        
        <h3 class="modal-section-title"><i class="fa-solid fa-circle-info"></i> Conditions & Notes</h3>
        <ul class="modal-notes-list">
            ${notesHTML}
        </ul>
        
        <div class="modal-action-bar">
            <button class="modal-btn modal-btn-close" onclick="closeModal()">Fermer</button>
            <button class="modal-btn modal-btn-book" onclick="bookFromModal('${offer.title}')">Choisir cette offre</button>
        </div>
    `;

    detailsModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scroll
};

function renderThumbnailsHTML(offerId, imagesList) {
    return imagesList.map((imgUrl, idx) => `
        <div class="thumb-wrapper ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
            <img src="${imgUrl}" class="gallery-thumb-item" onclick="changeModalActiveImage('${offerId}', '${imgUrl}', this.parentElement)" alt="Photo ${idx+1}">
        </div>
    `).join('');
}

window.closeModal = function() {
    detailsModal.style.display = "none";
    document.body.style.overflow = "auto";
};

// Gallery Active Image Switcher
window.changeModalActiveImage = function(offerId, imgUrl, thumbWrapper) {
    const activeImg = document.getElementById(`gallery-active-img-${offerId}`);
    if (activeImg) {
        activeImg.src = imgUrl;
        activeImg.dataset.currentSrc = imgUrl;
    }
    const thumbsBar = document.getElementById(`gallery-thumbs-${offerId}`);
    if (thumbsBar) {
        const wrappers = thumbsBar.querySelectorAll('.thumb-wrapper');
        wrappers.forEach(w => w.classList.remove('active'));
    }
    if (thumbWrapper) {
        thumbWrapper.classList.add('active');
    }
};

// Upload Custom Photos Handler
window.handleHotelPhotoUpload = function(offerId, event) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const offer = OFFERS_DATA.find(o => o.id === offerId);
    if (!offer) return;
    
    if (!offer.images) offer.images = [offer.image];
    
    let loadedCount = 0;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newImgData = e.target.result;
            offer.images.push(newImgData);
            loadedCount++;
            
            if (loadedCount === files.length) {
                // Refresh thumbs
                const thumbsBar = document.getElementById(`gallery-thumbs-${offerId}`);
                if (thumbsBar) {
                    thumbsBar.innerHTML = renderThumbnailsHTML(offerId, offer.images);
                }
                // Switch to newly added image
                const lastIdx = offer.images.length - 1;
                const lastThumbWrapper = thumbsBar.children[lastIdx];
                changeModalActiveImage(offerId, newImgData, lastThumbWrapper);
            }
        };
        reader.readAsDataURL(file);
    });
};

// Delete Current Active Photo Function
window.deleteCurrentActivePhoto = function(offerId) {
    const offer = OFFERS_DATA.find(o => o.id === offerId);
    if (!offer || !offer.images || offer.images.length <= 1) {
        alert("Impossible de supprimer la seule photo restante de l'établissement.");
        return;
    }
    
    const activeImg = document.getElementById(`gallery-active-img-${offerId}`);
    const currentSrc = activeImg ? (activeImg.dataset.currentSrc || activeImg.src) : offer.images[0];
    
    const idxToRemove = offer.images.indexOf(currentSrc);
    if (idxToRemove !== -1) {
        offer.images.splice(idxToRemove, 1);
    } else {
        offer.images.pop();
    }
    
    // Refresh thumbs
    const thumbsBar = document.getElementById(`gallery-thumbs-${offerId}`);
    if (thumbsBar) {
        thumbsBar.innerHTML = renderThumbnailsHTML(offerId, offer.images);
        const firstWrapper = thumbsBar.children[0];
        changeModalActiveImage(offerId, offer.images[0], firstWrapper);
    }
};

// Save Gallery Permanent Storage
window.saveHotelGallery = function(offerId) {
    const offer = OFFERS_DATA.find(o => o.id === offerId);
    if (!offer) return;
    
    // Save primary image
    if (offer.images && offer.images.length > 0) {
        offer.image = offer.images[0];
    }
    
    // Save to localStorage
    const savedGalleries = JSON.parse(localStorage.getItem('wander_custom_galleries') || '{}');
    savedGalleries[offerId] = offer.images;
    localStorage.setItem('wander_custom_galleries', JSON.stringify(savedGalleries));
    
    // Refresh all main cards on page immediately
    renderOffers();
    
    // Toast alert
    const toast = document.getElementById("toast");
    if (toast) {
        toast.querySelector(".toast-message").textContent = "Galerie et photo principale enregistrées avec succès !";
        toast.className = "toast show";
        setTimeout(() => toast.className = "toast", 3000);
    } else {
        alert("Galerie enregistrée avec succès !");
    }
};

window.bookFromModal = function(title) {
    closeModal();
    selectOfferForQuote(title);
};

// Quote form submission logic
function submitQuoteRequest() {
    // Display Success Toast
    toast.className = "toast show";
    
    // Hide toast after 5s
    setTimeout(() => {
        toast.className = "toast";
    }, 5000);

    // Reset Form
    bookingForm.reset();
}

// --- THEME SWITCHING (LIGHT/DARK) ---
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.replace("light-mode", "dark-mode");
        themeToggleBtn.querySelector("i").className = "fa-solid fa-sun";
    } else {
        document.body.classList.replace("dark-mode", "light-mode");
        themeToggleBtn.querySelector("i").className = "fa-solid fa-moon";
    }
}

function toggleTheme() {
    if (document.body.classList.contains("light-mode")) {
        document.body.classList.replace("light-mode", "dark-mode");
        themeToggleBtn.querySelector("i").className = "fa-solid fa-sun";
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.replace("dark-mode", "light-mode");
        themeToggleBtn.querySelector("i").className = "fa-solid fa-moon";
        localStorage.setItem("theme", "light");
    }
}

// --- FAQ & Salarié Modal Logic ---

function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    if (item) {
        item.classList.toggle('active');
    }
}

function openSalarieModal() {
    const modal = document.getElementById('salarie-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSalarieModal() {
    const modal = document.getElementById('salarie-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function checkSalarieAccess() {
    const code = document.getElementById('salarie-code').value;
    const email = document.getElementById('salarie-email').value;
    const errorEl = document.getElementById('salarie-error');
    
    // Accept anything for demo purposes
    if (code.trim().length > 3 && email.includes('@')) {
        closeSalarieModal();
        alert("Accès autorisé ! Bienvenue sur l'espace salarié privilégié.");
    } else {
        errorEl.style.display = 'block';
        setTimeout(() => errorEl.style.display = 'none', 3000);
    }
}
