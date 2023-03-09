

# Review Day1
-------------------
- setup react-native 
  + vscode, jdk11, emulator, vscode-extension, JAVA_HOME, windows(project location (c:\))  
  + vscode-extensions (vscode-icon, es7, emulator, path intellisense)
- cmd+p, cmd+shift+p, ctl+shift+right/left
- Intro react-native (react.js | react-native)
  + react for mobile 
- App Flow  
  + index.js > App.tsx > HomeScreen.tsx
- Basic Layout +UI
  + View, Text, Image, Button, TouchableOpacity, ImageBackground
- FlexLayout
  + flexDirection [column | row]  ex: styles={flexDirection: 'row'}
  + Alignment (justifyContent | alignItem)
  + styles margin-top, margin-bottom > marginTop, marginBotton  
  + Props ex: 
    type ComponentNameProps = {
        username:string;
        password:string;
        isAdmin:boolean;
        level:number;
    }

 - callback
   + onChanged: () => String;
 - disable fast refresh
 - rr / cmd+m / shake / r at metro
 - open option in simulator or device
   + metro + d
- difference between normal variable and state
  + let vs useState
  + let for none-side-effect variable
  + useState (like property in c#) for side-effect variable
  + what is side-effect?
    - when variable's value changed, the UI will update (re-render) 

Day 2/5    
- Language:  https://www.npmjs.com/package/i18next
- https://codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=songs
- custom components
- svg-icon
  - Navigation
    + AppNavigator: Define Screen Definition and Navigation
    + const Stack = createStackNavigator<RootStackParamList>();
    + const Tab = createBottomTabNavigator<RootTabParamList>();
    <Stack.Navigator initialRouteName='firstScreen'>
      <Stack.Screen name='' component={...} />
      <Stack.Screen name='' component={...} />
    </Stack.Navigator>

    <Tab.Navigator initialRouteName='firstScreen'>
      <Tab.Screen name='' component={...} />
      <Tab.Screen name='' component={...} />
    </Tab.Navigator>
  - const navigation = useNavigation()
  - forward to next screen: navigation.navigate('next-screen')
  - backward to next screen: navigation.goBack()
  - Flatlist vs [....].map(item=><Text>.....</Text>)
  - Flatlist: [data, renderIte, extractKey]
  - Axis (HttpClient)
  - async and await 
  - Image (require, uri)
  - QuickType https://quicktype.io/
  - Form model interface from json
  - Optional type : isShow****?:boolean
  - key in array or collection
  - Style in Navigation
  - State (self-change-inside) vs Props (change-from-outside)


Day 3/5
- redux toolkits: https://www.youtube.com/watch?v=zBXf8GojEks
- npx yarn add @reduxjs/toolkit react-redux
- redux toolkit
  - Benifit: Separation of Concerns (UI, Logic, State)
  - Keywords: Store, Slice, State, Reducer, ExtraReducer, Action
  - Keywords: createSlice (name, initialState, reducer, extraReducer)
  - Keywords: Store.ts (configureStore, RootState, AppDispatch, const dispatch = useAppDispatch();) 
  - Keywords: Usage: 
    + const dispatch = useAppDispatch();
      - dispatch(loadData()) // calling action
    + const jsonReducer = useSelector(jsonSelector);
      - jsonReducer.dataArray

- https://www.youtube.com/watch?v=gWJUIQ97PRg
- cd backend
- npm init -y
- yarn add express formidable fs-extra
- npx nodemon server.js
- pm2 cluster: https://www.youtube.com/watch?v=j8rmMCmH2bc
- Authen Scene

Day 4/5
- permissions
- integrate camera
- upload image with multi-parts
- integrate qrcode
- integate qrcode scanner
- event emitter
- Google Map Setup
- Run on real device

Day 5/5
- Google Map
  + Custom Map
  + Custom Marker
  + Upload coordination
  + Location tracking
  + Callout
- Deployment
  + keystore
  + apk, aab
  + app icon
  + app name
  + app version
- Review Redux  
- Review Navigation
- FAQ