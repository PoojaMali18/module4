async function lookupPincode() {
    const pincodeInput = document.getElementById("pincodeInput");
    const loader = document.getElementById("loader");
    const resultContainer = document.getElementById("resultContainer");

    const pincode = pincodeInput.value.trim();

    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        showError("Please enter a valid 6-digit pincode.");
        return;
    }

    loader.style.display = "block";
    resultContainer.innerHTML = "";

    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data[0].Status === "Error") {
            showError(data[0].Message);
        } else {
            showResults(data[0].PostOffice);
        }
    } catch (error) {
        showError("An error occurred while fetching data.");
    } finally {
        loader.style.display = "none";
    }
}

function showResults(postOffices) {
    const resultContainer = document.getElementById("resultContainer");
    const filterInput = document.getElementById("filterInput");

    resultContainer.innerHTML = "";

    if (postOffices.length === 0) {
        resultContainer.innerHTML = "<p>Couldn’t find the postal data you’re looking for…</p>";
        return;
    }

    const filteredPostOffices = postOffices;

    filteredPostOffices.forEach(postOffice => {
        const postOfficeDiv = document.createElement("div");
        postOfficeDiv.innerHTML = `
            <strong>${postOffice.Name}</strong>
            <p>Branch Type: ${postOffice.BranchType}</p>
            <p>District: ${postOffice.District}</p>
            <p>State: ${postOffice.State}</p>
            <hr>
        `;
        resultContainer.appendChild(postOfficeDiv);
    });
}

function showError(message) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `<p class="error">${message}</p>`;
}

function filterResults() {
    const filterInput = document.getElementById("filterInput");
    const resultContainer = document.getElementById("resultContainer");
    const pincodeInput = document.getElementById("pincodeInput");

    const searchTerm = filterInput.value.toLowerCase();
    const postOffices = resultContainer.getElementsByTagName("div");

    for (const postOffice of postOffices) {
        const name = postOffice.querySelector("strong").textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            postOffice.style.display = "block";
        } else {
            postOffice.style.display = "none";
        }
    }
}