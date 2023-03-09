https://www.youtube.com/watch?v=KjVQ8Q9EzrI

1. yarn add react-native-onesignal react-native-permissions
2. get app id from https://app.onesignal.com/
3. setup targetSdkVersion = 33 or higher in android/build.gradle
4. update permission in AndroidManifest.xml (<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/> )
5. copy NotificationUtil.ts and update app id for push
6. call in App.ts by useEffect


