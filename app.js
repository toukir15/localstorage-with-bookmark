const loadProduct = () => {
  fetch("./product.json")
    .then((response) => response.json())
    .then((data) => displayProduct(data));
};

const displayProduct = (data) => {
  const cards = document.getElementById("cards");
  data.forEach((product) => {
    const isBookmark = checkBookmark(product.id)
    console.log(isBookmark);
    const card = document.createElement("div");
    card.classList.add("card", "m-2");

    card.innerHTML = `
          <div class="bookmark-icon">
        
          <i onclick="${isBookmark ? `handleRemoveBookmark('${product.id}')` : `handleBookmark('${product.name}','${product.id}','${product.price}')`}" 
           class="${isBookmark ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"
      "></i>

        </div>
        <div class="product-img-container">
          <img
            class="product-img"
            src=${product.image}
            alt=""
          />
        </div>
        <h3>${product.name}</h3>
        <p>The Widget 3000 is the latest and greatest in widget</p>
        <div class="priceAndButtons">
          <h2 class="text-primary">$${product.price}</h2>
          <button class="btn btn-primary">Buy Now</button>
        </div>
          `;
    cards.appendChild(card);
  });
};

// ! handle book mark
const handleBookmark = (name, id, price) => {
  const product = { name, id, price, bookmark: true }
  const previousBookMark = JSON.parse(localStorage.getItem('bookmark'))
  let bookmark = [];
  // console.log(product);
  if (previousBookMark) {
    const isThisProductMarked = previousBookMark.find(p => p.id === id);
    if (isThisProductMarked) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    else {
      bookmark.push(...previousBookMark, product)
      localStorage.setItem('bookmark', JSON.stringify(bookmark))
    }
  }
  else {
    bookmark.push(product)
    // console.log(bookmark);
    localStorage.setItem('bookmark', JSON.stringify(bookmark))
  }
}

// handle remove bookmark 
const handleRemoveBookmark = id => {
  const previousBookmark = JSON.parse(localStorage.getItem('bookmark'))
  const restOfThem = previousBookmark.filter(p => p.id != id)
  localStorage.setItem('bookmark', JSON.stringify(restOfThem))
}

// check bookmark 
const checkBookmark = id => {
  const previousBookmark = JSON.parse(localStorage.getItem('bookmark'))
  const isBookmark = previousBookmark?.find(p => p.id == id);
  if (isBookmark) {
    return true;
  }
  else {
    return false;
  }
}

loadProduct();
