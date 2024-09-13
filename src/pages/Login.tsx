import React, {memo, useMemo, useState} from "react";
import Welcome from "../components/template/Welcome";
import {Image, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import useFetch from "../hooks/useFetch";

const image = {uri: 'https://cdn.thingiverse.com/renders/18/f2/af/d5/e0/347d0cf950a6d42312a4d4a61d8c9c18_display_large.jpg'};

const Login = () => {
    const navigation = useNavigation();
    const [dataFromChild, setDataFromChild] = useState({});
    const [loginData, setLoginData] = useState<any>(null);

    async function handleDataFromChild(formData) {
        // setDataFromChild(data);
        console.log('this is the parent', formData);
        try {
            const response = await fetch('https://ghif128xv9.sharedwithexpose.com/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })

            const data = await response.json();

            if(! response.ok) {
                throw new Error(data.message);
            }

            if (data) {
                navigation.navigate('Home'); // Navigate on successful login
            }

        } catch (err) {
            console.log('here', err.message)
        }
    }

    // Check if data is available to navigate
    // if (data) {
    //     console.log('success')
    //     navigation.navigate('Home'); // Navigate on successful login
    // }

    return (
        <View className={"flex flex-1 justify-center items-center px-8 relative"}>
            {/*{fetchError ? <Text className={"text-red-500 text-center mb-4"}>{fetchError}</Text> : null}*/}
            <Welcome sendDataToParent={handleDataFromChild} headerText={"Sign in to Slug Factory"} buttonText={"Sign In"} buttonTo={'Home'} inputs={[{placeholder: "username"}, {placeholder: "password"}]}></Welcome>
        </View>
    )
}

export default memo(Login);
