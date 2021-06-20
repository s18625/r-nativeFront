import React, {useState} from 'react';
import {DatePickerAndroid, ScrollView, TextInput, TextInputComponent, View} from "react-native";
import {Avatar, Icon, Input, ListItem, Button, Text, Divider} from 'react-native-elements';
import {Subject} from "./Hello";
import {incrementByAmount} from "../redux_operations/subjectSelection";
import DateTimePicker from '@react-native-community/datetimepicker';

const SubjectTopicsSelection = () => {
    const [subjectsToFill, setSubjectsToFill] = useState<Subject[]>([
        new Subject('Math'),
        new Subject('Chemistry'),
        new Subject('Physics')])
    const [expanded, setExpanded] = useState<boolean[]>(subjectsToFill.map(_ => false));
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState<'date' | 'time' | undefined>('date');
    const [show, setShow] = useState(false);

    const subjectSpecification = (expanded: boolean[], index: number, subject: Subject) => {
        return (
            <View>
                <ListItem.Accordion
                    content={
                        <>
                            <Icon name="school" size={30} style={{marginRight: 10}}/>
                            <ListItem.Content>
                                <ListItem.Title>{subject.name}</ListItem.Title>
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
                    <Input placeholder={'Range of materials'} multiline={true}/>
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

        />


</ScrollView>

);


}
;

export default SubjectTopicsSelection;
