import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CheckBox, ListItem} from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import {Rating, AirbnbRating} from 'react-native-ratings';

type Props = {
    navigation: any,
}
const TutorSelection: React.FC<Props> = ({navigation}) => {
    class Tutor {
        firstName: string;
        lastName: string;

        constructor(firstName: string, lastName: string) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }

    const [tutors, setTutors] = useState<Tutor[]>([new Tutor("Natalia", "Faccio"), new Tutor("szymon", "grzyfka"), new Tutor("lysy", "strzalka")]);
    return (
        <View>
            <SafeAreaView>
                <View>
                    <Text style={styles.label}>
                        Choose tutor
                    </Text>
                </View>
                <ScrollView>
                    {
                        tutors.map((tutor, index) => (
                                <ListItem style={styles.listItem} onPress={()=>{navigation.navigate('SubjectTopicSelection')}}>

                                    <ListItem.Content style={styles.button}>
                                        <ListItem.Title style={{fontSize: 30}}>
                                            {tutor.lastName}
                                        </ListItem.Title>
                                        <ListItem.Subtitle style={{fontSize: 20}}>
                                            {tutor.firstName}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>

                                    <AirbnbRating
                                        count={5}
                                        reviews={["Terrible", "Meh", "OK", "Good", "Trzaska"]}
                                        defaultRating={5}
                                        size={20}
                                        isDisabled={true}
                                    />
                                    <ListItem.Chevron size={20}/>
                                </ListItem>
                            // <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Log in')}}>
                            //     <Text style={styles.text}>
                            //         {tutor.firstName} {tutor.lastName}
                            //     </Text>
                            // </TouchableOpacity>
                        ))
                    }
                </ScrollView>

            </SafeAreaView>
        </View>
    );
};

export default TutorSelection;
const styles = StyleSheet.create({
    label: {
        fontSize: 35,
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#becbf6',
        height: "auto",
        marginVertical: 1

    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    listItem: {
        display: "flex",
        // flexDirection:"column",
    }

});
