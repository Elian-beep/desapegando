import { ScrollView, Text, View } from "react-native";
import { Content, MainTitle, SubTitle } from "../../default.styled";
import { useEffect, useState } from "react";
import { availableItemData, getItemSoldedData } from "../../data/ItemsData";
import { IItem } from "../../interfaces/IItem";
import { CardSolded } from "../../components/CardSolded";
import { BottomDown, BoxCards } from "../ListItems/listItems.styled";

export const Wallet = () => {
    const [total, setTotal] = useState(250.00);
    const [items, setItems] = useState<IItem[]>([]);

    useEffect(() => {
        getItems();
    }, [items]);

    const getItems = async () => {
        await getItemSoldedData().then((values: IItem[]) => setItems(values));
        setTotal(items.reduce((cont, item) => cont + item.value, 0));
    }

    const availableItem = async (id: number) => {
        await availableItemData(id)
            .then(updated => console.log(`tornar disponível item ${updated} de id ${id}`))
            .catch(err => console.log(`erro ao disponibilizar para venda item de id ${id}`))
    }

    return (
        <Content>
            <MainTitle>Total acumulado: R$ {total.toFixed(2)}</MainTitle>
            <SubTitle>Items vendidos</SubTitle>
            <ScrollView>
                <BoxCards>
                    {items.length > 0 && items.map(item => (
                        <CardSolded item={item} onPressAvailable={availableItem} key={item.id} />
                    ))}
                </BoxCards>
                <BottomDown />
            </ScrollView>
        </Content>
    );
}

export default Wallet;