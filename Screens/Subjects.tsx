import React, {useEffect, useReducer, useState} from 'react'
import axios from 'axios';
import {
    Animated,
    Button,
    ListViewComponent,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native'
import {Badge, ListItem} from 'react-native-elements'
import {CheckBox, Icon} from 'react-native-elements'
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../hooks";
import {incrementByAmount, setSub} from "../redux_operations/subjectSelection";




class Subject {
    name: string;
    acronym:string;

    constructor(name: string, acronym:string) {
        this.name = name;
        this.acronym = acronym;
    }
}

type MainAppProps = {
    navigation: any;
}

const Subjects: React.FC<MainAppProps> = ({navigation}) => {

    const dispach = useDispatch();
    const [subjects, setSubjects] = useState<Subject[]>([])
    let [picked, setPicked] = useState<boolean[]>([])
    const pickedSubjects = useAppSelector(state => state.subjects.value);


    useEffect(() => {
        fetch('http://192.168.1.31:8080/subject/all')
            .then(response => response.json())
            .then(data => {
                setSubjects(data);
            });
        // setPicked(pickedSubjects);
        // dispach()


    },[])
    const goNext =()=>{
        if(picked.filter(s=>s).length>0) navigation.navigate('Tutors')
    }

    const updateCheckboxes = (i: number) => {
        let _picked = [...picked];
        _picked[i] = !_picked[i];
        dispatch(incrementByAmount(_picked));
        dispach(setSub(i+1));
        setPicked(_picked);
    }
    const dispatch = useAppDispatch();
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.label}>
                    Choose subjects you want to study.
                </Text>
            </View>
            <ScrollView>
                {
                    subjects.map((subject, index) => (
                        <CheckBox size={35} textStyle={{fontSize:30} }
                            key={index}
                            title={subject.acronym}
                            checked={picked[index]}
                            onPress={() => {
                                updateCheckboxes(index)
                            }}
                        />
                    ))
                }
            </ScrollView>
            <View>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={()=>goNext()}>
                    <Text style={styles.text}>{'Choose Tutor'}</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>


    )
}

export default Subjects
export {Subject}

const styles = StyleSheet.create({
    label: {
        fontSize: 22,
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

});
