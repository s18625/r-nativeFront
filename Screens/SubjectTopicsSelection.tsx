import React, {useState} from 'react';
import {TextInput, TextInputComponent, View} from "react-native";
import {Avatar, Icon, ListItem} from 'react-native-elements';
import {Subject} from "./Hello";

const SubjectTopicsSelection = () => {
    const [subjectsToFill, setSubjectsToFill] = useState<Subject[]>([
        new Subject('Math'),
        new Subject('Chemistry'),
        new Subject('Physics')])
    const [expanded, setExpanded] = useState(true)
    return (
        <View>
            <ListItem.Accordion
                content={
                    <>
                        <Icon name="star" size={30} />
                        <ListItem.Content>
                            <ListItem.Title>Ur Subjects</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                setExpanded(!expanded)
                }}
            >
                {subjectsToFill.map((l, i) => (
                    <ListItem key={i} onPress={()=>{}} bottomDivider>
                        <TextInput placeholder={`Provide topics for subject: ${l.name}`} style={{height: 200}}>

                        </TextInput>
                    </ListItem>
                ))}
            </ListItem.Accordion>
        </View>
    );
};

export default SubjectTopicsSelection;
