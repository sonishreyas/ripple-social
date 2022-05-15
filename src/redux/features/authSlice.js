// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = {
// 	status: "idle",
// 	error: null,
// 	email: "",
// 	password: "",
// 	focus: { email: false, password: false },
// };

// export const login = createAsyncThunk(
//   'auth/login',
//   ({ email, password }) => {
//       try {
//         const result = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         const userData = {
//           token: result.user.accessToken,
//           name: result.user.displayName,
//           email: result.user.email,
//           uid: result.user.uid,
//         };
//         localStorage.setItem("user", JSON.stringify(userData));
//         return userData;
//       } catch (error) {
//         console.log(error);
//       }
//   }
// );

// const authSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     updateEmail: (state, {payload}) => {
//       state.email = payload
//     },
//     updatePassword: (state, {payload}) => {
//       state.password = payload
//     },
//     updateFocus: (state, {payload}) => {
//       state.focus = payload
//     },
//     loginFromLocal: (state,action) => {
//       state.user = action.payload
//     }
//   }
// })
