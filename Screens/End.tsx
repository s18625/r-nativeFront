import React from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {color} from "react-native-elements/dist/helpers";

type MainAppProps = {
    navigation: any;
}

const HelloScren: React.FC<MainAppProps> = ({navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={backgroundStyle}>
                    <View>
                        <Text style={styles.header}>
                            Your private lesson has been added
                        </Text>
                    </View>
                    <View>
                            <Icon type="material" iconStyle={{color: "green"}} name="done" size={100} style={{marginRight: 10,color:"blue"}}/>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>

    )
}

export default HelloScren

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    but: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        fontSize:20,
        backgroundColor: '#0088CC',
        height: 90,



    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    header:{
        fontSize: 40,
        textAlign:"center",
        alignSelf: 'center',
        marginVertical: 40,
        color:"black",
    }
});

