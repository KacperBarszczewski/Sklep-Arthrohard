const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const mobileMenuContent = document.querySelector('.mobile-menu-content');

hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    } else {
        mobileMenu.classList.add('active');
        hamburger.classList.add('active');
    }
});

mobileMenu.addEventListener('click', (event) => {
    if (!mobileMenuContent.contains(event.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

//Products
const apiUrl = "https://brandstestowy.smallhost.pl/api/random";
const productsContainer = document.querySelector(".products-list");
const selectElement = document.getElementById("product-count");

let pageNumber = 1;
let pageSize = parseInt(selectElement.value);
let isLoading = false;

const popup = document.createElement("div");
popup.classList.add("popup");
popup.style.display = "none";
document.body.appendChild(popup);

popup.addEventListener("click", () => {
    popup.style.display = "none";
});

async function loadProducts() {
    if (isLoading) return;
    isLoading = true;

    try {
        const response = await fetch(`${apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        const data = await response.json();
        const products = data.data || [];

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                    <img src="${product.image}" alt="Produkt ${product.id}" class="product-image"/>
                    <p>${product.text}</p>
                `;

            productDiv.addEventListener("click", () => {
                popup.innerHTML = `<div class='popup-content'>
                        <div style="text-align: end;">
                        <span style="color:red;cursor: pointer;">X</span>
                        </div>
                        <h2>Produkt ID: ${product.id}</h2>
                        <img src="${product.image}" alt="Produkt ${product.id}" style="width: 100%; height: auto;"/>
                        <p>${product.text}</p>
                    </div>`;
                popup.style.display = "flex";
            });

            productsContainer.appendChild(productDiv);
        });
        pageNumber++;
    } catch (error) {
        console.error("Błąd podczas pobierania produktów:", error);
    } finally {
        isLoading = false;
    }
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        loadProducts();
    }
});

selectElement.addEventListener("change", () => {
    pageSize = parseInt(selectElement.value);
    pageNumber = 1;
    productsContainer.innerHTML = "";
    loadProducts();
});

loadProducts();

//Parallax
window.addEventListener("scroll", () => {
    document.querySelectorAll(".parallax-element").forEach(element => {
        let speed = 0.02;
        let yOffset = window.scrollY * speed;
        element.style.transform = `translateY(${yOffset}px)`;
    });
});
