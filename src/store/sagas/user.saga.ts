import { call, put } from 'redux-saga/effects';
import { setUserData, setUserError } from '../slices/user.slices';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../config';
import { showToast } from '../slices/toast.slice';

interface signupPayload {
  username: string;
  email: string;
  password: string;
  image: File | null;
}

interface GetUserPayload {
  email: string;
}

interface loginPayload {
  email: string;
  password: string;
}

// SIGNUP SAGA
function* handleSignup(action: PayloadAction<signupPayload>): Generator<any, void, any> {
  try {
    const { username, email, password, image } = action.payload;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }

    const response = yield call(axios.post, `${API_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201 || response.status === 200) {
      const user = response.data.user;
      yield put(setUserData(user));
    }else{
      yield put(setUserError('Signup failed'));
    }
  } catch (error: any) {
    yield put(setUserError(error.response?.data?.message || 'Signup failed'));
  }
}


// LOGIN SAGA
function* handleLogin(action: PayloadAction<loginPayload>): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;

    const response = yield call(axios.post, `${API_URL}/login`, { email, password });

    if (response.status === 200) {
      const user = response.data.user;
      yield put(setUserData(user));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      yield put(setUserError(errorMessage));
    } else {
      yield put(setUserError('An unknown error occurred'));
    }
  }
}


// FETCH USERDATA 
function* handleGetUserData(action: PayloadAction<GetUserPayload>): Generator<any, void, any> {
  try {
    const { email } = action.payload;

    const response = yield call(axios.get, `${API_URL}/users/${email}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch user data');
    }

    const user = response.data;
    yield put(setUserData(user));

  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(setUserError(error.response?.data?.message || 'Failed to fetch user data'));
    } else {
      yield put(setUserError('An unknown error occurred'));
    }
  }
}


// CHANGE PASSWORD SAGA
function* handleChangePassword(action: PayloadAction<{ email: string; oldPassword: string; newPassword: string }>): Generator<any, void, any> {
  try {
    const { email, oldPassword, newPassword } = action.payload;

    const response = yield call(axios.post, `${API_URL}/change-password`, { email, oldPassword, newPassword });

    if (response.status === 200) {
      yield put(showToast({ message: 'Password changed successfully!', type: 'success' }));
    } else {
      yield put(showToast({ message: 'Something went wrong!', type: 'error' }));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(setUserError(error?.message || 'Failed to change password.'));
    } else {
      yield put(setUserError('An unknown error occurred.'));
    }
  }
}


// EDIT IMAGE SAGA
function* handleEditImage(action: PayloadAction<{ image: File, userId: string, oldImagePath: string }>): Generator<any, void, any> {
  try {
    const { image, userId, oldImagePath } = action.payload;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userId);
    formData.append('oldImagePath', oldImagePath);

    const response = yield call(axios.put, `${API_URL}/profile/edit-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      yield put(setUserData(response.data.user));
      yield put(showToast({ message: response.data.user.message, type: 'success' }));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(showToast({ message: error.response?.data?.message || 'Image update failed', type: 'error' }));
    } else {
      yield put(showToast({ message: 'Failed to update image. Try again!', type: 'error' }));
    }
  }
}




export { handleGetUserData, handleLogin, handleSignup, handleChangePassword, handleEditImage };
