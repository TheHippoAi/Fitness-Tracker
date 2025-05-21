document.addEventListener("DOMContentLoaded", function () {
    const categoryLinks = document.querySelectorAll(".sidebar ul li a");
    const workouts = document.querySelectorAll(".workout-card");
    const startButtons = document.querySelectorAll(".start-btn");

    let timers = {}; // Store active timers

    // Function to start the countdown timer
    function startTimer(workoutCard, button) {
        let timerDisplay = workoutCard.querySelector(".timer");
        let duration;

        if (workoutCard.dataset.category === "custom") {
            let customInput = workoutCard.querySelector("#custom-time");
            duration = parseInt(customInput.value) * 60;
            if (isNaN(duration) || duration <= 0) {
                alert("Please enter a valid workout duration! ⏳");
                return;
            }
            customInput.disabled = true;
        } else {
            let minutes = parseInt(workoutCard.querySelector("p").textContent.match(/\d+/)[0]);
            duration = minutes * 60;
        }

        button.textContent = "Stop Workout";

        timers[workoutCard] = setInterval(() => {
            let mins = Math.floor(duration / 60);
            let secs = duration % 60;
            timerDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

            if (duration === 0) {
                clearInterval(timers[workoutCard]);
                delete timers[workoutCard];
                button.textContent = "Start Workout";
                alert("Workout Complete! 🎉");

                if (workoutCard.dataset.category === "custom") {
                    workoutCard.querySelector("#custom-time").disabled = false;
                }
            } else {
                duration--;
            }
        }, 1000);
    }

    // Function to stop the timer
    function stopTimer(workoutCard, button) {
        clearInterval(timers[workoutCard]);
        delete timers[workoutCard];
        button.textContent = "Start Workout";

        if (workoutCard.dataset.category === "custom") {
            workoutCard.querySelector("#custom-time").disabled = false;
        }
    }

    // Toggle start/stop on button click
    startButtons.forEach(button => {
        button.addEventListener("click", function () {
            let workoutCard = this.closest(".workout-card");

            if (timers[workoutCard]) {
                stopTimer(workoutCard, this);
            } else {
                startTimer(workoutCard, this);
            }
        });
    });

    // Filter workouts when clicking on a category
    categoryLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const category = this.getAttribute("data-filter");

            workouts.forEach(workout => {
                const workoutCategory = workout.getAttribute("data-category");

                if (category === "all" || workoutCategory === category) {
                    workout.style.display = "block"; 
                } else {
                    workout.style.display = "none"; 
                }
            });
        });
    });
});
