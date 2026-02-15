let cartCount = 0;

let products = [
    {
        name: "Stylish Shirt",
        price: 799,
        category: "shirt",
        image: "https://via.placeholder.com/250"
    },
    {
        name: "Running Shoes",
        price: 1499,
        category: "shoe",
        image: "https://via.placeholder.com/250"
    },
    {
        name: "Smart Watch",
        price: 1999,
        category: "watch",
        image: "https://via.placeholder.com/250"
    },
    {
        name: "Casual Shirt",
        price: 699,
        category: "shirt",
        image: "https://via.placeholder.com/250"
    }
];

function displayProducts(productArray) {
    let productList = document.getElementById("product-list");
    productList.innerHTML = "";

    productArray.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <img src="${product.image}">
                <h3>${product.name}</h3>
                <p>₹ ${product.price}</p>
                <button onclick="addToCart()">Add to Cart</button>
            </div>
        `;
    });
}

function addToCart() {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
}

function filterProduct(category) {
    if (category === "all") {
        displayProducts(products);
    } else {
        let filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

document.getElementById("search").addEventListener("keyup", function() {
    let value = this.value.toLowerCase();
    let filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});

displayProducts(products);

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product Added to Cart!");
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-container");
    let total = 0;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById("total-price").innerText = "";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        container.innerHTML += `
            <div>
                <p>${item.name} - ₹${item.price}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
            <hr>
        `;
    });

    document.getElementById("total-price").innerText = "Total: ₹" + total;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}