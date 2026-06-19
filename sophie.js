// DONNÉES PRODUITS PAR DÉFAUT
let defaultProducts = [
    { id: 1, name: "Musc Tahara", price: 1250, category: "parfum", image: "https://i.postimg.cc/LmN0J5GS/Tahara.jpg", desc: "Parfum intime très concentrée et sans alcool., tient 8h." },
    { id: 2, name: "Baisé Sucré", price: 1500, category: "parfum", image: "https://i.postimg.cc/yYfrXGxr/Baise-sucre.jpg", desc: "Une fragrance gourmande et envoûtante qui mêle douceur, élégance et sensualité." },
    { id: 3, name: "Collection Mushk Tahara", price:10500, category: "parfum", image: "https://i.postimg.cc/3KhYTzFm/Collection-Mushk.jpg", desc: "Collection de parfums exclusifs pour sentir bon toute une journée." },
    { id: 4, name: "Collection d'huile", price:7000, category: "parfum", image: "https://i.postimg.cc/g0KGCHTQ/Collection-d-huile.jpg", desc: "Collection d'huiles parfumées pour un soin intensif." },
    { id: 5, name: "So Scandale", price: 3500, category: "parfum", image: "https://i.postimg.cc/MGxSg40W/So-scandale.jpg", desc: "Parfum audacieux et captivant." },
    { id: 6, name: "Supreme", price: 3500, category: "parfum", image: "https://i.postimg.cc/SKNyJ3Xh/Supreme.jpg", desc: "L'alliance parfaite entre sophistication, sensualité et prestige." },
    { id: 7, name: "Huile Tahara", price: 3000, category: "parfum", image: "https://i.postimg.cc/XqMHDpBd/Musc-Tahara.jpg", desc: "Parfum intime très concentrée et sans alcool., tient 8h." },
    { id: 8, name: "Audace Élegante", price: 4000, category: "parfum", image: "https://i.postimg.cc/9FmtXd2G/Audace-elegante.jpg", desc: "Une fragrance audacieuse et élégante." },
    { id: 9, name: "Chaba", price: 1100, category: "parfum", image: "https://i.postimg.cc/3xHhDxLp/Chaba.jpg", desc: "Un parfum doux et envoûtant." },
    { id: 10, name: "Nila Bleu", price: 2500, category: "hygiene", image: "https://i.postimg.cc/DyXRq6Tr/Nila-Bleu.jpg", desc: "Un savon anti-taches et doux." },
    { id: 11, name: "Hamam", price: 2500, category: "hygiene", image: "https://i.postimg.cc/y8rftSBw/Savons.jpg", desc: "Un savon doux et efficace. Pouvoir nettoyant et hydratant." },
    { id: 12, name: "Collection de parfums", price: 4500, category: "parfum", image: "https://i.postimg.cc/YhDBSdK3/Collection-de-brune.jpg", desc: "Collection de parfums exclusifs par unité." },
    { id: 13, name: "Myrvane", price:7500 , category: "parfum", image: "https://i.postimg.cc/tT2W4PYS/Myrvane.jpg", desc: "Parfum exotique et envoûtant." },
    { id: 14, name: "Sophia Collection", price: 12000, category: "parfum", image: "https://i.postimg.cc/L6zfJrYM/Sophia-collection.jpg", desc: "Collection exclusive de parfums pour un parfum inoubliable." },
     { id: 15, name: "Henne", price: 3000, category: "Soins", image: "https://i.postimg.cc/j2Txmkx0/Henne.jpg", desc: "Embellissement des pieds et des mains avec une texture belle et originale." }


];

