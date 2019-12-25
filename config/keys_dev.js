module.exports = {
    //i used mlab database for fast and realiable pace development enviroment
    mongoURI: 'mongodb://web-push:webpush123@ds213053.mlab.com:13053/web-push',
    privateKey: 'WHwW9e4eBzbDAyj0tLn3PIehZXMW8mTet27mjeaIj7k' || process.env.VAPID_PRIVATE_KEY,
    publicKey: 'BORlfoSiRC918h-EWjzRD3X0aUeojrs0X6l4zWX0UClrDPXCYkazxwMme5MjG-dHPyLKBkDrw1DvdGbEru1x96A' || process.env.VAPID_PUBLIC_KEY
}