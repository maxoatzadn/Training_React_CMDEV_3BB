1. Create keystore and certificate
----------------------------------
   cd ./android/app
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

2. Password setting
   ./android/gradle.properties 
----------------------------------
    android.useDeprecatedNdk=true
    MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
    MYAPP_RELEASE_KEY_ALIAS=my-key-alias
    MYAPP_RELEASE_STORE_PASSWORD=12345678
    MYAPP_RELEASE_KEY_PASSWORD=12345678

3. SignConfig
----------------------------------
   ./android/app/build.gradle

    signingConfigs {
            release {
                if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                    storeFile file(MYAPP_RELEASE_STORE_FILE)
                    storePassword MYAPP_RELEASE_STORE_PASSWORD
                    keyAlias MYAPP_RELEASE_KEY_ALIAS
                    keyPassword MYAPP_RELEASE_KEY_PASSWORD
                }
            }
        }

    .........
    signingConfig signingConfigs.release
    .........



5. Build
cd ./android
./gradlew assembleRelease (for mac)
gradlew assembleRelease (for windows)

 ./gradlew bundle (for aab app android bundle)

6. output
./android/app/build/outputs/apk/release
 

 Make App Icon (Android)
 https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

 Make App Icon (IOS)
 https://appicon.co/#image-sets

# Rename app package
npx react-native-rename "CMAuthen" -b com.codemobiles.rn.cmauthen
adb logcat *:S ReactNative:V ReactNativeJS:V 


launcher screen
https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae