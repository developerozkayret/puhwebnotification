let isSubscribed = false;
let swRegistration = null;
let applicationKey = "BORlfoSiRC918h-EWjzRD3X0aUeojrs0X6l4zWX0UClrDPXCYkazxwMme5MjG-dHPyLKBkDrw1DvdGbEru1x96A"; //put_your_public_key_here


// Url Encription
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Installing service worker
//if ('serviceWorker' in navigator && 'PushManager' in window) {
console.log("--> 1 : " + ('serviceWorker' in navigator));
console.log("--> 2 : " + ('PushManager' in window));
console.log("--> 3 : " + (navigator.serviceWorker));
console.log("--> 4 : " + ('serviceWorker' in navigator));
console.log(navigator.serviceWorker);

if (navigator.serviceWorker && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('./sw.js')
    //navigator.serviceWorkerContainer.register('sw.js')
        .then(function (swReg) {
            console.log('service worker registered');

            swRegistration = swReg;

            swRegistration.pushManager.getSubscription()
                .then(function (subscription) {
                    isSubscribed = !(subscription === null);

                    if (isSubscribed) {
                        console.log('User is subscribed');
                    } else {
                        swRegistration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlB64ToUint8Array(applicationKey)
                            })
                            .then(function (subscription) {
                                console.log(subscription);
                                console.log('User is subscribed');

                                saveSubscription(subscription);

                                isSubscribed = true;
                            })
                            .catch(function (err) {
                                console.log('Failed to subscribe user: ', err);
                            })
                    }
                })
        })
        .catch(function (error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging is not supported');
}

// Send request to database for add new subscriber
function saveSubscription(subscription) {
    let xmlHttp = new XMLHttpRequest();
    //put here API address
    xmlHttp.open("POST", "/subscribe");
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState != 4) return;
        if (xmlHttp.status != 200 && xmlHttp.status != 304) {
            console.log('HTTP error ' + xmlHttp.status, null);
        } else {
            console.log("User subscribed to server");
        }
    };

    xmlHttp.send(JSON.stringify(subscription));
}