import { products } from "./data.js";

// HEADER
(function() {
    let header = document.querySelector('.header');
    let products = document.querySelector('.products');
    let toggleBar = document.querySelector('.toggler');
    let navItems = document.querySelector('.nav-items');
    let searchBtn = document.querySelector('.search-btn');
    let searchBox = document.querySelector('.search-box');
    let body = document.querySelector('body');

    window.onscroll = () => {
        let scrollTop = document.documentElement.scrollTop;

        if (scrollTop > header.offsetHeight) {
            header.classList.add('active-header');
            products.style.marginTop = header.offsetHeight + 'px';
        } else {
            header.classList.remove('active-header');
            products.style.marginTop = 0 + 'px';
        }
    }

    toggleBar.onclick = (e) => {
        e.stopPropagation();
        toggleBar.classList.toggle('active');
        navItems.classList.toggle('active');
        searchBox.classList.remove('active');
    }

    searchBtn.onclick = (e) => {
        e.stopPropagation();
        searchBox.classList.toggle('active');
        toggleBar.classList.remove('active');
        navItems.classList.remove('active');
    }

    body.addEventListener('click', () => {
        toggleBar.classList.remove('active');
        navItems.classList.remove('active');
        searchBox.classList.remove('active');
    });

    navItems.onclick = (e) => {
        e.stopPropagation();
    }

    searchBox.onclick = (e) => {
        e.stopPropagation();
    }
})();



