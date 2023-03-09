npx react-native init cmAuthenTS --template react-native-template-typescript

cmAuthenTS
https://www.youtube.com/watch?v=6BIuyBeTOf8
cmBarcodeTS
https://www.youtube.com/watch?v=IUP9f2Rh918
cmMapTs
https://www.youtube.com/watch?v=YRxTETeWJzA
Push
https://www.youtube.com/watch?v=KjVQ8Q9EzrI

# In case of behide the proxy
# systemProp.http.proxyHost=127.0.0.1
# systemProp.http.proxyPort=8118
# systemProp.https.proxyHost=127.0.0.1
# systemProp.https.proxyPort=8118



npm i -g yarn

# common steps
yarn add react-native-elements react-native-vector-icons @rneui/base @rneui/themed react-native-config
yarn add @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-gesture-handler
yarn add react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view 
yarn add @react-native-community/async-storage axios react-native-iphone-x-helper react-native-permissions   
npx yarn add react-native-svg react-native-qrcode-svg react-native-camera react-native-qrcode-scanner
npx yarn add @reduxjs/toolkit react-redux

# test link
https://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=songs

# fix error about camera 
# by adding this in app/build.gradle
missingDimensionStrategy 'react-native-camera', 'general'     

# Icon Directory
https://oblador.github.io/react-native-vector-icons/

# Add when you need to do part of camemra
yarn add react-native-image-crop-picker 

- replace App.tsx
- copy src/**
- copy react-native.config.js
- update babel.config.js

# (optional)
npx react-native-asset      

https://reactnative.dev/docs/permissionsandroid
# Android part
- update permission in AndroidManifest.xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.RECORD_AUDIO" />

- Add Icon by editing android/app/build.gradle  
- https://github.com/oblador/react-native-vector-icons#installation    
- browse all icons:  https://oblador.github.io/react-native-vector-icons/
  apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


#Fix cannot upload image
https://www.youtube.com/watch?v=SAI9HMWtExg
Just comment this line
// initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
in MainApplication.java of android folder


# iOS part
- Add Icon by editing info.plist
- Add Fonts in node_modules to project without need to copy and add to targe
- https://github.com/oblador/react-native-vector-icons#installation    
  
  <key>UIAppFonts</key>
	<array>
		<string>FontAwesome.ttf</string>
		<string>Foundation.ttf</string>
		<string>Ionicons.ttf</string>
		<string>MaterialIcons.ttf</string>
		<string>EvilIcons.ttf</string>
		<string>Entypo.ttf</string>
	</array>

- Update Info.plist
    <key>NSPhotoLibraryUsageDescription</key>
    <string>YOUR TEXT</string>
    <key>NSCameraUsageDescription</key>
    <string>YOUR TEXT</string>

- Update Podfile after target end
  permissions_path = '../node_modules/react-native-permissions/ios'
  pod 'Permission-Contacts', :path => "#{permissions_path}/Contacts"
  pod 'Permission-Microphone', :path => "#{permissions_path}/Microphone"
  pod 'Permission-Notifications', :path => "#{permissions_path}/Notifications"
  pod 'Permission-PhotoLibrary', :path => "#{permissions_path}/PhotoLibrary"
  pod 'Permission-Camera', :path => "#{permissions_path}/Camera"

- Add Fonts to Target in "Build Phases > Copy Bundle Resources"
    + FontAwesome.ttf
		+ Foundation.ttf
		+ Ionicons.ttf
		+ MaterialIcons.ttf
		+ EvilIcons.ttf
		+ Entypo.ttf
    
- cd ios and pod install

Run
yarn android
yarn ios (if there is duplicated error about font, just remove the fonts from copy bundle resources)


# Optional
------------
3. Remove DerivedData Folder
/Users/chaiyasit/Library/Developer/Xcode/DerivedData/xxx


4. Android Deployment
 - icon android/app/main/res
 - https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(68%2C%20138%2C%20255)&crop=0&backgroundShape=circle&effects=elevate&name=ic_launcher_round
 - Appname in string.xml
 
  - https://reactnative.dev/docs/signed-apk-android
 - ./gradlew assembleRelease  :  apk
 - ./gradlew bundleRelease   : app bundle


5. iOS Deployment
- icon https://makeappicon.com/