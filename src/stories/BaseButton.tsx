// import React, { useMemo } from "react";
// import { StyleSheet, Text, TouchableOpacity } from "react-native";
//
// interface IButtonProps {
//     title: string;
//     isDisabled: boolean;
//     sendDataToParent: (data: never) => void;
// }
//
// const BaseButton = ({ title, sendDataToParent, isDisabled = false }: IButtonProps) => {
//     const buttonStyling = useMemo(() => {
//         return isDisabled ? styles.disabledButton : styles.enabledButton;
//     }, [isDisabled]);
//
//     return (
//         <TouchableOpacity
//             style={ buttonStyling }
//             className="w-full p-3.5 rounded-2xl"
//             onPress={ sendDataToParent }
//             disabled={ isDisabled }
//         >
//             <Text className="text-center">{title}</Text>
//         </TouchableOpacity>
//     );
// };
//
// const styles = StyleSheet.create({
//
//     disabledButton: {
//         backgroundColor: "#d0cadb",
//         opacity: 0.5,
//     },
//     enabledButton: {
//         backgroundColor: "#d0cadb",
//         opacity: 1,
//     },
// });
//
// export default BaseButton;
