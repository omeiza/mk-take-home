# MakaLife Test API
Node.js backend web services for MakaLife's live selling platform 😊.

## 🧰 Tools
-   Node.js (v18.16.0)
-   TypeScript
-   Jest
-   SuperTest

## ⚒️ Setup Instruction
To get started with this:

-   Clone this repo using -> `git clone https://github.com/omeiza/mk-take-home.git`
-   Run `npm install` to install dependencies from package.json
-   Run `npm start` to start the server and play around with the application

## ⚙️ Configuration
Here are some items within application that are obvious to see, but could easily be missed
-   Since there is no requirement to persist the data we are working with within the application, the application uses a data house within `src/data.ts` that is only available when the application is running.
-   The codebase is well commented to explain what is going on at each block.
-   There was a need for abstracting the app from starting the server. This is to ensure SuperTest can operate flawlessly without setting up the server to listen at a port.
-   Openapi was used to bring sanity toward the request data being sent to the server. My opinion is that no number of layer of security is too much!

## 🏃 Testing
There are some test cases using jest and supertest to help provide something to start with, kindly add more test cases as needed.

Thanks for the opportunity!