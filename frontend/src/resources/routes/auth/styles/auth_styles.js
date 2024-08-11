import styled from "styled-components";
import AuthLogo from "../../../media/auth/auth_moony.svg";

export const AuthArea = styled("div")`
  width: 100%;
  height: 100vh;
  background-size: cover;
  align-items: center;
  justify-content: center;
`;

export const AuthButton = styled("a")`
    flex-grow: 1;
    border-radius: 48px;
    border: 1px #DBE4F8;
    background-color: #E9F0FF;
    padding: 16px;
    display: flex;
    gap: 10px;
    color: #44456A;
    font-weight: 500;
    font-size: 16px;
    align-items: center;
`;

export const AuthIcon = styled("div")`
    border-radius: 48px;
    background: #FFF;
    padding: 5px;
`;

export const AuthSideLogo = styled("div")`
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
`;


export const AuthInput = styled("div")`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #F5F5F5;
    padding-inline: 20px;
    padding-block: 10px;

    & label{
        color: #575757;
        font-size: 10px;
        font-style: normal;
        font-weight: 500;
        text-transform: uppercase;
        padding-bottom: 5px;
    }

    & input {
        background-color: transparent;

        &:focus-visible{
            outline: none;
        }
    }
`;


