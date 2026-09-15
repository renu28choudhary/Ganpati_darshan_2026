let cameraStream = null;

async function startCamera() {

    const video = document.getElementById("visitorCamera");
    const message = document.getElementById("message");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = cameraStream;

        message.textContent =
            "Camera is ready. Enjoy Ganpati Darshan.";

        startButton.disabled = true;
        stopButton.disabled = false;

    } catch (error) {

        message.textContent =
            "Camera access was not enabled.";

        console.log(error);
    }
}

function stopCamera() {

    const video = document.getElementById("visitorCamera");
    const message = document.getElementById("message");
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");

    if (cameraStream) {

        cameraStream.getTracks().forEach(track => {
            track.stop();
        });

        cameraStream = null;
    }

    video.srcObject = null;

    message.textContent =
        "Darshan ended.";

    startButton.disabled = false;
    stopButton.disabled = true;
}

document.getElementById("startButton").addEventListener("click", startCamera);

document.getElementById("stopButton").addEventListener("click", stopCamera);