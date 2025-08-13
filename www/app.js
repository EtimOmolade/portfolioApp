document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    const deviceButton = document.getElementById('deviceButton');
    const deviceInfo = document.getElementById('deviceInfo');
    console.log('deviceButton:', deviceButton);
    console.log('deviceInfo:', deviceInfo);
    console.log('window.device:', window.device);

    if (deviceButton) {
        deviceButton.addEventListener('touchend', (event) => {
            event.preventDefault();
            console.log('Device button touch registered');
            showDeviceInfo();
        });
        deviceButton.addEventListener('click', () => {
            console.log('Device button click registered');
            showDeviceInfo();
        });
        console.log('deviceButton properties:', {
            disabled: deviceButton.disabled,
            style: deviceButton.style.cssText,
            rect: deviceButton.getBoundingClientRect()
        });
    } else {
        console.error('deviceButton not found');
    }

    function showDeviceInfo() {
        if (window.device) {
            const info = `
                Platform: ${device.platform}<br>
                Version: ${device.version}<br>
                Model: ${device.model}<br>
                UUID: ${device.uuid}
            `;
            deviceInfo.innerHTML = info;
            console.log('Device Info:', info);
        } else {
            deviceInfo.innerHTML = 'Device plugin not loaded';
            console.error('Device plugin not loaded');
        }
    }
}

function sayHello() {
    console.log('Hello! Thanks for visiting.');
    alert("Hello! Thanks for visiting.");
}