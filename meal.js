document.addEventListener("DOMContentLoaded", function () {
    const mealDate = document.getElementById("meal-date");
    const mealInputs = {
        breakfast: document.getElementById("breakfast"),
        lunch: document.getElementById("lunch"),
        dinner: document.getElementById("dinner"),
        snacks: document.getElementById("snacks")
    };
    const saveMealBtn = document.getElementById("save-meal");
    const mealPlansDiv = document.getElementById("meal-plans");

    // Load meal plans from local storage
    let mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};

    function displayMeals() {
        mealPlansDiv.innerHTML = "";
        for (let date in mealPlans) {
            let mealData = mealPlans[date];
            let mealEntry = document.createElement("div");
            mealEntry.classList.add("meal-entry");
            mealEntry.innerHTML = `
                <h3>${date}</h3>
                <p><strong>Breakfast:</strong> ${mealData.breakfast || "Not added"}</p>
                <p><strong>Lunch:</strong> ${mealData.lunch || "Not added"}</p>
                <p><strong>Dinner:</strong> ${mealData.dinner || "Not added"}</p>
                <p><strong>Snacks:</strong> ${mealData.snacks || "Not added"}</p>
                <button class="delete-meal" data-date="${date}">Delete</button>
            `;
            mealPlansDiv.appendChild(mealEntry);
        }
    }

    saveMealBtn.addEventListener("click", function () {
        const selectedDate = mealDate.value;
        if (!selectedDate) {
            alert("Please select a date! 📅");
            return;
        }

        mealPlans[selectedDate] = {
            breakfast: mealInputs.breakfast.value.trim(),
            lunch: mealInputs.lunch.value.trim(),
            dinner: mealInputs.dinner.value.trim(),
            snacks: mealInputs.snacks.value.trim()
        };

        localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
        displayMeals();
        alert("Meal Plan Saved! ✅");

        // Clear input fields
        Object.values(mealInputs).forEach(input => (input.value = ""));
    });

    mealPlansDiv.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-meal")) {
            const dateToDelete = event.target.getAttribute("data-date");
            delete mealPlans[dateToDelete];
            localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
            displayMeals();
        }
    });

    displayMeals();
});
