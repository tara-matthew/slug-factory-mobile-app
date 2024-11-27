import React, {useEffect} from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

const RadioButtonGroupWithHeading = ({sendDataToParent}) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (name, value) => {
        setValue(value);
        sendDataToParent(name, parseInt(value));
    };

    // useEffect(() => {
    //     console.log(value);
    // }, [value]);


    return (
        <View>
            <Text className="font-bold text-lg">Material</Text>
            <View className="mb-8">
                <RadioButton.Group
                    onValueChange={ newValue => handleChange("filament_material_id", newValue) }
                    value={ value }
                >
                    <RadioButton.Item
                        value="1"
                        label="PLA"
                    />
                    <RadioButton.Item
                        value="2"
                        label="PETG"
                    />
                    <RadioButton.Item
                        value="3"
                        label="ABS"
                    />
                    <RadioButton.Item
                        value="4"
                        label="Nylon"
                    />
                    <RadioButton.Item
                        value="5"
                        label="TPU"
                    />
                </RadioButton.Group>
            </View>
        </View>
    );
};

export default RadioButtonGroupWithHeading;
