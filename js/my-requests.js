
// // Get Saved Requests from LocalStorage

// const requestsContainer = document.getElementById("requestsContainer");

// const requests = JSON.parse(
//     localStorage.getItem("ecoRequests")
// ) || [];

// // Display Requests

// function displayRequests() {

//     if (requests.length === 0) {

//         requestsContainer.innerHTML =
//             "<p>No requests found. Explore items and request something!</p>";

//         return;
//     }

//     requests.forEach(function(request) {

//         const requestCard = document.createElement("div");

//         requestCard.className = "request-card";

//         requestCard.innerHTML = `
//             <h3>${request.itemName}</h3>

//             <p>${request.category}</p>

//             <p>${request.location}</p>

//             <p>Request Date: ${request.date}</p>

//             <span class="request-status">
//                 ${request.status}
//             </span>
//         `;

//         requestsContainer.appendChild(requestCard);

//     });
// }

// displayRequests();




const requestsContainer = document.getElementById("requestsContainer");

// Get requests from LocalStorage
let requests = JSON.parse(
    localStorage.getItem("ecoRequests")
) || [];

// Display Requests
function displayRequests() {

    requestsContainer.innerHTML = "";

    // if (requests.length === 0) {
    //     requestsContainer.innerHTML =
    //         "<p>No requests found. Explore items and request something!</p>";
    //     return;
    // }


    if (requests.length === 0) {

    requestsContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📦</div>

            <h2>No Requests Yet!</h2>

            <p>You haven't requested any items yet.</p>

            <a href="index.html#explore" class="explore-btn">
                Explore Items
            </a>
        </div>
    `;

    return;
}


    requests.forEach(function(request, index) {

        const requestCard = document.createElement("div");

        requestCard.className = "request-card";

        requestCard.innerHTML = `
            <h3>${request.itemName}</h3>
            <p>${request.category}</p>
            <p>${request.location}</p>
            <p>Request Date: ${request.date}</p>

            <span class="request-status">
                ${request.status}
            </span>

            <button class="cancel-btn" data-index="${index}">
                Cancel Request
            </button>
        `;

        requestsContainer.appendChild(requestCard);

    });

    // Cancel Request Buttons
    const cancelButtons = document.querySelectorAll(".cancel-btn");

    cancelButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const index = Number(button.dataset.index);

            const confirmCancel = confirm(
                "Are you sure you want to cancel this request?"
            );

            if (confirmCancel) {

                requests.splice(index, 1);

                localStorage.setItem(
                    "ecoRequests",
                    JSON.stringify(requests)
                );

                displayRequests();

            }

        });

    });
}

displayRequests();
