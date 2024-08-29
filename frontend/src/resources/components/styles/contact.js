import styled from "styled-components";

export const TextInput = styled("div")`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #FFF;
    padding-inline: 20px;
    padding-block: 10px;

    & label{
        color: #4B5057;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
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