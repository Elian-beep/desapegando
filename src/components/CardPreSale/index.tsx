import { Text, TouchableOpacity, View } from "react-native";
import { BoxActions, ContentCard } from "./cardPreSale.styled";
import { IItem } from "../../interfaces/IItem";
import { ContainerCard, TitleDesc } from "../../default.styled";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    item: IItem,
    onPressSolded: (id: number) => void,
    onPressEdit: (item: IItem) => void,
    onPressRemove: (item: number) => void
}

export const CardPreSale = ({ item, onPressSolded, onPressEdit, onPressRemove }: Props) => {

    const handlePressSolded = () => {
        onPressSolded(item.id);
    }
    const handlePressRemove = () => {
        onPressRemove(item.id);
    }
    const handlePressEdit = () => {
        onPressEdit(item);
    }

    return (
        <ContainerCard>
            <BoxActions>
                <TouchableOpacity onPress={handlePressSolded}>
                    {/* <Ionicons name="cash-outline" size={25} color="green" /> */}
                    <Ionicons name="cash-outline" size={25} color="green" />
                </TouchableOpacity>
                <TitleDesc>R$ {item.value.toFixed(2)}</TitleDesc>
                <TitleDesc>|</TitleDesc>
                <TitleDesc>{item.description}</TitleDesc>
            </BoxActions>
            <BoxActions>
                <TouchableOpacity onPress={handlePressRemove}>
                    <Ionicons name="trash-bin-outline" size={25} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressEdit}>
                    <Ionicons name="ios-pencil-sharp" size={25} color="blue" />
                </TouchableOpacity>
            </BoxActions>
        </ContainerCard>
    );
}