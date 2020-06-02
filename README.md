# Coffee With Me

A mobile application built using React Native, [Stream.io](https://getstream.io/) and [react-native-activity-feed](https://github.com/GetStream/react-native-activity-feed)

## Features

- Notification feed
- Profile screen
- Profile update screen


## Requirements

- NodeJS
- Expo

## Setup instructions

### 1. Install dependencies

```
git clone https://github.com/Eirsteir/Coffee-With-Me-App.git
cd Coffee-With-Me-App
npm install
```

### 2. Setup up your app

Get your Stream API credentials from the [user dashboard](https://getstream.io/dashboard/) and make sure your application has these feed groups:

- user (type Flat)
- notification (type Notification)

If you followed this [React Native tutorial](https://getstream.io/react-native-activity-feed/tutorial/), you already have a pre-configured app on your account that you can use for this project.

Create a new `.env` file in your favorite editor and fill in the following credentials.

```
STREAM_API_KEY=your_api_key
STREAM_API_SECRET=your_api_secret
STREAM_APP_ID=your_app_id
```

### 3. Get your userToken

A user token from [getStream.io](https://getstream.io) is required to use this application.
This can be retreived from an administrator.

### 4. Start your app

```
npm start
```

Follow the instructions from the terminal to preview the app on your phone or using an emulator.
