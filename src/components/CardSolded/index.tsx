import { Text, TouchableOpacity, View } from "react-native";
// import { BoxActions, ContentCard, TitleDesc } from "./cardSolded.styled";
import { IItem } from "../../interfaces/IItem";
import { ContainerCard, TitleDesc } from "../../default.styled";
import { Ionicons } from "@expo/vector-icons";
import { BoxDescs } from "./cardSolded.styled";

interface Props {
    item: IItem,
    onPressAvailable: (id: number) => void,
}

export const CardSolded = ({ item, onPressAvailable }: Props) => {

    const handlePressSolded = () => {
        onPressAvailable(item.id);
    }

    return (
        <ContainerCard>
            <TouchableOpacity onPress={handlePressSolded}>
                <Ionicons name="ios-cart-outline" size={25} color="green" />
            </TouchableOpacity>
            <BoxDescs>
                <TitleDesc>{item.description}</TitleDesc>
                <TitleDesc>R$ {item.value.toFixed(2)}</TitleDesc>
            </BoxDescs>
        </ContainerCard>
    );
}