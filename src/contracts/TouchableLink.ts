import React from "react";

export interface ITouchableElementListProps {
    items: ITouchableLinkProps[];
}

export interface ITouchableLinkProps {
    title: string;
    to: () => React.JSX.Element;
}
