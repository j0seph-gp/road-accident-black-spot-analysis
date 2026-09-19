// ==========================================
// ROADGUARD - INDIA ROAD ACCIDENT BLACK SPOT MAP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Create the map
    const map = L.map("accident-map");

    // Add OpenStreetMap tiles
    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    // Load black-spot data
    fetch("data/black_spots.json")
        .then(response => response.json())
        .then(blackSpots => {

            // Create a marker cluster group
            const markers = L.markerClusterGroup();

            blackSpots.forEach((spot, index) => {

                // Create marker
                const marker = L.marker([
                    spot.latitude,
                    spot.longitude
                ]);

                // Create popup
                marker.bindPopup(`
                    <div style="min-width: 220px;">
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
                            ${spot.accident_count}
                        </p>

                        <p>
                            <strong>Definition:</strong>
                            5+ accident records at this location
                        </p>
                    </div>
                `);

                // Add marker to cluster
                markers.addLayer(marker);
            });

            // Add all markers to map
            map.addLayer(markers);

            // Automatically zoom to show all locations
            if (markers.getLayers().length > 0) {
                map.fitBounds(markers.getBounds(), {
                    padding: [30, 30]
                });
            }

            console.log(
                "Black spots loaded:",
                blackSpots.length
            );

        })
        .catch(error => {
            console.error(
                "Unable to load black-spot data:",
                error
            );
        });

});
