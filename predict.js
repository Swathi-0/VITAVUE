// script.js
document.getElementById("predictButton").addEventListener("click", async () => {
    const nirVoltage = parseFloat(document.getElementById("nirVoltage").value);
    const bpm = parseFloat(document.getElementById("bpm").value);
    const spo2 = parseFloat(document.getElementById("spo2").value);

    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to make a prediction.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ nirVoltage, bpm, spo2 })
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById("result").innerText = `Predicted Glucose Level: ${data.predictedGlucose}`;
        } else {
            console.error("Error:", data);
            document.getElementById("result").innerText = "Error predicting glucose level.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Error predicting glucose level.";
    }
});
