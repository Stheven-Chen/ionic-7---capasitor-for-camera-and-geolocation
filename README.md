# Ionic 7 - Capacitor for Camera and Geolocation

This repository contains an Ionic 7 project that utilizes Capacitor plugins for camera, geolocation, signature, and OCR features. 

## Installation

To run this project locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install the required dependencies by running `npm install`.
4. Run `ionic serve` to start the development server.

## Usage

This project is a template that can be used as a starting point for an Ionic app that requires camera and geolocation features. The app uses Capacitor plugins to access these features on both Android and iOS devices.

## Apk
To generate an APK file, you can follow these steps:

1. Run the command `npm run build` to build the Ionic app.
2. Run the command `npx cap copy` to copy the built app to the native project.
3. Run the command `npx cap sync` to sync the native project with the web app.
4. Run the command `npx cap open android` to open the native project in Android Studio.
5. In Android Studio, go to "Build" -> "Build APK" to build the APK file.

Make sure that you have the necessary Android SDK installed and configured before building the APK.

## Package.json

The `package.json` file lists all the dependencies and devDependencies used in this project. Some notable dependencies used are:

- `@capacitor/core`: Core Capacitor functionality required for all Capacitor plugins.
- `@capacitor/android`: Capacitor plugin for Android support.
- `@capacitor/camera`: Capacitor plugin for accessing the device's camera.
- `@capacitor/geolocation`: Capacitor plugin for accessing the device's geolocation.
- `@ionic-native/qr-scanner`: Ionic Native plugin for scanning QR codes.
- `@techstark/opencv-js`: JavaScript version of OpenCV for image processing.
- `react`: JavaScript library for building user interfaces.
- `react-dom`: Entry point to the DOM and server renderers for React.
- `signature_pad`: HTML5 canvas-based smooth signature drawing.
- `tesseract.js` : library to perform OCR feature

## Scripts

The following scripts are available to run:

- `dev`: Start a development server using Vite.
- `build`: Build the project using TypeScript and Vite.
- `preview`: Preview the built project using Vite.
- `test.e2e`: Run end-to-end tests using Cypress.
- `test.unit`: Run unit tests using Vitest.
- `lint`: Lint the project using ESLint.

Note that some of these scripts require additional setup, such as setting up Cypress for end-to-end testing. Please refer to the respective documentation for more information.

## License

This project is licensed under the MIT License.
