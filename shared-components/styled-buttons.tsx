import { Button } from "@mui/material";
import styled from "@emotion/styled";

type CommonProps = {
    borderRadius?: number;
    bold?: boolean;
}

export const CommonButton = styled(Button) <CommonProps>``;

export const AuthButton = styled(CommonButton)`
    background-color: transparent !important;
    color: #5E3EC5 !important;
    border-radius: ${props => props.borderRadius + 'px'} !important;
    border-color: #5E3EC5 !important;
    font-weight: ${props => props.bold && 'bold'} !important;
`;

export const SignInButton = styled(CommonButton)`
    align-self: center;
    min-height: 55px;
    font-weight: 500;
    font-size: large;
    letter-spacing: 0.1em;
`;

export const SignInButtonApple = styled(SignInButton)`
    background-color: black;
    &:hover {
        background-color: black;
    }
`;

export const SignInButtonGoogle = styled(SignInButton)`
    background-color: white;
    color: black;
    letter-spacing: 0.1;
    svg {
        margin-right: 1em;
    }
    font-weight: 500;
    text-transform: capitalize;
    &:hover {
        background-color: white;
    }
`;