
"use strict"

const items = [
    {
      id: 1,
      name: 'Hoodies',
      price: 14.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured1.png',
      category: 'hoodies',
      quantity: 10
    },
    {
      id: 2,
      name: 'Shirts',
      price: 24.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured2.png',
      category: 'shirts',
      quantity: 15
    },
    {
      id: 3,
      name: 'Sweatshirts',
      price: 24.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
      category: 'sweatshirts',
      quantity: 20
    },
    {
      id: 4,
      name: 'Sweatshirts',
      price: 30.00,
      image: 'https://academlo-store.netlify.app/assets/img/featured3.png',
      category: 'sweatshirts',
      quantity: 10
    }
]

let cartIcon = document.querySelector(".cart")
let cartOverlay = document.querySelector(".shopping-cart-overlay")
let cartClose = document.getElementById("cart-close")
let listProducts = document.querySelector(".selected-products-list")
let cartContainer = document.querySelector(".cart-list")
let cartCount = document.querySelector("#cart-count")
let cart = []



document.addEventListener("DOMContentLoaded", () =>{
     
    if(window.localStorage.getItem("cart")){
        cart=JSON.parse(window.localStorage.getItem("cart"))
    }else{
        window.localStorage.setItem("cart", JSON.stringify(cart))
    }
    
    mostrarProductos()
    mostrarProductosCart()

})

cartIcon.addEventListener( "click", () =>{
    cartOverlay.classList.add("mostrar")
})

cartClose.addEventListener( "click", () =>{
    cartOverlay.classList.remove("mostrar")
})


/* nav en el scroll */


let header = document.querySelector("header")

window.addEventListener( "scroll", () =>{
    if( window.scrollY > 60 ){
        header.classList.add("scroll-header")
    }else{
        header.classList.remove("scroll-header")
    }
})


function mostrarProductos() {
    
    let productsButton = document.querySelectorAll(".btn-primary")


    productsButton.forEach( (button) =>{
        button.addEventListener("click", (evento) =>{
            let id = parseInt( button.getAttribute("data-id") )
            let product = items.find( item =>{ 
                return item.id === id 
            })
            
            agregarProducto(product)
            // cart.push( product )
            //console.log((cart))
        })
    })
}


function agregarProducto( producto ){

    let resultadoFind = cart.find( item => item.id === producto.id )
    

    if( resultadoFind ){
        let stock = cart[resultadoFind.index].quantity
        let quantitySelected = cart[resultadoFind.index].quantitySelected 

        if( stock > quantitySelected ){
            cart[resultadoFind.index].quantitySelected += 1
        }else{
            alert( "No tenemos suficiente inventario" )
        }

    }else{
        producto.quantitySelected = 1
        producto.index = cart.length


        cart.push(producto)
    }

    console.log(cart)
    mostrarProductosCart()

    window.localStorage.setItem("cart", JSON.stringify(cart))
}


function mostrarProductosCart(){

    let fragmentoHTML = ``
    let suma = 0
    let cantidadTotal = 0

    cart.forEach( item =>{
        fragmentoHTML += `
        <div class="cart-item">
            <img src=${item.image} alt="">
            <p>${item.name}</p>
            <small>Cantidad: ${item.quantitySelected}</small>
        </div>
        `

        let totalProducto = item.quantitySelected * item.price 
        suma += totalProducto

        cantidadTotal += item.quantitySelected
    })

    fragmentoHTML += `
    <div class="cart-price">
        <p>Productos seleccionados:${ cantidadTotal }</p>
        <p>$${ suma }</p>
    </div>
    `
    cartContainer.innerHTML = fragmentoHTML
    cartCount.textContent = cantidadTotal



}