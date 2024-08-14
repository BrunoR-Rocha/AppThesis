import styled from "styled-components";

export const TextInput = styled("div")`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #FFF;
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

    & input, textarea{
        background-color: transparent;

        &:focus-visible{
            outline: none;
        }
    }
`;