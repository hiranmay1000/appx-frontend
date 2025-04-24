import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for your user
interface User {
    _id: string;
    username: string | 'username';
    email: string;
    password: string;
    image: string;
}

// Define the slice state type
interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    toastMessage: string | null;
    toastColor: string;
}

// Initial state
const initialState: UserState = {
    user: null,
    isLoading: false,
    error: null,
    toastMessage: null,
    toastColor: 'red',
};

export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        getUserData: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setUserError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        signupUser: (state, action: PayloadAction<{ username: string, email: string, password: string, image: File }>) => {
            state.isLoading = true;
            state.error = null;
        },
        loginUser: (state, action: PayloadAction<{ email: string, password: string }>) => {
            state.isLoading = true;
            state.error = null;
        },
        logoutUser: (state) => {
            state.user = null;
            state.error = null;
            state.isLoading = false;
        },
        changePassword: (state, action: PayloadAction<{ email?: string, oldPassword: string, newPassword: string }>) => {
            state.isLoading = true;
            state.error = null;
        },
        setToastMessage: (state, action: PayloadAction<{ message: string; color: string }>) => {
            state.toastMessage = action.payload.message;
            state.toastColor = action.payload.color;
        },
        clearToastMessage: (state) => {
            state.toastMessage = null;
            state.toastColor = 'red';
        },
        editImage: (state, action: PayloadAction<{ image: File, userId: string, oldImagePath: string}>) => {
            state.isLoading = true;
            state.error = null;
        }
    },
});

export const {
    setUserData,
    getUserData,
    setUserError,
    signupUser,
    loginUser,
    logoutUser,
    changePassword,
    setToastMessage,
    clearToastMessage,
    editImage
} = usersSlice.actions;



export default usersSlice.reducer;
