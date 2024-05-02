import styled, { css } from "styled-components/native";

export const Form = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* margin-top: 20px; */
`;

export const InptText = styled.TextInput<{isText: boolean}>`
    border-bottom-width: .5px;
    ${(props) => css `
        width: ${props.isText ? '55%' : '20%'}
    `}
`;

export const BtnItem = styled.Button`
    background-color: #000;
`;

export const BoxCards = styled.View`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

export const BottomDown = styled.View`
    height: 60px;
`;