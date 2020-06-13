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
  threshold: 0.25,
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

/* GSAP animation for the home page */
let tl = gsap.timeline({ default: { ease: "power2" } });

tl.from(".preloadName", { duration: 1, opacity: 0 }, 0.2);

tl.from(".preloadSubname", { duration: 0.5, opacity: 0, y: 10 }, "-=0.3");
tl.from(".preloadContainer img", {
  duration: 1,
  opacity: 0,
  y: -60,
  ease: "bounce",
});
tl.to(
  ".preloadContainer",
  {
    duration: 0.7,
    opacity: 0,
    scale: 0.2,
    ease: "Expo.easeOut",
  },
  "3"
);
tl.to(
  ".preload",
  {
    duration: 0.2,
    opacity: 0,
    zIndex: -1,
  },
  "+=0.3"
);
tl.from(".bestSellerPicture", { duration: 0.7, y: -50, opacity: 0 }, "-=0.5");
tl.from(
  ".homeBestSellerDescriptionContainer",
  {
    duration: 0.5,
    y: 20,
    opacity: 0,
  },
  "-=0.1"
);
tl.from(
  ".homeBanner",
  {
    duration: 0.5,
    y: 20,
    opacity: 0,
  },
  "-=0.1"
);

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

/* Change informations in the selection page when we click on the coffee picture or the view button */
if (
  document.querySelectorAll(".viewProduct") === null ||
  document.querySelector(".viewCoffeeButton") === null ||
  document.querySelectorAll(".featuredPhotoLink") === null
) {
} else {
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
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling.innerText,
        image:
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling.previousElementSibling.firstElementChild
            .src,
        description:
          event.target.previousElementSibling.previousElementSibling.innerText,
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
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling.innerText,
        image: homeBackgroundImage.querySelector(".homeBestSellerContainer img")
          .src,
        description: event.target.previousElementSibling.innerText,
      };
      localStorage.setItem(
        "selectedCoffee",
        JSON.stringify(selectionInformations)
      );
    } else {
      let selectionInformations = {
        name: event.target.parentElement.nextElementSibling.innerText,
        image: event.target.src,
        description:
          event.target.parentElement.nextElementSibling.nextElementSibling
            .innerText,
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
  let coffeeDescription = document.querySelector(".coffeeSelectionSubtitle");

  coffeeName.innerHTML = selectionInformations.name;
  coffeeSelectionBackgroundPicture.src = selectionInformations.image;
  coffeeDescription.innerText = selectionInformations.description;

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
    /* For the object constructor below */
    let itemsAddedToCart;
    var itemInformationsSavedInCart = JSON.parse(
      localStorage.getItem("productsInCart")
    );

    if (itemInformationsSavedInCart) {
      itemsAddedToCart = itemInformationsSavedInCart;
    } else {
      itemsAddedToCart = [];
    }

    /* Show the updated number of items in the cart when we add items */
    let productsNumber = localStorage.getItem("cartNumber");
    productsNumber = parseInt(productsNumber);

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

    /* Show the updated subtotal price in the cart when we add items */
    let subTotalCartPrice = localStorage.getItem("cartPrice");
    subTotalCartPrice = parseFloat(subTotalCartPrice);
    let priceCoffeeInNumber = priceCoffee.innerText.replace("$", "");

    if (subTotalCartPrice) {
      localStorage.setItem(
        "cartPrice",
        subTotalCartPrice +
          parseInt(quantityCoffee.value) * parseFloat(priceCoffeeInNumber)
      );
      document.querySelector(".cartSubtotal span").innerText =
        "$" +
        (subTotalCartPrice +
          parseInt(quantityCoffee.value) * parseFloat(priceCoffeeInNumber));
    } else {
      localStorage.setItem(
        "cartPrice",
        parseInt(quantityCoffee.value) * parseFloat(priceCoffeeInNumber)
      );
      document.querySelector(".cartSubtotal span").innerText =
        "$" + parseInt(quantityCoffee.value) * parseFloat(priceCoffeeInNumber);
    }

    /* Add multiple items in to the cart */
    let typeCoffee;
    if (wholeBeanSelected === true) {
      typeCoffee = "Whole Bean";
    } else {
      typeCoffee = "Ground";
    }
    let itemImage = document.querySelector(
      ".coffeeSelectionPictureContainer img"
    );

    function ItemInformationInCart(name, size, price, image, type, quantity) {
      this.name = name;
      this.size = size;
      this.price = price;
      this.image = image;
      this.type = type;
      this.quantity = quantity;
    }
    if (itemsAddedToCart.length > 0) {
      for (var i = 0; i < itemsAddedToCart.length; i++) {
        if (
          sizeCoffee.value === itemsAddedToCart[i].size &&
          coffeeName.innerText === itemsAddedToCart[i].name &&
          typeCoffee === itemsAddedToCart[i].type
        ) {
          let updatedQuantity =
            parseInt(quantityCoffee.value) +
            parseInt(itemsAddedToCart[i].quantity);
          let updatedCartItem = {
            name: itemsAddedToCart[i].name,
            size: itemsAddedToCart[i].size,
            price: itemsAddedToCart[i].price,
            image: itemsAddedToCart[i].image,
            type: itemsAddedToCart[i].type,
            quantity: updatedQuantity,
          };
          itemsAddedToCart.splice(i, 1, updatedCartItem);
          localStorage.setItem(
            "productsInCart",
            JSON.stringify(itemsAddedToCart)
          );
          break;
        }
      }
      if (i == itemsAddedToCart.length) {
        itemsAddedToCart.push(
          new ItemInformationInCart(
            coffeeName.innerText,
            sizeCoffee.value,
            priceCoffee.innerText,
            itemImage.src,
            typeCoffee,
            quantityCoffee.value
          )
        );

        localStorage.setItem(
          "productsInCart",
          JSON.stringify(itemsAddedToCart)
        );
      }
    } else {
      itemsAddedToCart.push(
        new ItemInformationInCart(
          coffeeName.innerText,
          sizeCoffee.value,
          priceCoffee.innerText,
          itemImage.src,
          typeCoffee,
          quantityCoffee.value
        )
      );
      localStorage.setItem("productsInCart", JSON.stringify(itemsAddedToCart));
    }
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
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling.innerText,
        image:
          event.target.previousElementSibling.previousElementSibling
            .previousElementSibling.previousElementSibling.firstElementChild
            .src,
        description:
          event.target.previousElementSibling.previousElementSibling.innerText,
      };
      localStorage.setItem(
        "selectedCoffee",
        JSON.stringify(selectionInformations)
      );
    } else {
      let selectionInformations = {
        name: event.target.parentElement.nextElementSibling.innerText,
        image: event.target.src,
        description:
          event.target.parentElement.nextElementSibling.nextElementSibling
            .innerText,
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
  let itemInformationsSavedInCart = JSON.parse(
    localStorage.getItem("productsInCart")
  );

  /* Check if there's items in the local storage */
  if (
    itemInformationsSavedInCart === null ||
    itemInformationsSavedInCart.length === 0
  ) {
    document.querySelector(".cartEmptyDescription").style.display = "block";
    document.querySelector(".cartTopBorder").style.display = "none";
    document.querySelector(".cartItemsSubtotalContainer").style.display =
      "none";
  } else {
    /* Retrieve the item informations in the local storage about the item added to the cart */
    document.querySelector(".cartEmptyDescription").style.display = "none";
    document.querySelector(".cartTopBorder").style.display = "flex";
    document.querySelector(".cartItemsSubtotalContainer").style.display =
      "flex";

    for (let i = 0; i < itemInformationsSavedInCart.length; i++) {
      let createCartRow = document.createElement("div");
      let cartRowContent = `
        <div class="cartItemPhotoContainer">
          <div class="removeCartItem"><i class="fa fa-times" aria-hidden="true"></i></div>
          <img src="${itemInformationsSavedInCart[i].image}" alt="coffee added" />
        </div>
        <div class="cartItemProductContainer">
          <h3 class="cartProductName">${itemInformationsSavedInCart[i].name}</h3>
          <p class="cartProductType">Bean Type: <span>${itemInformationsSavedInCart[i].type}</span></p>
          <p class="cartProductSize">Size: <span>${itemInformationsSavedInCart[i].size}</span></p>
        </div>
        <div class="cartItemQuantityContainer">
          <p>Quantity:</p>
          <input type="number" min="1" class="cartItemQuantity" value="${itemInformationsSavedInCart[i].quantity}"/>
        </div>
        <div class="cartItemPriceContainer">
          <p>Price:</p>
          <span class="cartItemPrice">${itemInformationsSavedInCart[i].price}</span>
        </div>`;
      createCartRow.innerHTML = cartRowContent;
      createCartRow.classList.add("cartItem");
      document.querySelector(".cartItems").append(createCartRow);
    }

    /* Retrieve the subtotal information in the local storage */
    let subtotalPriceInStorage = localStorage.getItem("cartPrice");
    document.querySelector(".cartItemsSubtotal").innerText =
      "$" + subtotalPriceInStorage;

    /* Remove the cart item row and the local storage item when we click on the remove button */
    const removeCartItemButtons = document.querySelectorAll(".removeCartItem");

    for (let i = 0; i < removeCartItemButtons.length; i++) {
      removeCartItemButtons[i].addEventListener("click", function (event) {
        let removeButtonClicked = event.target;

        /* If the target is the div */
        if (event.target.classList.contains("removeCartItem")) {
          removeButtonClicked.parentElement.parentElement.remove();

          let coffeeName =
            event.target.parentElement.nextElementSibling.firstElementChild;
          let sizeCoffee =
            event.target.parentElement.nextElementSibling.lastElementChild
              .firstElementChild;
          let typeCoffee =
            event.target.parentElement.nextElementSibling.firstElementChild
              .nextElementSibling.firstElementChild;
          let quantityCoffee =
            event.target.parentElement.nextElementSibling.nextElementSibling
              .lastElementChild;

          for (let i = 0; i < itemInformationsSavedInCart.length; i++) {
            if (
              sizeCoffee.innerText === itemInformationsSavedInCart[i].size &&
              coffeeName.innerText === itemInformationsSavedInCart[i].name &&
              typeCoffee.innerText === itemInformationsSavedInCart[i].type
            ) {
              itemInformationsSavedInCart.splice(i, 1);
              localStorage.setItem(
                "productsInCart",
                JSON.stringify(itemInformationsSavedInCart)
              );
              let cartNumberUpdated =
                parseInt(JSON.parse(localStorage.getItem("cartNumber"))) -
                quantityCoffee.value;
              localStorage.setItem("cartNumber", cartNumberUpdated);
            }
          }
        } else {
          /* If the target is the i */
          removeButtonClicked.parentElement.parentElement.parentElement.remove();

          let coffeeName =
            event.target.parentElement.parentElement.nextElementSibling
              .firstElementChild;
          let sizeCoffee =
            event.target.parentElement.parentElement.nextElementSibling
              .lastElementChild.firstElementChild;
          let typeCoffee =
            event.target.parentElement.parentElement.nextElementSibling
              .firstElementChild.nextElementSibling.firstElementChild;
          let quantityCoffee =
            event.target.parentElement.parentElement.nextElementSibling
              .nextElementSibling.lastElementChild;

          for (let i = 0; i < itemInformationsSavedInCart.length; i++) {
            if (
              sizeCoffee.innerText === itemInformationsSavedInCart[i].size &&
              coffeeName.innerText === itemInformationsSavedInCart[i].name &&
              typeCoffee.innerText === itemInformationsSavedInCart[i].type
            ) {
              itemInformationsSavedInCart.splice(i, 1);
              localStorage.setItem(
                "productsInCart",
                JSON.stringify(itemInformationsSavedInCart)
              );
              let cartNumberUpdated =
                parseInt(JSON.parse(localStorage.getItem("cartNumber"))) -
                quantityCoffee.value;
              localStorage.setItem("cartNumber", cartNumberUpdated);
            }
          }
        }
        if (itemInformationsSavedInCart.length === 0) {
          document.querySelector(".cartEmptyDescription").style.display =
            "block";
          document.querySelector(".cartTopBorder").style.display = "none";
          document.querySelector(".cartItemsSubtotalContainer").style.display =
            "none";
        }

        updateCart();
      });
    }

    /* Update the cart items number when we add or soustract items from the quantity inputs */
    let cartItemQuantity = document.querySelectorAll(".cartItemQuantity");

    for (let i = 0; i < cartItemQuantity.length; i++) {
      cartItemQuantity[i].addEventListener("change", quantityChanged);
    }

    function quantityChanged(event) {
      if (isNaN(event.target.value) || event.target.value <= 0) {
        event.target.value = 1;
      } else {
        for (let i = 0; i < itemInformationsSavedInCart.length; i++) {
          if (
            event.target.parentElement.previousElementSibling.lastElementChild
              .firstElementChild.innerText ===
              itemInformationsSavedInCart[i].size &&
            event.target.parentElement.previousElementSibling.firstElementChild
              .innerText === itemInformationsSavedInCart[i].name &&
            event.target.parentElement.previousElementSibling.firstElementChild
              .nextElementSibling.firstElementChild.innerText ===
              itemInformationsSavedInCart[i].type
          ) {
            let updatedCartItem = {
              name: itemInformationsSavedInCart[i].name,
              size: itemInformationsSavedInCart[i].size,
              price: itemInformationsSavedInCart[i].price,
              image: itemInformationsSavedInCart[i].image,
              type: itemInformationsSavedInCart[i].type,
              quantity: event.target.value,
            };
            itemInformationsSavedInCart.splice(i, 1, updatedCartItem);
            localStorage.setItem(
              "productsInCart",
              JSON.stringify(itemInformationsSavedInCart)
            );
          }
        }
        updateCart();
      }
    }

    /* Update the subtotal price in the cart and the item counter when we remove cart items or add/soustract quantities */
    function updateCart() {
      let updatedPrice = 0;
      let itemsQuantity = 0;
      let cartRows = document.querySelectorAll(".cartItem");

      for (let i = 0; i < cartRows.length; i++) {
        let priceCartItem = cartRows[i].querySelector(".cartItemPrice");
        priceCartItem = parseFloat(priceCartItem.innerText.replace("$", ""));
        let quantityCartItem = cartRows[i].querySelector(".cartItemQuantity");
        quantityCartItem = parseInt(quantityCartItem.value);
        updatedPrice += quantityCartItem * priceCartItem;
        itemsQuantity += quantityCartItem;
      }
      updatedPrice = Math.round(updatedPrice * 100) / 100;
      localStorage.setItem("cartPrice", updatedPrice);
      document.querySelector(
        ".cartItemsSubtotal"
      ).innerText = `$${updatedPrice}`;
      localStorage.setItem("cartNumber", itemsQuantity);
      document.querySelector(".itemsCounterIcon").innerText = itemsQuantity;
    }
  }
}
