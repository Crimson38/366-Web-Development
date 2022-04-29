const book_area = document.getElementById('book_area');
const search_bar = document.getElementById('searchBar');
const cartCircle = document.getElementById('cart-circle');
const cartOverlay = document.querySelector('.cart-overlay');
const cartIcon = document.querySelector('.fa-shopping-cart');
const closeCartBtn = document.querySelector('.close-cart');
const cartContent = document.querySelector('.cart-content');
const clearCartBtn = document.querySelector('.clear-cart');
const cartTotal = document.querySelector('.cart-total');
const orderBtn = document.querySelector('.place-order');
const orderOverlay = document.querySelector('.order-overlay');
const closeOrderBtn = document.querySelector('.close-order');
const submitOrderBtn = document.querySelector('.submit-order');

let books = [];
let cart = [];

class UI {
  
  /*
    Displays all avalible books when the page is first loaded.
  */ 
  async displayBooks(books)
  {       
    
   
    while (book_area.firstChild)
    {
      book_area.removeChild(book_area.firstChild);
    } 
    books.forEach(book =>{
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
          <div class="image">
            <img src = ${book.image} height="200" width="100px">
            <div class="addToCart" data-id="${book.id}">Add to Cart</div>
          </div>
          <h4>${book.title}</h4>
          <p>$${book.price}</p>         
        `
        book_area.appendChild(div);
        
    });

    
  }


  /* 
    Sets up the search bar event listener.
   */
  setupSearch(){
    
    search_bar.addEventListener('keyup', (event)=> {
     
      if(event.keyCode == 13){
        const searchString = event.target.value.toLowerCase();
        const filteredBooks = books.filter(book => {
          return book.title.toLowerCase().includes(searchString) || 
                  book.price <= parseInt(searchString);
        });
        
        this.displayBooks(filteredBooks);
        this.setupAddToCartBtns();
      }
    });
  }


  /*
    Setup Add To Cart buttons.
    Cart number will be updated once the button is clicked.
  */
  setupAddToCartBtns(){
    const addToCart_btns = document.querySelectorAll(".addToCart");
    
    
    addToCart_btns.forEach(btn =>{
      let id = btn.dataset.id
      let inCart = cart.find(book => book.id === id);
      if(inCart){
        btn.innerText = "In Cart";
      }
     
      btn.addEventListener('click', (event) => {
        let id = btn.dataset.id
        let inCart = cart.find(book => book.id === id);
        if(!inCart){
          btn.innerText = "In Cart";
          // get book from local storage then add key amount.
          let cartItem = {...Storage.getProduct(id), amount: 1};  
          // append book to the end of the cart. 
          cart = [...cart, cartItem];
          Storage.saveCart(cart);
          this.setCartValues(cart);
          this.addCartItem(cartItem);
        }
      });
    });
  
  }

  addCartItem(cartItem){
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
                    <img src='${cartItem.image}'>
                    <div>
                    <h4>${cartItem.title}</h4>
                    <h5>$${cartItem.price}</h5> 
                    <span class="remove-item" data-id =${cartItem.id}>remove</span>
                    </div>
                    <div>
                    <i class="fas fa-chevron-up" data-id =${cartItem.id}></i>
                    <p class="item-amount">${cartItem.amount}</p>
                    <i class="fas fa-chevron-down" data-id =${cartItem.id}></i>
                    </div>
                   `;
    cartContent.append(div); 
    this.updateLocalStorageForm();   
  }

  cartItemLogic(){
    
    const removeBook = document.querySelectorAll('.remove-item');
    cartContent.addEventListener('click', (event) => {
      if(event.target.classList.contains('remove-item')){
        
        let removeBtn = event.target;
        let id = removeBtn.dataset.id;
        this.removeBook(id);
        
        cartContent.removeChild(removeBtn.parentElement.parentElement);
        
      }
      else if(event.target.classList.contains('fa-chevron-up')){
        let addAmount = event.target;
        let id = event.target.dataset.id;
        let book = cart.find(book=>book.id === id);
        book.amount++;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerHTML = book.amount;
        this.updateLocalStorageForm();
      }
      else if(event.target.classList.contains('fa-chevron-down')){
        let decAmount = event.target;
        let id = event.target.dataset.id;
        let book = cart.find(book=>book.id === id);
        book.amount--;
        if(book.amount > 0){
          Storage.saveCart(cart);
          this.setCartValues(cart);
          decAmount.previousElementSibling.innerHTML = book.amount;
          this.updateLocalStorageForm();
        }
        else{
          cartContent.removeChild(decAmount.parentElement.parentElement);
          this.removeBook(id);
        }
      }
    });

    
  }

  removeBook(id){
      cart = cart.filter(book=> book.id !== id);
      Storage.saveCart(cart);
      this.setCartValues(cart);
      let button = this.getBtn(id);
      button.innerHTML = `Add to Cart`;
      this.updateLocalStorageForm()
  }

  setCartValues(cart){
    let total = 0;
    let booksTotal = 0;
    cart.forEach(book =>{
      total += book.price* book.amount;
      booksTotal += book.amount; 
    });
    cartTotal.innerHTML = parseFloat(total.toFixed(2));
    cartCircle.innerHTML = booksTotal;
  }

  getBtn(id){
    const addToCart_btns = document.querySelectorAll(".addToCart");
    let button;
    addToCart_btns.forEach(btn => {
      if(btn.dataset.id === id){
        button = btn;
      }
    });
    return button;
  }

  /**
   * Sets up event listener for clearing the cart of all books. 
   */
  clearCart(){
    clearCartBtn.addEventListener('click', (event) => {
      this.removeAllFromCart();
    });
  }

  /**
   * removes all books from cart. 
   */
  removeAllFromCart(){
    cart = []
    Storage.saveCart(cart);
    this.setCartValues(cart);
    while(cartContent.firstChild){
      cartContent.removeChild(cartContent.firstChild);
    }
   
    const addToCart_btns = document.querySelectorAll(".addToCart");
    addToCart_btns.forEach(btn=> {
      btn.innerHTML=`Add to Cart`;
    });
      
    this.updateLocalStorageForm();
  }

  /*
    Adds click event for opening and closing cart window.
   */
  setupCart()
  {
    cartIcon.addEventListener('click', (event) => {
      this.showCart();
    });

    closeCartBtn.addEventListener('click', (event) => {
      this.hideCart();
    });

    cart = Storage.getCart();
    this.setCartValues(cart);
    cart.forEach(book =>{
      this.addCartItem(book);
    });

    this.clearCart();
    this.cartItemLogic();

    orderBtn.addEventListener('click', (event) =>{
      this.showOrder();
    });

    submitOrderBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.hideOrder();
      this.removeAllFromCart();
      this.hideCart();
      alert("Your Order is Complete!");
    });

    closeOrderBtn.addEventListener('click', (event) =>{
      this.hideOrder();
    });
  }

