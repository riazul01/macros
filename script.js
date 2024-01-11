// selecting toggle bar elements
let toggler = document.querySelector('.toggler');

// selecting navbar elements
let navBar = document.querySelector('.nav-box');
let navLeft = document.querySelector('.nav-box ul');
let navRight = document.querySelector('.nav-box div');
let navLeftList = document.querySelectorAll('.nav-left > li');
let navRightList = document.querySelectorAll('.nav-right > ul');

let body = document.querySelector('body');

// remove navbar while click on body
body.addEventListener('click', () => {
    toggler.classList.remove('active');
    navBar.classList.remove('active-nav');

    setTimeout(() => {
        navLeft.classList.remove('active-right');
        navRight.classList.remove('active-right');
    }, 300);
});

// toggle bar
toggler.addEventListener('click', (e) => {
    e.stopPropagation();
    toggler.classList.toggle('active');
    navBar.classList.toggle('active-nav');
    
    setTimeout(() => {
        navLeft.classList.remove('active-right');
        navRight.classList.remove('active-right');
    }, 300);
});

navBar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// go to right navbar
for (let i = 0; i < navLeftList.length; i ++) {
    navLeftList[i].onclick = () => {
        navLeft.classList.add('active-right');
        navRight.classList.add('active-right');

        if (navLeftList[i].getAttribute('data-item') === 'js') {
            let index = null;
            for (let j = 0; j < navRightList.length; j ++) {
                if (navRightList[j].getAttribute('data-list') === 'list-js') {
                    index = j;
                }
                navRightList[j].classList.remove('active-list');
            }
            navRightList[index].classList.add('active-list');
        }

        if (navLeftList[i].getAttribute('data-item') === 'css') {
            let index = null;
            for (let j = 0; j < navRightList.length; j ++) {
                if (navRightList[j].getAttribute('data-list') === 'list-css') {
                    index = j;
                }
                navRightList[j].classList.remove('active-list');
            }
            navRightList[index].classList.add('active-list');
        }
    }
}

// back to left navbar
for (let i = 0; i < navRightList.length; i ++) {
    navRightList[i].children[0].onclick = () => {
        navLeft.classList.remove('active-right');
        navRight.classList.remove('active-right');
    }
}