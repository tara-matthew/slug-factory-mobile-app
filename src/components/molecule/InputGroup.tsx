import React from "react";
import {View} from "react-native";
import InputWithLabel from "./InputWithLabel";
import {IInputGroupProps} from "../../contracts/InputGroup";

const InputGroup = ({inputs, sendDataToParent}: IInputGroupProps) => {
    return (
        <View>
        {inputs.map((field, index) => (
                <View key={ index }>
                    <InputWithLabel
                        title={ field.title }
                        inputProps={ { ...field.inputProps } }
                        value={ field?.value }
                        defaultValue={ field?.defaultValue }
                        placeholder={ field.placeholder }
                        isMultiline={ field.isMultiline }
                        sendDataToParent={ sendDataToParent }
                    >

                    </InputWithLabel>
                </View>
            ))}
        </View>
    )
}

export default InputGroup;