// PRODUCTS
(function() {
    const handleCardStyles = () => {
        const productCards = document.querySelectorAll('.product-card');
    
        // discount
        const discountTag = document.querySelectorAll('.discount-tag');
        const discountText = document.querySelectorAll('.discount-tag > span');
        
        // price
        const div = document.querySelectorAll('.price-box > div');
        const del = document.querySelectorAll('.price-box > del');
        const ins = document.querySelectorAll('.price-box > ins');
    
        for (let i = 0; i < productCards.length; i ++) {
            if (discountText[i].textContent === '0% off') {
                discountTag[i].style.display = 'none';
                del[i].style.display = 'none';
                ins[i].style.display = 'none';
                div[i].style.display = 'block';
            } else {
                discountTag[i].style.display = 'block';
                del[i].style.display = 'block';
                ins[i].style.display = 'block';
                div[i].style.display = 'none';
            }
        }
    }
    
    const createProductCard = (product) => {
        const productCard = document.createElement('div');
        productCard.setAttribute('class', 'product-card');
    
        const productImageBox = document.createElement('div');
        productImageBox.setAttribute('class', 'product-img');
    
        const productImage = document.createElement('img');
    
        const addToFavoriteBtn = document.createElement('div');
        addToFavoriteBtn.setAttribute('class', 'add-to-favorite');
    
        const hartIcon = document.createElement('span');
        hartIcon.setAttribute('class', 'icon-heart');
    
        const discountTag = document.createElement('div');
        discountTag.setAttribute('class', 'discount-tag');
    
        const discountText = document.createElement('span');
    
        const productDesc = document.createElement('div');
        productDesc.setAttribute('class', 'product-desc');
    
        const productName = document.createElement('p');
        productName.setAttribute('class', 'product-name');
    
        const priceBox = document.createElement('div');
        priceBox.setAttribute('class', 'price-box');
    
        const priceText = document.createElement('strong');
    
        const productPriceBox = document.createElement('div');
        productPriceBox.setAttribute('class', 'product-price');
    
        const productPrice = document.createElement('span');
    
        const prevPriceBox = document.createElement('del');
        prevPriceBox.setAttribute('class', 'prev-price');
    
        const prevPrice = document.createElement('span');
    
        const currPriceBox = document.createElement('ins');
        currPriceBox.setAttribute('class', 'curr-price');
    
        const currPrice = document.createElement('span');
    
        const addToCartBtn = document.createElement('div');
        addToCartBtn.setAttribute('class', 'add-to-cart-btn');
    
        const cartIcon = document.createElement('span');
        cartIcon.setAttribute('class', 'icon-cart-plus');
    
        const cartBtnText = document.createElement('p');
    
        if (product.addedToCart > 0) {
            cartBtnText.innerText = 'Added';
        } else {
            cartBtnText.innerText = 'Add To Cart';
        }
    
        addToCartBtn.appendChild(cartIcon);
        addToCartBtn.appendChild(cartBtnText);
    
        priceText.innerText = 'Price:';
    
        productPrice.innerText = product.price + product.currency + '/' + product.unit;
        productPriceBox.appendChild(productPrice);
    
        prevPrice.innerText = product.price + product.currency + '/' + product.unit;
        prevPriceBox.appendChild(prevPrice);
    
        currPrice.innerText = parseInt(product.price - product.price * (product.discountInPercent / 100)) + product.currency + '/' + product.unit;
        currPriceBox.appendChild(currPrice);
    
        priceBox.appendChild(priceText);
        priceBox.appendChild(productPriceBox);
        priceBox.appendChild(prevPriceBox);
        priceBox.appendChild(currPriceBox);
    
        productName.innerText = product.name;
    
        productDesc.appendChild(productName);
        productDesc.appendChild(priceBox);
        productDesc.appendChild(addToCartBtn);
    
        discountText.innerText = product.discountInPercent + '% off';
        discountTag.appendChild(discountText);
    
        addToFavoriteBtn.appendChild(hartIcon);
    
        if (document.querySelector('#home')) {
            productImage.src = product.imageUrl;
        } else {
            productImage.src = `../${product.imageUrl}`;
        }
    
        productImage.alt = product.catetory;
        productImageBox.appendChild(productImage);
    
        productCard.appendChild(productImageBox);
        productCard.appendChild(addToFavoriteBtn);
        productCard.appendChild(discountTag);
        productCard.appendChild(productDesc);
    
        productCard.setAttribute('data-id', `id${product.id}`);
    
        return productCard;
    }
    
    const renderProductsBySubcategory = () => {
        for (let i = 0; i < products.length; i ++) {
            const productCard = createProductCard(products[i]);
        
            const top = document.querySelector('.top-products');
            const recent = document.querySelector('.recent-products');
            const popular = document.querySelector('.popular-products');
    
            if (products[i].subCategory === 'top') {
                top.appendChild(productCard);
            } else if (products[i].subCategory === 'recent') {
                recent.appendChild(productCard);
            } else if (products[i].subCategory === 'popular') {
                popular.appendChild(productCard);
            }
        }
    
        handleCardStyles();
    }
    
    const renderProductsByCategory = () => {
        for (let i = 0; i < products.length; i ++) {
            const productCard = createProductCard(products[i]);
    
            const vegetables = document.querySelector('.vegetables');
            const fruits = document.querySelector('.fruits');
            const meatAndFish = document.querySelector('.meat-fish');
            const eggs = document.querySelector('.eggs');
            const beverages = document.querySelector('.beverages');
            const spices = document.querySelector('.spices');
            const driedFruits = document.querySelector('.dried-fruits');
    
            if (products[i].category === 'vegetables') {
                vegetables.appendChild(productCard);
            } else if (products[i].category === 'fruits') {
                fruits.appendChild(productCard);
            } else if (products[i].category === 'meat-fish') {
                meatAndFish.appendChild(productCard);
            } else if (products[i].category === 'eggs') {
                eggs.appendChild(productCard);
            } else if (products[i].category === 'beverages') {
                beverages.appendChild(productCard);
            } else if (products[i].category === 'spices') {
                spices.appendChild(productCard);
            } else if (products[i].category === 'dried-fruits') {
                driedFruits.appendChild(productCard);
            }
        }
    
        handleCardStyles();
    }
    
    renderProductsBySubcategory();
    renderProductsByCategory();
})();