/* ============================================================
                       VARIABLES
=============================================================== */
const hamburgerContainer = document.querySelector(".hamburgerMenuContainer");
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const hidingNavBar = document.querySelector(".hidingNavBar ");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const subListOpener = document.querySelectorAll(".navItem");
const subList = document.querySelectorAll(".subItem");
const backdrop = document.querySelector(".backdrop");
const backdropPopup = document.querySelector(".backdropPopup");
let previousScrollPos = window.pageYOffset;

const faders = document.querySelectorAll(".fadeIn");

const wholeBeanSelect = document.querySelector(".wholeBean");
const groundBeanSelect = document.querySelector(".ground");
let wholeBeanSelected = true;

const addToCartButton = document.querySelector(".addCoffeeToCard");
const popUpWindowAddedCoffee = document.querySelector(".coffeeAddedContainer");
const coffeeName = document.querySelector(".coffeeSelectionTitle");
const coffeeNameAddedToPopup = document.querySelector(".coffeeNameAdded");
const priceCoffee = document.querySelector(".beanPrice");
const priceCoffeeAddedToPopup = document.querySelector(".price");
const quantityCoffee = document.querySelector(".cardItemsAdded");
const quantityCoffeeAddedToPopup = document.querySelector(".quantity");
const sizeCoffee = document.querySelector(".weightSelection");
const wholeBeanCoffee = document.querySelector(".wholeBean .beanDescription");
const groundCoffee = document.querySelector(".ground .beanDescription");
const sizeCoffeeAddedToPopup = document.querySelector(".coffeeSizeAdded span");
const typeCoffeeAddedToPopup = document.querySelector(".coffeeTypeAdded span");
const buttonClosePopUpWindow = document.querySelector(".exitContainerSymbol");

/* ============================================================
                       NAVIGATION BAR
=============================================================== */
/* Open/close the navigation bar when clicking on the hamburger menu */
hamburgerMenu.addEventListener("click", () => {
  hamburgerContainer.classList.toggle("openNav");
  body.classList.toggle("noScroll");
  hidingNavBar.classList.toggle("activeMainBar");
  backdrop.classList.toggle("activeMainBar");
});

/* Close the navigation bar when we click on the backdrop */
backdrop.addEventListener("touchstart", closeNavigation);
backdrop.addEventListener("click", closeNavigation);

function closeNavigation() {
  hamburgerContainer.classList.remove("openNav");
  hidingNavBar.classList.remove("activeMainBar");
  backdrop.classList.remove("activeMainBar");
  body.classList.remove("noScroll");
}

/* Open submenu in the navigation bar */
for (let i = 0; i < subListOpener.length; i++) {
  subListOpener[i].addEventListener("click", () => {
    subList[i].classList.toggle("activeSubBar");
  });
}

/* Rotate the main navigation arrow */
for (let j = 0; j < subListOpener.length; j++) {
  subListOpener[j].addEventListener("click", () => {
    subListOpener[j].classList.toggle("rotateArrow");
  });
}

/* Sticky navigation bar */
window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;

  if (previousScrollPos > currentScrollPos || currentScrollPos < 50) {
    header.style.top = "0";
  } else {
    header.style.top = "-150px";
  }
  previousScrollPos = currentScrollPos;
});

/* ============================================================
                       HOME PAGE
=============================================================== */
/* Move the best seller container when the width of the window is bigger then 768px */
$(document).ready(() => {
  if ($(window).width() >= 768) {
    $(".homeBestSellerDescriptionContainer").appendTo(".homeBackgroundImage");
  }

  window.addEventListener("resize", () => {
    if ($(window).width() >= 768) {
      $(".homeBestSellerDescriptionContainer").appendTo(".homeBackgroundImage");
    } else {
      $(".homeBestSellerDescriptionContainer").appendTo(".homePageContainer");
    }
  });
});

/* ============================================================
                     FADE IN ANIMATION
=============================================================== */
/* Fade in animation when scrolling with intersection observer */
const options = {
  root: null,
  threshold: 0.65,
};

const fadeInOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      fadeInOnScroll.unobserve(entry.target);
    }
  });
}, options);

faders.forEach((fader) => {
  fadeInOnScroll.observe(fader);
});

/* ============================================================
                       ANIMATION GSAP
=============================================================== */
let tl = gsap.timeline({ default: { ease: "power2" } });
let tl2 = gsap.timeline({ default: { ease: "power2" } });

// tl.from(".header", { duration: 0.7, opacity: 0, y: -100 });
// tl.from(
//   ".homeBackgroundImage",
//   {
//     duration: 1,
//     opacity: 0,
//   },
//   0.2
// );
// tl.from(".bestSellerPicture", { duration: 0.7, y: -210, opacity: 0 }, "-=0.5");
// // tl.from(
// //   ".homeBestSellerDescriptionContainer",
// //   {
// //     duration: 0.5,
// //     y: 20,
// //     opacity: 0,
// //   },
// //   "-=0.1"
// // );

// tl2.from(
//   ".coffeeSelectionPicture",
//   {
//     duration: 0.6,
//     opacity: 0,
//     y: -100,
//   },
//   "=+0.1"
// );
// tl2.from(
//   ".coffeeSelectionDescriptionContainer",
//   {
//     duration: 0.4,
//     y: 20,
//     opacity: 0,
//   },
//   "+=0.1"
// );

/* ============================================================
                      SELECTION PAGE
=============================================================== */
/* Change style when a bean type is selected */
wholeBeanSelect.addEventListener("click", () => {
  if (!wholeBeanSelected) {
    wholeBeanSelect.style.background = "rgba(240, 240, 240, 1)";
    wholeBeanSelect.style.transition = "background 0.5s";
    groundBeanSelect.style.background = "transparent";
    wholeBeanSelected = true;
  }
});

groundBeanSelect.addEventListener("click", () => {
  if (wholeBeanSelected) {
    groundBeanSelect.style.background = "rgba(240, 240, 240, 1)";
    groundBeanSelect.style.transition = "background 0.5s";
    wholeBeanSelect.style.background = "transparent";
    wholeBeanSelected = false;
  }
});

/* Update the price with the weight selection */
if (sizeCoffee.value === "15 oz") {
  priceCoffee.innerHTML = "$13.00";
} else {
  priceCoffee.innerHTML = "$55.00";
}

sizeCoffee.addEventListener("change", () => {
  if (sizeCoffee.value === "15 oz") {
    priceCoffee.innerHTML = "$13.00";
  } else {
    priceCoffee.innerHTML = "$55.00";
  }
});

/* ============================================================
                       CART POPUP
=============================================================== */
/* Add information to the window popup when item added */
addToCartButton.addEventListener("click", () => {
  if (quantityCoffee.value >= 1) {
    popUpWindowAddedCoffee.style.display = "flex";
    backdropPopup.classList.add("PopupOpen");

    coffeeNameAddedToPopup.innerHTML = coffeeName.innerHTML;
    priceCoffeeAddedToPopup.innerHTML = priceCoffee.innerHTML;
    quantityCoffeeAddedToPopup.innerHTML = quantityCoffee.value;
    sizeCoffeeAddedToPopup.innerHTML = sizeCoffee.value;

    if (wholeBeanSelected === true) {
      typeCoffeeAddedToPopup.innerHTML = wholeBeanCoffee.innerHTML;
    } else {
      typeCoffeeAddedToPopup.innerHTML = groundCoffee.innerHTML;
    }
  } else {
    quantityCoffee.focus();
  }
});

/* Close the popup window when we click on the X */
buttonClosePopUpWindow.addEventListener("click", () => {
  popUpWindowAddedCoffee.style.display = "none";
  backdropPopup.classList.remove("PopupOpen");
});

/* ============================================================
                       
=============================================================== */
const viewProductButton = document.querySelectorAll(".viewProduct");

for (let p = 0; p < viewProductButton.length; p++) {
  viewProductButton[p].addEventListener("click", productSelected);
}

function productSelected() {}
