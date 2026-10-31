
console.log("EcoConnect Project Started Successfully!");


const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Open and close mobile menu
menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");
    console.log("Menu clicked!");

});

// Close menu after clicking a navigation link
const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {

    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });

});



// Search and Filter Functionality

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const itemCards = document.querySelectorAll(".item-card");

function filterItems() {

    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;

    itemCards.forEach(function(card) {

        const itemName = card.textContent.toLowerCase();
        const itemCategory = card.dataset.category;

        const matchesSearch = itemName.includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            itemCategory === categoryValue;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}

searchInput.addEventListener("input", filterItems);

categoryFilter.addEventListener("change", filterItems);



// // View Details Button Functionality

// const viewButtons = document.querySelectorAll(".item-card button");

// viewButtons.forEach(function(button) {

//     button.addEventListener("click", function() {

//         const card = button.closest(".item-card");

//         const itemName = card.querySelector("h3").textContent;
//         const itemInfo = card.querySelectorAll("p");

//         let details = "";

//         itemInfo.forEach(function(info) {
//             details += info.textContent + "\n";
//         });

//         alert(
//             "Item Details\n\n" +
//             "Name: " + itemName + "\n" +
//             details
//         );

//     });

// });




// Item Details Popup Functionality

const itemModal = document.getElementById("itemModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalLocation = document.getElementById("modalLocation");

const detailButtons = document.querySelectorAll(".item-card button");

detailButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".item-card");

        const image = card.querySelector("img").src;
        const title = card.querySelector("h3").textContent;
        const details = card.querySelectorAll("p");

        modalImage.src = image;
        modalTitle.textContent = title;
        modalCategory.textContent = details[0].textContent;
        modalLocation.textContent = details[1].textContent;

        itemModal.style.display = "flex";

    });

});

// Close Popup

closeModal.addEventListener("click", function() {
    itemModal.style.display = "none";
});

// Close when clicking outside

itemModal.addEventListener("click", function(event) {
    if (event.target === itemModal) {
        itemModal.style.display = "none";
    }
});




// Request Item Functionality

const requestBtn = document.querySelector(".request-btn");
const requestMessage = document.getElementById("requestMessage");

requestBtn.addEventListener("click", function() {

    requestMessage.textContent =
        "Your request has been submitted successfully!";

    requestMessage.style.color = "#176b45";

    requestBtn.textContent = "Request Submitted";
    requestBtn.disabled = true;

});