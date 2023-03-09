import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, store} from '../store';
import ImagePicker from 'react-native-image-crop-picker';
import {Alert, Platform} from 'react-native';
import axios from 'axios';

type CameraState = {
  image: any;
};

const defaultState: CameraState = {
  image: null,
};

export const handleUploadWithAxios = createAsyncThunk(
  'camera/handleUploadWithAxios',
  async () => {
    const image = store.getState().cameraReducer.image;
    const uriParts = image.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const data = new FormData();
    data.append('username', 'codemobiles'); // you can append anyone.
    data.append('password', '1234'); // you can append anyone.
    data.append('userfile', {
      uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
      type: `image/${fileType}`, // or photo.type
      name: 'testPhotoName.jpg',
    });

    try {
      let result = await axios.post('http://192.168.90.71:3000/uploads', data, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
      console.log(JSON.stringify(result.data));
      Alert.alert(JSON.stringify(result.data));
    } catch (e) {
      console.error(e);
    }
  },
);

export const handleCamera = createAsyncThunk(
  'camera/handleCamera',
  async (cropIt: boolean) => {
    let _image = await ImagePicker.openCamera({
      cropping: cropIt,
      width: 500, // width after cropped
      height: 500, // height after cropped
      includeExif: true,
    });
    return _image;
  },
);

export const handlePhotoGallery = createAsyncThunk(
  'camera/handleGallery',
  async (cropIt: boolean) => {
    let _image = await ImagePicker.openPicker({
      // width: 300, // width after cropped
      // height: 300, // height after cropped
      cropping: cropIt,
      compressImageMaxWidth: 640, // max width compress if not croppred
      compressImageMaxHeight: 480, // max height compress if not croppred
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    });

    return _image;
  },
);

const cameraSlice = createSlice({
  name: 'camera',
  initialState: defaultState,
  reducers: {
    handleCancel: state => {
      state.image = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(handleCamera.fulfilled, (state, action) => {
      const _image = action.payload;

      state.image = {
        uri: _image.path,
        width: _image.width,
        height: _image.height,
      };
    });
    builder.addCase(handlePhotoGallery.fulfilled, (state, action) => {
      const _image = action.payload;

      state.image = {
        uri: _image.path,
        width: _image.width,
        height: _image.height,
      };
    });
  },
});

export default cameraSlice.reducer;
export const {handleCancel} = cameraSlice.actions;
export const cameraSelector = (state: RootState) => state.cameraReducer;
