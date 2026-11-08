// // Display Donation Requests for Logged-in Donor

// const requestsContainer = document.getElementById("donationRequests");

// const donor = JSON.parse(
//     localStorage.getItem("loggedInUser")
// );

// function displayDonationRequests() {

//     let requests = JSON.parse(
//         localStorage.getItem("ecoRequests")
//     ) || [];

//     requestsContainer.innerHTML = "";

//     if (!donor) {
//         requestsContainer.innerHTML = "<p>Please login first.</p>";
//         return;
//     }

//     // Show only requests for this donor's items
//     const myRequests = requests.filter(function(request) {
//         return request.donorName === donor.name;
//     });

//     if (myRequests.length === 0) {
//         requestsContainer.innerHTML =
//             "<p>No donation requests received yet.</p>";
//         return;
//     }

//     myRequests.forEach(function(request) {

//         const card = document.createElement("div");
//         card.className = "dashboard-card";

//         const title = document.createElement("h3");
//         title.textContent = "📦 " + request.itemName;

//         const receiver = document.createElement("p");
//         receiver.textContent = "Requested By: " + request.receiverName;

//         const location = document.createElement("p");
//         location.textContent = "Location: " + request.location;

//         const date = document.createElement("p");
//         date.textContent = "Request Date: " + request.date;

//         const status = document.createElement("p");
//         status.textContent = "Status: " + request.status;

//         card.appendChild(title);
//         card.appendChild(receiver);
//         card.appendChild(location);
//         card.appendChild(date);
//         card.appendChild(status);

//         requestsContainer.appendChild(card);
//     });
// }

// displayDonationRequests();



// Display Donation Requests for Logged-in Donor

const requestsContainer = document.getElementById("donationRequests");

const donor = JSON.parse(
    localStorage.getItem("loggedInUser")
);

// Display Requests
function displayDonationRequests() {

    let requests = JSON.parse(
        localStorage.getItem("ecoRequests")
    ) || [];

    requestsContainer.innerHTML = "";

    if (!donor) {
        requestsContainer.innerHTML = "<p>Please login first.</p>";
        return;
    }

    const myRequests = requests.filter(function(request) {
        return request.donorName === donor.name;
    });

    if (myRequests.length === 0) {
        requestsContainer.innerHTML =
            "<p>No donation requests received yet.</p>";
        return;
    }

    myRequests.forEach(function(request) {

        const card = document.createElement("div");
        card.className = "dashboard-card";

        const title = document.createElement("h3");
        title.textContent = "📦 " + request.itemName;

        const receiver = document.createElement("p");
        receiver.textContent = "Requested By: " + request.receiverName;

        const location = document.createElement("p");
        location.textContent = "Location: " + request.location;

        const date = document.createElement("p");
        date.textContent = "Request Date: " + request.date;

        const status = document.createElement("p");
        status.textContent = "Status: " + request.status;

        card.appendChild(title);
        card.appendChild(receiver);
        card.appendChild(location);
        card.appendChild(date);
        card.appendChild(status);

        // Accept and Reject Buttons
        if (request.status === "Pending") {

            const acceptBtn = document.createElement("button");
            acceptBtn.textContent = "Accept Request";

            acceptBtn.addEventListener("click", function() {
                updateRequestStatus(request.id, "Accepted");
            });

            const rejectBtn = document.createElement("button");
            rejectBtn.textContent = "Reject Request";

            rejectBtn.addEventListener("click", function() {
                updateRequestStatus(request.id, "Rejected");
            });

            card.appendChild(acceptBtn);
            card.appendChild(rejectBtn);
        }

        requestsContainer.appendChild(card);
    });
}


// Update Request Status
function updateRequestStatus(requestId, newStatus) {

    let requests = JSON.parse(
        localStorage.getItem("ecoRequests")
    ) || [];

    requests = requests.map(function(request) {

        if (request.id === requestId) {
            request.status = newStatus;
        }

        return request;
    });

    localStorage.setItem(
        "ecoRequests",
        JSON.stringify(requests)
    );

    displayDonationRequests();
}


// Initial Display
displayDonationRequests();