function sendOTP(event) {
  event.preventDefault();
  generatedOTP = Math.floor(1000 + Math.random() * 9000); 
  alert("📩 OTP sent: " + generatedOTP + "\n(Simulated SMS for demo)");
  document.getElementById("otpSection").style.display = "block";
}

function verifyOTP() {
  let entered = document.getElementById("otp").value;
  if (entered == generatedOTP) {
    alert("✅ Login Successful!");
    window.location.href = "predictpage-eng.html";
  } else {
    alert("❌ Invalid OTP!");
  }
}



function predictCrop(event, lang="en") {
  event.preventDefault();
  let state = document.getElementById("state").value;
  let district = document.getElementById("district").value;
  let crop = document.getElementById("crop").value;
  let area = parseFloat(document.getElementById("area").value);

  let yieldPred = (area * 2.5).toFixed(2);
  let irrigation = "Irrigate 2 times this week";
  let pest = "Monitor for stem borer";
  let weather = "Light rainfall expected in 3 days";
  let fertilizer = "Apply 40kg urea per acre";

  localStorage.setItem("results", JSON.stringify({
    state, district, crop, yieldPred, irrigation, pest, weather, fertilizer
  }));

  if (lang === "en") {
    window.location.href = "finalprediction-eng.html";
  } else {
    window.location.href = "finalprediction-odia.html";
  }
}




// Event listener for the "PREDICT" button on predictpage-eng.html
document.addEventListener('DOMContentLoaded', () => {
    const predictBtn = document.getElementById('predictbtn');
    if (predictBtn) {
        predictBtn.addEventListener('click', () => {
            // Get input values from the form elements
            const state = document.getElementById('State').value;
            const district = document.getElementById('district').value;
            const crop = document.getElementById('Crop').value;
            const area = document.getElementById('area').value;

            // Store the values in the browser's session storage
            sessionStorage.setItem('state', state);
            sessionStorage.setItem('district', district);
            sessionStorage.setItem('crop', crop);
            sessionStorage.setItem('area', area);

            // Redirect to the final prediction page
            window.location.href = 'finalprediction-eng.html';
        });
    }

    // This section runs on finalprediction-eng.html to display the results
    const state = sessionStorage.getItem('state');
    const district = sessionStorage.getItem('district');
    const crop = sessionStorage.getItem('crop');
    const area = sessionStorage.getItem('area');

    if (state && district && crop && area) {
        // Find the elements on the finalprediction page to update
        const yieldCard = document.querySelector('.card .circle');
        const irrigationCard = document.querySelector('.card:nth-child(2) .circle');
        const pesticidesCard = document.querySelector('.card:nth-child(3) .circle');
        const weatherCard = document.querySelector('.section:nth-child(3) .card:nth-child(1) .circle');
        const fertilizersCard = document.querySelector('.section:nth-child(3) .card:nth-child(2) .circle');

        // Hypothetical prediction logic (replace with your actual prediction model)
        const predictedYield = (Number(area) * 2.5).toFixed(2); // Example calculation
        const irrigationSuggestion = "Apply 2 inches of water.";
        const pesticideSuggestion = "Chlorantraniliprole.";
        const weatherInfo = "23 °C and sunny.";
        const fertilizerSuggestion = "Urea and DAP.";

        // Update the content of the cards with the new data
        if (yieldCard) {
            yieldCard.textContent = `${predictedYield} quintals`;
        }
        if (irrigationCard) {
            irrigationCard.innerHTML = irrigationSuggestion.replace(/ /g, '<br>');
        }
        if (pesticidesCard) {
            pesticidesCard.textContent = pesticideSuggestion;
        }
        if (weatherCard) {
            weatherCard.textContent = weatherInfo;
        }
        if (fertilizersCard) {
            fertilizersCard.textContent = fertilizerSuggestion;
        }
    }
});