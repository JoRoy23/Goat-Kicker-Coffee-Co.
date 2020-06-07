/* ============================================================
                       NAVIGATION BAR
=============================================================== */
const hamburgerContainer = document.querySelector(".hamburgerMenuContainer");
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const hidingNavBar = document.querySelector(".hidingNavBar ");
const body = document.querySelector("body");
const backdrop = document.querySelector(".backdrop");

/* Open/close the navigation bar when clicking on the hamburger menu */
hamburgerMenu.addEventListener("click", () => {
  hamburgerContainer.classList.toggle("openNav");
  body.classList.toggle("noScroll");
  hidingNavBar.classList.toggle("activeMainBar");
  backdrop.classList.toggle("activeMainBar");
});

backdrop.addEventListener("touchstart", closeNavigation);
backdrop.addEventListener("click", closeNavigation);

/* Close the navigation bar when we click on the backdrop */
function closeNavigation() {
  hamburgerContainer.classList.remove("openNav");
  hidingNavBar.classList.remove("activeMainBar");
  backdrop.classList.remove("activeMainBar");
  body.classList.remove("noScroll");
}

const subListOpener = document.querySelectorAll(".navItem");
const subList = document.querySelectorAll(".subItem");

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

let previousScrollPos = window.pageYOffset;
const header = document.querySelector(".header");

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

/* When we load any page we still want to see the number of items we have in the cart shown on the header */
(function () {
  let productsNumber = localStorage.getItem("cartNumber");
  if (productsNumber) {
    document.querySelector(".itemsCounterIcon").innerText = productsNumber;
  }
})();

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
                         HOME PAGE
=============================================================== */
if (window.location.href.indexOf("index") > -1) {
  /* Move the best seller container when the width of the window is bigger then 768px */
  $(document).ready(() => {
    if ($(window).width() >= 768) {
      $(".homeBestSellerDescriptionContainer").appendTo(".homeBackgroundImage");
    }

    window.addEventListener("resize", () => {
      if ($(window).width() >= 768) {
        $(".homeBestSellerDescriptionContainer").appendTo(
          ".homeBackgroundImage"
        );
      } else {
        $(".homeBestSellerDescriptionContainer").appendTo(".homePageContainer");
      }
    });
  });

  /* Change informations in the selection page when we click on the coffee picture or the view button */
  const viewProductButton = document.querySelectorAll(".viewProduct");
  const viewCoffeeButton = document.querySelector(".viewCoffeeButton");
  const featuredPhotoLink = document.querySelectorAll(".featuredPhotoLink");

  viewCoffeeButton.addEventListener("click", updateSelectionInformation);

  for (let i = 0; i < viewProductButton.length; i++) {
    viewProductButton[i].addEventListener("click", updateSelectionInformation);
  }
  for (let i = 0; i < featuredPhotoLink.length; i++) {
    featuredPhotoLink[i].addEventListener("click", updateSelectionInformation);
  }

  function updateSelectionInformation(event) {
    if (event.target.classList.contains("viewProduct")) {
      let selectionInformations = {
        name:
          event.target.previousElementSibling.previousElementSibling.innerText,
        image:
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling.firstElementChild.src,
      };
      localStorage.setItem(
        "selectedCoffee",
        JSON.stringify(selectionInformations)
      );
    } else if (event.target.classList.contains("viewCoffeeButton")) {
      let homeBackgroundImage =
        event.target.parentElement.previousElementSibling;
      let selectionInformations = {
        name:
          event.target.previousElementSibling.previousElementSibling.innerText,
        image: homeBackgroundImage.querySelector(".homeBestSellerContainer img")
          .src,
      };
      localStorage.setItem(
        "selectedCoffee",
        JSON.stringify(selectionInformations)
      );
    } else {
      let selectionInformations = {
        name: event.target.parentElement.nextElementSibling.innerText,
        image: event.target.src,
      };
      localStorage.setItem(
        "selectedCoffee",
        JSON.stringify(selectionInformations)
      );
    }
  }
}

