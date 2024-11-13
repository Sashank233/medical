// Initialize Web3
let web3;

if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
} else {
    console.log('Please install MetaMask or another Ethereum wallet!');
}

// Expanded data for demo purposes
const data = {
    "Diabetes": {
        "medicines": ["Metformin", "Insulin"],
        "diet": ["Low sugar", "High fiber"],
        "dos": ["Regular exercise", "Monitor blood sugar"],
        "donts": ["Avoid sweets", "No alcohol"]
    },
    "Hypertension": {
        "medicines": ["Amlodipine", "Losartan"],
        "diet": ["Low sodium", "Vegetables"],
        "dos": ["Monitor BP", "Low stress"],
        "donts": ["No salty foods", "No caffeine"]
    },
    "Fever": {
        "medicines": ["dolo650", "paracetamol"],
        "diet": ["Fruits", "Vegetables"],
        "dos": ["Drink plenty of water", "Rest"],
        "donts": ["No non-veg food", "Taking too much stress"]
    },
    "Common-Cold":
    {
        "medicines":["Sudafed", "Suphedrine PE"],
        "diet":["water","Hot-food"],
        "dos":["Drink plenty of water","Rest"],
        "donts":["No cold drinks","No smoking"]
    },
    "Flu":
    {
        "medicines":["oseltamivir phosphate","zanamivir"],
        "diet":["water","Hot-food"],
        "dos":["Drink plenty of water","Rest"],
        "donts":["Avoid being around other people when you or they are sick with the flu or other infectious diseases"]
    }

};

// Function to get suggestions based on the input
// Function to get suggestions based on the input
function getSuggestions() {
    const patientName = document.getElementById('patient-name').value.trim();
    const diseaseInput = document.getElementById('disease-input').value.trim();
    const disease = diseaseInput.charAt(0).toUpperCase() + diseaseInput.slice(1); // Capitalize the first letter

    if (data[disease]) {
        const { medicines, diet, dos, donts } = data[disease];

        const patientData = {
            name: patientName,
            disease,
            medicines,
            diet,
            dos,
            donts
        };

        // Store patient data in local storage
        localStorage.setItem(patientName, JSON.stringify(patientData));

        // Display suggestions
        document.getElementById('medicine-suggestions').innerHTML = `
            <h3>Medicine Suggestions for ${patientName}</h3>
            <ul>${medicines.map(med => `<li>${med}</li>`).join('')}</ul>
        `;

        document.getElementById('diet-recommendations').innerHTML = `
            <h3>Diet Recommendations</h3>
            <ul>${diet.map(item => `<li>${item}</li>`).join('')}</ul>
        `;

        document.getElementById('dos-donts').innerHTML = `
            <h3>Dos and Don'ts</h3>
            <p><strong>Dos:</strong> ${dos.join(', ')}</p>
            <p><strong>Don'ts:</strong> ${donts.join(', ')}</p>
        `;
    } else {
        alert('No data available for the entered disease!');
    }
}

// Function to retrieve patient data from local storage
function getPatientData() {
    const patientName = document.getElementById('patient-name').value.trim();
    const storedData = localStorage.getItem(patientName);

    if (storedData) {
        const { disease, medicines, diet, dos, donts } = JSON.parse(storedData);

        document.getElementById('medicine-suggestions').innerHTML = `
            <h3>Medicine Suggestions for ${patientName}</h3>
            <ul>${medicines.map(med => `<li>${med}</li>`).join('')}</ul>
        `;

        document.getElementById('diet-recommendations').innerHTML = `
            <h3>Diet Recommendations</h3>
            <ul>${diet.map(item => `<li>${item}</li>`).join('')}</ul>
        `;

        document.getElementById('dos-donts').innerHTML = `
            <h3>Dos and Don'ts</h3>
            <p><strong>Dos:</strong> ${dos.join(', ')}</p>
            <p><strong>Don'ts:</strong> ${donts.join(', ')}</p>
        `;
    } else {
        alert('No data available for this patient!');
    }
}
