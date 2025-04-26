import { call, put } from 'redux-saga/effects';
import { setToastMessage, setUserData, setUserError } from '../slices/user.slices';
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
      yield put(showToast({ message: response.data.message, type: 'success' }));

      yield put(setUserData(user));
    }
  } catch (error: any) {
    yield put(setUserError(error.response?.data?.message || 'Signup failed'));
    yield put(showToast({ message: error.response?.data.message, type: 'error' }));
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
      yield put(showToast({ message: "Login successful", type: 'success' }));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      yield put(showToast({ message: errorMessage, type: 'error' }));
    } else {
      yield put(showToast({ message: 'An unknown error occurred', type: 'error' }));
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
      // Dispatch success message to show toast
      yield put(setToastMessage({ message: 'Password changed successfully!', color: 'green' }));
    } else {
      // Handle error here if response status is not 200
      yield put(setToastMessage({ message: 'Failed to change password. Try again!', color: 'red' }));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(setUserError(error?.message || 'Failed to change password.'));
      yield put(setToastMessage({ message: 'Failed to change password. Try again!', color: 'red' }));
    } else {
      yield put(setUserError('An unknown error occurred.'));
      yield put(setToastMessage({ message: 'Failed to change password. Try again!', color: 'red' }));
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
      yield put(setToastMessage({ message: response.data.user.message, color: 'green' }));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(setToastMessage({ message: error.response?.data?.message || 'Image update failed', color: 'red' }));
    } else {
      yield put(setToastMessage({ message: 'Failed to update image. Try again!', color: 'red' }));
    }
  }
}




export { handleGetUserData, handleLogin, handleSignup, handleChangePassword, handleEditImage };
