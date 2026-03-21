document.addEventListener("DOMContentLoaded", function(){

/* =========================
   DARK MODE
========================= */

const darkToggle = document.getElementById("darkToggle")

if(localStorage.getItem("darkMode") === "enabled"){
    document.body.classList.add("dark")
}

if(darkToggle){
    darkToggle.addEventListener("click", function(){
        document.body.classList.toggle("dark")

        if(document.body.classList.contains("dark")){
            localStorage.setItem("darkMode", "enabled")
        } else {
            localStorage.setItem("darkMode", "disabled")
        }
    })
}



/* =========================
   CART SYSTEM
========================= */

let cart = []

const cartIcon = document.getElementById("cartIcon")
const cartPanel = document.getElementById("cartPanel")
const closeCart = document.getElementById("closeCart")

const cartItems = document.getElementById("cartItems")
const cartTotal = document.getElementById("cartTotal")
const cartCount = document.getElementById("cartCount")


if(cartIcon){
    cartIcon.addEventListener("click", function(){
        cartPanel.classList.add("open")
    })
}

if(closeCart){
    closeCart.addEventListener("click", function(){
        cartPanel.classList.remove("open")
    })
}



/* ADD TO CART */

const addButtons = document.querySelectorAll(".add-cart")

addButtons.forEach(button => {

button.addEventListener("click", function(){

const card = button.closest(".product-card")

if(!card) return

const nameEl = card.querySelector("h3")
const priceEl = card.querySelector(".price")

if(!nameEl || !priceEl) return

const name = nameEl.innerText
const price = parseFloat(priceEl.innerText.replace("R",""))

cart.push({name, price})

updateCart()

})

})



/* UPDATE CART */

function updateCart(){

if(!cartItems) return

cartItems.innerHTML = ""

let total = 0

cart.forEach((item,index)=>{

total += item.price

cartItems.innerHTML += `
<div class="cart-item">
<span>${item.name}</span>
<span>R${item.price}</span>
<button class="remove-item" data-index="${index}">x</button>
</div>
`

})

if(cartTotal) cartTotal.innerText = "R" + total
if(cartCount) cartCount.innerText = cart.length


/* REMOVE ITEMS */

const removeButtons = document.querySelectorAll(".remove-item")

removeButtons.forEach(button => {

button.addEventListener("click", function(){

const index = button.dataset.index
cart.splice(index,1)

updateCart()

})

})

}



/* =========================
   PRODUCT SEARCH
========================= */

const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")

function searchProducts(){

if(!searchInput) return

const filter = searchInput.value.toLowerCase()
const products = document.querySelectorAll(".product-card")

products.forEach(product => {

const nameEl = product.querySelector("h3")

if(!nameEl) return

const name = nameEl.innerText.toLowerCase()

if(name.includes(filter)){
product.style.display = "block"
}else{
product.style.display = "none"
}

})

}

if(searchBtn){
searchBtn.addEventListener("click", searchProducts)
}

if(searchInput){
searchInput.addEventListener("keyup", searchProducts)
}



/* =========================
   IMAGE FULL VIEW (WORKING)
========================= */

window.addEventListener("load", function () {

  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");

  const images = document.querySelectorAll(".clickable-img");

  images.forEach(function(img){
    img.addEventListener("click", function(){
      popup.classList.add("active");
      popupImg.src = this.src;
    });
  });

  // close popup
  popup.addEventListener("click", function(){
    popup.classList.remove("active");
  });

});
