import React from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

const RadioButtonGroupWithHeading = ({ heading, groupID, radioButtons, initialValue, sendDataToParent }) => {
    const [value, setValue] = React.useState(initialValue);

    const handleChange = (name, value) => {
        setValue(value);
        sendDataToParent(name, value);
    };

    // TODO could memoise this
    const getBackgroundColorStyle = (value: string | number | boolean, matchValue: string | number | boolean) => {
        return value === matchValue ? { backgroundColor: "#d0cadb" } : {};
    };

    return (
        <View>
            <Text className="font-bold text-lg">{heading}</Text>
            <View>
                <RadioButton.Group
                    onValueChange={ newValue => handleChange(groupID, newValue) }
                    value={ value }
                >
                    {radioButtons.map(radioButton => (
                        <RadioButton.Item
                            value={ radioButton.value }
                            label={ radioButton.label }
                            style={ {
                                ...getBackgroundColorStyle(value, radioButton.value),
                            } }
                            key={ radioButton.value }
                        />
                    ))}
                </RadioButton.Group>
            </View>
        </View>
    );
};

export default RadioButtonGroupWithHeading;
