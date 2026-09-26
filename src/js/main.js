const API_URL = 'https://wdd330-backend.onrender.com/products/search/tents';

let products = [];

const searchInput = document.getElementById('search-input');
const productGrid = document.getElementById('product-grid');
const noResults = document.getElementById('no-results');
const newsletterForm = document.getElementById('newsletter-form');

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    products = data.Result || data;
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    if (productGrid) {
      productGrid.innerHTML = '<p class="no-results">Failed to load products from API.</p>';
    }
  }
}

function renderProducts(productList) {
  if (!productGrid) return;

  productGrid.innerHTML = '';

  if (productList.length === 0) {
    if (noResults) noResults.style.display = 'block';
    return;
  }

  if (noResults) noResults.style.display = 'none';

  productList.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const name = product.Name || product.NameWithoutBrand || 'Product';
    const category = product.Category || 'Tents';
    const price = product.ListPrice ? `$${product.ListPrice.toFixed(2)}` : 'N/A';
    const image = product.Image || product.Images?.PrimaryMedium || '';

    card.innerHTML = `
      ${image ? `<img src="${image}" alt="${name}">` : ''}
      <h4>${name}</h4>
      <p class="category">Category: ${category}</p>
      <p class="price">${price}</p>
    `;

    productGrid.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    const filteredProducts = products.filter((product) => {
      const name = (product.Name || '').toLowerCase();
      const brand = (product.Brand?.Name || '').toLowerCase();
      return name.includes(searchTerm) || brand.includes(searchTerm);
    });

    renderProducts(filteredProducts);
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value) {
      alert(`Thank you for subscribing with: ${emailInput.value}`);
      newsletterForm.reset();
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchProducts);