import React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "300px",
}

const onLoad = marker => {
  console.log("marker: ", marker)
}

const Map = ({ lng, lat, zoom }) => {
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  }
  return (
    <div className="mt-14">
      <LoadScript googleMapsApiKey={process.env.GATSBY_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={parseInt(zoom)}
        >
          <Marker onLoad={onLoad} position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Map
