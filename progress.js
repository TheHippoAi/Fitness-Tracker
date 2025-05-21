document.addEventListener("DOMContentLoaded", function () {
    // ---------------- Weight Tracker ----------------
    const weightInput = document.getElementById("weight-input");
    const saveWeightBtn = document.getElementById("save-weight");
    const weightList = document.getElementById("weight-list");

    let weightData = JSON.parse(localStorage.getItem("weightData")) || [];

    function displayWeightData() {
        weightList.innerHTML = "";
        weightData.forEach(entry => {
            let listItem = document.createElement("li");
            listItem.textContent = `📅 ${entry.date} - ⚖️ ${entry.weight} kg`;
            weightList.appendChild(listItem);
        });
    }

    saveWeightBtn.addEventListener("click", function () {
        let weight = weightInput.value.trim();
        if (!weight) {
            alert("Please enter a valid weight! ⚖️");
            return;
        }

        let today = new Date().toLocaleDateString();
        weightData.push({ date: today, weight });
        localStorage.setItem("weightData", JSON.stringify(weightData));
        displayWeightData();
        weightInput.value = "";
    });

    displayWeightData();

    // ---------------- Workout Streak ----------------
    const streakCounter = document.getElementById("streak-counter").querySelector("span");
    let streak = localStorage.getItem("workoutStreak") || 0;

    function updateStreak() {
        streak++;
        localStorage.setItem("workoutStreak", streak);
        streakCounter.textContent = streak;
    }

    function workoutStarted() {
        updateStreak();
        alert("Workout Started! Streak Updated 🔥");
    }

    // ---------------- Calories Burned Graph (Fixed) ----------------
    const ctx = document.getElementById("caloriesChart")?.getContext("2d");

    if (ctx) {
        let caloriesData = JSON.parse(localStorage.getItem("caloriesData")) || [200, 350, 400, 500, 600];

        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
                datasets: [{
                    label: "Calories Burned",
                    data: caloriesData,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});