/* ============================================================
                      SELECTION PAGE
=============================================================== */
if (window.location.href.indexOf("selection") > -1) {
  /* Change the information in the selection page when we select a coffee in the coffee page */
  let selectionInformations = localStorage.getItem("selectedCoffee");
  selectionInformations = JSON.parse(selectionInformations);
  let coffeeSelectionBackgroundPicture = document.querySelector(
    ".coffeeSelectionPictureContainer img"
  );
  let coffeeName = document.querySelector(".coffeeSelectionTitle");

  coffeeName.innerHTML = selectionInformations.name;
  coffeeSelectionBackgroundPicture.src = selectionInformations.image;

  /* Change the style when a bean type is selected */
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

  /* Update the price with the weight selection */
  let sizeCoffee = document.querySelector(".weightSelection");
  let priceCoffee = document.querySelector(".beanPrice");

  if (sizeCoffee.value === "15 oz") {
    priceCoffee.innerText = "$13.00";
  } else {
    priceCoffee.innerText = "$55.00";
  }

  sizeCoffee.addEventListener("change", () => {
    if (sizeCoffee.value === "15 oz") {
      priceCoffee.innerText = "$13.00";
    } else {
      priceCoffee.innerText = "$55.00";
    }
  });

  const addToCartButton = document.querySelector(".addCoffeeToCard");
  const popUpWindowAddedCoffee = document.querySelector(
    ".coffeeAddedContainer"
  );
  let quantityCoffee = document.querySelector(".cardItemsAdded");
  let popupImage = document.querySelector(".popupImage img");
  let coffeeNameAddedToPopup = document.querySelector(".coffeeNameAdded");
  let priceCoffeeAddedToPopup = document.querySelector(".price");
  let quantityCoffeeAddedToPopup = document.querySelector(".quantity");
  let sizeCoffeeAddedToPopup = document.querySelector(".coffeeSizeAdded span");
  let typeCoffeeAddedToPopup = document.querySelector(".coffeeTypeAdded span");
  const backdropPopup = document.querySelector(".backdropPopup");

  /* Add information to the window popup when item added */
  addToCartButton.addEventListener("click", () => {
    if (isNaN(quantityCoffee.value) || quantityCoffee.value <= 0) {
      quantityCoffee.focus();
      quantityCoffee.value = 1;
    } else {
      popUpWindowAddedCoffee.style.display = "flex";
      backdropPopup.classList.add("PopupOpen");

      popupImage.src = coffeeSelectionBackgroundPicture.src;
      coffeeNameAddedToPopup.innerText = coffeeName.innerText;
      priceCoffeeAddedToPopup.innerText = priceCoffee.innerText;
      quantityCoffeeAddedToPopup.innerText = quantityCoffee.value;
      sizeCoffeeAddedToPopup.innerText = sizeCoffee.value;

      if (wholeBeanSelected === true) {
        typeCoffeeAddedToPopup.innerText = "Whole Bean";
      } else {
        typeCoffeeAddedToPopup.innerText = "Ground";
      }
    }
  });

  /* Retrieve the subtotal price in the html cart to insert it in the popup window */
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "cart.html", true);

  xhr.onload = function () {
    if (this.status === 200) {
      let cartItemsSubtotal = document.querySelector(".cartItemsSubtotal");
      let popupItemsSubtotal = document.querySelector(".cartSubtotal span");
      popupItemsSubtotal.innerText = cartItemsSubtotal.innerText;
    }
  };

  /* Close the popup window when we click on the exit symbol */
  const buttonClosePopUpWindow = document.querySelector(".exitContainerSymbol");

  buttonClosePopUpWindow.addEventListener("click", () => {
    popUpWindowAddedCoffee.style.display = "none";
    backdropPopup.classList.remove("PopupOpen");
  });

  /* When we click on the add cart item button */
  const AddCartItemButtons = document.querySelector(".addCoffeeToCard");

  AddCartItemButtons.addEventListener("click", addToCartClicked);

  function addToCartClicked() {
    let productsNumber = localStorage.getItem("cartNumber");
    productsNumber = parseInt(productsNumber);

    /* Show the updated number of items in the cart when we add items */
    if (productsNumber) {
      localStorage.setItem(
        "cartNumber",
        productsNumber + parseInt(quantityCoffee.value)
      );
      document.querySelector(".itemsCounterIcon").innerText =
        productsNumber + parseInt(quantityCoffee.value);
    } else {
      localStorage.setItem("cartNumber", parseInt(quantityCoffee.value));
      document.querySelector(".itemsCounterIcon").innerText = parseInt(
        quantityCoffee.value
      );
    }

    // let productBeanType = document.querySelector("");
    let itemImage = document.querySelector(
      ".coffeeSelectionPictureContainer img"
    );

    /* If an item is already in the cart we want to update only the quantity when added */
    // let itemInformationAdded = {
    //   name: coffeeName.innerText,
    //   size: sizeCoffee.value,
    //   price: priceCoffee.innerText,
    //   image: itemImage.src,
    //   quantity: parseInt(quantityCoffee.value),
    // };
    // console.log(itemInformationAdded);

    let itemInformationsInCart = localStorage.getItem("productsInCart");
    itemInformationsInCart = JSON.parse(itemInformationsInCart);

    if (itemInformationsInCart !== null) {
      itemInformationsInCart.quantity += parseInt(quantityCoffee.value);
    } else {
      itemInformationsInCart = {
        name: coffeeName.innerText,
        size: sizeCoffee.value,
        price: priceCoffee.innerText,
        image: itemImage.src,
        quantity: parseInt(quantityCoffee.value),
      };
    }

    localStorage.setItem(
      "productsInCart",
      JSON.stringify(itemInformationsInCart)
    );
  }
}

