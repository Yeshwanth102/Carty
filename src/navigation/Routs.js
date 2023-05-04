
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/Home/Home';
import Checkout from '../Components/Checkout/Checkout';

const Stack = createStackNavigator();

export const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName='Product List'>
      <Stack.Screen name="Pretty Little Thing" component={Home} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}
