document.addEventListener("DOMContentLoaded", function () {
    // Handle page navigation
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            sections.forEach(section => section.classList.remove("active"));
            sections.forEach(section => section.style.display = "none");
            const targetSection = document.querySelector(this.getAttribute("href"));
            targetSection.classList.add("active");
            targetSection.style.display = "block";
        });
    });

    // Initial display of home page
    document.querySelector("#home").classList.add("active");
    sections.forEach(section => section.style.display = "none");
    document.querySelector("#home").style.display = "block";

    // Real-time time slots based on date selection for booking
    const timeSelect = document.getElementById("time");
    const dateInput = document.getElementById("date");

    dateInput.addEventListener("change", function () {
        timeSelect.innerHTML = "";
        const availableTimes = getAvailableTimesForDate(new Date(this.value));
        availableTimes.forEach(time => {
            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    });

    // Real-time time slots based on date selection for managing appointment
    const manageTimeSelect = document.getElementById("manage-time");
    const manageDateInput = document.getElementById("manage-date");

    manageDateInput.addEventListener("change", function () {
        manageTimeSelect.innerHTML = "";
        const availableTimes = getAvailableTimesForDate(new Date(this.value));
        availableTimes.forEach(time => {
            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            manageTimeSelect.appendChild(option);
        });
    });

    function getAvailableTimesForDate(date) {
        const times = [];
        for (let i = 9; i <= 17; i++) {
            times.push(`${i}:00`);
        }
        return times;
    }

    // Booking appointment: Submit form data to the backend
    document.getElementById("appointmentForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch("book_appointment.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                alert(data); // Show success message from backend
                this.reset(); // Clear the form
            })
            .catch(error => console.error("Error:", error));
    });

    // Manage appointment: Retrieve appointment details from the backend
    document.getElementById("manageForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch("retrieve_appointment.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    document.getElementById("appointment-details").style.display = "block";
                    document.getElementById("appointment-date").textContent = data.appointment_date;
                    document.getElementById("appointment-time-display").textContent = data.appointment_time;
                    document.getElementById("appointment-service-display").textContent = data.service;
                } else {
                    alert("No appointment found.");
                }
            })
            .catch(error => console.error("Error:", error));
    });

    // Handle appointment cancellation
    document.getElementById("cancel-appointment").addEventListener("click", function () {
        alert("Your appointment has been canceled.");
        document.getElementById("appointment-details").style.display = "none";
    });

    // Handle appointment update
    document.getElementById("update-appointment").addEventListener("click", function () {
        alert("Your appointment has been updated.");
    });

    // Contact form: Submit message (optional enhancement)
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        if (validateForm("contactForm")) {
            alert("Your message has been successfully sent!");
            this.reset(); // Clear the contact form
        }
    });

    // Form validation: Ensure all fields are filled
    function validateForm(formId) {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll("input, select, textarea");
        let valid = true;

        inputs.forEach(input => {
            if (!input.value) {
                alert("Please fill out all required fields.");
                valid = false;
                return;
            }
        });

        return valid;
    }
});
