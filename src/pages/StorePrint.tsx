import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { RadioButton, Checkbox } from "react-native-paper";

const StorePrint = () => {
    const [formValues, setFormValues] = useState(null);
    const [checked, setChecked] = React.useState("first");
    const [value, setValue] = React.useState("first");

    const handleChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
        // console.log(formValues.title);
    };

    const handleSubmit = async () => {
        console.log("submitting", formValues);
    };

    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

    const getBackgroundColorStyle = (value, matchValue) => {
        return value === matchValue ? { backgroundColor: "#d2d1d3" } : {};
    };

    // @ts-ignore
    return (
        <View>
            <View className="p-5">
                <Text>Title</Text>
                <View className="bg-black/5 w-full p-5 rounded-2xl mb-8">
                    <TextInput
                        placeholder="title"
                        onChangeText={ text => handleChange("title", text) }
                    />
                </View>
                <Text>Material</Text>
                <RadioButton.Group
                    onValueChange={ newValue => handleChange("material", newValue) }
                    value={ formValues?.material }
                >
                    <RadioButton.Item
                        value="pla"
                        label="PLA"
                        style={ {
                            ...getBackgroundColorStyle(formValues?.material, "pla"),
                        } }
                    />
                    <RadioButton.Item
                        value="petg"
                        label="PETG"
                        style={ {
                            ...getBackgroundColorStyle(formValues?.material, "petg"),
                        } }
                    />
                    <RadioButton.Item
                        value="abs"
                        label="ABS"
                        style={ {
                            ...getBackgroundColorStyle(formValues?.material, "abs"),
                        } }
                    />
                </RadioButton.Group>
                <Checkbox.Item
                    label="Brim"
                    status={ formValues?.uses_brim ? "checked" : "unchecked" }
                    onPress={ () => {
                        handleChange("uses_brim", !formValues?.uses_brim);
                    } }
                />
                <Checkbox.Item
                    label="Raft"
                    status={ formValues?.uses_raft ? "checked" : "unchecked" }
                    onPress={ () => {
                        handleChange("uses_raft", !formValues?.uses_raft);
                    } }
                />

                {/* <RadioButton.Group onValueChange={ newValue => handleChange("adhesion", newValue) } value={ formValues?.adhesion }> */}
                {/*    <RadioButton.Item */}
                {/*        value="brim" */}
                {/*        label="Brim" */}
                {/*        // style={{ */}
                {/*        //     ...getBackgroundColorStyle(value, "yes"), */}
                {/*        // }} */}
                {/*    /> */}
                {/* </RadioButton.Group> */}

                <View className="w-full mt-4">
                    <TouchableOpacity
                        style={ { backgroundColor: "#d0cadb" } }
                        className="w-full p-3.5 rounded-2xl"
                        onPress={ handleSubmit }
                    >
                        <Text className="text-center">Submit</Text>

                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
};

export default StorePrint;
