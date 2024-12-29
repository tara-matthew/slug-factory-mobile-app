import React from "react";
import { Text, TextInput, View } from "react-native";
import { IInputWithLabelProps, TitleSize } from "../../contracts/InputWithLabel";

// TODO change props to be an object
const InputWithLabel = ({ title, titleSize = TitleSize.Medium, value = null, defaultValue = null, inputProps = {}, placeholder, isMultiline, sendDataToParent }: IInputWithLabelProps) => {
    const inputStyling = isMultiline
        ? {
                ...inputProps,
                style: { height: 60 },
                editable: true,
                multiline: true,
                numberOfLines: 10,
            }
        : inputProps;

    const titleClassName = titleSize === TitleSize.Large ? "text-lg" : "text-md";

    return (
        <View>
            <Text className={ `font-bold ${titleClassName}` }>{title}</Text>
            <View className="bg-black/5 w-full p-5 rounded-2xl mb-7">
                <TextInput
                    { ...inputStyling }
                    value={ value }
                    defaultValue={ defaultValue }
                    placeholder={ placeholder }
                    onChangeText={ text => sendDataToParent(placeholder, text) }
                />
            </View>
        </View>

    );
};

export default InputWithLabel;
