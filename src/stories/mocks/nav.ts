import React from "react";
import { fn } from "storybook/test";
import { action } from 'storybook/actions';

export const useRoute = () => {
    return {
        name: 'fun route',
        params: {
            nothing: 'nice ocean view'
        }
    };
};

export const useNavigation = () => {
    return {
        push: () => null,
        goBack: () => null,
        pop: () => null,
        popToTop: () => null,
        reset: () => null,
        replace: () => null,
        // navigate: fn("navigate"),
        navigate: (to: any, ...args: any[]) =>
            action("navigate")(typeof to === "function" ? to.name : String(to), ...args),
        // navigate: () => console.log('here'),
        setParams: () => null,
        jumpTo: () => null
    };
};


