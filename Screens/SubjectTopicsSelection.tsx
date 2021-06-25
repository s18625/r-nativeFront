import React, {useEffect, useState} from 'react';
import {DatePickerAndroid, ScrollView, TextInput, TextInputComponent, View} from "react-native";
import {Avatar, Icon, Input, ListItem, Button, Text, Divider} from 'react-native-elements';
import {Subject} from "./Subjects";
import {incrementByAmount} from "../redux_operations/subjectSelection";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAppSelector} from "../hooks";
import {useDispatch, useSelector} from "react-redux";

type MainAppProps = {
    navigation: any;
}

const SubjectTopicsSelection : React.FC<MainAppProps> = ({navigation}) => {
        const dispach = useDispatch();
        const [subjectsToFill, setSubjectsToFill] = useState<Subject[]>([new Subject("a", "a"), new Subject("a", "a"),new Subject("a", "a"),new Subject("a", "a"),new Subject("a", "a")])
        const [expanded, setExpanded] = useState<boolean[]>(subjectsToFill.map(_ => false));
        const [date, setDate] = useState(new Date(new Date().getTime()));
        const [mode, setMode] = useState<'date' | 'time' | undefined>('date');
        const [show, setShow] = useState(false);
        const [subjectLessons, setSubjectLessons] = useState();
        const [privateLesson, setPrivateLesson] = useState({});
        const [materials, setMaterials] = useState([]);
        const tutor = useAppSelector(state => state.subjects.tutor);
        const pickedSubjects = useAppSelector(state => state.subjects.value);

        const axios = require('axios');


        const handleMaterialChange = (event:any,index:number) => {

            setMaterials(prevState => {
                let nowa = [...prevState];
                // @ts-ignore
                nowa[index] = event;
                return nowa;
            })
        }
        useEffect(() => {

            setPrivateLesson({
                "id": -1,
                "date": date,
                "minutesOfLesson": 90,
                tutor: tutor,
                student: {}
            });

            fetch('http://192.168.1.31:8080/subject/all')
                .then(response => response.json())
                .then(data => {
                    // @ts-ignore
                    let selected = data.filter((sub: any, i: string | number) => pickedSubjects[i]);
                    setSubjectsToFill(selected);
                });
        }, [])


        const sendPrivateLesson = () => {

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(privateLesson)
            };
            fetch('http://192.168.1.31:8080/lesson/add', requestOptions)
                .then(() => console.log("wyslana privaet lesson + tutorID  " + tutor));

            sendAllLessonSubject();


        }

        const sendAllLessonSubject = () => {

            setPrivateLesson({
                "id": 1,
                "date": date,
                "minutesOfLesson": 90,
                tutor: tutor,
                student: {}
            });

            let subles = subjectsToFill.map((sub,index) => {
                return {
                    "materialScope": materials[index],
                    "subject": sub,
                    "privateLesson": privateLesson,
                }
            });

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(subles)
            };
            fetch('http://192.168.1.31:8080/subjectLesson/addAll', requestOptions)
                .then(() => console.log("wyslano kilka lesson subdzektow"));


            if (subjectsToFill.length>0)navigation.navigate('End');
        }


        const subjectSpecification = (expanded: boolean[], index: number, subject: Subject) => {

            return (
                <View key={index}>
                    <ListItem.Accordion
                        content={
                            <>
                                <Icon name="school" size={30} style={{marginRight: 10}}/>
                                <ListItem.Content>
                                    <ListItem.Title>{subject.acronym}</ListItem.Title>
                                </ListItem.Content>
                            </>
                        }
                        isExpanded={expanded[index]}
                        onPress={() => {
                            let _picked = [...expanded];
                            _picked[index] = !expanded[index];
                            setExpanded(_picked);
                        }}
                    >
                        <Input placeholder={'Range of materials'} multiline={true}
                               onChangeText={(event)=>handleMaterialChange(event,index)}
                               />
                    </ListItem.Accordion>
                </View>
            );
        }
        return (
            <ScrollView>
                {subjectsToFill.map((value, index) => {
                    return subjectSpecification(expanded, index, value)
                })}
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: "space-between",
                    marginTop: 20
                }}>
                    <Button buttonStyle={{height: 70, marginHorizontal: 10}} title={'Choose Date'}
                            icon={{name: 'calendar', type: 'ionicon', color: 'white',}} onPress={() => {
                        setMode('date');
                        setShow(true);
                    }}/>
                    <Button buttonStyle={{height: 70, marginHorizontal: 10}} title={'Choose Time'}
                            icon={{name: 'time', type: 'ionicon', color: 'white', iconStyle: {fontWeight: 'bold'}}}
                            onPress={() => {
                                setMode('time')
                                setShow(true);
                            }}/>

                </View>
                {show &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setDate(currentDate);
                        setShow(false);
                    }}
                />
                }
                <View style={{
                    alignSelf: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 20
                }}>

                    <Text h2>{`${date.getDay()}-${date.getMonth().toLocaleString("EN")}-${date.getFullYear()}`}</Text>
                    <Divider orientation={'horizontal'} width={4}/>
                    <Text h2>{`${date.getHours()}:${date.getMinutes()} `}</Text>
                </View>

                <Button titleStyle={{fontSize: 25}}
                        buttonStyle={{height: 70, marginHorizontal: 10, borderRadius: 10, marginTop: 60}} title={'Accept'}
                        icon={{name: 'send', type: 'ionicon', color: 'white', iconStyle: {fontWeight: 'bold'}}}
                        onPress={() => {
                            sendPrivateLesson()
                        }}

                />


            </ScrollView>

        );


    }
;

export default SubjectTopicsSelection;
