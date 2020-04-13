// const pushServerPublicKey = "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8";
 const pushServerPublicKey = "BC2oj5ErHa3WsK2IWDqbqnwwb2W0d0DopO9FlcnqfOOFAr-Gh5-hSn4CNP8fnSQ3jNl7TPbh2-s4V3Dcqir1KzI";


/**
 * checks if Push notification and service workers are supported by your browser
 */
function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
function askNotificationPermission() {
    // request user grant to show notification
    return Notification.requestPermission(function (result) {
        return result;
    });
}
/**
 * shows a notification
 */
function sendNotification() {
    const img = "/images/claps.jpg";
    const text = "Take a look at this brand new t-shirt!";
    const title = "New featur Available";
    const options = {
        actions: [{ action: "Detail", title: "View", icon: "images/menu.png" }],
        badge: "images/homepage.png",
        body: text,
        icon: "/images/menu.png",
        image: img,
        tag: "new-product",
        vibrate: [200, 100, 200],
    };
    navigator.serviceWorker.ready.then(function (serviceWorker) {
        // tslint:disable-next-line: no-console
        console.log(2223444444);
        serviceWorker.showNotification(title, options);
    }).catch(error => {
        // tslint:disable-next-line: no-console
        console.log(19999999, error);
    });
}

/**
 * 
 */
function registerServiceWorker() {
    // tslint:disable-next-line: no-console
    console.log("registerServiceWorker");

    return navigator.serviceWorker.register("/service-worker.js").then(function (swRegistration) {
        //you can do something with the service wrker registration (swRegistration)
        // tslint:disable-next-line: no-console
        console.log(23444, swRegistration);
    });
}

/**
 * 
 * using the registered service worker creates a push notification subscription and returns it
 * 
 */
function createNotificationSubscription() {
    //wait for service worker installation to be ready, and then
    return navigator.serviceWorker.ready.then(function (serviceWorker) {
        // tslint:disable-next-line: no-console
        console.log(3232323232323)
        // subscribe and return the subscription
        return serviceWorker.pushManager
            .subscribe({
                applicationServerKey: pushServerPublicKey,
                userVisibleOnly: true,
            })
            .then(function (subscription) {
                // tslint:disable-next-line: no-console
                console.log("User is subscribed.", subscription);
                return subscription;
            })
            .catch(error => {
                // tslint:disable-next-line: no-console
                console.log("User is not subscribed.", error)
            });
    });
}

/**
 * returns the subscription if present or nothing
 */
function getUserSubscription() {
    //wait for service worker installation to be ready, and then
    return navigator.serviceWorker.ready
        .then(function (serviceWorker) {
            return serviceWorker.pushManager.getSubscription();
        })
        .then(function (pushSubscription) {
            return pushSubscription;
        }).catch(error => {
            // tslint:disable-next-line: no-console
            console.log("There is not old pushSubscription. ", error)

        });
}

function unregister() {

    if ('serviceWorker' in navigator) {

        // tslint:disable-next-line: no-console
        console.log("unregister 88");
        navigator.serviceWorker.ready.then(registration => {
            // tslint:disable-next-line: no-console
            console.log("unregister1111111111111");
            registration.unregister();
        })
            .catch(err => {
                // tslint:disable-next-line: no-console
                console.log("unregister error ", err);
            });
    } else {
        // tslint:disable-next-line: no-console
        console.log("unregister not found serviceWorker ");
    }
}

export {
    isPushNotificationSupported,
    askNotificationPermission,
    registerServiceWorker,
    sendNotification,
    createNotificationSubscription,
    getUserSubscription,
    unregister
};