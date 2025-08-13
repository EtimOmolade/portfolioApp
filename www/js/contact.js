document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device is ready on contact page.');

    const cameraButton = document.getElementById('cameraButton');
    const photoPreview = document.getElementById('photoPreview');
    console.log('cameraButton:', cameraButton);
    console.log('photoPreview:', photoPreview);

    // Log plugin availability for debugging
    console.log('navigator.camera:', navigator.camera);
    console.log('window.plugins.callNumber:', window.plugins.callNumber);
    console.log('cordova.plugins.permissions:', cordova.plugins.permissions);

    // --- Call Button Logic ---
    const callButton = document.getElementById('callButton');
    if (callButton) {
        callButton.addEventListener('click', () => {
            console.log('Call button clicked');
            requestCallPermission();
        });
        callButton.addEventListener('touchend', (event) => {
            event.preventDefault(); // Prevent double-tap zoom
            console.log('Call button touch registered');
            requestCallPermission();
        });
    }

    if (cameraButton) {
        cameraButton.addEventListener('touchend', (event) => {
            event.preventDefault(); // Prevent double-tap zoom
            console.log('Camera button touch registered');
            requestCameraPermission();
        });
        cameraButton.addEventListener('click', () => {
            console.log('Camera button click registered');
            requestCameraPermission();
        });
    }

    function requestCallPermission() {
        const permissions = cordova.plugins.permissions;
        const callPermission = permissions.CALL_PHONE;

        permissions.checkPermission(callPermission, (status) => {
            if (status.hasPermission) {
                makeCall();
            } else {
                permissions.requestPermission(callPermission, (status) => {
                    if (status.hasPermission) {
                        makeCall();
                    } else {
                        alert('Call permission denied. Please enable it in app settings.');
                    }
                }, () => {
                    alert('Failed to request call permission.');
                });
            }
        }, null);
    }

    function makeCall() {
        const numberToCall = '+2347036875750';
        const bypassAppChooser = true;

        window.plugins.callNumber.callNumber(
            (result) => {
                console.log("Call Success: " + result);
            },
            (error) => {
                console.error("Call Error: " + error);
                alert("Failed to make a call. Please check permissions and try again.");
            },
            numberToCall,
            bypassAppChooser
        );
    }

    function requestCameraPermission() {
        const permissions = cordova.plugins.permissions;
        const cameraPermission = permissions.CAMERA;

        permissions.checkPermission(cameraPermission, (status) => {
            if (status.hasPermission) {
                openCamera();
            } else {
                permissions.requestPermission(cameraPermission, (status) => {
                    if (status.hasPermission) {
                        openCamera();
                    } else {
                        alert('Camera permission denied. Please enable it in app settings.');
                    }
                }, () => {
                    alert('Failed to request camera permission.');
                });
            }
        }, null);
    }

    function openCamera() {
        console.log('Opening camera...');
        const options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true
        };

        navigator.camera.getPicture(onSuccess, onFail, options);
    }

    function onSuccess(imageData) {
        photoPreview.src = "data:image/jpeg;base64," + imageData;
        photoPreview.style.display = 'block';
    }

    function onFail(message) {
        alert('Failed to open camera: ' + message);
        console.error('Camera failed: ' + message);
    }
}