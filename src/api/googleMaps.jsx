const GoogleMapsAPI = () => {
  const staticMapsURL = 'https://maps.googleapis.com/maps/api/staticmap?';
  let finalURL = '';

  // eslint-disable-next-line no-unused-vars
  async function getStaticMapImage(locations) {
    try {
      buildStaticURL(locations);
      const response = await fetch(finalURL);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  function buildStaticURL(locations) {
    const size = 'size=500x400';
    const format = 'format=jpg';
    const key = 'key=AIzaSyB3m8qH0IA5oRaM_oRgmweAn7LbBL6uwPg';
    let markers = 'markers=';
    for (let i = 0; i < locations.length; i++) {
      const currentLocation = locations[i];
      markers += `${currentLocation.gpsLatitude},${currentLocation.gpsLongitude}|`;
    }
    finalURL = encodeURI(`${staticMapsURL}${size}&${format}&${markers}&${key}`);
  }
};

export default GoogleMapsAPI;
