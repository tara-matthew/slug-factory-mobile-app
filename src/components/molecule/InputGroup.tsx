import React from "react";
import {View} from "react-native";
import InputWithLabel from "./InputWithLabel";
import {TitleSize} from "../../contracts/InputWithLabel";

const InputGroup = ({inputs}) => {
    return (
        <View>
        {inputs.map((field, index) => (
                <View key={ index }>
                    <InputWithLabel
                        title={ field.title }
                        inputProps={ { ...field.inputProps } }
                        // value={ formValues[field.placeholder] }
                        placeholder={ field.placeholder }
                        isMultiline={ false }
                        // sendDataToParent={ handleChange }
                    >

                    </InputWithLabel>
                </View>
            ))}
        </View>
    )
}

export default InputGroup;
