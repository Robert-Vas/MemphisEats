
# Requirements #

* `Node.js v10` or higher
* `Ruby Gem v2` or higher (For IOS)
* `Xcode` (For IOS)
* `Android Studio` (For Android)
* `Java v8` or higher (For Android)
* `Gradle` (For Android)

# Installation Instructions for Browser #

* Run `git clone https://github.com/MemphisEats/frontend.git`
* In frontend folder, run `npm install` to install dependencies
* Run `npx ng serve` to start the app

# Installation Instructions for IOS Simulator #

* Run `git clone https://github.com/MemphisEats/frontend.git`
* In frontend folder, run `npm install` to install dependencies
* Run `npm i -g ionic` to install ionic globally
* Install Xcode, Then run `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer` to setup Xcode
* Run `ionic build`, then`ionic cap sync ios` to compiles web assets and install plugins
* Run `ionic capacitor open ios` to open Xcode

# Installation Instructions for Android Simulator #

* Run `git clone https://github.com/MemphisEats/frontend.git`
* In frontend folder, run `npm install` to install dependencies
* Run `npm i -g ionic` to install ionic globally
* Run `sudo gem install cocoapods` to install ruby gems
* Setup Android Studio (<https://ionicframework.com/docs/developing/android#android-studio>)
* Run `ionic build`, then`ionic cap sync android` to compiles web assets and install plugins
* Run `ionic capacitor open android` to open Android Studio

# Stripe API #

* Run `npm i -g firebase-tools` to install Firebase CLI
* Run `firebase login` to login firebase account
* In frontend folder, run `cd functions` to change directory
* Run `npm install` to install dependencies
* Run `firebase functions:config:get > .runtimeconfig.json` to generate API Key in json file
* In functions folder, run `npm run build` to compile typescript code
* Open another terminal, run `firebase serve --port=5001` to run Stripe API Function locally
* Use Card Number 4242424242424242, Any Future Date, Any CSV Number to test