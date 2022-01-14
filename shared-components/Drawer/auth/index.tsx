import styled from "@emotion/styled";
import { StyledDrawer } from "..";
import { SelectDrawerState } from "../../../redux/features/auth/selector";
import { authActions } from "../../../redux/features/auth/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import LoginDrawer from "./login";
import RegisterDrawer from "./register";

const AuthDrawer = styled(StyledDrawer)`
    background-color: white;
    justify-content: center;
    display: flex;
    flex-direction: column;
    .MuiDrawer-paperAnchorRight {
        justify-content: center;
    }
`;

const AuthDrawerContent = styled.div`
    min-width: 700px;
    max-width: 700px;
    background-color: white;
`;

function AuhtDrawerComp() {
    const dispatch = useAppDispatch();
    const drawerState = useAppSelector(SelectDrawerState);
    const closeDrawer = () => dispatch(authActions.closeAuthDrawer());

    return (
        <AuthDrawer onClose={closeDrawer} open={drawerState.isOpen} anchor={'right'} style={{
            justifyContent: 'center'
        }} className={`auth-drawer__${drawerState.type.toLowerCase()}`}>
            <AuthDrawerContent>
                {drawerState.type === 'LOGIN' ? <LoginDrawer /> : <RegisterDrawer />}
            </AuthDrawerContent>
        </AuthDrawer>
    )
}

export { AuhtDrawerComp as AuthDrawer };