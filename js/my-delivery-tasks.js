const tasksContainer = document.getElementById("myDeliveryTasks");

const volunteer = JSON.parse(localStorage.getItem("loggedInUser"));

function displayMyDeliveryTasks() {
    const requests = JSON.parse(localStorage.getItem("ecoRequests")) || [];

    tasksContainer.innerHTML = "";

    if (!volunteer) {
        tasksContainer.innerHTML = "<p>Please login first.</p>";
        return;
    }

    const myTasks = requests.filter(function(request) {
        return request.volunteerEmail === volunteer.email;
    });

    if (myTasks.length === 0) {
        tasksContainer.innerHTML = "<p>No delivery tasks accepted yet.</p>";
        return;
    }

    myTasks.forEach(function(request) {
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
        status.textContent = "Status: " + request.status;

        card.appendChild(title);
        card.appendChild(donor);
        card.appendChild(receiver);
        card.appendChild(location);
        card.appendChild(status);

        if (request.status === "Volunteer Assigned") {
            const pickupBtn = document.createElement("button");
            pickupBtn.textContent = "Mark as Picked Up";

            pickupBtn.addEventListener("click", function() {
                updateTaskStatus(request.id, "Picked Up");
            });

            card.appendChild(pickupBtn);
        } 
        else if (request.status === "Picked Up") {
            const deliveredBtn = document.createElement("button");
            deliveredBtn.textContent = "Mark as Delivered";

            deliveredBtn.addEventListener("click", function() {
                updateTaskStatus(request.id, "Delivered");
            });

            card.appendChild(deliveredBtn);
        }

        tasksContainer.appendChild(card);
    });
}

function updateTaskStatus(requestId, newStatus) {
    let requests = JSON.parse(localStorage.getItem("ecoRequests")) || [];

    requests = requests.map(function(request) {
        if (request.id === requestId) {
            request.status = newStatus;
        }
        return request;
    });

    localStorage.setItem("ecoRequests", JSON.stringify(requests));

    displayMyDeliveryTasks();
}

displayMyDeliveryTasks();