Project Documentation: Running Ionic React Code, Building APK, and Publishing to App Stores
Follow the steps below to ensure a successful execution and deployment of Ionic React application.
Table of Contents

Prerequisites
Running the Ionic React Code
Building the APK
Generate an upload key and keystore
Sign your app with your key
Publishing to Google Play Store
Publishing to Apple App Store

1 . Prerequisites
Before proceeding, ensure you have the following prerequisites installed on your development machine:


Node.js and npm: Download and install the latest LTS version from the official website (https://nodejs.org/).


Ionic CLI: Install the Ionic CLI globally by running the following command:


npm install -g @ionic/cli


Android Studio: Download and install Android Studio from the official website (https://developer.android.com/studio).


X code: Install X code from the Apple App Store for publishing on the App Store.


Java Development Kit (JDK): Ensure you have JDK 8 or later installed.


Git: Install Git for version control if not already installed.


Google Play Developer Account: Sign up for a developer account at https://play.google.com/apps/publish (for Google Play Store).


Apple Developer Account: Enroll in the Apple Developer Program at https://developer.apple.com/programs/ (for Apple App Store).



Running the Ionic React Code

Follow these steps to run the Ionic React code:

Clone the Repository:


Open a terminal or command prompt.
Navigate to the directory where you want to clone the repository.
Run the following command:

git clone <repository_url>

Navigate to Project Directory:

In the terminal, navigate to the directory of your cloned project:
cd <project_directory>

Install Dependencies:

Run the following command to install project dependencies:
npm install

Run the App:


Start the Ionic development server with the following command:

ionic serve

The development server will compile the code and open the app in your default web browser.


Building the APK

Follow these steps to build the APK for your Ionic React application:

Add Android Platform:


If you haven't already added the Android platform, run the following command:

ionic cap add android

Open Android Studio Project:


After adding the Android platform, open the Android Studio project by running:

npx cap open android

Build the APK:



In Android Studio, build the APK by clicking "Build" > "Build Bundle(s) / APK(s)" > "Build APK(s)."


The APK will be generated and placed in the


app/build/outputs/apk/debug directory of your Android Studio project.

Install the APK:


Transfer the APK file to an Android device.
On the device, locate the APK file and tap to install it.


Generate an upload key and keystore

If you don't already have an upload key, which is useful when configuring Play App Signing, you can generate one using Android Studio as follows:


 In the menu bar, click Build > Generate Signed Bundle/APK.


In the Generate Signed Bundle or APK dialog, select Android App Bundle or APK and click Next.


Below the field for Key store path, click Create new.


On the New Key Store window, provide the following information for your keystore and key, as shown in figure 2.


  Keystore



Key store path: Select the location where your keystore should be created. Also, a file name should be added to the end of the location path with the .jks extension.
Password: Create and confirm a secure password for your keystore.



   Key


Alias: Enter an identifying name for your key.
Password: Create and confirm a secure password for your key. This should be the same as your keystore password. (Please refer to the known issue for more information)
Validity (years): Set the length of time in years that your key will be valid. Your key should be valid for at least 25 years, so you can sign app updates with the same key through the lifespan of your app.
Certificate: Enter some information about yourself for your certificate. This information is not displayed in your app, but is included in your certificate as part of the APK.



 Once you complete the form, click OK.


  If you would like to build and sign your app with your upload key, continue to the section about how to Sign your app with your upload key. If you only want to generate the key and keystore, click Cancel.


Sign your app with your key


To sign your app using Android Studio, follow these steps:


 If you don’t currently have the Generate Signed Bundle or APK dialog open, click Build > Generate Signed Bundle/APK.


  In the Generate Signed Bundle or APK dialog, select either Android App Bundle or APK and click Next.


 Select a module from the drop down.


 Specify the path to your keystore, the alias for your key, and enter the passwords for both. If you haven't yet prepared your upload keystore and key, first Generate an upload key and keystore and then return to complete this step.


 Click Next.


 In the next window , select a destination folder for your signed app, select the build type, choose the product flavor(s) if applicable.


 If you are building and signing an APK, you need to select which Signature Versions you want your app to support.


Click Create.


Publishing to Google Play Store


 Follow these steps to publish your app on the Google Play Store:

Generate a Keystore File:


Create a keystore file for signing your app. Follow the instructions here: https://developer.android.com/studio/publish/app-signing#generate-key.



Configure App Details:


Log in to your Google Play Developer Console.
Create a new app listing and configure app details, screenshots, and descriptions.



 Upload App Bundle:


Upload the App Bundle you built to the Play Console.
Google Play will generate optimized APKs for different device configurations.


Set Pricing and Distribution:


Choose whether your app is free or paid.
Select the countries where your app will be available.


Review and Publish:


Complete all required sections in the Play Console.
Submit your app for review and publishing.


Publishing to Apple App Store

Follow these steps to publish your app on the Apple App Store:

Create an App ID:


Log in to your Apple Developer Account.
Create an App ID for your app.


Generate Provisioning Profiles:


Create provisioning profiles for development and distribution.


Configure App in X code:


Open your app in X code.
Configure app settings, bundle identifier, and signing settings.


Build Archive:


Archive your app in X code.


Submit to App Store:


Use the Organizer in X code to submit your app to the App Store.
Follow the steps to provide app information and upload your archive.


App Store Review:



 App will undergo Apple's review process. Ensure compliance with guidelines.
