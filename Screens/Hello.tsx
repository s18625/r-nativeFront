import React, {useEffect, useReducer, useState} from 'react'
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
import {incrementByAmount} from "../redux_operations/subjectSelection";




class Subject {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

type MainAppProps = {
    navigation: any;
}

const Hello: React.FC<MainAppProps> = ({navigation}) => {
    const [subjects, setSubjects] = useState<Subject[]>([
        new Subject('Math'),
        new Subject('Chemistry'),
        new Subject('Physics')])
    let [picked, setPicked] = useState<boolean[]>([true, true, true])
    const pickedSubjects = useAppSelector(state => state.subjects.value);
    useEffect(() => {
        setPicked(pickedSubjects);
    },[])
    const updateCheckboxes = (i: number) => {
        let _picked = [...picked];
        _picked[i] = !_picked[i];
        dispatch(incrementByAmount(_picked));
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
                            title={subject.name}
                            checked={picked[index]}
                            onPress={() => {
                                updateCheckboxes(index)
                            }}
                        />
                    ))
                }
            </ScrollView>
            <View>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={()=>{navigation.navigate('Tutors')}}>
                    <Text style={styles.text}>{'Choose Tutor'}</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>


    )
}

export default Hello
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