/* ============================================================
                        COFFEE PAGE  
=============================================================== */
if (window.location.href.indexOf("coffee") > -1) {
  /* Change informations in the selection page when we click on the coffee picture or the view button */
  const viewProductButton = document.querySelectorAll(".viewProduct");
  const coffeePagePhotoLink = document.querySelectorAll(".coffeePagePhotoLink");

  for (let i = 0; i < viewProductButton.length; i++) {
    viewProductButton[i].addEventListener("click", updateSelectionInformation);
  }
  for (let i = 0; i < coffeePagePhotoLink.length; i++) {
    coffeePagePhotoLink[i].addEventListener(
      "click",
      updateSelectionInformation
    );
  }

  function updateSelectionInformation(event) {
    if (event.target.classList.contains("viewProduct")) {
      let selectionInformations = {
        name:
          event.target.previousElementSibling.previousElementSibling.innerText,
        image:
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling.firstElementChild.src,
      };
      localStorage.setItem(
        "selectedCoffee",
        JSON.stringify(selectionInformations)
      );
    } else {
      let selectionInformations = {
        name: event.target.parentElement.nextElementSibling.innerText,
        image: event.target.src,
      };
      localStorage.setItem(
        "selectedCoffee",
        JSON.stringify(selectionInformations)
      );
    }
  }
}

/* ============================================================
                        CART PAGE  
=============================================================== */
if (window.location.href.indexOf("cart") > -1) {
  let itemInformationsInCart = localStorage.getItem("productsInCart");
  itemInformationsInCart = JSON.parse(itemInformationsInCart);
  let createCartRow = document.createElement("div");
  let cartRowContent = `
      <div class="cartItemPhotoContainer">
        <div class="removeCartItem"><i class="fa fa-times" aria-hidden="true"></i></div>
        <img src="${itemInformationsInCart.image}" alt="coffee added" />
      </div>
      <div class="cartItemProductContainer">
        <h3 class="cartProductName">${itemInformationsInCart.name}</h3>
        <p class="cartProductType">Bean Type: <span>Ground</span></p>
        <p class="cartProductSize">Size: <span>${itemInformationsInCart.size}</span></p>
      </div>
      <div class="cartItemQuantityContainer">
        <p>Quantity:</p>
        <input type="number" min="1" class="cartItemQuantity" value="${itemInformationsInCart.quantity}"/>
      </div>
      <div class="cartItemPriceContainer">
        <p>Price:</p>
        <span class="cartItemPrice">${itemInformationsInCart.price}</span>
      </div>`;
  createCartRow.innerHTML = cartRowContent;
  createCartRow.classList.add("cartItem");
  document.querySelector(".cartItems").append(createCartRow);

  const removeCartItemButtons = document.querySelectorAll(".removeCartItem");

  /* Remove the cart item when we click on the remove button */
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    removeCartItemButtons[i].addEventListener("click", function (event) {
      let removeButtonClicked = event.target;
      if (event.target.classList.contains("removeCartItem")) {
        removeButtonClicked.parentElement.parentElement.remove();
      } else {
        removeButtonClicked.parentElement.parentElement.parentElement.remove();
      }
      updateCartTotal();
    });
  }

  /* Update the subtotal price when we remove cart items */
  function updateCartTotal() {
    let cartRows = document.querySelectorAll(".cartItems .cartItem");
    var subtotal = 0;
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let priceCartItem = cartRow.querySelector(".cartItemPrice");
      let quantityCartItem = cartRow.querySelector(".cartItemQuantity");
      let price = parseFloat(priceCartItem.innerText.replace("$", ""));
      let quantity = quantityCartItem.value;
      subtotal += quantity * price;
    }
    subtotal = Math.round(subtotal * 100) / 100;
    document.querySelector(".cartItemsSubtotal").innerText = `$${subtotal}`;
  }

  /* Update the cart when a cart item quantity is change */
  let quantityInputs = document.querySelectorAll(".cartItemQuantity");

  for (let i = 0; i < quantityInputs.length; i++) {
    let quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", quantityChanged);
  }

  function quantityChanged(event) {
    let quantityInput = event.target;
    if (isNaN(quantityInput.value) || quantityInput.value <= 0) {
      quantityInput.value = 1;
    }
    updateCartTotal();
  }
}

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
