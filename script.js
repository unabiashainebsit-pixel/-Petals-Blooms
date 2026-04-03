let cart = [];

function showSection(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
        window.scrollTo(0, 0);
    }
}

function addToCart(name, price, buttonElement) {
    cart.push({ name, price });
    
    updateCartUI();

    const originalText = buttonElement.innerText;
    buttonElement.innerText = "Added!";
    buttonElement.style.backgroundColor = "#2d4a3e";
    buttonElement.style.color = "white";

    setTimeout(() => {
        buttonElement.innerText = originalText;
        buttonElement.style.backgroundColor = "transparent";
        buttonElement.style.color = "#2d4a3e";
        buttonElement.style.border = "1.5px solid #2d4a3e";
    }, 1000);
}

function updateCartUI() {
    const countElement = document.getElementById('count');
    if (countElement) {
        countElement.innerText = cart.length;
    }

    const list = document.getElementById('cart-items-list');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = "<p style='text-align:center; color:#888;'>Your cart is empty.</p>";
    } else {
        let html = "<ul style='list-style:none; padding:0;'>";
        let total = 0;
        
        cart.forEach((item, index) => {
            html += `
                <li style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding:15px 0;">
                    <div>
                        <strong style="display:block;">${item.name}</strong>
                        <span style="color:#666;">$${item.price}.00</span>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#e91e63; cursor:pointer; font-size:0.8rem;">Remove</button>
                </li>`;
            total += item.price;
        });
        
        html += `</ul>`;
        
      
        html += `
            <div style="margin-top:20px; padding-top:20px; border-top:2px solid #2d4a3e; display:flex; justify-content:space-between; align-items:center;">
                <h3 style="font-family:'Playfair Display', serif;">Total:</h3>
                <h3 style="color:#2d4a3e;">$${total}.00</h3>
            </div>
            <button class="btn" onclick="checkout()" style="width:100%; margin-top:20px;">Buy Now</button>`;
        
        list.innerHTML = html;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) return;

    alert("Thank you for your order! Your flowers are being prepared with love. 🌸");

    cart = [];

    updateCartUI();

    showSection('home');
}

window.onload = () => {
    showSection('home');
};

function addReview(event) {
    event.preventDefault(); 

    const nameInput = document.getElementById('reviewer-name');
    const messageInput = document.getElementById('reviewer-message');
    const reviewsContainer = document.getElementById('reviews-container');

    const reviewCard = document.createElement('div');
    reviewCard.style.cssText = "background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); text-align: center; border: 1px solid #f0f0f0;";
    
    reviewCard.innerHTML = `
        <p style="font-style: italic; color: #555; margin-bottom: 20px;">"${messageInput.value}"</p>
        <strong style="color: #2d4a3e; font-family: 'Poppins', sans-serif;">— ${nameInput.value}</strong>
    `;

    reviewsContainer.prepend(reviewCard);

    nameInput.value = '';
    messageInput.value = '';

    alert("Thank you for your beautiful words! 🌸");
}