  /* 
    Adds a class called showCart that makes the cart window visible.
  */
  showCart(){
    cartOverlay.classList.add('showCart');
  }

  /* 
    Removes a class called showCart to make the cart window hidden.
  */
  hideCart(){
    cartOverlay.classList.remove('showCart');
  }

  showOrder(){
    orderOverlay.classList.add('showOrder');
  }

  hideOrder(){
    orderOverlay.classList.remove('showOrder');
    submitOrderBtn.classList.remove('showOrder');
  }

  updateLocalStorageForm()
  {
    const localStorageDiv = document.querySelector(".localStorageInfo");
    while(localStorageDiv.firstChild){
      localStorageDiv.removeChild(localStorageDiv.firstChild);
    }
    localStorageDiv.innerHTML = `<input type="text" name="localStorage" class="payment-info" required/>`;
    const localStorageInput = localStorageDiv.firstChild;
    cart = Storage.getCart();
    var temp = "";
    cart.forEach(item => {
      //console.log(item);
      temp = temp + item.title + "/" + item.amount + "/" + item.amount*item.price + "/"; 
    })
    localStorageInput.value = temp;
  }
}

class Products {

  /* 
    Creates an array of the books and their information from the products.json file.
  */ 
  async loadBooks() {
    try {
      let result = await fetch('/products');
      books = await result.json();
      books = books.items;

      books = books.map(book =>{
        const {title, price} = book.fields;
        const id = book.sys.id;
        const image = book.fields.image.fields.file.url;
        return {title, price, id, image};
      });
      return books;
    }catch (error) {
      console.log(error);
    }
  }

}

class Storage{
  /*
    Saves products to the local storage.
   */
  static saveProducts(products){
    localStorage.setItem('products', JSON.stringify(products));
  }

  /*
    Get a product from the local storage. 
   */
  static getProduct(id){
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id === id);
  }

  static saveCart(cart){
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static getCart(){
    return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : [];
  }
}


document.addEventListener("DOMContentLoaded", ()=>{ 

  const products = new Products();    
  const ui = new UI();
  
  products.loadBooks().then(products => Storage.saveProducts(products));
  ui.displayBooks(JSON.parse(localStorage.getItem('products')));
  ui.setupSearch();
  ui.setupCart();
  ui.setupAddToCartBtns();
  
});

