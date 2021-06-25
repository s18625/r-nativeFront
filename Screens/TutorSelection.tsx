import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {CheckBox, ListItem} from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Subject} from "./Subjects";
import {useAppSelector} from "../hooks";
import {useDispatch, useSelector} from "react-redux";
import {incrementByAmount, setId} from "../redux_operations/subjectSelection";

type Props = {
    navigation: any,
}
const TutorSelection: React.FC<Props> = ({navigation}) => {
    const dispach = useDispatch();
    const pickedSubjects = useAppSelector(state => state.subjects.tutor);
    const idSub = useAppSelector(state => state.subjects.subId);
    class Tutor {
        id:number;
        name: string;
        surname: string;
        grade: number;

        constructor(firstName: string, lastName: string,grade:number, id:number) {
            this.name = firstName;
            this.surname = lastName;
            this.grade = grade;
            this.id = id;
        }
    }

    const [tutors, setTutors] = useState<Tutor[]>([])

    const goNext  = (idT:number) =>{
        let tut = tutors.filter(t=>t.id = idT);
        dispach(setId({
            tut
        }));
        navigation.navigate('SubjectTopicSelection')

    }

    useEffect(() => {
        fetch('http://192.168.1.31:8080/tutor/allBySub/'+idSub)
            .then(response => response.json())
            .then(data => {
                setTutors(data);

            });


    },[])

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
                                <ListItem style={styles.listItem} onPress={()=>goNext(tutor.id)} key={index}>

                                    <ListItem.Content style={styles.button}>
                                        <ListItem.Title style={{fontSize: 30}}>
                                            {tutor.surname}
                                        </ListItem.Title>
                                        <ListItem.Subtitle style={{fontSize: 20}}>
                                            {tutor.name}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>

                                    <AirbnbRating
                                        count={5}
                                        reviews={["bad", "Meh", "OK", "Good", "Pch"]}
                                        defaultRating={tutor.grade}
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
        paddingHorizontal: 10,
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
