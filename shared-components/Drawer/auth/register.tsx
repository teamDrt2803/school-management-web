import { CircularProgress, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { authActions, loginWithGoogle, signUp } from "../../../redux/features/auth/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { AuthButton, SignInButton, SignInButtonGoogle } from "../../styled-buttons";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { GoogleLogo } from "../../svg/components/google-colored";
import { StyledForm } from "../../Form";
import { useForm } from "react-hook-form";
import { RegisterFormData } from "./types";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerValidationSchema } from "./resolvers";
import { ErrorText } from "../../Typography/error-text";
import { SelectAuthStateLoader } from "../../../redux/features/auth/selector";
import { InputLabel } from "../../inputlabel";

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
    const loader = useAppSelector(SelectAuthStateLoader) || false;
    const signInWithGoogle = () => dispatch(loginWithGoogle());

    return (
        <StyledForm onSubmit={handleSubmit(submitForm)}>
            <Grid container px={8} spacing={2}>
                <Grid item xs={12}>
                    <Typography align="center" variant="h6" noWrap style={{
                        fontWeight: 'bold'
                    }}>
                        Sign Up
                    </Typography>
                    <Typography align="center" noWrap variant="subtitle2">
                        {"Don't have an account?"}
                        <AuthButton bold variant='text' onClick={openLoginDrawer}>
                            Sign In
                        </AuthButton>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel label="User Name" />
                    <TextField variant='outlined' fullWidth {...register('displayName')} />
                    <ErrorText>
                        {errors?.displayName?.message}
                    </ErrorText>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel label="Email" />
                    <TextField variant='outlined' fullWidth {...register('email')} />
                    <ErrorText>
                        {errors?.email?.message}
                    </ErrorText>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel label="Password" />
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
                    <InputLabel label="Confirm Password" />
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
                        {loader ? <CircularProgress size={25} /> :
                            <InputLabel label="Sign IN" />
                        }
                    </SignInButton>
                </Grid>
                <Grid item xs={12} container justifyContent={'center'}>
                    <InputLabel label="OR" />
                </Grid>
                <Grid item xs={12} container justifyContent={'center'} spacing={2}>
                    <Grid item xs={12}>
                        <SignInButtonGoogle fullWidth style={{
                        }} variant="contained" onClick={signInWithGoogle}>
                            <GoogleLogo height={"1.2em"} width={"1.2em"} />
                            <InputLabel label="Continue with Google" />
                        </SignInButtonGoogle>
                    </Grid>
                </Grid>
                <Grid item xs={12} container alignContent={'center'}>
                    <InputLabel label={`By continuing, you agree to accept our Privacy Policy & Terms of Service.`} align='center' />
                </Grid>
            </Grid>
        </StyledForm>
    );
}