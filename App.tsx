import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainApp from './Screens/MainApp';
import Hello from './Screens/Hello';
import store from './store'
import {Provider} from 'react-redux'
import TutorSelection from "./Screens/TutorSelection";
import SubjectTopicsSelection from "./Screens/SubjectTopicsSelection";

const App = () => {

    const Stack = createStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Log in"
                        component={MainApp}
                        options={{title: 'Welcome'}}
                    />
                    <Stack.Screen name="Subjects" component={Hello}/>
                    <Stack.Screen name="Tutors" component={TutorSelection}/>
                    <Stack.Screen name="SubjectTopicSelection" component={SubjectTopicsSelection}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
};


export default App;