// Storage
function loadProducts() {
    let p = localStorage.getItem("beauty_products");
    if(!p) {
        localStorage.setItem("beauty_products", JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(p);
}
function saveProducts(products) {
    localStorage.setItem("beauty_products", JSON.stringify(products));
}
function getProductsFromStorage() { return loadProducts(); }

// Cart
function getCart() {
    let cart = localStorage.getItem("beauty_cart");
    return cart ? JSON.parse(cart) : [];
}
function saveCart(cart) { localStorage.setItem("beauty_cart", JSON.stringify(cart)); updateCartBadge(); }
function addToCart(productId, quantity) {
    let cart = getCart();
    let idx = cart.findIndex(i => i.id === productId);
    if(idx !== -1) cart[idx].quantity += quantity;
    else cart.push({ id: productId, quantity: quantity });
    saveCart(cart);
}
function updateCartBadge() {
    let cart = getCart();
    let total = cart.reduce((s,i)=> s+i.quantity,0);
    document.querySelectorAll('#cart-count').forEach(el => el.innerText = total);
}
function removeCartItem(productId) {
    let cart = getCart().filter(i => i.id !== productId);
    saveCart(cart);
}
function updateQuantity(productId, newQty) {
    let cart = getCart();
    let item = cart.find(i => i.id === productId);
    if(item && newQty > 0) item.quantity = newQty;
    else if(newQty <= 0) cart = cart.filter(i => i.id !== productId);
    saveCart(cart);
}
function getProductDetails(id) { return loadProducts().find(p => p.id === id); }

// CHATBOT IA
function initChatbotEvents() {
    const toggle = document.getElementById('chatbotToggle');
    const widget = document.getElementById('chatbot-widget');
    const closeBtn = document.getElementById('closeChatBtn');
    const sendBtn = document.getElementById('sendChatBtn');
    const input = document.getElementById('chatInput');
    const messagesDiv = document.getElementById('chatMessages');
    if(toggle) toggle.onclick = () => widget.classList.toggle('open');
    if(closeBtn) closeBtn.onclick = () => widget.classList.remove('open');
    function addMessage(text, isUser) {
        let msgDiv = document.createElement('div');
        msgDiv.className = isUser ? 'user-msg' : 'bot-msg';
        msgDiv.innerText = text;
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    // function botReply(userMsg) {
    //     let msg = userMsg.toLowerCase();
    //     if(msg.includes('parfum') || msg.includes('recommande')) return "🌸 Je te conseille un parfum aux notes vanillées pour une touche gourmande, ou floral pour la journée. Selon ta peau, applique sur les poignets et derrière les oreilles ✨";
    //     if(msg.includes('soins') || msg.includes('sentir bon')) return "💧 Astuces : douche quotidienne, déodorant naturel, bien sécher la peau, et utiliser une eau de Cologne légère après la douche.";
    //     if(msg.includes('routine')) return "🌞 Matin : nettoyage doux + crème hydratante + parfum sur les points de pulsation. Soir : démaquillage, masque une fois par semaine.";
    //     if(msg.includes('conseil')) return "✨ Hydrate ta peau avant d'appliquer ton parfum, il tiendra plus longtemps !";
    //     return "💜 Je suis Smart Beauty ! Je peux te parler de parfums, soins, routines beauté. Essaie : 'parfum', 'routine', 'conseil soins' ou 'recommande-moi un produit'. Et pour plus d'informations, n'hésite pas à nous contacter !";
    // }
    function botReply(userMsg) {

    let msg = userMsg.toLowerCase();

    let products = getProductsFromStorage();

    // =========================
    // SALUTATIONS
    // =========================

    if (/bonjour|salut|hello|cc|coucou/i.test(msg)) {
        return "👋 Bonjour beauté ! Besoin d'un parfum ou d'un conseil soin ? ✨";
    }

    // =========================
    // PARFUM GOURMAND
    // =========================

    if (
        msg.includes('gourmand') ||
        msg.includes('sucré') ||
        msg.includes('vanille')
    ) {

        let product = products.find(p =>
            p.name.toLowerCase().includes('baisé')
        );

        if(product) {
            return `🍬 Je te conseille ${product.name} à ${product.price} FCFA 💖\n${product.desc}`;
        }
    }

    // =========================
    // PARFUM DOUX
    // =========================

    if (
        msg.includes('doux') ||
        msg.includes('léger') ||
        msg.includes('floral')
    ) {

        let product = products.find(p =>
            p.name.toLowerCase().includes('chaba')
        );

        if(product) {
            return `🌸 ${product.name} est parfait pour une odeur douce et élégante ✨ (${product.price} FCFA)`;
        }
    }

    // =========================
    // PARFUM INTENSE
    // =========================

    if (
        msg.includes('fort') ||
        msg.includes('intense') ||
        msg.includes('soir')
    ) {

        let product = products.find(p =>
            p.name.toLowerCase().includes('supreme')
        );

        if(product) {
            return `🔥 ${product.name} est idéal pour une présence élégante et intense ✨`;
        }
    }

    // =========================
    // HYGIÈNE / SOINS
    // =========================

    if (
        msg.includes('tache') ||
        msg.includes('savon') ||
        msg.includes('peau')
    ) {

        let product = products.find(p =>
            p.name.toLowerCase().includes('nila')
        );

        if(product) {
            return `🧼 Je te recommande ${product.name} (${product.price} FCFA).\n${product.desc}`;
        }
    }

    // =========================
    // PRODUIT LE MOINS CHER
    // =========================

    if (
        msg.includes('moins cher') ||
        msg.includes('pas cher') ||
        msg.includes('petit prix')
    ) {

        let cheapest = [...products].sort((a,b)=>a.price-b.price)[0];

        return `💰 Le produit le moins cher est ${cheapest.name} à ${cheapest.price} FCFA ✨`;
    }

    // =========================
    // TOUS LES PARFUMS
    // =========================

    if (
        msg.includes('liste parfum') ||
        msg.includes('vos parfums') ||
        msg.includes('parfums disponibles')
    ) {

        let parfums = products
            .filter(p => p.category === 'parfum')
            .map(p => `• ${p.name} - ${p.price} FCFA`)
            .join('\n');

        return `🌸 Voici nos parfums disponibles :\n\n${parfums}`;
    }

    // =========================
    // REMERCIEMENTS
    // =========================

    if (/merci|thanks/i.test(msg)) {
        return "💜 Avec plaisir beauté ✨";
    }

    // =========================
    // PAR DÉFAUT
    // =========================

    return `
💜 Je suis Smart Beauty ✨

Je peux t'aider avec :
• les parfums 🌸
• les soins 🧴
• les produits pas chers 💰
• les conseils beauté 💖

Exemples :
- parfum gourmand
- parfum doux
- savon anti tache
- vos parfums
- produit moins cher
    `;
}
    if(sendBtn) sendBtn.onclick = () => {
        let text = input.value.trim();
        if(!text) return;
        addMessage(text, true);
        let reply = botReply(text);
        setTimeout(() => addMessage(reply, false), 500);
        input.value = '';
    };
    if(input) input.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendBtn.click(); });
}
// Fonctions export globales
window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;
window.getCart = getCart;
window.getProductsFromStorage = getProductsFromStorage;
window.removeCartItem = removeCartItem;
window.updateQuantity = updateQuantity;
window.getProductDetails = getProductDetails;
window.saveProducts = saveProducts;

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    initChatbotEvents();
});