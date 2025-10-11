## Project Overview
This prototype, known as **Heart Rate Mate**, was initially developed over a 7 week period as a ***Heart Rate Variability Biofeedback (HRVB)*** educational mobile application for Worcester Polytechnic Institute's International Qualifying Project program. Started in A-term by the A-25 Heart Rate Variability team, for the University of Reykjavik. 

*(Digital WPI link to be added)*

React Native was chosen for its platform agnosticism and existing familiarity with React. 

The application was originally developed primarily by one person, *so its scope and quality is quite limited* due to time and resource constraints, unfamiliarity in mobile application development, as well as unfamiliarity with React Native specifically.

## Stack
- React-Native (https://reactnative.dev)
- Expo (https://expo.dev)
- Drizzle ORM (https://orm.drizzle.team)
- SQLite (https://orm.drizzle.team/docs/get-started-sqlite https://sqlite.org/index.html)

We also utilize a couple other important packages/libraries to note:
- NativeWind (Used fairly minimally, mostly for theme/color management) (https://www.nativewind.dev)
- React Native Vision Camera (https://react-native-vision-camera.com/docs/guides https://github.com/mrousavy/react-native-vision-camera)
- React Native Fast OpenCV (A partial port of OpenCV) (https://lukaszkurantdev.github.io/react-native-fast-opencv/installation https://github.com/lukaszkurantdev/react-native-fast-opencv)

## Getting Started
- If you haven't already, install nvm, npm, and node.js
  *(https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)*
- `npm install`

## Start dev server
- `npx expo start`

## Install to physical device or simulator
- `npx expo run:{ios | android} --device`

In order to develop for iOS, you will need a Mac, and additionally, signing certificates, see this Expo guide for an overview
(https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=physical&mode=development-build&buildEnv=local)

[development build](https://docs.expo.dev/develop/development-builds/introduction/)

[Android simulator](https://docs.expo.dev/workflow/android-studio-emulator/)

[iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

## Start dev server w/ no cache 
*(configs/file structure change, hot reload appears broken, ect)*
- `npx expo start --clear`

# Inspect Database
After starting the dev server, open the dev tools **(Shift+m)**, **expo-drizzle-studio-plugin** will open an instance in your browser that will allow you to inspect the local database

## Linting/Formatting
- `npm run lint`
- `npx prettier --use-tabs --check .`
- `npx prettier --use-tabs --write .`

You should also install the eslint plugin for vscode and configure eslint formatting on save in your IDE, in VScode this is a specific setting

## Generate A Database Migration
On schema change you can either generate a migration 
- `npx drizzle-kit generate`

**OR,** 

delete the dev/production build off the target device, as well as remove the references drizzle uses to track schema changes from /drizzle and /drizzle/meta, ***then*** generate a migration

**You can find the database schema in /db/schema.ts**, there is also /db/schemas/schemas.ts but this would primarily be used just to simplify handling complex objects or those with varying levels of info
As one might expect, components in /components, app assets in /assets, and the physical layout of the application as well as its pages in /app

## Layout
The app is divided into 4 primary modules:
- **Measurements**, for taking PPG measurements with the camera
- **Journaling**, for writing, viewing, and editing journal entries
- **LearnMore**, housing educational content, and FAQs, this could also be expanded to include information about the actual app
- **BreathingSessions**, where users can perform timed breathing practices

Additionally:
- **Orientation**, an (incomplete) simulation of the rough process a user would undergo in order to discover their optimal breathing rate, requires PPG integration
- **Debug**, simply debug tools for developmental purposes, primarily just allowing you to view raw PPG measurements or inspect the database 
