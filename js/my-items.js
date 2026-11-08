
const myItemsContainer = document.getElementById("myItemsContainer");

const myItemsUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

function displayMyItems() {

    let allItems = JSON.parse(
        localStorage.getItem("ecoItems")
    ) || [];

    // Get items posted by current user
    const myItems = allItems.filter(function(item) {
        return myItemsUser && item.postedBy === myItemsUser.name;
    });

    myItemsContainer.innerHTML = "";

    if (myItems.length === 0) {
        myItemsContainer.innerHTML = `
            <div class="empty-state">
                <h2>No Items Posted Yet!</h2>
                <p>You have not shared any items.</p>
                <a href="post-item.html" class="explore-btn">Post an Item</a>
            </div>
        `;
        return;
    }

    myItems.forEach(function(item) {

        const card = document.createElement("div");
        card.className = "item-card";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.itemName}">
            <h3>${item.itemName}</h3>
            <p>Category: ${item.category}</p>
            <p>Location: ${item.location}</p>
            <p>Type: ${item.sharingType}</p>
            ${item.sharingType === "sale" ? `<h4>₹${item.price}</h4>` : ""}
        `;

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Item";
        deleteBtn.className = "cancel-btn";

        deleteBtn.addEventListener("click", function() {

            const confirmDelete = confirm(
                "Are you sure you want to delete this item?"
            );

            if (confirmDelete) {

                const updatedItems = allItems.filter(function(existingItem) {
                    return !(
                        existingItem.id === item.id &&
                        existingItem.postedBy === myItemsUser.name
                    );
                });

                localStorage.setItem(
                    "ecoItems",
                    JSON.stringify(updatedItems)
                );

                displayMyItems();
            }
        });

        card.appendChild(deleteBtn);
        myItemsContainer.appendChild(card);
    });
}

displayMyItems();

