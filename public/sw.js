let notificationUrl = '';
//notification registered feature for getting update automatically from server api
self.addEventListener('push', function (event) {
    console.log('Push received: ', event);
    let _data = event.data ? JSON.parse(event.data.text()) : {};
    notificationUrl = _data.url;
    //vibrate: [200, 100, 200, 100, 200, 100, 200],
    console.log(_data.image);
    event.waitUntil(
        self.registration.showNotification(_data.title, {
            body: _data.message,
            image:_data.image,
            icon: _data.icon,
            tag: _data.tag,
            path:__data.path
        })
    );
});

//notification url redirect event click
self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window"
        })
        .then(function (clientList) {
            if (clients.openWindow) {
                return clients.openWindow(notificationUrl);
            }
        })
    );
});