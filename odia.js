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
    window.location.href = "predictpage-odia.html";
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
  }))};






// Event listener for the "PREDICT" button on predictpage-eng.html and predictpage-odia.html
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

            // Determine the language of the current page and redirect accordingly
            const currentPage = window.location.pathname;
            if (currentPage.includes('predictpage-odia.html')) {
                window.location.href = 'finalprediction-odia.html';
            } else {
                window.location.href = 'finalprediction-eng.html';
            }
        });
    }

    // This section runs on finalprediction-eng.html and finalprediction-odia.html
    const state = sessionStorage.getItem('state');
    const district = sessionStorage.getItem('district');
    const crop = sessionStorage.getItem('crop');
    const area = sessionStorage.getItem('area');

    if (state && district && crop && area) {
        // Find the elements on the final prediction page to update
        const yieldCard = document.querySelector('.card:nth-child(1) .circle');
        const irrigationCard = document.querySelector('.card:nth-child(2) .circle');
        const pesticidesCard = document.querySelector('.card:nth-child(3) .circle');
        const weatherCard = document.querySelector('.section:nth-child(3) .card:nth-child(1) .circle');
        const fertilizersCard = document.querySelector('.section:nth-child(3) .card:nth-child(2) .circle');

        // Hypothetical prediction logic (replace with your actual prediction model)
        const predictedYield = (Number(area) * 2.5).toFixed(2); // Example calculation

        // Determine the language based on the page URL
        const currentPage = window.location.pathname;
        let irrigationSuggestion;
        let pesticideSuggestion;
        let weatherInfo;
        let fertilizerSuggestion;

        if (currentPage.includes('finalprediction-odia.html')) {
            irrigationSuggestion = "2 ଇଞ୍ଚ ପାଣି ଦିଅନ୍ତୁ";
            pesticideSuggestion = "କ୍ଲୋରାଣ୍ଟ୍ରାନିଲିପ୍ରୋଲ୍";
            weatherInfo = "23 °C ଏବଂ ସୁନିଆ";
            fertilizerSuggestion = "ୟୁରିଆ ଏବଂ ଡିଏପି";
        } else {
            // Default to English if the page isn't Odia
            irrigationSuggestion = "Apply 2 inches of water.";
            pesticideSuggestion = "Chlorantraniliprole.";
            weatherInfo = "23 °C and sunny.";
            fertilizerSuggestion = "Urea and DAP.";
        }

        // Update the content of the cards with the new data
        if (yieldCard) {
            if (currentPage.includes('finalprediction-odia.html')) {
                yieldCard.textContent = `${predictedYield} କ୍ୱିଣ୍ଟାଲ୍`;
            } else {
                yieldCard.textContent = `${predictedYield} quintals`;
            }
        }
        if (irrigationCard) {
            // The English page already has a line break, so we replace with spaces.
            // The Odia page needs a line break added.
            if (currentPage.includes('finalprediction-odia.html')) {
                irrigationCard.innerHTML = irrigationSuggestion.replace(/ /g, '<br>');
            } else {
                irrigationCard.innerHTML = irrigationSuggestion.replace(/ /g, '<br>');
            }
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
