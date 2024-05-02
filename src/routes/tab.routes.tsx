import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListItems from "../Pages/ListItems";
import Wallet from "../Pages/Wallet";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen 
                name="listItems" 
                component={ListItems}
                options={{
                    tabBarIcon: ({color}) => <Ionicons name="barcode-outline" size={25} color={color} />,
                    tabBarLabel: 'Disponíveis'
                }} 
                />
            <Tab.Screen 
                name="wallet" 
                component={Wallet} 
                options={{
                    tabBarIcon: ({color}) => <Ionicons name="card-outline" size={25} color={color} />,
                    tabBarLabel: 'Vendidos'
                }} 
            />
        </Tab.Navigator>
    );
}