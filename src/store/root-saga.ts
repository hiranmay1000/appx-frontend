import { all, takeEvery } from 'redux-saga/effects';
import { handleChangePassword, handleGetUserData, handleLogin, handleSignup } from './sagas/user.saga';

const rootSaga = function* () {
  yield all([
    takeEvery('user/getUserData', handleGetUserData),
    takeEvery('user/loginUser', handleLogin),
    takeEvery('user/signupUser', handleSignup),
    takeEvery('user/changePassword', handleChangePassword),
  ]);
};

export default rootSaga;