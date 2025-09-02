## Getting Started
- If you haven't already, install nvm, npm, and node.js
  *(https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)*
- `npm install`

## Start dev server
- `npx expo start`

## Start dev server w/ no cache 
*(configs/file structure change, hot reload appears broken, ect)*
- `npx expo start --clear`

## Formatting
- (check) `npx prettier --use-tabs --check .`
- (write) `npx prettier --use-tabs --write .`

You should also install the eslint plugin for vscode and enable eslint formatting on save in settings

## Linting
- `npm run lint`

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
