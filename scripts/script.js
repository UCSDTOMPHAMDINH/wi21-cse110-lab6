// Script.js

window.onload = function() {
  let cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("ok");
};

window.addEventListener('DOMContentLoaded', () => {

  

  fetch("https://fakestoreapi.com/products")
  .then(response => response.json())
  .then(data => {
      localStorage.setItem("list", JSON.stringify(data));
      
      var daList = JSON.parse(localStorage.getItem('list'));
      
      

      for(var i = 0; i < daList.length; i++) {
        let toPut = document.createElement('product-item');
        let current = daList[i];
        
        toPut.shadowRoot.querySelector('img').src = current.image;
        toPut.shadowRoot.querySelector('img').alt = current.description;

        toPut.shadowRoot.querySelector('p').textContent = current.title;
        toPut.shadowRoot.querySelector('p.price').textContent = current.price

        let cartList = JSON.parse(localStorage.getItem("cart"));

        console.log(cartList)

        if(cartList.includes(toPut.shadowRoot.querySelector('img').src)) {
          toPut.shadowRoot.querySelector('button').textContent = 'Remove from Cart';
          document.getElementById('cart-count').innerText = parseInt(document.getElementById('cart-count').innerText) + 1;
        }

        

        
        toPut.shadowRoot.querySelector('button').addEventListener('click', () => {
          if(toPut.shadowRoot.querySelector('button').textContent == 'Add to Cart') {
            document.getElementById('cart-count').innerText = parseInt(document.getElementById('cart-count').innerText) + 1;
            toPut.shadowRoot.querySelector('button').textContent = 'Remove from Cart';
            let a = JSON.parse(localStorage.getItem("cart"));
            a.push(toPut.shadowRoot.querySelector('img').src);
            localStorage.setItem("cart", JSON.stringify(a));
            
        }

        else if(toPut.shadowRoot.querySelector('button').textContent == 'Remove from Cart') {
          document.getElementById('cart-count').innerText = parseInt(document.getElementById('cart-count').innerText) - 1;
          toPut.shadowRoot.querySelector('button').textContent = 'Add to Cart';
          let a = JSON.parse(localStorage.getItem("cart"));
            const index = a.indexOf(toPut.shadowRoot.querySelector('img').src);
            a.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(a));
            
        }
        })

        document.getElementById("product-list").append(toPut);
  }
    })

  
});








