import React, { ReactNode } from "react";
import { fn } from "storybook/test";

// Optional: you can use TypeScript to type the props
interface MockNavigationProviderProps {
    children: ReactNode;
}

// Mock object returned by useNavigation()
const mockNavigation = {
    navigate: fn("navigate"),
    goBack: fn("goBack"),
    push: fn("push"),
    replace: fn("replace"),
    pop: fn("pop"),
    popToTop: fn("popToTop"),
    reset: fn("reset"),
    setParams: fn("setParams"),
    jumpTo: fn("jumpTo"),
};

// Mock object returned by useRoute()
const mockRoute = {
    name: "StoryScreen",
    params: {},
};

export const MockNavigationProvider = ({ children }: MockNavigationProviderProps) => {
    return React.cloneElement(children as React.ReactElement, {
        navigation: mockNavigation,
        route: mockRoute,
    });
};
