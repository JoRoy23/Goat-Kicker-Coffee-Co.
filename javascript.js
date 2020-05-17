/* ============================================================
                     FADE IN ANIMATION
=============================================================== */
/* Fade in animation when scrolling with intersection observer */
const faders = document.querySelectorAll(".fadeIn");

const options = {
  root: null,
  threshold: 0.55,
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
                OPEN HOME PAGE ANIMATION GSAP
=============================================================== */
let tl = gsap.timeline({ default: { ease: "power2" } });
tl.from(".header", { duration: 0.7, opacity: 0, y: -100 });
tl.from(
  ".homeBackgroundImage",
  {
    duration: 0.6,
    opacity: 0,
  },
  0.2
);
tl.from(".bestSellerPicture", { duration: 0.7, y: -210, opacity: 0 });
tl.from(
  ".homeBestSellerDescriptionContainer",
  {
    duration: 0.5,
    y: 30,
    opacity: 0,
  },
  "+=0.1"
);

/* ============================================================
                BEST SELLER PAGE ANIMATION GSAP
=============================================================== */
let tl2 = gsap.timeline({ default: { ease: "power2" } });
tl2.from(
  ".coffeePicture",
  {
    duration: 0.6,
    opacity: 0,
    y: -100,
  },
  "=+0.1"
);
tl2.from(
  ".coffeeDescriptionContainer",
  {
    duration: 0.4,
    y: 20,
    opacity: 0,
  },
  "+=0.1"
);

/* ============================================================
                       ANIMATION GSAP
=============================================================== */
/* Menu animation with GSAP */
const menuSections = document.querySelectorAll(".menuPrincipalSection");

let tl3 = gsap.timeline({ default: { ease: "power2" } });

tl3.from(
  ".menuTitle",
  {
    duration: 0.6,
    opacity: 0,
    y: 30,
  },
  "0.6"
);
tl3.from(
  ".menuContainer",
  {
    duration: 0.6,
    opacity: 0,
    y: 30,
  },
  "-=0.4"
);
for (let i = 0; i < menuSections.length; i++) {
  tl3.from(
    menuSections[i],
    {
      duration: 0.6,
      opacity: 0,
      y: 20,
    },
    "-=0.4"
  );
}

/* Location animation with GSAP */
const shopContainer = document.querySelectorAll(".shopLocationContainer");

let tl4 = gsap.timeline({ default: { ease: "power2" } });

tl4.from(".locationTitle", { duration: 0.6, opacity: 0, y: 30 }, "0.6");
tl4.from(".locationDescription", { duration: 0.6, opacity: 0, y: 20 }, "-=0.4");
tl4.from(
  ".shopLocationContainer",
  { duration: 0.7, opacity: 0, y: 20 },
  "-=0.4"
);

/* Contact animation with GSAP */
let tl5 = gsap.timeline({ default: { ease: "power2" } });

tl5.from(".contactTitle", { duration: 0.6, opacity: 0, y: 30 }, "0.6");
tl5.from(".contactInformation", { duration: 0.6, opacity: 0, y: 20 }, "-=0.4");
tl5.from(".contactQuestions", { duration: 0.5, opacity: 0, y: 20 }, "-=0.4");
tl5.from(".contactSection", { duration: 0.5, opacity: 0, y: 30 }, "-=0.3");
tl5.from(".contactSendButton", { duration: 0.5, opacity: 0, y: 15 }, "-=0.2");

/* ============================================================
                    HAMBURGER ANIMATION
=============================================================== */
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const body = document.querySelector("body");

/* When clicking on the hamburger menu */
hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("openNav");
  body.classList.toggle("noScroll");
});

/* When clicking outside the navigation bar when it's open */
window.addEventListener("click", (event) => {
  if (event.target !== hidingNavBar && event.target !== hamburgerMenu) {
    hamburgerMenu.classList.remove("openNav");
    body.classList.remove("noScroll");
    hidingNavBar.classList.remove("activeMainBar");
  }
});

/* ============================================================
                    OPEN MAIN NAVIGATION
=============================================================== */
const hidingNavBar = document.querySelector(".navBarList");

hamburgerMenu.addEventListener("click", () => {
  hidingNavBar.classList.toggle("activeMainBar");
});

/* ============================================================
                    OPEN SECONDARY NAVIGATION
=============================================================== */
const subListOpener = document.querySelectorAll(".navItem");
const subList = document.querySelectorAll(".subItem");

for (let i = 0; i < subListOpener.length; i++) {
  subListOpener[i].addEventListener("click", () => {
    subList[i].classList.toggle("activeSubBar");
  });
}

/* ============================================================
                   ROTATE MAIN NAVIGATION ARROW 
=============================================================== */
for (let j = 0; j < subListOpener.length; j++) {
  subListOpener[j].addEventListener("click", () => {
    subListOpener[j].classList.toggle("rotateArrow");
  });
}

/* ============================================================
                    STICKY NAVIGATION
=============================================================== */
let previousScrollPos = window.pageYOffset;

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;
  if (previousScrollPos > currentScrollPos) {
    document.querySelector(".header").style.top = "0";
  } else {
    document.querySelector(".header").style.top = "-1000px";
  }
  previousScrollPos = currentScrollPos;
});

/* ============================================================
              CHANGE COFFEE PRICE WHIT THE WEIGHT
=============================================================== */
let coffeePrice = document.querySelector(".coffeePrice");
let coffeeWeightSelection = document.querySelector(".weightSelection");

/* ============================================================
          CHANGE BEAN BACKGROUND WITH SELECTION
=============================================================== */
const wholeBeanSelect = document.querySelector(".wholeBean");
const groundBeanSelect = document.querySelector(".ground");
let wholeBeanSelected = true;

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
                COFFEE ADDED TO CART POPUP
=============================================================== */
const addToCartButton = document.querySelector(".addCoffeeToCard");
const popUpWindowAddedCoffee = document.querySelector(".coffeeAddedContainer");
const coffeeName = document.querySelector(".coffeeTitle");
const coffeeNameAddedToPopup = document.querySelector(".coffeeNameAdded");
const priceCoffeeAdded = document.querySelector(".beanPrice");
const priceCoffeeAddedToPopup = document.querySelector(".price");
const quantityCoffeeAdded = document.querySelector(".cardItemsAdded");
const quantityCoffeeAddedToPopup = document.querySelector(".quantity");

addToCartButton.addEventListener("click", () => {
  popUpWindowAddedCoffee.style.display = "flex";
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

/* ============================================================
                     CLOSE CART POPUP
=============================================================== */
const buttonClosePopUpWindow = document.querySelector(".exitContainerSymbol");

buttonClosePopUpWindow.addEventListener("click", () => {
  popUpWindowAddedCoffee.style.display = "none";
});
