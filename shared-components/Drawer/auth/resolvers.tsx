import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter an Email').email('Please enter a valid email'),
    password: Yup.string()
        .required('Please enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
});

export const registerValidationSchema = Yup.object().shape({
    displayName: Yup.string().required('Please choose a user name for yourself').min(4, 'Username must be of atleast 4 characters'),
    email: Yup.string().required('Please enter an Email').email('Please enter a valid email'),
    password: Yup.string()
        .required('Please enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    confirmPassword: Yup.string()
        .required('Please re-enter your password')
        .oneOf([Yup.ref('password')], 'Password and confirm password must match'),

});