<img src="https://s10.gifyu.com/images/SDHiW.png" />

## 🤔 Why?

React Native CI CLI is meant to simplify CI/CD setup in your React Native project.

## 📖 Usage

Simply go to your project root directory and run:

```
npx setup-ci
```

If your project has a monorepo structure, run the script from the root directory of the app for which you want to set up workflows.

## 💡 Demo

Say we want to set up GitHub actions that run ESLint check and Jest tests on our project every time we create or push to an existing Pull Request.
Let's try to use `react-native-ci-cli` to do the heavy lifting and generate all the necessary configurations.

<p align="center">
  <img 
    style="width: 80%;"
    src="https://s12.gifyu.com/images/SonNQ.gif"/>
</p>

Alternatively, we can go fully automatic by passing flags `--preset --lint --jest` to avoid all interaction with the script. You can check the section below for more information about available flags!

## ⚙️ Features

- **Currently, only GitHub actions are supported as your CI.**
- **npm** and **yarn** are supported as package managers, and they will be detected automatically.
- Monorepo structure is supported, but make sure you run the script from the app directory,
  not the monorepo root.

When using `react-native-ci-cli`, you can provide additional flags to modify its default behavior.

<table>
  <tr>
    <th width="160px" style="text-align: center; vertical-align: middle;">Flag</th>
    <th style="text-align: center; vertical-align: middle;">Description</th>
  </tr>
  <tr>
    <td style="vertical-align: middle;">--preset</td>
    <td style="vertical-align: middle;">Run the script with your own preset. Combine it with feature flags to specify what workflows you want to generate.</td>
  </tr>
  <tr>
    <td style="vertical-align: middle;">--skip-git-check</td>
    <td style="vertical-align: middle;">By default, the script will prompt the user if there are uncommitted changes in the working repository. Use this flag to proceed without asking.</td>
  </tr>
</table>

The following are **feature flags** that can be used with `--preset` flag (they are ignored if `--preset` is not provided).

<table>
  <tr>
    <th style="text-align: center; vertical-align: middle;">Flag</th>
    <th style="text-align: center; vertical-align: middle;">Description</th>
  </tr>
  <tr>
    <td style="vertical-align: middle;">--lint</td>
    <td style="vertical-align: middle;">Generate ESLint workflow to run on every PR</td>
  </tr>
  <tr>
    <td style="vertical-align: middle;">--jest</td>
    <td style="vertical-align: middle;">Generate Jest workflow to run on every PR</td>
  </tr>
  <tr>
    <td style="vertical-align: middle;">--ts</td>
    <td style="vertical-align: middle;">Generate Typescript check workflow to run on every PR</td>
  </tr>
  <tr>
    <td style="vertical-align: middle;">--prettier</td>
    <td style="vertical-align: middle;">Generate Prettier check workflow to run on every PR</td>
  </tr>
  <tr>
    <td style="vertical-align: middle;">--eas-update</td>
    <td style="vertical-align: middle;">Generate EAS Update and preview workflow to run on every PR (Expo projects only)</td>
  </tr>
  <tr>
    <td style="vertical-align: middle;">--detox</td>
    <td style="vertical-align: middle;">Generate workflow to run Detox e2e tests on every PR</td>
  </tr>
</table>

## 🔐 Repository secrets

Some workflows generated by `react-native-ci-cli` require setting up repository secrets that can be then accessed by workflows as `${{ secrets.* }}`. Make sure to read logs printed by the script
as you will always be prompted to create secrets if necessary. The following table shows a summary of secrets you might have to create for generated workflows to work properly.

<table>
  <tr>
    <td style="text-align: center; vertical-align: middle; font-weight: bold">Secret</td>
    <td style="text-align: center; vertical-align: middle; font-weight: bold">Description</td>
  </tr>
  <tr>
    <td style="vertical-align: middle;">EXPO_TOKEN</td>
    <td style="vertical-align: middle;">Used for authentication in workflows using your Expo account. Learn more at <a href=https://docs.expo.dev/eas-update/github-actions>Expo with GitHub actions</a>.</td>
  </tr>
</table>

## 💬 Your feedback

This tool is supposed to be helpful to as many developers as possible - and therefore we are open to your ideas and general feedback! If you want to share your opinion about `react-native-ci-cli` or
have some thoughts about how it could be further developed, don't hesitate to create an issue or contact
the maintainers directly.

## 🚸 Roadmap

- [ ] Build Expo DevClient when fingerprint changes
- [ ] Maestro support for E2E tests
- [ ] Different workflows for different branches (ex. PR, main, release)
- [ ] Upload source maps to Sentry
- [ ] Handle different vendors

## 📋 License

React Native CI CLI is licensed under [The MIT License](LICENSE).

## 💸 Credits

This project has been built and is maintained thanks to the support from [Software Mansion](https://swmansion.com)

[![swm](https://logo.swmansion.com/logo?color=white&variant=desktop&width=150&tag=react-native-reanimated-github 'Software Mansion')](https://swmansion.com)


## React Native CI CLI is created by Software Mansion

Since 2012 [Software Mansion](https://swmansion.com) is a software agency with experience in building web and mobile apps. We are Core React Native Contributors and experts in dealing with all kinds of React Native issues. We can help you build your next dream product – [Hire us](https://swmansion.com/contact/projects?utm_source=reanimated&utm_medium=readme).
