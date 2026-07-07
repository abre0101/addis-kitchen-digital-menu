// ===== STATE =====
let cart = [];
let activeFilters = [];
let activeCategory = 'featured';
let searchQuery = '';
let sortBy = 'featured';
let currentLang = 'en';
let isDark = false;

// ===== SPICE LEVELS =====
const spiceLevels = {
    1: '🌶️',
    2: '🌶️🌶️',
    3: '🌶️🌶️🌶️'
};

// Assign spice level per item id
const itemSpice = {
    1: 3, 2: 2, 3: 1,
    7: 2, 8: 3, 9: 1,
    10: 1, 4: 1
};

// ===== DOM =====
const menuContainer   = document.getElementById('menuContainer');
const cartSidebar     = document.getElementById('cartSidebar');
const cartOverlay     = document.getElementById('cartOverlay');
const cartItemsEl     = document.getElementById('cartItems');
const cartTotalEl     = document.getElementById('cartTotal');
const cartCountEl     = document.getElementById('cartCount');
const cartFab         = document.getElementById('cartFab');
const closeCartBtn    = document.getElementById('closeCart');
const placeOrderBtn   = document.getElementById('placeOrder');
const searchInput     = document.getElementById('searchInput');
const sortSelect      = document.getElementById('sortSelect');
const emptyState      = document.getElementById('emptyState');
const clearFiltersBtn = document.getElementById('clearFilters');
const itemModal       = document.getElementById('itemModal');
const modalOverlay    = document.getElementById('modalOverlay');
const modalClose      = document.getElementById('modalClose');
const successModal    = document.getElementById('successModal');
const closeSuccess    = document.getElementById('closeSuccess');
const langToggle      = document.getElementById('langToggle');
const darkToggle      = document.getElementById('darkToggle');
const toastEl         = document.getElementById('toast');
const historyToggle   = document.getElementById('historyToggle');
const historySidebar  = document.getElementById('historySidebar');
const historyOverlay  = document.getElementById('historyOverlay');
const closeHistoryBtn = document.getElementById('closeHistory');
const historyContent  = document.getElementById('historyContent');

// ===== INIT =====
function init() {
    loadPreferences();
    showSkeletons();
    setTimeout(() => renderMenu(), 600);
    attachEventListeners();
    updateCartUI();
}

// ===== PREFERENCES (dark mode + language persisted) =====
function loadPreferences() {
    isDark = localStorage.getItem('darkMode') === 'true';
    currentLang = localStorage.getItem('lang') || 'en';
    applyDark();
    applyLang();
}

function applyDark() {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    darkToggle.textContent = isDark ? '☀️' : '🌙';
}

function applyLang() {
    document.querySelectorAll('[data-en]').forEach(el => {
        if (el.tagName === 'INPUT') {
            el.placeholder = el.getAttribute(`data-${currentLang}`) || el.getAttribute('data-en');
        } else {
            el.textContent = el.getAttribute(`data-${currentLang}`) || el.getAttribute('data-en');
        }
    });
    langToggle.textContent = currentLang === 'en' ? '🇪🇹 አማርኛ' : '🇬🇧 English';
}

// ===== SKELETON LOADER =====
function showSkeletons() {
    menuContainer.style.display = 'grid';
    emptyState.style.display = 'none';
    menuContainer.innerHTML = Array.from({ length: 6 }, () => `
        <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
        </div>
    `).join('');
}

// ===== EVENT LISTENERS =====
function attachEventListeners() {
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeCategory = tab.dataset.category;
            showSkeletons();
            setTimeout(renderMenu, 300);
        });
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const f = btn.dataset.filter;
            // "All" resets everything
            if (f === 'all') {
                activeFilters = [];
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            } else {
                // deactivate "All"
                document.querySelector('.filter-btn[data-filter="all"]').classList.remove('active');
                activeFilters = activeFilters.includes(f)
                    ? activeFilters.filter(x => x !== f)
                    : [...activeFilters, f];
                btn.classList.toggle('active');
                // if nothing selected, re-activate All
                if (activeFilters.length === 0) {
                    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
                }
            }
            renderMenu();
        });
    });

    searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase();
        renderMenu();
    });

    sortSelect.addEventListener('change', e => {
        sortBy = e.target.value;
        renderMenu();
    });

    cartFab.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    placeOrderBtn.addEventListener('click', placeOrder);
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    clearFiltersBtn.addEventListener('click', clearFilters);
    closeSuccess.addEventListener('click', () => successModal.classList.remove('active'));

    darkToggle.addEventListener('click', () => {
        isDark = !isDark;
        localStorage.setItem('darkMode', isDark);
        applyDark();
    });

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'am' : 'en';
        localStorage.setItem('lang', currentLang);
        applyLang();
        renderMenu();
    });

    historyToggle.addEventListener('click', openHistory);
    closeHistoryBtn.addEventListener('click', closeHistory);
    historyOverlay.addEventListener('click', closeHistory);
}

