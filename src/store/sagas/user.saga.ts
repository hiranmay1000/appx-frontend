import { call, put } from 'redux-saga/effects';
import { setToastMessage, setUserData, setUserError } from '../slices/user.slices';
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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

    const response = yield call(axios.post, 'http://localhost:4000/api/signup', {
      username,
      email,
      password,
      image
    });

    if (response.status === 201 || response.status === 200) {
      const user = response.data.user;
      yield put(setUserData(user));     
    }
  } catch (error: any) {
    yield put(setUserError(error.response?.data?.message || 'Signup failed'));
  }
}




// LOGIN SAGA
function* handleLogin(action: PayloadAction<loginPayload>): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;

    const response = yield call(axios.post, 'http://localhost:4000/api/login', { email, password });

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

    const response = yield call(axios.get, `http://localhost:4000/api/users/${email}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch user data');
    }

    const data = response.data;
    yield put(setUserData(data));

  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(setUserError(error.response?.data?.message || 'Failed to fetch user data'));
    } else {
      yield put(setUserError('An unknown error occurred'));}
  }
}


// CHANGE PASSWORD SAGA
function* handleChangePassword(action: PayloadAction<{ email: string; oldPassword: string; newPassword: string }>): Generator<any, void, any> {
  try {
    const { email, oldPassword, newPassword } = action.payload;

    const response = yield call(axios.post, 'http://localhost:4000/api/change-password', { email, oldPassword, newPassword });

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




export { handleGetUserData, handleLogin, handleSignup, handleChangePassword};
