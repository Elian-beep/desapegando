import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("desapegando.db");

const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, value NUMERIC(10, 2), sold INTEGER DEFAULT 0);',
            [],
            () => console.log('Tabela items criada com sucesso em SQLiteDatabase')
        );
    });
};

export { db, initializeDatabase };