// ===== RENDER MENU =====
function renderMenu() {
    let data = [...menuData];

    if (activeCategory === 'featured') {
        data = data.filter(i => i.featured);
    } else {
        data = data.filter(i => i.category === activeCategory);
    }

    if (activeFilters.length > 0) {
        data = data.filter(i => activeFilters.every(f => i.badges.includes(f)));
    }

    if (searchQuery) {
        data = data.filter(i =>
            i.name.toLowerCase().includes(searchQuery) ||
            i.description.toLowerCase().includes(searchQuery)
        );
    }

    switch (sortBy) {
        case 'price-low':    data.sort((a, b) => a.price - b.price); break;
        case 'price-high':   data.sort((a, b) => b.price - a.price); break;
        case 'name':         data.sort((a, b) => a.name.localeCompare(b.name)); break;
        case 'popularity':   data.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    if (data.length === 0) {
        menuContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    menuContainer.style.display = 'grid';
    emptyState.style.display = 'none';
    menuContainer.innerHTML = data.map(createCard).join('');

    menuContainer.querySelectorAll('.view-item-btn').forEach(btn =>
        btn.addEventListener('click', () => openItemModal(parseInt(btn.dataset.id)))
    );
    menuContainer.querySelectorAll('.quick-add-btn').forEach(btn =>
        btn.addEventListener('click', () => quickAdd(parseInt(btn.dataset.id)))
    );
}

// ===== CARD =====
function createCard(item) {
    const badges = item.badges
        .map(b => `<span class="badge badge-${b}">${badgeLabel(b)}</span>`)
        .join('');
    const soldOut = !item.available ? `<span class="badge badge-sold-out">${ui('soldOut')}</span>` : '';
    const spice = itemSpice[item.id] ? `<div class="spice-bar">${spiceLevels[itemSpice[item.id]]}</div>` : '';

    return `
        <div class="menu-item">
            <div class="item-image-wrap">
                <img src="${item.image}" alt="${itemName(item)}" class="item-image" loading="lazy">
                ${spice}
            </div>
            <div class="item-content">
                <div class="item-header">
                    <h3 class="item-name">${itemName(item)}</h3>
                    <span class="item-price">ETB ${item.price}</span>
                </div>
                <p class="item-description">${itemDescription(item)}</p>
                <div class="item-badges">${badges}${soldOut}</div>
                <div class="item-footer">
                    <button class="btn btn-secondary view-item-btn" data-id="${item.id}" ${!item.available ? 'disabled' : ''}>${ui('customize')}</button>
                    <button class="btn btn-primary quick-add-btn"  data-id="${item.id}" ${!item.available ? 'disabled' : ''}>${ui('addToCart')}</button>
                </div>
            </div>
        </div>`;
}

function badgeLabel(badge) {
    const map = {
        en: {
            'vegan':       '🌿 Fasting',
            'vegetarian':  '🥬 Vegetarian',
            'non-fasting': '🥩 Non-fasting',
            'gluten-free': '🌾 Gluten-free',
            'spicy':       '🌶️ Spicy',
            'nuts':        '🥜 Nuts',
            'featured':    '⭐ Featured'
        },
        am: {
            'vegan':       '🌿 የጾም',
            'vegetarian':  '🥬 አትክልታዊ',
            'non-fasting': '🥩 ስጋ',
            'gluten-free': '🌾 ስንዴ-አልባ',
            'spicy':       '🌶️ ቅጠር',
            'nuts':        '🥜 ለውዝ',
            'featured':    '⭐ ተለይቷል'
        }
    };
    return (map[currentLang] || map.en)[badge] || badge;
}

// ===== ITEM TRANSLATIONS =====
const itemTranslations = {
    "Doro Wat":          { am: { name: "ዶሮ ወጥ",           description: "ቤርበሬ ውስጥ የተቀቀለ ቅጠባ ዶሮ ወጥ፤ ከተቀቀለ እንቁላል ጋር በእንጀራ ይቀርባል።" } },
    "Kitfo":             { am: { name: "ክትፎ",              description: "ሚጥሚጣ እና ቅቤ ያለው የኢትዮጵያ ስጋ ክትፎ።" } },
    "Veggie Combo":      { am: { name: "የጾም ምርጫ",         description: "ምስር ወጥ፣ ጎመን፣ ሽሮ እና ቲቅል ጎመን ያካተተ የጾም ምግቦች ስብስብ።" } },
    "Sambusa":           { am: { name: "ሳምቡሳ",             description: "ቅጠባ ምስር ወይም ስጋ የያዘ ሾርባ ሳምቡሳ፤ ከአዋዜ ጋር ይቀርባል።" } },
    "Timatim Salad":     { am: { name: "ቲማቲም ሰላጣ",        description: "ቲማቲምና ሽንኩርት ሰላጣ በጃላፔኖ፣ ሎሚና ዘይት።" } },
    "Azifa":             { am: { name: "አዚፋ",              description: "ቀዝቃዛ ምስር ሰላጣ ከሰናፍጭ፣ ጃላፔኖ፣ ሽንኩርትና ሎሚ ጭማቂ ጋር።" } },
    "Tibs":              { am: { name: "ጥብስ",              description: "ሽንኩርት፣ በርበሬ፣ ቲማቲምና የኢትዮጵያ ቅመሞች ያለው የተጠበሰ ስጋ ቁርጥ።" } },
    "Yebeg Wat":         { am: { name: "የበግ ወጥ",           description: "ቤርበሬ ውስጥ ሽንኩርትና ቅመም ጨምሮ የበሰለ ለስሳ የበግ ወጥ።" } },
    "Gomen Be Siga":     { am: { name: "ጎመን በሰጋ",         description: "ስጋ፣ ሽንኩርትና ቅመም ያለው የጎመን ወጥ።" } },
    "Shiro Wat":         { am: { name: "ሽሮ ወጥ",            description: "ነጭ ሽንኩርትና ቅመም ያለው ክሬሚ የሽምብራ ዱቄት ወጥ።" } },
    "Injera":            { am: { name: "እንጀራ",             description: "ትንሽ ሻካራ ፋጉሎ ያለው ባህላዊ የኢትዮጵያ ጎረሳ ዳቦ።" } },
    "Ayib":              { am: { name: "አይብ",               description: "ቀለል ያለ ቅመም ያለው ትኩስ የኢትዮጵያ ጎጆ አይብ።" } },
    "Gomen":             { am: { name: "ጎመን",               description: "ነጭ ሽንኩርት፣ ዝንጅብልና ቅመሞች ያለው የጎመን ወጥ።" } },
    "Ethiopian Coffee":  { am: { name: "የኢትዮጵያ ቡና",        description: "ባህላዊ በሆነ መንገድ የተቆላ እና በጀበና የተፈላ ቡና።" } },
    "Tej":               { am: { name: "ጠጅ",               description: "ትንሽ ጣፋጭና ቅጠላ ጣዕም ያለው ባህላዊ የኢትዮጵያ ማር ወይን።" } },
    "Spris":             { am: { name: "ስፕሪስ",             description: "ለምለም የኢትዮጵያ ለስላሳ መጠጥ።" } },
    "Fresh Mango Juice": { am: { name: "ትኩስ ማንጎ ጭማቂ",   description: "በቅርቡ የተጨመቀ ማንጎ ጭማቂ።" } },
    "Baklava":           { am: { name: "ባቅላቫ",             description: "ማርና ለውዝ ያለው ሽፋን ሽፋን ዝርጋታ።" } },
    "Honey Cake":        { am: { name: "የማር ኬክ",           description: "የኢትዮጵያ ማር ያለው እርጥብ ስፖንጅ ኬክ።" } },
    "Fresh Fruit Platter":{ am: { name: "ትኩስ ፍራፍሬ ቁርጥ",  description: "ማንጎ፣ ፓፓያ እና አናናስ ያካተተ ወቅታዊ ትኩስ ፍራፍሬ።" } }
};

function itemName(item) {
    if (currentLang === 'am' && itemTranslations[item.name]?.am?.name)
        return itemTranslations[item.name].am.name;
    return item.name;
}

function itemDescription(item) {
    if (currentLang === 'am' && itemTranslations[item.name]?.am?.description)
        return itemTranslations[item.name].am.description;
    return item.description;
}

const sizeNames = {
    am: {
        'Regular': 'መደበኛ', 'Large': 'ትልቅ', 'Small': 'ትንሽ',
        '3 pieces': '3 ቁርጥ', '6 pieces': '6 ቁርጥ',
        '2 pieces': '2 ቁርጥ', '4 pieces': '4 ቁርጥ',
        'Glass': 'ብርጭቆ', 'Carafe': 'ጀበና', 'Bottle': 'ጠርሙስ'
    }
};

const addonNames = {
    am: {
        'Extra Ayib (Cheese)': 'ተጨማሪ አይብ',
        'Extra Gomen (Collard Greens)': 'ተጨማሪ ጎመን',
        'Extra Injera': 'ተጨማሪ እንጀራ',
        'Extra Awaze Sauce': 'ተጨማሪ አዋዜ',
        'Add Tofu': 'ቶፉ ጨምር',
        'Add Jalapeños': 'ጃላፔኖ ጨምር',
        'Extra Shot': 'ተጨማሪ ሾት',
        'Vanilla Ice Cream': 'ቫኒላ አይስክሬም',
        'Whipped Cream': 'ክሬም'
    }
};

function translateSize(name) {
    return (currentLang === 'am' && sizeNames.am[name]) ? sizeNames.am[name] : name;
}

function translateAddon(name) {
    return (currentLang === 'am' && addonNames.am[name]) ? addonNames.am[name] : name;
}

const uiText = {
    en: {
        customize: 'Customize',
        addToCart: 'Add to Cart',
        soldOut: 'Sold Out',
        selectSize: 'Select Size',
        addons: 'Add-ons',
        specialInstructions: 'Special Instructions / ልዩ ትዕዛዝ',
        specialPlaceholder: 'e.g. mild spice, no onions / ቅጠር ቀንሱ',
        cancel: 'Cancel',
        addToCartModal: 'Add to Cart',
        included: 'Included',
        itemAdded: (name) => `${name} added!`
    },
    am: {
        customize: 'አብጀ',
        addToCart: 'ወደ ጋሪ ጨምር',
        soldOut: 'አልቋል',
        selectSize: 'መጠን ይምረጡ',
        addons: 'ተጨማሪዎች',
        specialInstructions: 'ልዩ ትዕዛዝ',
        specialPlaceholder: 'ምሳሌ፦ ቅጠር ቀንሱ፣ ሽንኩርት አያስፈልግም',
        cancel: 'ሰርዝ',
        addToCartModal: 'ወደ ጋሪ ጨምር',
        included: 'ተካቷል',
        itemAdded: (name) => `${name} ተጨምሯል!`
    }
};

function ui(key, ...args) {
    const t = uiText[currentLang] || uiText.en;
    return typeof t[key] === 'function' ? t[key](...args) : (t[key] || uiText.en[key]);
}

// ===== ITEM MODAL =====
function openItemModal(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    const badges = item.badges.map(b => `<span class="badge badge-${b}">${badgeLabel(b)}</span>`).join('');
    const spiceHTML = itemSpice[itemId]
        ? `<p style="margin:4px 0;font-size:0.85rem;color:var(--text-light)">Heat: ${spiceLevels[itemSpice[itemId]]}</p>` : '';

    const sizesHTML = item.sizes.length ? `
        <div class="customization-section">
            <h3>${ui('selectSize')}</h3>
            <div class="size-options">
                ${item.sizes.map((s, i) => `
                    <label class="radio-option">
                        <input type="radio" name="size" value="${i}" ${i === 0 ? 'checked' : ''}>
                        <span class="option-label">${translateSize(s.name)}</span>
                        <span class="option-price">${s.price !== 0 ? (s.price > 0 ? '+' : '') + 'ETB ' + s.price : ui('included')}</span>
                    </label>`).join('')}
            </div>
        </div>` : '';

    const addonsHTML = item.addons.length ? `
        <div class="customization-section">
            <h3>${ui('addons')}</h3>
            <div class="addon-options">
                ${item.addons.map((a, i) => `
                    <label class="checkbox-option">
                        <input type="checkbox" name="addon" value="${i}">
                        <span class="option-label">${translateAddon(a.name)}</span>
                        <span class="option-price">+ETB ${a.price}</span>
                    </label>`).join('')}
            </div>
        </div>` : '';

    document.getElementById('modalBody').innerHTML = `
        <img src="${item.image}" alt="${itemName(item)}" class="modal-image">
        <div class="modal-body">
            <div class="modal-header">
                <h2 class="modal-title">${itemName(item)}</h2>
                ${spiceHTML}
                <div class="item-badges" style="margin-top:6px">${badges}</div>
            </div>
            <p class="modal-description">${itemDescription(item)}</p>
            ${sizesHTML}
            ${addonsHTML}
            <div class="customization-section">
                <h3>${ui('specialInstructions')}</h3>
                <textarea id="specialInstructions" class="special-instructions"
                    placeholder="${ui('specialPlaceholder')}"></textarea>
            </div>
            <div class="modal-price" id="modalLivePrice">ETB ${item.price}</div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="cancelModal">${ui('cancel')}</button>
                <button class="btn btn-primary" id="addToCartModal" data-id="${itemId}">${ui('addToCartModal')}</button>
            </div>
        </div>`;

    itemModal.classList.add('active');
    modalOverlay.classList.add('active');

    // Live price update
    function updateLivePrice() {
        let total = item.price;
        const sizeRadio = document.querySelector('input[name="size"]:checked');
        if (sizeRadio) total += item.sizes[parseInt(sizeRadio.value)].price;
        document.querySelectorAll('input[name="addon"]:checked').forEach(cb => {
            total += item.addons[parseInt(cb.value)].price;
        });
        document.getElementById('modalLivePrice').textContent = `ETB ${total}`;
    }

    document.querySelectorAll('input[name="size"]').forEach(r => r.addEventListener('change', updateLivePrice));
    document.querySelectorAll('input[name="addon"]').forEach(c => c.addEventListener('change', updateLivePrice));

    document.getElementById('cancelModal').addEventListener('click', closeModal);
    document.getElementById('addToCartModal').addEventListener('click', () => addFromModal(itemId));
}

function closeModal() {
    itemModal.classList.remove('active');
    modalOverlay.classList.remove('active');
}

// ===== QUICK ADD =====
function quickAdd(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item || !item.available) return;
    cart.push({
        id: Date.now(),
        itemId: item.id,
        name: item.name,
        price: item.price,
        size: item.sizes[0] || null,
        addons: [],
        instructions: '',
        quantity: 1
    });
    updateCartUI();
    showToast(ui('itemAdded', item.name));
}

// ===== ADD FROM MODAL =====
function addFromModal(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    let total = item.price;
    let selectedSize = null;
    const selectedAddons = [];

    const sizeRadio = document.querySelector('input[name="size"]:checked');
    if (sizeRadio && item.sizes.length) {
        selectedSize = item.sizes[parseInt(sizeRadio.value)];
        total += selectedSize.price;
    }

    document.querySelectorAll('input[name="addon"]:checked').forEach(cb => {
        const addon = item.addons[parseInt(cb.value)];
        selectedAddons.push(addon);
        total += addon.price;
    });

    const instructions = document.getElementById('specialInstructions').value.trim();

    cart.push({
        id: Date.now(),
        itemId: item.id,
        name: item.name,
        price: total,
        size: selectedSize,
        addons: selectedAddons,
        instructions,
        quantity: 1
    });

    updateCartUI();
    closeModal();
    showToast(ui('itemAdded', item.name));
}

// ===== CART UI =====
function updateCartUI() {
    const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
    const total     = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    cartCountEl.textContent = itemCount;
    cartTotalEl.textContent = `ETB ${total}`;
    placeOrderBtn.disabled  = cart.length === 0;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<div class="cart-empty">${currentLang === 'am' ? 'ጋሪዎ ባዶ ነው' : 'Your cart is empty<br>ጋሪዎ ባዶ ነው'}</div>`;
        return;
    }

    cartItemsEl.innerHTML = cart.map(cartItemHTML).join('');

    cartItemsEl.querySelectorAll('.qty-minus').forEach(btn =>
        btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), -1))
    );
    cartItemsEl.querySelectorAll('.qty-plus').forEach(btn =>
        btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), 1))
    );
    cartItemsEl.querySelectorAll('.remove-btn').forEach(btn =>
        btn.addEventListener('click', () => removeItem(parseInt(btn.dataset.id)))
    );
}

function cartItemHTML(item) {
    const parts = [];
    if (item.size) parts.push(translateSize(item.size.name));
    item.addons.forEach(a => parts.push(translateAddon(a.name)));
    if (item.instructions) parts.push(`📝 ${item.instructions}`);

    const opts = parts.length
        ? `<div class="cart-item-options">${parts.join(' · ')}</div>` : '';
    const displayName = itemName({ name: item.name });
    const removeLabel = currentLang === 'am' ? 'አስወግድ' : 'Remove';

    return `
        <div class="cart-item">
            <div class="cart-item-header">
                <span class="cart-item-name">${displayName}</span>
                <span class="cart-item-price">ETB ${item.price * item.quantity}</span>
            </div>
            ${opts}
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn qty-plus"  data-id="${item.id}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.id}">${removeLabel}</button>
            </div>
        </div>`;
}

function changeQty(id, delta) {
    console.log('changeQty called:', id, delta);
    const item = cart.find(i => i.id === id);
    console.log('Found item:', item);
    if (!item) {
        console.log('Item not found!');
        return;
    }
    item.quantity += delta;
    console.log('New quantity:', item.quantity);
    if (item.quantity <= 0) removeItem(id);
    else updateCartUI();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
}

// ===== OPEN / CLOSE CART =====
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}
function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// ===== PLACE ORDER =====
function placeOrder() {
    if (cart.length === 0) return;

    // Save to localStorage history
    const record = {
        date: new Date().toLocaleString(),
        items: cart.map(i => ({
            name: i.name,
            size: i.size ? i.size.name : null,
            addons: i.addons.map(a => a.name),
            qty: i.quantity,
            price: i.price
        })),
        total: cart.reduce((s, i) => s + i.price * i.quantity, 0)
    };
    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    history.unshift(record);
    localStorage.setItem('orderHistory', JSON.stringify(history.slice(0, 10)));

    closeCart();
    successModal.classList.add('active');
    cart = [];
    updateCartUI();
}

// ===== HISTORY =====
function openHistory() {
    const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    if (history.length === 0) {
        historyContent.innerHTML = '<div class="cart-empty">No previous orders yet.<br>ምንም ቀደምት ትዕዛዝ የለም።</div>';
    } else {
        historyContent.innerHTML = history.map((order, idx) => `
            <div class="history-item">
                <div class="history-date">📅 ${order.date}</div>
                ${order.items.map(it => {
                    const opts = [it.size, ...it.addons].filter(Boolean).join(', ');
                    return `<div class="history-dish">• ${it.name}${opts ? ' – ' + opts : ''} × ${it.qty}</div>`;
                }).join('')}
                <div class="history-total">Total: ETB ${order.total}</div>
                <button class="btn btn-secondary btn-block reorder-btn" data-idx="${idx}">🔄 Reorder</button>
            </div>`).join('');

        historyContent.querySelectorAll('.reorder-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const order = history[parseInt(btn.dataset.idx)];
                order.items.forEach(it => {
                    const orig = menuData.find(m => m.name === it.name);
                    if (!orig || !orig.available) return;
                    cart.push({
                        id: Date.now() + Math.random(),
                        itemId: orig.id,
                        name: orig.name,
                        price: it.price,
                        size: it.size ? { name: it.size, price: 0 } : null,
                        addons: it.addons.map(n => ({ name: n, price: 0 })),
                        instructions: '',
                        quantity: it.qty
                    });
                });
                updateCartUI();
                closeHistory();
                showToast(currentLang === 'am' ? 'ዕቃዎች ወደ ጋሪ ተጨምረዋል!' : 'Items added to cart!');
            });
        });
    }

    historySidebar.classList.add('active');
    historyOverlay.classList.add('active');
}

function closeHistory() {
    historySidebar.classList.remove('active');
    historyOverlay.classList.remove('active');
}

// ===== CLEAR FILTERS =====
function clearFilters() {
    activeFilters = [];
    searchQuery = '';
    searchInput.value = '';
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');
    renderMenu();
}

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
