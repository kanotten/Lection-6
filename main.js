// Step 1: Import product data from external source (products.js)
import productsData from "./data/products.js";

// Step 2: Select the container in the HTML where categories will be displayed
const categoriesContainer = document.querySelector("main");

// Step 3: Create a variable to store the HTML markup for categories
let categoriesHTML = "";

// SNORRE comment: Here is a function that checks how many categories there are in the data.
function countCategories(data) {
  const uniqueCategories = new Set();

  data.forEach((item) => {
    uniqueCategories.add(item.category);
  });

  return uniqueCategories.size;
}

// SNORRE comment: Here we are using the function to create a variable that contains how many categories there are in "productsData"
const numberOfCategories = countCategories(productsData);

// SNORRE comment: Define an array of category names
const categoryNames = ["Apple", "Samsung", "Nokia"]; // Add more names as needed

// Step 4: Loop through each category and generate HTML markup
// SNORRE comment: Here we are using the "numberOfCategories" so that the for-loop will auto adjust to the data (if there are 3 categories in the data file, it will loop 3 times)
for (
  let categoryIndex = 0;
  categoryIndex < numberOfCategories;
  categoryIndex++
) {
  // Generate HTML markup for each product in the category
  let productsHTML = "";

  for (let i = 0; i < productsData.length; i++) {
    // SNORRE comment: So inside this for-loop we want to only add the products that are in the current category.
    // In the if statement below we are comparing the product category to the categoryIndex to ensure we only include the products we want in each category
    if (productsData[i].category === categoryIndex + 1) {
      productsHTML += `
        <div class="product">
          <img alt="random photo" src="https://picsum.photos/200" />
          <h3>${productsData[i].name}</h3>
          <h4>NOK ${productsData[i].price}</h4>
          <span class="heart-container">
            <svg class="heart"
            data-name="${productsData[i].name}"
            data-id="${productsData[i].price}"
            data-price="${productsData[i].price}"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="#000000"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </span>
        </div>
      `;
    }
  }

  // Unødvendig?  med data-names

  // Generate HTML markup for the category with the products
  categoriesHTML += `
    <section class="category">
      <h1>${categoryNames[categoryIndex]}</h1>
      <div class="products-container">
        ${productsHTML}
      </div>
    </section>
  `;
}

// Step 5: Append the accumulated HTML markup to the categories container
categoriesContainer.innerHTML = categoriesHTML;

// Step 6: Select all elements with the class "heart"
const favourites = document.querySelectorAll(".heart");

// Step 7: Loop through each heart element and add a click event listener
for (let heart of favourites) {
  heart.addEventListener("click", function () {
    // Toggle the "active-heart" class for visual indication
    this.classList.toggle("active-heart");

    // Step 8: Save the clicked state in local storage
    const heartIndex = Array.from(favourites).indexOf(this);
    const savedState = localStorage.getItem("heartStates")
      ? JSON.parse(localStorage.getItem("heartStates"))
      : [];
    savedState[heartIndex] = this.classList.contains("active-heart");
    localStorage.setItem("heartStates", JSON.stringify(savedState));

    // Log the data saved in local storage for debugging purposes
    console.log("Saved state in local storage:", savedState);
  });
}

// Step 9: Retrieve saved state from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedState = localStorage.getItem("heartStates")
    ? JSON.parse(localStorage.getItem("heartStates"))
    : [];

  // Step 10: Apply the saved state to visually indicate clicked hearts
  savedState.forEach((isHeartActive, index) => {
    if (isHeartActive) {
      favourites[index].classList.add("active-heart");
    }
  });
});
