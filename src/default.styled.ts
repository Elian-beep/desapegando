import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

export const Content = styled.View`
    margin-top: 30px;
    padding: 20px;
`

export const MainTitle = styled.Text`
    font-size: 24px;
    font-weight: 600;
`;
/* text-align: ${ props => props.isCenter ? "center" : "none" }; */

export const SubTitle = styled.Text`
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
`;

export const ContainerCard = styled.View`
    width: 100%;
    padding: 10px;
    border-color: '#f1f1f1';
    border-width: 0.7px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const TitleDesc = styled.Text`
    font-size: 16px;
    font-weight: 500;
`;