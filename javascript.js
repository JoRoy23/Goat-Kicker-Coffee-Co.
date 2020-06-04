/* ============================================================
                       NAVIGATION BAR
=============================================================== */
const hamburgerContainer = document.querySelector(".hamburgerMenuContainer");
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const hidingNavBar = document.querySelector(".hidingNavBar ");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const subListOpener = document.querySelectorAll(".navItem");
const subList = document.querySelectorAll(".subItem");
const backdrop = document.querySelector(".backdrop");
let previousScrollPos = window.pageYOffset;

/* When clicking on the hamburger menu */
hamburgerMenu.addEventListener("click", () => {
  hamburgerContainer.classList.toggle("openNav");
  body.classList.toggle("noScroll");
  hidingNavBar.classList.toggle("activeMainBar");
  backdrop.classList.toggle("activeMainBar");
});

window.addEventListener("click", function (event) {
  if (subListOpener.includes(event.target) && event.target !== hamburgerMenu) {
    hamburgerContainer.classList.remove("openNav");
    body.classList.remove("noScroll");
    hidingNavBar.classList.remove("activeMainBar");
  }
});

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
  if (previousScrollPos > currentScrollPos) {
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
const faders = document.querySelectorAll(".fadeIn");

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
              CHANGE COFFEE PRICE WITH THE WEIGHT
=============================================================== */
let coffeePrice = document.querySelector(".coffeePrice");
let coffeeWeightSelection = document.querySelector(".weightSelection");

/* ============================================================
                      SELECTION PAGE
=============================================================== */
const wholeBeanSelect = document.querySelector(".wholeBean");
const groundBeanSelect = document.querySelector(".ground");
let wholeBeanSelected = true;

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

/* ============================================================
                       CART POPUP
=============================================================== */
const addToCartButton = document.querySelector(".addCoffeeToCard");
const popUpWindowAddedCoffee = document.querySelector(".coffeeAddedContainer");
const coffeeName = document.querySelector(".coffeeSelectionTitle");
const coffeeNameAddedToPopup = document.querySelector(".coffeeNameAdded");
const priceCoffeeAdded = document.querySelector(".beanPrice");
const priceCoffeeAddedToPopup = document.querySelector(".price");
const quantityCoffeeAdded = document.querySelector(".cardItemsAdded");
const quantityCoffeeAddedToPopup = document.querySelector(".quantity");
const buttonClosePopUpWindow = document.querySelector(".exitContainerSymbol");

/* Add information to the window popup when item added */
addToCartButton.addEventListener("click", () => {
  popUpWindowAddedCoffee.style.display = "flex";
  backdrop.classList.add("activeMainBar");

  for (let l = 0; l < hidingNavBar.classList.length; l++) {
    if (hidingNavBar.classList[l] === "activeMainBar") {
      hidingNavBar.classList.remove("activeMainBar");
    }
  }
  for (let m = 0; m < hamburgerMenu.classList.length; m++) {
    if (hamburgerMenu.classList[m] === "openNav") {
      hamburgerMenu.classList.remove("openNav");
      openNav = false;
    }
  }
  coffeeNameAddedToPopup.innerHTML = coffeeName.innerHTML;
  priceCoffeeAddedToPopup.innerHTML = priceCoffeeAdded.innerHTML;
  quantityCoffeeAddedToPopup.innerHTML = quantityCoffeeAdded.value;
});

/* Close the popup window when we click on the X */
buttonClosePopUpWindow.addEventListener("click", () => {
  popUpWindowAddedCoffee.style.display = "none";
  backdrop.classList.remove("activeMainBar");
});
