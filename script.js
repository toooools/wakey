// The wake lock sentinel.
let wakeLock = null;

// Function that attempts to request a screen wake lock.
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request();
    wakeLock.addEventListener("release", () => {
      console.log("Screen Wake Lock released:", wakeLock.released);
    });
    console.log("Screen Wake Lock released:", wakeLock.released);
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};

const handleVisibilityChange = async () => {
  if (wakeLock !== null && document.visibilityState === "visible") {
    await requestWakeLock();
  }
};

const show = document.getElementById('show');

const alertBox = document.getElementsByClassName('alert')[0];


function showAlert(type, message) {
	if (type === "info") {
		alertBox.innerHTML = createMessage("Info", message)
	}
	alertBox.classList.add("show");
	alertBox.classList.add(type);
	window.setTimeout( ()=> {
		alertBox.classList.remove("show");
	}, 5000)
}

function createMessage(title, message) {
	return (
		`<span class="alert-title">${title}</span>
		<span class="alert-message">${message}</span>`
	)
}

show.addEventListener('click', function() { showAlert("info", "Hi")});

window.addEventListener("load", requestWakeLock);
document.addEventListener("visibilitychange", handleVisibilityChange);
