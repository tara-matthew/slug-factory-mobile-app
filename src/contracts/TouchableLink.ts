import React from "react";

export interface ITouchableLinkProps {
    title: string;
    to: () => React.JSX.Element;
}
