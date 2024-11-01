
import styled from "styled-components";
import GeneralBg from "../../../media/about/background.png";

export const LibraryArea = styled("div")`
  width: 100%;
  background-image: url(${GeneralBg});
  background-size: cover;
`;

export const LibraryList = styled("div")`
    width: 100%;
    padding-block: 120px;
`;

export const LibraryItem = styled("div")`
    display: flex;
    width: 100%;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid #6078DF;
    background: rgba(96, 120, 223, 0.25);
    backdrop-filter: blur(40px);
    padding: 25px;
    max-width: 400px;
    gap: 40px;

    &:hover {
        background: rgba(96, 120, 223, 0.60);
    }
`;

export const LibraryTitle = styled("p")`
    color: #FFF;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px; 
`;

export const LibraryItemTitle = styled("p")`
    color: #FFF;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px; 
`;

export const PageInfo = styled("div")`
    width: 100%;
    padding-block: 120px;
    min-height: 100vh;
`;