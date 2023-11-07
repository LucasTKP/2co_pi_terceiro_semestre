import { Dispatch, SetStateAction, createContext } from "react";

export const ExecuterContext = createContext<{ idExecuterTask: string | undefined, setIdExecuterTask: Dispatch<SetStateAction<string | undefined>> }>({
    idExecuterTask: undefined,
    setIdExecuterTask: () => (undefined),
});