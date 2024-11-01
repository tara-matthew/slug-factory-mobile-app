import React, { useEffect, useState } from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import fetchData from "../hooks/apiFetch";
import {Dropdown} from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
];

const StorePrint = () => {
    const [formValues, setFormValues] = useState(null);
    const [filamentBrands, setFilamentBrands] = useState(null);
    const [value, setValue] = useState(null);

    const handleChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues.title);
    };

    useEffect(() => {
        void getFilamentData();
    }, []);

    const getFilamentData = async () => {
        const endpoints = [
            `/filament-brands`,
        ];

        try {
            const [filamentBrands] = await fetchData(endpoints);
            console.log(filamentBrands.data);
            setFilamentBrands(filamentBrands.data);
        } catch (error) {
            console.error("Error in getting filament data", error.response.status);
        } finally {
            // setLoading(false);
        }
    };

    const handleSubmit = async () => {
       console.log('submitting', formValues)
    };

    const renderItem = (item) => {
        const isSelected = item.value === value;

        return (
            <View style={{ backgroundColor: isSelected ? '#e0e0e0' : 'transparent', padding: 8, borderRadius: 5 }}>
                <Text style={{ color: isSelected ? 'black' : 'grey' }}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View>
            <Text>Store Print Page</Text>

            <View className="bg-black/5 w-full p-5 rounded-2xl mb-7">
                <TextInput
                    placeholder={ "title" }
                    onChangeText={ text => handleChange("title", text) }
                />
                <Dropdown
                    // style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    // placeholderStyle={styles.placeholderStyle}
                    // selectedTextStyle={styles.selectedTextStyle}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder='Select item'
                    searchPlaceholder="Search..."
                    value={value}
                    // onFocus={() => setIsFocus(true)}
                    // onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        // setValue(item.value);
                        // setIsFocus(false);
                    }}
                    // renderLeftIcon={() => (
                    //     <AntDesign
                    //         style={styles.icon}
                    //         color={isFocus ? 'blue' : 'black'}
                    //         name="Safety"
                    //         size={20}
                    //     />
                    // )}
                />

                <View className="w-full mt-4">
                    <TouchableOpacity
                        style={{ 'backgroundColor': "#d0cadb" }}
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
