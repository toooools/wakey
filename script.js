// The wake lock sentinel.
let wakeLock = null;

// Function that attempts to request a screen wake lock.
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request();
    if(!wakeLock.released) {
      showAlert("success", "Screen wake is active.");
    }
  } catch (err) {
    showAlert("error", `${err.name}, ${err.message}`);
  }
};

//Re-call wakelock when visibility changes.
const handleVisibilityChange = async () => {
  if (wakeLock !== null && document.visibilityState === "visible") {
    await requestWakeLock();
  }
};

//Get alert-box from document.
const alertBox = document.getElementsByClassName('alert')[0];

//Alert-box functionality.
function showAlert(type, message) {
  alertBox.innerHTML = `<svg role="img" class="alert-icon"><use xlink:href="#svgsprite-icon-${type}"></use></svg><span class="alert-message">${message}</span>`
	alertBox.classList.add("show");
	alertBox.classList.add(type);
	window.setTimeout( ()=> {
		alertBox.classList.remove("show");
    alertBox.classList.remove(type);
	}, 5000)
}

//Request wakeLock on page load.
window.addEventListener("load", requestWakeLock);

//Re-acquire wakeLock when page comes back to visibility.
document.addEventListener("visibilitychange", handleVisibilityChange);
