document.addEventListener("DOMContentLoaded", function () {
    // Profile Fields
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const ageInput = document.getElementById("age");
    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const goalSelect = document.getElementById("goal");
    const saveProfileBtn = document.getElementById("save-profile");

    // Load Profile Data
    let userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
    function loadProfile() {
        nameInput.value = userProfile.name || "";
        emailInput.value = userProfile.email || "";
        ageInput.value = userProfile.age || "";
        heightInput.value = userProfile.height || "";
        weightInput.value = userProfile.weight || "";
        goalSelect.value = userProfile.goal || "none";
    }

    // Save Profile Data
    saveProfileBtn.addEventListener("click", function () {
        if (!nameInput.value.trim() || !emailInput.value.trim()) {
            alert("Name and Email are required!");
            return;
        }

        userProfile = {
            name: nameInput.value,
            email: emailInput.value,
            age: ageInput.value,
            height: heightInput.value,
            weight: weightInput.value,
            goal: goalSelect.value
        };

        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        alert("Profile Saved Successfully! ✅");
    });

    loadProfile();

    // Profile Picture Upload
    const profileImg = document.getElementById("profile-img");
    const uploadImg = document.getElementById("upload-img");

    uploadImg.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
                localStorage.setItem("profileImg", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    profileImg.src = localStorage.getItem("profileImg") || "default-avatar.png";

    // Logout & Delete Account
    document.getElementById("logout-btn").addEventListener("click", function () {
        alert("Logged Out! You will be redirected.");
        window.location.href = "index.html"; // Redirect to login/home page
    });

    document.getElementById("delete-account-btn").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
            localStorage.clear();
            alert("Account Deleted! You will be redirected.");
            window.location.href = "index.html";
        }
    });
});
