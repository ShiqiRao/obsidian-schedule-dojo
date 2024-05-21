import { createContext, ReactNode, useContext } from "react";

export const ComponentContext = createContext(new Map());

export const ComponentContextProvider = ({ children, value }: { children: ReactNode, value: any }) => {
    return (
        <ComponentContext.Provider value={value}>
            {children}
        </ComponentContext.Provider>
    );
}

export const useComponentContext = () => useContext(ComponentContext);