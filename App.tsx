import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content } from './src/default.styled';
import { ListItems } from './src/Pages/ListItems';
import { initializeDatabase } from './src/data/SQLiteDatabase';
import Routes from './src/routes';

export default function App() {
  initializeDatabase();
  return (
    <Container>
      <Routes />
      {/* <ListItems /> */}
      <StatusBar style="auto" />
    </Container>
  );
}