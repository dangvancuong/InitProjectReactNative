
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/Home'
import DetailsScreen from '../screens/Details'
import AddScreen from '../screens/Add'
import EditScreen from '../screens/Edit'
import ContactScreen from '../screens/Contact'

const stackNavigtor = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
    Add: AddScreen,
    Contact: ContactScreen,
    Edit: EditScreen
}, {})

export default createAppContainer(stackNavigtor);
