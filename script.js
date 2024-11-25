const unavailableDates = [
    "2024-12-05",
    "2024-12-06",
];

let bookedDates = [];

function initializeDatePicker() {
    flatpickr("#date-picker", {
        mode: "multiple",
        dateFormat: "Y-m-d",
        disable: [...unavailableDates, ...bookedDates],
        onChange: (selectedDates) => {
            const formattedDates = selectedDates.map(date => date.toISOString().split('T')[0]);
            console.log("Currently selected dates (onChange):", formattedDates);
        },
    });
}

function formatDateLocal(date) {
    return date.toLocaleDateString('en-CA'); // Gibt das Datum im Format 'YYYY-MM-DD' zurück
}

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const datePickerInstance = document.getElementById('date-picker')._flatpickr;
    const selectedDates = datePickerInstance.selectedDates.map(date => formatDateLocal(date));

    console.log("Selected dates at submit (raw):", datePickerInstance.selectedDates);
    console.log("Selected dates at submit (formatted):", selectedDates);

    if (name && selectedDates.length > 0) {
        selectedDates.forEach(date => {
            if (!bookedDates.includes(date)) {
                bookedDates.push(date);
            }
        });

        console.log("Final booked dates list:", bookedDates);

        // Zeige die gebuchten Tage an
        showBookedDatesOnPage();

        document.getElementById('confirmation-message').style.display = 'block';
        document.getElementById('confirmation-message').innerText = `Danke ${name}, die Buchung für folgende Tage war erfolgreich: ${selectedDates.join(", ")} - wir freuen uns auf Euren Besuch :-)`;

        initializeDatePicker();
    } else {
        alert("Bitte alle Felder ausfüllen und mindestens einen Termin auswählen.");
    }
});

// Funktion, um die gebuchten Tage anzuzeigen
function showBookedDatesOnPage() {
    const bookedDatesList = document.getElementById('booked-dates-list');
    if (bookedDates.length === 0) {
        bookedDatesList.innerHTML = "Es gibt keine gebuchten Tage.";
    } else {
        bookedDatesList.innerHTML = "Gebuchte Tage: " + bookedDates.join(", ");
    }
}


// Initialize the date picker on page load
document.addEventListener('DOMContentLoaded', initializeDatePicker);
