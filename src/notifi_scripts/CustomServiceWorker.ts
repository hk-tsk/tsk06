// // Check if Notifications are supported by the browser
// function isPushNotificationSupported() {
//   return "serviceWorker" in navigator && "PushManager" in window;
// }

// // Register a service worker
// function registerServiceWorker() {
//   return navigator.serviceWorker.register("/sw.js");
// }

// // Ask the user permission
// async function askUserPermission() {
//   return await Notification.requestPermission(); // return default, denied and granted.
// }

// /*
// If the result of this function is granted we can move to the next step.

// To push or not to push?
// At this point, we are at a crossroads! We have to decide if we want to:

// (Just) display notifications
// (Send) Push notifications
// */

// // Create the notification subscription
// /*
// To receive push notifications you need:

// a push service: that manages and receives the notification (the browsers offers a push server)
// a push subscription: that provides a subscription URL endpoint and allows unsubscription from a push service.
// a push server: a server that sends push messages to the push subscription endpoint, which is handled by the browser push service.
// */

// const pushServerPublicKey = "";
// async function createNotificationSubscription() {
//   // wait for service worker installation to be ready
//   const serviceWorker = await navigator.serviceWorker.ready;
//   // subscribe and return the subscription
//   return await serviceWorker.pushManager.subscribe({
//     userVisibleOnly: true,
//     // tslint:disable-next-line: object-literal-sort-keys
//     applicationServerKey: pushServerPublicKey
//   });
// }

// /*
// The instruction navigator.service.worker.ready waits for the service worker to be ready to be used, 
// because after we register it, could be in other statuses like waiting, installing.
//  If the registration fails, this promise will never be resolved.

// We used the PushManager interface to create a subscription and passed two parameters to the method subscribe:

// userVisibleOnly: A boolean indicating that the returned push subscription will only be used for messages
//  whose effect is made visible to the user.
// applicationServerKey: an ECDSA (Elliptic Curve Digital Signature Algorithm) P-256 public key the push server 
// will use to authenticate your application. If specified, all messages from your application server must 
// use the VAPID authentication scheme and include a JWT signed with the corresponding private key.
//  This key IS NOT the same key that you use to encrypt the data.
// I’ll show you later how to create a Key pair (private and public) for the push server 
// (the private one) and the application (the public one).

// The function returns the PushSubscription, an object that contains the unique endpoint for
//  the push server/service, and some other information. Each browser uses different push services
//   that generate different endpoints.
  
//   In chrome the endpoint will be something like:
// https://fcm.googleapis.com/fcm/send/fXjr1iIPn00:.....

// In firefox
// https://updates.push.services.mozilla.com/wpush/v2/gAAAAABdZ80ZW5...

// If we send a push message to that endpoint, we receive a push notification, 
// so don’t give it to strangers. The endpoint and the information of the push subscriptions 
// need to be sent to Push Server so that it can use it to send messages.
// */

// // Send the subscription to the Push Server
// /*
// You can use it at this address, and it exposes two endpoints:

// POST /subscription : to receive the subscription.
// GET /subscription/{id} : to trigger a push notification for the requested subscription.
// */

// // create a function that calls the Push Server.
// async function postSubscription(subscription: any) {
//   const response = await fetch(
//     `https://push-notification-demo-server.herokuapp.com/subscription`,
//     {
//       credentials: "omit",
//       headers: {
//         "content-type": "application/json;charset=UTF-8",
//         "sec-fetch-mode": "cors"
//       },
//       // tslint:disable-next-line: object-literal-sort-keys
//       body: JSON.stringify(subscription),
//       method: "POST",
//       mode: "cors"
//     }
//   );
//   return await response.json();
// }

// // (Sending the push message)

// /*
// sendNotification(
//   pushSubscription,
//   JSON.stringify({
//     title: "New Product Available ",
//     text: "HEY! Take a look at this brand new t-shirt!",
//     image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
//     tag: "new-product",
//     url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html"
//   })
// );
// */

// self = window;
// // Receiving the push message
// function receivePushNotification(event: any) {
//   // tslint:disable-next-line: no-console
//   console.log("[Service Worker] Push Received.");
//   const { image, tag, url, title, text } = event.data.json();
//   const options = {
//     data: url,
//     // tslint:disable-next-line: object-literal-sort-keys
//     body: text,
//     icon: image,
//     vibrate: [200, 100, 200],
//     tag,
//     image,
//     badge: "/favicon.ico",
//     actions: [
//       {
//         action: "Detail",
//         title: "View",
//         // tslint:disable-next-line: object-literal-sort-keys
//         icon: "https://via.placeholder.com/128/ff0000"
//       }
//     ]
//   };
//   event.waitUntil(self.registration.showNotification(title, options));
// }
// self.addEventListener("push", receivePushNotification);

// function openPushNotification(event: any) {
//   // tslint:disable-next-line: no-console
//   console.log("Notification click Received.", event.notification.data);
//   event.notification.close();
//   // do something
// }
// self.addEventListener("notificationclick", openPushNotification);
