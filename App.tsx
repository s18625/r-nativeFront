import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HelloScren from './Screens/HelloScren';
import Subjects from './Screens/Subjects';
import store from './store'
import {Provider} from 'react-redux'
import TutorSelection from "./Screens/TutorSelection";
import SubjectTopicsSelection from "./Screens/SubjectTopicsSelection";
import End from "./Screens/End";

const App = () => {

    const Stack = createStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Log in"
                        component={HelloScren}
                        options={{title: 'Welcome'}}
                    />
                    <Stack.Screen name="Subjects" component={Subjects}/>
                    <Stack.Screen name="Tutors" component={TutorSelection}/>
                    <Stack.Screen name="SubjectTopicSelection" component={SubjectTopicsSelection}/>
                    <Stack.Screen name="End" component={End}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
};


export default App;
