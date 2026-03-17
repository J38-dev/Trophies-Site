document.addEventListener("DOMContentLoaded", function(){

/* =========================
   DARK MODE
========================= */
const darkToggle = document.getElementById("darkToggle")

// Check localStorage on page load
if(localStorage.getItem("darkMode") === "enabled"){
    document.body.classList.add("dark")
}

if(darkToggle){
    darkToggle.addEventListener("click", function(){
        document.body.classList.toggle("dark")

        // Save preference
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



/* OPEN CART */

if(cartIcon){

cartIcon.addEventListener("click", function(){

cartPanel.classList.add("open")

})

}



/* CLOSE CART */

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

const name = card.querySelector("h3").innerText

const price = parseFloat(
card.querySelector(".price").innerText.replace("R","")
)

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

cartTotal.innerText = "R" + total

cartCount.innerText = cart.length



/* REMOVE BUTTONS */

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

const filter = searchInput.value.toLowerCase()

const products = document.querySelectorAll(".product-card")

products.forEach(product => {

const name = product.querySelector("h3").innerText.toLowerCase()

if(name.includes(filter)){

product.style.display = "block"

}else{

product.style.display = "none"

}

})

}



/* SEARCH BUTTON */

if(searchBtn){

searchBtn.addEventListener("click", searchProducts)

}



/* SEARCH LIVE */

if(searchInput){

searchInput.addEventListener("keyup", searchProducts)

}

})
