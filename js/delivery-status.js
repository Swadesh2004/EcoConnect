// Display Delivery Status for Logged-in Receiver

const statusContainer = document.getElementById("deliveryStatus");

const receiver = JSON.parse(localStorage.getItem("loggedInUser"));

function displayDeliveryStatus() {

    const requests = JSON.parse(localStorage.getItem("ecoRequests")) || [];

    statusContainer.innerHTML = "";

    if (!receiver) {
        statusContainer.innerHTML = "<p>Please login first.</p>";
        return;
    }

    const myRequests = requests.filter(function(request) {
        return request.receiverEmail === receiver.email;
    });

    if (myRequests.length === 0) {
        statusContainer.innerHTML = "<p>No delivery records found.</p>";
        return;
    }

    myRequests.forEach(function(request) {

        const card = document.createElement("div");
        card.className = "dashboard-card";

        const title = document.createElement("h3");
        title.textContent = "📦 " + request.itemName;

        const donor = document.createElement("p");
        donor.textContent = "Donor: " + request.donorName;

        const volunteer = document.createElement("p");
        volunteer.textContent = "Volunteer: " + (request.volunteerName || "Not Assigned");

        const location = document.createElement("p");
        location.textContent = "Location: " + request.location;

        const status = document.createElement("p");
        status.textContent = "Delivery Status: " + request.status;

        card.appendChild(title);
        card.appendChild(donor);
        card.appendChild(volunteer);
        card.appendChild(location);
        card.appendChild(status);

        statusContainer.appendChild(card);
    });
}

displayDeliveryStatus();