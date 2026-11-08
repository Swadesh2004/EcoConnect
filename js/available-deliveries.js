// Display Accepted Donation Requests for Volunteers

// const deliveriesContainer = document.getElementById("availableDeliveries");

// function displayAvailableDeliveries() {

//     const requests = JSON.parse(
//         localStorage.getItem("ecoRequests")
//     ) || [];

//     deliveriesContainer.innerHTML = "";

//     const availableTasks = requests.filter(function(request) {
//         return request.status === "Accepted";
//     });

//     if (availableTasks.length === 0) {
//         deliveriesContainer.innerHTML =
//             "<p>No delivery tasks available right now.</p>";
//         return;
//     }

//     availableTasks.forEach(function(request) {

//         const card = document.createElement("div");
//         card.className = "dashboard-card";

//         const title = document.createElement("h3");
//         title.textContent = "📦 " + request.itemName;

//         const donor = document.createElement("p");
//         donor.textContent = "Donor: " + request.donorName;

//         const receiver = document.createElement("p");
//         receiver.textContent = "Receiver: " + request.receiverName;

//         const location = document.createElement("p");
//         location.textContent = "Location: " + request.location;

//         const status = document.createElement("p");
//         status.textContent = "Status: Waiting for Volunteer";

//         card.appendChild(title);
//         card.appendChild(donor);
//         card.appendChild(receiver);
//         card.appendChild(location);
//         card.appendChild(status);

//         deliveriesContainer.appendChild(card);
//     });
// }

// displayAvailableDeliveries();


// Display Accepted Donation Requests for Volunteers

const deliveriesContainer = document.getElementById("availableDeliveries");

function displayAvailableDeliveries() {

    const requests = JSON.parse(
        localStorage.getItem("ecoRequests")
    ) || [];

    deliveriesContainer.innerHTML = "";

    const availableTasks = requests.filter(function(request) {
        return request.status === "Accepted";
    });

    if (availableTasks.length === 0) {
        deliveriesContainer.innerHTML =
            "<p>No delivery tasks available right now.</p>";
        return;
    }

    availableTasks.forEach(function(request) {

        const card = document.createElement("div");
        card.className = "dashboard-card";

        const title = document.createElement("h3");
        title.textContent = "📦 " + request.itemName;

        const donor = document.createElement("p");
        donor.textContent = "Donor: " + request.donorName;

        const receiver = document.createElement("p");
        receiver.textContent = "Receiver: " + request.receiverName;

        const location = document.createElement("p");
        location.textContent = "Location: " + request.location;

        const status = document.createElement("p");
        status.textContent = "Status: Waiting for Volunteer";

        const acceptBtn = document.createElement("button");
        acceptBtn.textContent = "Accept Delivery";

        acceptBtn.addEventListener("click", function() {
            acceptDelivery(request.id);
        });

        card.appendChild(title);
        card.appendChild(donor);
        card.appendChild(receiver);
        card.appendChild(location);
        card.appendChild(status);
        card.appendChild(acceptBtn);

        deliveriesContainer.appendChild(card);
    });
}


// Accept Delivery Task

function acceptDelivery(requestId) {

    const volunteer = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (!volunteer) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    let requests = JSON.parse(
        localStorage.getItem("ecoRequests")
    ) || [];

    requests = requests.map(function(request) {

        if (request.id === requestId &&
            request.status === "Accepted") {

            request.status = "Volunteer Assigned";
            request.volunteerName = volunteer.name;
            request.volunteerEmail = volunteer.email;
        }

        return request;
    });

    localStorage.setItem(
        "ecoRequests",
        JSON.stringify(requests)
    );

    alert("Delivery task accepted successfully!");

    displayAvailableDeliveries();
}


// Initial Display

displayAvailableDeliveries();