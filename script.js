const wrapper = document.querySelector('.wrapper'),
  inputField = document.querySelector('.input-part input'),
  airportInfo = document.querySelector('.airport_info'),
  airportCity = document.querySelector('.airport_city');
airportName = document.querySelector('.airport_name');
airportDistance = document.querySelector('.airport_distance');
locationBtn = document.querySelector('.location_btn');

inputField.addEventListener('keyup', (e) => {
  if (e.key == 'Enter' && inputField.value != '') {
    fetchAdress(inputField.value);
  }
});

let api;

function fetchAdress(city) {
  api = `https://geocode.search.hereapi.com/v1/geocode?q=${city}&apiKey=bdbfVIM6XDo6zssVMo2hrJkDURU_lfEyNn1HisDpOd4`;
  fetch(api)
    .then((resp) => resp.json())
    .then((result) => coords(result));
}

function coords(info) {
  const { lat, lng } = info.items[0].position;
  api = `https://airlabs.co/api/v9/nearby?lat=${lat}&lng=${lng}&distance=20&api_key=74df6798-41e2-4e4f-8380-642d18496b5b`;
  fetch(api)
    .then((resp) => resp.json())
    .then((result) => nearbyAirport(result));
}

function nearbyAirport(info) {
  airportInfo.classList.add('active');
  airportCity.innerHTML = info.response.cities[0].name;
  airportName.innerHTML = info.response.airports[0].name;
  airportDistance.innerHTML =
    Math.round(info.response.airports[0].distance) + 'km';
}
locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert('Can not get your Geolocation');
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://airlabs.co/api/v9/nearby?lat=${latitude}&lng=${longitude}&distance=20&api_key=74df6798-41e2-4e4f-8380-642d18496b5b`;
  fetch(api)
    .then((resp) => resp.json())
    .then((result) => nearbyAirportBtn(result));
}

function onError(error) {
  console.log(error);
}

function nearbyAirportBtn(info) {
  airportInfo.classList.add('active');
  airportCity.innerHTML = info.response.cities[0].name;
  airportName.innerHTML = info.response.airports[0].name;
  airportDistance.innerHTML =
    Math.round(info.response.airports[0].distance) + 'km';
}
