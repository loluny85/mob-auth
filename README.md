# Mobile Auth App

Mobile Auth is a React Native mobile application built with Expo that allows users to create an account, log in, and view their profile details. The app supports multiple languages and features a user-friendly interface.

## Getting Started

Follow these steps to run the mobile app locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/loluny85/mob-auth.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd mob-auth
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Run the Expo development server:**

    ```bash
    npx expo start
    ```

    A QR code will be displayed in the terminal.

5. **On your mobile device:**
    - Install the Expo Go app on your mobile phone.
    - Scan the QR code using Expo Go to launch the app on your device.

    OR

6. **On your laptop:**
    - Press `a` for Android or `i` for iOS to open the app in the corresponding emulator on your laptop.

    Ensure that you have Expo Go installed on your mobile device or have set up the Android or iOS emulator on your laptop.

## Firebase Configuration

The app is configured to use Firebase for user authentication and Firestore to store user information. 

## Features

- **Account Creation and Login:** Users can create an account or log in if an account already exists.
- **Profile Page:** After account creation or login, users are navigated to their profile page to view their details.
- **Password Reset:** Users can reset their password by providing their email. A reset link is sent to the email for password change.
- **Multiple Languages:** The app supports multiple languages, and users can select their preferred language from the dropdown in the header.
- **RTL Support:** The application supports Right-to-Left (RTL) layout for languages like Arabic.

## Contributing

If you would like to contribute to the project, feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
