
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
// const itemCards = document.querySelectorAll(".item-card");

function filterItems() {

    const itemCards = document.querySelectorAll(".item-card");

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

        requestBtn.disabled = false;
        requestBtn.textContent = "Request This Item";
        requestMessage.textContent = "";

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




// // Request Item Functionality

// const requestBtn = document.querySelector(".request-btn");
// const requestMessage = document.getElementById("requestMessage");

// requestBtn.addEventListener("click", function() {

//     requestMessage.textContent =
//         "Your request has been submitted successfully!";

//     requestMessage.style.color = "#176b45";

//     requestBtn.textContent = "Request Submitted";
//     requestBtn.disabled = true;

// });



// Request Item Functionality with LocalStorage

// const requestBtn = document.querySelector(".request-btn");
// const requestMessage = document.getElementById("requestMessage");

// requestBtn.addEventListener("click", function() {

//     const request = {
//         itemName: modalTitle.textContent,
//         category: modalCategory.textContent,
//         location: modalLocation.textContent,
//         date: new Date().toLocaleDateString(),
//         status: "Pending"
//     };

//     let requests = JSON.parse(
//         localStorage.getItem("ecoRequests")
//     ) || [];

//     requests.push(request);

//     localStorage.setItem(
//         "ecoRequests",
//         JSON.stringify(requests)
//     );

//     requestMessage.textContent =
//         "Your request has been saved successfully!";

//     requestMessage.style.color = "#176b45";

//     requestBtn.textContent = "Request Submitted";
//     requestBtn.disabled = true;

// });




// Request Item Functionality with LocalStorage

const requestBtn = document.querySelector(".request-btn");
const requestMessage = document.getElementById("requestMessage");

requestBtn.addEventListener("click", function() {

    // Check logged-in user
    const receiver = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (!receiver) {
        alert("Please login first to request an item!");
        window.location.href = "login.html";
        return;
    }

    // Get selected item
    const selectedItem = modalTitle.textContent;

    // Get all posted items
    const postedItems = JSON.parse(
        localStorage.getItem("ecoItems")
    ) || [];

    // Find item details
    const item = postedItems.find(function(product) {
        return product.itemName === selectedItem;
    });

    // Check if item is available for donation
    if (item && item.sharingType !== "donation") {
        requestMessage.textContent =
            "Only free donation items can be requested!";
        requestMessage.style.color = "red";
        return;
    }

    // Prepare request
    const request = {
        id: Date.now(),
        itemName: selectedItem,
        category: modalCategory.textContent,
        location: modalLocation.textContent,
        donorName: item ? item.postedBy : "Community Donor",
        receiverName: receiver.name,
        receiverEmail: receiver.email,
        status: "Pending",
        date: new Date().toLocaleDateString()
    };

    // Get existing requests
    let requests = JSON.parse(
        localStorage.getItem("ecoRequests")
    ) || [];

    requests.push(request);

    localStorage.setItem(
        "ecoRequests",
        JSON.stringify(requests)
    );

    requestMessage.textContent =
        "Your request has been submitted successfully!";

    requestMessage.style.color = "#176b45";

    requestBtn.textContent = "Request Submitted";
    requestBtn.disabled = true;

});




// // Display User Posted Items
// const postedItemsContainer = document.querySelector(".explore-container");

// function displayPostedItems() {

//     const postedItems = JSON.parse(
//         localStorage.getItem("ecoItems")
//     ) || [];

//     postedItems.forEach(function(item) {

//         const card = document.createElement("div");
//         card.className = "item-card";
//         card.dataset.category = item.sharingType;

//         const image = document.createElement("img");
//         image.src = item.image;
//         image.alt = item.itemName;

//         const title = document.createElement("h3");
//         title.textContent = item.itemName;

//         const category = document.createElement("p");
//         category.textContent = "Category: " + item.category;

//         const location = document.createElement("p");
//         location.textContent = "Location: " + item.location;

//         const type = document.createElement("span");

//         if (item.sharingType === "donation") {
//             type.textContent = "FREE DONATION";
//         } else if (item.sharingType === "sale") {
//             type.textContent = "FOR SALE";
//         } else {
//             type.textContent = "EXCHANGE";
//         }

//         card.appendChild(image);
//         card.appendChild(type);
//         card.appendChild(title);
//         card.appendChild(category);
//         card.appendChild(location);

//         if (item.sharingType === "sale") {
//             const price = document.createElement("h4");
//             price.textContent = "₹" + item.price;
//             card.appendChild(price);
//         }

//         const button = document.createElement("button");
//         button.textContent = "View Details";

//         button.addEventListener("click", function() {
//             modalImage.src = item.image;
//             modalTitle.textContent = item.itemName;
//             modalCategory.textContent = "Category: " + item.category;
//             modalLocation.textContent = "Location: " + item.location;

//             requestBtn.disabled = false;
//             requestBtn.textContent = "Request This Item";
//             requestMessage.textContent = "";

//             itemModal.style.display = "flex";
//         });

//         card.appendChild(button);
//         postedItemsContainer.appendChild(card);
//     });
// }

// if (postedItemsContainer) {
//     displayPostedItems();
// }



// Display User Posted Items
const postedItemsContainer = document.querySelector(".explore-container");

function displayPostedItems() {
    const postedItems = JSON.parse(
        localStorage.getItem("ecoItems")
    ) || [];

    postedItems.forEach(function(item) {
        const card = document.createElement("div");
        card.className = "item-card";
        card.dataset.category = item.category.toLowerCase();

        card.innerHTML = `
            <img src="${item.image}" alt="${item.itemName}">
            <h3>${item.itemName}</h3>
            <p>Category: ${item.category}</p>
            <p>Location: ${item.location}</p>
            <p>Type: ${item.sharingType}</p>
            ${item.sharingType === "sale" ? `<h4>₹${item.price}</h4>` : ""}
        `;

        const button = document.createElement("button");
        button.textContent = "View Details";

        button.addEventListener("click", function() {
            modalImage.src = item.image;
            modalTitle.textContent = item.itemName;
            modalCategory.textContent = "Category: " + item.category;
            modalLocation.textContent = "Location: " + item.location;
            requestMessage.textContent = "";
            itemModal.style.display = "flex";
        });

        card.appendChild(button);
        postedItemsContainer.appendChild(card);
    });
}

if (postedItemsContainer) {
    displayPostedItems();
}