# Firebase Setup Instructions for DOSALA INC. CRM

Follow these steps to set up the Firebase backend for your application. This is a crucial step to enable user authentication and the database.

## Step 1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"**.
3.  Enter a name for your project (e.g., `dosala-crm`).
4.  Follow the on-screen instructions to create the project. You can disable Google Analytics for this project if you don't need it.

## Step 2: Create a Web App in Your Project

1.  In your new project's dashboard, click the Web icon (`</>`) to start the setup process for a new web app.
2.  Give your app a nickname (e.g., "DOSALA Web App").
3.  Click **"Register app"**. You do NOT need to set up Firebase Hosting at this time.
4.  On the next screen, you will see your Firebase configuration details under "Install SDK". It will look like this:

    ```javascript
    const firebaseConfig = {
      apiKey: "AIza...",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "1:..."
    };
    ```

5.  **Copy this entire `firebaseConfig` object.**

## Step 3: Add Your Firebase Config to the App

1.  Open the file `services/firebase.ts` in your code editor.
2.  You will see a placeholder `firebaseConfig` object.
3.  **Replace the entire placeholder object with the one you copied from your Firebase project.**
4.  Save the file.

## Step 4: Enable Google Authentication

1.  In the Firebase Console, go to the **"Authentication"** section from the left-hand menu.
2.  Click the **"Get started"** button.
3.  In the "Sign-in method" tab, select **"Google"** from the list of providers.
4.  Enable the Google provider by toggling the switch.
5.  Provide a project support email (usually your own email).
6.  Click **"Save"**.

## Step 5: Set Up Firestore Database

1.  In the Firebase Console, go to the **"Firestore Database"** section from the left-hand menu.
2.  Click **"Create database"**.
3.  Choose to start in **"Test mode"**. This allows open read/write access while you are developing.
    *   **IMPORTANT**: For a production application, you will need to set up [Security Rules](https://firebase.google.com/docs/firestore/security/get-started) to protect your data.
4.  Choose a location for your database (e.g., `us-central`).
5.  Click **"Enable"**.

## Step 6: Add Data to Firestore

You need to create two "collections" in your database: `projects` and `clients`. We will add the initial data from the `data.ts` file.

### Create the `clients` Collection

1.  In the Firestore data viewer, click **"+ Start collection"**.
2.  For "Collection ID", enter `clients`.
3.  Click **"Next"**.
4.  Now, you'll add your first client as a "document". For the **Document ID**, enter `c1`.
5.  Add the following fields and values for this document. Click the `+` icon to add a new field.
    *   `name` (string): `Kevin Phillips`
    *   `company` (string): `Phillips Innovations`
    *   `email` (string): `kevin.p@innovate.com`
    *   `phone` (string): `310-555-0101`
    *   `address` (string): `123 Ocean View, Malibu, CA 90265`
6.  Click **"Save"**.
7.  Repeat this process for the other clients. Click **"Add document"** next to the `clients` collection.
    *   **Document ID**: `c2` (Fields: name: Aria Montgomery, email, phone, address)
    *   **Document ID**: `c3` (Fields: name: Brighton Hospitality, company, email, phone, address)

### Create the `projects` Collection

1.  In Firestore, click **"+ Start collection"** again.
2.  For "Collection ID", enter `projects`.
3.  Click **"Next"**.
4.  Add the first project with **Document ID**: `p1`.
5.  Add the following fields and values:
    *   `name` (string): `Malibu Residence`
    *   `year` (number): `2024`
    *   `location` (string): `Malibu, CA`
    *   `clientId` (string): `c1`
    *   `type` (string): `Residential`
    *   `phase` (string): `Construction Admin`
    *   `description` (string): `A modern beachfront residence...`
    *   `team` (array): Add two string elements: `A. Garcia` and `J. Chen`
    *   `images` (array): Add two string elements: `https://picsum.photos/seed/p1/800/600` and `https://picsum.photos/seed/p1-2/800/600`
6.  Click **"Save"**.
7.  Repeat this process, creating new documents (`p2`, `p3`, `p4`, `p5`) for all the projects listed in the `data.ts` file, ensuring the field types (string, number, array) are correct.

---

## Step 7: Deploying to Firebase Hosting

After completing all the steps above, your application is ready to be deployed to the web. You will need to use the Firebase Command Line Interface (CLI).

### 1. Install the Firebase CLI

If you don't have it installed, open your computer's terminal (or command prompt) and run this command:
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

In your terminal, run the following command to log in to your Google account:
```bash
firebase login
```
This will open a browser window for you to sign in.

### 3. Initialize Firebase in Your Project

1.  Navigate to your project's root directory in the terminal (the folder containing `index.html`, `firebase.json`, etc.).
2.  Run the command:
    ```bash
    firebase init
    ```
3.  You will be asked a series of questions:
    *   `Are you ready to proceed?` > **Yes**
    *   `Which Firebase features do you want to set up?` > Use the arrow keys to navigate to **Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys**. Press the spacebar to select it, then press Enter.
    *   `Please select an option:` > **Use an existing project**
    *   Select the Firebase project you created earlier from the list.
    *   `What do you want to use as your public directory?` > **.** (Enter a single period and press Enter, to use the current directory).
    *   `Configure as a single-page app (rewrite all urls to /index.html)?` > **Yes**
    *   `Set up automatic builds and deploys with GitHub?` > **No** (You can set this up later if you want).
    *   `File ./index.html already exists. Overwrite?` > **No**

Firebase initialization is now complete. It has recognized your `firebase.json` file.

### 4. Deploy Your App

This is the final step. Run the following command in your terminal:
```bash
firebase deploy
```

Wait for the process to complete. Once it's done, the terminal will display your live **Hosting URL**. It will look something like this: `https://your-project-id.web.app`.

**Congratulations! Your application is now live on the internet.**
