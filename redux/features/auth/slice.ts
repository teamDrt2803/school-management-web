import { FirebaseError } from "@firebase/app";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider,
  AuthError,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { getApp } from "firebase/app";
import { auth } from "../../../firebase/clientApp";
import {
  LoginFormData,
  RegisterFormData,
} from "../../../shared-components/Drawer/auth/types";

type DrawerProps = {
  isOpen: boolean;
  type: "LOGIN" | "REGISTER" | "NONE";
};

type AuthState = {
  uid?: string | null;
  loading?: boolean;
  displayName?: string | null;
  email?: string | null;
  authenticated?: boolean;
  error?: SerializedError;
};

type InittialStateProps = {
  authDrawer: DrawerProps;
  authState: AuthState | null;
};

export const initialState: InittialStateProps = {
  authDrawer: {
    isOpen: false,
    type: "NONE",
  },
  authState: {
    displayName: undefined,
    email: undefined,
    authenticated: undefined,
    error: undefined,
    loading: false,
  },
};

type LoginPayload = Partial<LoginFormData> & {
  displayName?: string;
  uid?: string;
};

type RegisterPayload = Partial<RegisterFormData> & {
  uid?: string;
};

export const login = createAsyncThunk<AuthState, LoginPayload>(
  "login",
  async (req, thunkAPI) => {
    try {
      if (req.password && req.password !== null) {
        const response = await signInWithEmailAndPassword(
          auth,
          req.email ?? "",
          req.password ?? ""
        );
        const displayName = response.user?.displayName;
        const email = response.user?.email;
        const uid = response.user?.uid;
        return { displayName, email, uid } as LoginPayload;
      } else {
        const displayName = req.displayName;
        const email = req.email;
        const uid = req.uid;
        return { displayName, email, uid } as LoginPayload;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "loginWithGoogle",
  async (_req, thunkAPI) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      const response = await signInWithPopup(auth, provider);
      const displayName = response?.user?.displayName;
      const email = response?.user?.email;
      const uid = response?.user?.uid;
      return { displayName, email, uid } as LoginPayload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const signUp = createAsyncThunk<AuthState, RegisterPayload>(
  "register",
  async (req, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        req.email ?? "",
        req.password ?? ""
      );
      const dname = req.displayName;
      if (dname && dname !== null) {
        await updateProfile(response.user, { displayName: dname });
      }
      const displayName = response.user?.displayName;
      const email = response.user?.email;
      const uid = response.user?.uid;
      return {
        displayName: dname || displayName,
        email,
        uid,
      } as RegisterPayload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await auth.signOut();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
const slice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    toggleAuthDrawer(state, action: PayloadAction<DrawerProps>) {
      state.authDrawer = action.payload;
    },
    closeAuthDrawer(state) {
      state.authDrawer.isOpen = false;
      state.authDrawer.type = "NONE";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const {
          payload: { displayName, email, uid },
        } = action;
        state.authState = {
          uid,
          displayName,
          email,
          authenticated: true,
          loading: false,
        };
        state.authDrawer = initialState.authDrawer;
      })
      .addCase(login.pending, (state) => {
        state.authState = {
          ...state.authState,
          loading: true,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.authState = {
          ...initialState.authState,
          error: action.error,
          loading: false,
        };
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const {
          payload: { displayName, email, uid },
        } = action;
        state.authState = {
          uid,
          displayName,
          email,
          authenticated: true,
          loading: false,
        };
        state.authDrawer = initialState.authDrawer;
      })
      .addCase(signUp.pending, (state) => {
        state.authState = {
          ...state.authState,
          loading: true,
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        state.authState = {
          ...initialState.authState,
          error: action.error,
          loading: false,
        };
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        const {
          payload: { displayName, email, uid },
        } = action;
        state.authState = {
          uid,
          displayName,
          email,
          authenticated: true,
          loading: false,
        };
        state.authDrawer = initialState.authDrawer;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.authState = {
          ...state.authState,
          loading: true,
        };
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.authState = {
          ...initialState.authState,
          error: action.error,
          loading: false,
        };
      })
      .addCase(logout.pending, (state) => {
        state.authState = {
          ...state.authState,
          loading: true,
        };
      })
      .addCase(logout.fulfilled, (state) => {
        state.authState = {
          ...initialState.authState,
          authenticated: false,
          loading: false,
        };
      });
  },
});

export const {
  actions: authActions,
  reducer: authReducer,
  name: authSliceKey,
} = slice;
