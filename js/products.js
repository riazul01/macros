import { products } from "./data.js";

// HEADER
(function() {
    let header = document.querySelector('.header');
    let hero = document.querySelector('.hero');
    let toggleBar = document.querySelector('.toggler');
    let navItems = document.querySelector('.nav-items');
    let searchBtn = document.querySelector('.search-btn');
    let searchBox = document.querySelector('.search-box');
    let body = document.querySelector('body');

    window.onscroll = () => {
        let scrollTop = document.documentElement.scrollTop;

        if (scrollTop > header.offsetHeight) {
            header.classList.add('active-header');
            hero.style.marginTop = header.offsetHeight + 'px';
        } else {
            header.classList.remove('active-header');
            hero.style.marginTop = 0 + 'px';
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



// HERO
(function() {
    let heroImg = document.querySelector('.hero-image');
    let heroDesc = document.querySelector('.hero-desc');

    // update hero image
    const updateHeroImage = (imgIndex) => {
        let imgSrc = ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png'];
        let oldImg = document.querySelector('.hero-image img');
        heroImg.removeChild(oldImg);

        let newImg = document.createElement('img');
        newImg.setAttribute('class', 'animate__animated animate__bounceInDown');
        newImg.src = `../images/hero/${imgSrc[imgIndex]}`;

        heroImg.appendChild(newImg);
    }

    // update hero title
    const updateHeroTitle = (titleIndex) => {
        let txt1 = `The best dried fruits for your family health`;
        let txt2 = `Get your daily needs easy and instant`;
        let txt3 = `Try fresh fruits for better healthy lifestyle`;
        let txt4 = `Get upto 50% discount on every products`;
        let txt5 = `Hot deals available with amazing products`;
        let txt6 = `Fresh vegetables with a big discount`;

        let textAra = [txt1, txt2, txt3, txt4, txt5, txt6];

        let oldText = document.querySelector('.hero-title');
        heroDesc.removeChild(oldText);

        let newTitle = document.createElement('h1');
        newTitle.setAttribute('class', 'animate__animated animate__bounceInRight hero-title');
        newTitle.textContent = `${textAra[titleIndex]}`;

        heroDesc.appendChild(newTitle);
    }

    // update hero button
    const updateHeroButton = () => {
        let oldButton = document.querySelector('.hero-button');
        heroDesc.removeChild(oldButton);

        let newButton = document.createElement('button');
        newButton.textContent = `Explore`;
        newButton.setAttribute('class', 'animate__animated animate__bounceInUp hero-button');

        heroDesc.appendChild(newButton);
    }

    // initial slide position
    let heroIndex = 0;

    // slide right
    const heroSlideRight = () => {
        heroIndex++;

        if (heroIndex === 6) {
            heroIndex = heroIndex % 6;
        }

        updateHeroImage(heroIndex);
        updateHeroTitle(heroIndex);
        updateHeroButton();
    }

    // slide left
    const heroSlideLeft = () => {
        heroIndex--;

        if (heroIndex < 0) {
            heroIndex = 5;
        }

        updateHeroImage(heroIndex);
        updateHeroTitle(heroIndex);
        updateHeroButton();
    }

    let slideTimerId = null;

    // auto slide
    const autoSlideRight = () => {
        slideTimerId = setInterval(() => {
            heroSlideRight();
        }, 10000);
    }

    // slider button
    let heroSlideLeftBtn = document.querySelector('.hero-slide-left');
    let heroSlideRightBtn = document.querySelector('.hero-slide-right');

    heroSlideLeftBtn.onclick = () => {
        clearInterval(slideTimerId);
        heroSlideLeft();
        autoSlideRight();
    }

    heroSlideRightBtn.onclick = () => {
        clearInterval(slideTimerId);
        heroSlideRight();
        autoSlideRight();
    }

    autoSlideRight();
})();



// CALL TO ACTION
(function() {
    const createCallToActionCard = (product) => {
        const cardImage = document.createElement('div');
        cardImage.setAttribute('class', 'cta-card-image');

        const image = document.createElement('img');
        image.src = product.imageUrl;
        image.alt = product.name.split(' ').join('-');

        cardImage.appendChild(image);

        const cardText = document.createElement('div');
        cardText.setAttribute('class', 'cta-card-text');

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = product.name;

        const cardPrice = document.createElement('p');
        cardPrice.textContent = product.price + product.currency + '/' + product.unit;
        
        cardText.appendChild(cardTitle);
        cardText.appendChild(cardPrice);

        const card = document.createElement('div');
        card.setAttribute('class', 'cta-card');

        card.appendChild(cardImage);
        card.appendChild(cardText);

        return card;
    }

    const renderCallToActionCards = () => {
        const cards = document.querySelector('.cta-cards');
        
        const vegetables = products.filter((item) => item.category === 'vegetables');

        for (let i = 0; i < vegetables.length; i ++) {
            const card = createCallToActionCard(vegetables[i]);
            cards.appendChild(card);
        }
    }

    const slideCallToActionCards = () => {
        let callToActionCard = document.querySelectorAll('.cta-card');

        // three cards width including each of their margin right
        let movePer = (callToActionCard[0].offsetWidth + 20) * 3;

        // slide three cards in every 3 seconds
        let newArrival = setInterval(() => {
            if (movePer >= ((callToActionCard[0].offsetWidth + 20) * callToActionCard.length)) {
                movePer = 0;
            }

            for (let i = 0; i < callToActionCard.length; i++) {
                callToActionCard[i].style.transform = `translateX(-${movePer}px)`;
            }

            movePer += (callToActionCard[0].offsetWidth + 20) * 3;

        }, 3000);
    }

    renderCallToActionCards();
    slideCallToActionCards();
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