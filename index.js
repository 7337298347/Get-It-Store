document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; 
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${truncateText(product.title, 50)}</h2>
        `;

        productsContainer.appendChild(productCard);

        productCard.addEventListener('click', () => {
            displayProductDetails(product);
        });
    });
}

function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details-container');
    productDetailsContainer.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <button onclick="showProducts()" class="btn">Back to Products</button>
    `;
    productDetailsContainer.style.display = 'block';
    document.getElementById('products-container').style.display = 'none';
}

function truncateText(text, limit) {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
}

function showProducts() {
    document.getElementById('product-details-container').style.display = 'none';
    document.getElementById('products-container').style.display = 'grid';
    fetchProducts();
}
