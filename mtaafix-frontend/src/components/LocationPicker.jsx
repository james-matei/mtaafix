import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents
} from "react-leaflet";
import L from "leaflet";

// Leaflet marker fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function MapClickHandler({ position, onMapClick }) {

    useMapEvents({
        click(e) {

            const coords = {
                lat: e.latlng.lat,
                lng: e.latlng.lng
            };

            onMapClick(coords);
        }
    });

    return position ? <Marker position={position} /> : null;
}

function LocationPicker({ onLocationSelect }) {

    const [position, setPosition] = useState(null);

    const handleLocationSelect = async (coords) => {

        setPosition(coords);

        try {

            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`
            );

            const data = await response.json();
            const address = data.adress || {};

            const location = [
                address.road ,
                address.suburb || address.neighbourhood || address.city_district,
            address.city || address.town || address.village || address.county
            ]
            .filter(Boolean)
            .join(", ");

            onLocationSelect({
                latitude: coords.lat,
                longitude: coords.lng,
                location: location || data.display_name || "Unknown location"
            });

        } catch (error) {

            console.error("Reverse geocoding failed:", error);

            // Still send coordinates even if address lookup fails
            onLocationSelect({
                latitude: coords.lat,
                longitude: coords.lng,
                location: "Unknown location"
            });
        }
    };

    return (

        <div style={{ marginTop: "20px" }}>

            <MapContainer
                center={[-1.286389, 36.817223]}
                zoom={13}
                style={{
                    height: "400px",
                    width: "100%",
                    borderRadius: "12px"
                }}
            >

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler
                    position={position}
                    onMapClick={handleLocationSelect}
                />

            </MapContainer>

            {position && (

                <div style={{ marginTop: "15px" }}>

                    <strong>Latitude:</strong> {position.lat.toFixed(6)}

                    <br />

                    <strong>Longitude:</strong> {position.lng.toFixed(6)}

                </div>

            )}

        </div>

    );
}

export default LocationPicker;