import { useMemo } from "react";

const usePluralisedText = (count, singular, plural) => useMemo(
    () => `${count} ${count === 1 ? singular : plural}`,
    [count],
);

export default usePluralisedText;
