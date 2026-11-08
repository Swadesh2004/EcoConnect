
const sharingType = document.getElementById("sharingType");
const itemPrice = document.getElementById("itemPrice");

const itemImage = document.getElementById("itemImage");
const imagePreview = document.getElementById("imagePreview");

// Show Price Field
sharingType.addEventListener("change", function() {
    if (sharingType.value === "sale") {
        itemPrice.style.display = "block";
        itemPrice.required = true;
    } else {
        itemPrice.style.display = "none";
        itemPrice.required = false;
        itemPrice.value = "";
    }
});

// Image Preview
itemImage.addEventListener("change", function() {
    const file = itemImage.files[0];

    if (file) {
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.style.display = "block";
    } else {
        imagePreview.src = "";
        imagePreview.style.display = "none";
    }
});





// Post Item Functionality
const postItemForm = document.getElementById("postItemForm");

postItemForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const imageFile = itemImage.files[0];

    if (!imageFile) {
        alert("Please upload an item photo!");
        return;
    }

    // Check image size (maximum 1 MB)
    if (imageFile.size > 1024 * 1024) {
        alert("Please upload an image smaller than 1 MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        const currentUser = JSON.parse(
            localStorage.getItem("loggedInUser")
        );

        const newItem = {
            id: Date.now(),
            itemName: document.getElementById("itemName").value,
            description: document.getElementById("itemDescription").value,
            category: document.getElementById("itemCategory").value,
            sharingType: sharingType.value,
            price: sharingType.value === "sale" ? itemPrice.value : "",
            location: document.getElementById("itemLocation").value,
            image: reader.result,
            postedBy: currentUser ? currentUser.name : "Guest",
            date: new Date().toLocaleDateString()
        };

        let items = JSON.parse(
            localStorage.getItem("ecoItems")
        ) || [];

        items.push(newItem);

        try {
            localStorage.setItem("ecoItems", JSON.stringify(items));

            document.getElementById("postMessage").textContent =
                "Your item has been posted successfully!";

            document.getElementById("postMessage").style.color = "green";

            postItemForm.reset();

            itemPrice.style.display = "none";
            itemPrice.required = false;

            imagePreview.src = "";
            imagePreview.style.display = "none";

        } catch (error) {
            alert("Storage is full. Please use a smaller image.");
        }
    };

    reader.readAsDataURL(imageFile);
});
