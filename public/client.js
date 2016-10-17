const socket = new WebSocket('ws://localhost:3000/');

let socketOpen = false;
let degrees = 0;

socket.onopen = function (event) {
  socketOpen = true;
};

let handleOrientation = (event /*: DeviceOrientationEvent*/) => {
  if (event.gamma < 0) {
    degrees = 90 - event.beta;
  } else {
    degrees = event.beta - 90;
  }

  if (socketOpen) {
    socket.send({degrees: degrees});
  }
  document.getElementById('alpha').innerHTML = ''+Math.round(event.alpha);
  document.getElementById('beta').innerHTML = ''+Math.round(event.beta);
  document.getElementById('gamma').innerHTML = ''+Math.round(event.gamma);
  document.getElementById('avatar').style.transform = 'rotate(' + degrees + 'deg)';

}

screen.orientation.lock('portrait-primary');

window.addEventListener('deviceorientation', handleOrientation);

socket.onmessage = function (event) {
  document.getElementById('servermessage').innerText = event.data;
};
