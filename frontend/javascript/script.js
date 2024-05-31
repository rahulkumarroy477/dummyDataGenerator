const personKeys = [
    "first_name",
    "last_name",
    "email",
    "gender",
    "ip_address",
    "mac_address",
    "address",
    "birthdate",
    "phone",
    "job_title",
    "nationality",
    "city",
    "language",
    "company_name"
];

const addNewRow = document.querySelector("#add-new-content");
const content = document.querySelector('#content');


addNewRow.addEventListener("click", (event) => {
    if (content.children.length < personKeys.length) {
        const newChildElem = document.createElement('div');
        newChildElem.classList.add('items');
        newChildElem.innerHTML = `
        <input type="text" class="box" placeholder="item">
        <div class="dropdown box">
            <h4>Value</h4>
            <i class="ri-expand-up-down-fill"></i>
        </div>
        <i class="ri-delete-bin-line"></i>`;
        content.appendChild(newChildElem);
    } else {
        alert("You have reached the maximum limit of elements.");
    }
});

// Event delegation for delete buttons
content.addEventListener("click", function (event) {
    if (event.target.classList.contains('ri-delete-bin-line')) {
        const parentElement = event.target.parentElement;
        parentElement.remove();
    }
});


content.addEventListener("click", function (event) {
    if (event.target.classList.contains('ri-expand-up-down-fill')) {
        document.querySelectorAll(".output").forEach(function (openDropdown) {
            openDropdown.remove();
        });

        const ul = document.createElement("ul");
        ul.className = "output";

        // Create the <li> elements and append them to the <ul>
        personKeys.forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);

            // Add click event listener to <li> elements
            li.addEventListener("click", function () {
                // Update the h4 text content with the clicked item's value
                const h4 = event.target.parentElement.querySelector("h4");
                h4.textContent = item;

                // Remove the dropdown menu
                ul.remove();
            });
        });

        // Append the <ul> to the parent of the clicked dropdown
        const parent = event.target.parentElement;
        parent.appendChild(ul);

        // Prevent event propagation to avoid immediate closing
        event.stopPropagation();
    }
});

document.addEventListener("click", function (event) {
    document.querySelectorAll(".output").forEach(function (openDropdown) {
        openDropdown.remove();
    });
});

