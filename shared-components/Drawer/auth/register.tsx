import { CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { authActions, loginWithGoogle, signUp } from "../../../redux/features/auth/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AuthButton, SignInButton, SignInButtonApple, SignInButtonGoogle } from "../../styled-buttons";
import { Apple, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { GoogleLogo } from "../../svg/components/google-colored";
import { StyledForm } from "../../Form";
import { useForm } from "react-hook-form";
import { LoginFormData, RegisterFormData } from "./types";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidationSchema } from "./resolvers";
import { ErrorText } from "../../Typography/error-text";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import { SelectAuthStateLoader } from "../../../redux/features/auth/selector";

export default function RegisterDrawer() {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerValidationSchema),
        mode: 'onChange',
    });

    const dispatch = useAppDispatch();

    const [showPassword, togglePasswordVisibility] = useState(false);

    const openLoginDrawer = () => {
        dispatch(authActions.closeAuthDrawer());
        setTimeout(() => {
            dispatch(authActions.toggleAuthDrawer({
                isOpen: true,
                type: 'LOGIN',
            }));
        }, 200)
    }

    const handleClickShowPassword = () => togglePasswordVisibility(!showPassword);
    const handleMouseDownPassword = (event: any) => event.preventDefault();
    const submitForm = async (data: RegisterFormData) => dispatch(signUp(data));
    const singInWithGoogle = () => dispatch(loginWithGoogle());
    const loader = useAppSelector(SelectAuthStateLoader) || false;

    return (
        <StyledForm onSubmit={handleSubmit(submitForm, errors => {
            console.log(errors);
        })}>
            <Grid container px={16} spacing={4}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h5" noWrap style={{
                        fontWeight: 'bold'
                    }}>
                        Sign Up
                    </Typography>
                    <Typography align="center" noWrap>
                        {"Don't have an account?"}
                        <AuthButton bold variant='text' onClick={openLoginDrawer}>
                            Sign In
                        </AuthButton>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>User Name</Typography>
                    <TextField variant='outlined' fullWidth {...register('displayName')} />
                    <ErrorText>
                        {errors?.displayName?.message}
                    </ErrorText>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Email</Typography>
                    <TextField variant='outlined' fullWidth {...register('email')} />
                    <ErrorText>
                        {errors?.email?.message}
                    </ErrorText>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Password</Typography>
                    <TextField
                        {...register('password')}
                        fullWidth
                        variant='outlined'
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                        autoComplete="current-password"
                    />
                    <ErrorText>
                        {errors?.password?.message}
                    </ErrorText>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Password</Typography>
                    <TextField
                        {...register('confirmPassword')}
                        fullWidth
                        variant='outlined'
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                        autoComplete="current-password"
                    />
                    <ErrorText>
                        {errors?.confirmPassword?.message}
                    </ErrorText>
                </Grid>
                <Grid item xs={12}>
                    <SignInButton variant="contained" type="submit" fullWidth disabled={!isValid || loader}>
                        {loader ? <CircularProgress size={25} /> : 'Create Account'}
                    </SignInButton>
                </Grid>
                <Grid item xs={12} container justifyContent={'center'}>
                    OR
                </Grid>
                <Grid item xs={12} container justifyContent={'center'} spacing={2}>
                    <Grid item xs={12}>
                        <SignInButtonGoogle fullWidth style={{
                        }} variant="contained" onClick={singInWithGoogle}>
                            <GoogleLogo height={"1.5em"} width={"1.5em"} />
                            Continue with Google
                        </SignInButtonGoogle>
                    </Grid>
                    {/* <Grid item xs={6}>
                        <SignInButtonApple fullWidth variant="contained">
                            <Apple />
                        </SignInButtonApple>
                    </Grid> */}
                </Grid>
                <Grid item xs={12} container alignContent={'center'}>
                    <Typography align="center" alignSelf={'center'}>
                        {`By continuing, you agree to accept our 
            Privacy Policy & Terms of Service.`}
                    </Typography>
                </Grid>
            </Grid>
        </StyledForm>
    );
}