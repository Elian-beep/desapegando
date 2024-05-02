import { Content, MainTitle } from "../../default.styled"
import { BottomDown, BoxCards, BtnItem, Form, InptText } from "./listItems.styled"
import { useEffect, useState } from "react"
import { IItem } from "../../interfaces/IItem"
import { createItemData, getItemAvailableData, removeByIdItemData, soldedItemData, updateItemData } from "../../data/ItemsData"
import { Button, FlatList, SafeAreaView, ScrollView, View } from "react-native"
import { CardPreSale } from "../../components/CardPreSale"
import { BoxCardPreSale } from "../../components/CardPreSale/cardPreSale.styled"

export const ListItems = () => {
    const [oneId, setOneId] = useState<number>();
    const [description, setDescription] = useState<string>();
    const [value, setValue] = useState<number>(0.00);
    const [itemSample, setItemSample] = useState<IItem>({ description: '', value: 0.00 });
    const [items, setItems] = useState<IItem[]>([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getItems();
    }, [itemSample, items]);

    const onHandlerForm = async () => {
        if (!isEdit) {
            await createItemData({ description, value, sold: false })
                .then(id => console.log(`Item criado com o id: ${id}`))
                .catch(err => console.log(`Erro ao criar item: ${err}`))
        } else {
            setItemSample({ id: oneId, description, value, sold: false });
            await updateItemData({ id: oneId, description, value, sold: false })
                .then(updated => console.log(`Item ${updated} editado com sucesso`))
                .catch(err => console.log(`Erro ao editar item: ${err}`))
            console.log(`Editar para: ${itemSample.id} - ${itemSample.description}`);
        }
        setDescription('');
        setValue(null);
        setIsEdit(false);
        getItems();
    }

    const getItems = async () => {
        await getItemAvailableData().then((values: IItem[]) => setItems(values));
    }

    const soldedItem = async (id: number) => {
        await soldedItemData(id)
            .then(updated => console.log(`item ${updated} com id ${id} vendido`))
            .catch(err => console.log(`erro ao vender item: ${err}`))
        getItems();
    }

    const updateItem = (item: IItem) => {
        setOneId(item.id);
        setDescription(item.description);
        setValue(item.value);
        setIsEdit(true);
    }

    const removeByIdItem = async (id: number) => {
        await removeByIdItemData(id)
            .then(() => console.log('item removido'))
            .catch(err => console.log('Erro ao remover item: ', err));
        getItems();
    }

    return (
        <Content>
            <MainTitle>Vendas</MainTitle>
            <Form>
                <InptText value={description} onChangeText={text => setDescription(text)} isText placeholder="Nome do item" />
                <InptText value={String(value)} onChangeText={text => setValue(parseFloat(text.replace(/[^\d.]/g, '')))} isText={false} keyboardType="numeric" placeholder="Valor" />
                <BtnItem title="Inserir" onPress={() => onHandlerForm()} />
            </Form>
            <ScrollView>
                <BoxCards>
                    {items.length > 0 && items.map(item => (
                        <CardPreSale onPressSolded={soldedItem} onPressEdit={updateItem} onPressRemove={removeByIdItem} item={item} key={item.id} />
                    ))}
                </BoxCards>
                <BottomDown />
            </ScrollView>
        </Content>
    )
}

export default ListItems;