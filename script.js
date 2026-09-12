// ==========================================
// ROADGUARD - INTERACTIVE BANGALORE MAP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Create the Bangalore map
    const map = L.map("accident-map").setView(
        [12.9716, 77.5946],
        11
    );

    // Add OpenStreetMap tiles
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    // Load our black-spot data
    fetch("data/black_spots.json")
        .then(response => response.json())
        .then(blackSpots => {

            blackSpots.forEach((spot, index) => {

                // Create marker
                const marker = L.marker([
                    spot.latitude,
                    spot.longitude
                ]).addTo(map);


                // Create popup
                marker.bindPopup(`
                    <div style="min-width: 200px;">
                        <h3>🔴 Candidate Black Spot ${index + 1}</h3>

                        <p>
                            <strong>Latitude:</strong>
                            ${spot.latitude}
                        </p>

                        <p>
                            <strong>Longitude:</strong>
                            ${spot.longitude}
                        </p>

                        <p>
                            <strong>Accident Records:</strong>
                            ${spot.accident_records}
                        </p>

                        <p>
                            <strong>Average Risk:</strong>
                            ${spot.average_risk.toFixed(3)}
                        </p>

                        <p>
                            <strong>Maximum Risk:</strong>
                            ${spot.maximum_risk.toFixed(3)}
                        </p>
                    </div>
                `);

            });

        })
        .catch(error => {
            console.error(
                "Unable to load black-spot data:",
                error
            );
        });

});
