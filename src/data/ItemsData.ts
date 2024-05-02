import { db } from "./SQLiteDatabase";
import { IItem } from "../interfaces/IItem";

db.transaction(tx => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, value NUMERIC(10, 2), sold INTEGER DEFAULT 0);',
        [],
        () => console.log('Tabela items criada com sucesso em ItemsData')
    );
});

const getItemAvailableData = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM items WHERE sold=0;',
                [],
                (_, { rows }) => resolve(rows._array)
            )
        })
    })
}
const getItemSoldedData = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM items WHERE sold=1;',
                [],
                (_, { rows }) => resolve(rows._array)
            )
        })
    })
}

const createItemData = (obj: IItem) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO items (description, value, sold) VALUES (?, ?, ?);',
                [obj.description, obj.value, obj.sold ? 1 : 0],
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) resolve(insertId);
                    else reject(new Error('Erro ao inserir item ' + JSON.stringify(obj)));
                },
            )
        })
    })
}

const updateItemData = (obj: IItem) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE items SET description=?, value=? WHERE id=?;",
                [obj.description, obj.value, obj.id],
                (_, { rowsAffected }) => {
                    if( rowsAffected > 0 ) {
                        console.log(`Alteração feita em banco, item recebido: ${obj.id} - ${obj.description} - ${obj.value}`)
                        resolve(rowsAffected);
                    }
                    else reject("Erro ao atualizar: id=" + obj.id);
                }
            );
        });
    });
}

const removeByIdItemData = (id: number) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM items WHERE id=?;",
                [id],
                (_, rowsAffected) => {
                    resolve(rowsAffected);
                },
            )
        })
    })
}

const soldedItemData = (id: number) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE items SET sold=1 WHERE id=?;",
                [id],
                (_, { rowsAffected }) => {
                    if( rowsAffected > 0 ) {
                        console.log(`item com id ${id} vendido`)
                        resolve(rowsAffected);
                    }
                    else reject("Erro ao atualizar: id=" + id);
                }
            );
        })
    })
}

const availableItemData = (id: number) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE items SET sold=0 WHERE id=?;",
                [id],
                (_, { rowsAffected }) => {
                    if( rowsAffected > 0 ) {
                        console.log(`item com id ${id} vendido`)
                        resolve(rowsAffected);
                    }
                    else reject("Erro ao atualizar: id=" + id);
                }
            );
        })
    })
}

export { getItemAvailableData, getItemSoldedData, createItemData, updateItemData, removeByIdItemData, soldedItemData, availableItemData }