- vscode
# VSCODE Extensions
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension vscode-icons-team.vscode-icons
code --install-extension naumovs.color-highlight
code --install-extension esbenp.prettier-vscode
code --install-extension humao.rest-client
code --install-extension riazxrazor.html-to-jsx
code --install-extension christian-kohler.path-intellisense
code --install-extension ms-vsliveshare.vsliveshare
code --install-extension diemasmichiels.emulate

- Android Studio
- Nodejs (LTS latest)
- Yarn (sudo npm i -g yarn)
- Xcode (only mac)
- HomeBrew (only mac)
- Jdk11 (via android studio)
  - New n android project
  - Open setting or preference
  - Find the Gradle (Built-tool) setting
  - Find Gradle JDK and download 11
  - Set JAVA_HOME to Jdk folder in the android studio
  
- ANDROID_HOME
- JAVA_HOME
- PATH TO ANDROID_HOME emulator
- PATH TO Java bin

or using this in package.json

"scripts": {
    "android": "export JAVA_HOME='/opt/homebrew/Cellar/openjdk@11/11.0.10/libexec/openjdk.jdk/Contents/Home' && export ANDROID_HOME='/Users/chaiyasittayabovorn/Library/Android/sdk/' && react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  },


setx path "%path%;______ " /m
export PATH="/usr/local/bin:$PATH" >> ~/.zshrc