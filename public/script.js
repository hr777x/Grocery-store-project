document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // Fetch products from the API
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            console.log('Fetched products:', products); // Debug: Log the fetched data

            // Populate the product list
            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = `${product.name} - $${product.price}`;
                productList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
        console.log('Fetched data:', products);

});
