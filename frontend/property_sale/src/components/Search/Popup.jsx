import ReactMapGL, {Marker, Popup } from 'react-map-gl';

const CustomPopup = ({index, marker, closePopup}) => {
  return (
    <Popup
      latitude={marker.latitude}
      longitude={marker.longitude}
      onClose={closePopup}
      closeButton={true}
      closeOnClick={false}
      offsetTop={-30}
     >
      <p>{marker.name}</p>
    </Popup>
  )};