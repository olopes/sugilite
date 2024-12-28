import { createContext, useContext, useState, ReactNode } from "react"

type QuickSearchProviderProps = {
    children: ReactNode
}

type QuickSearchProviderState = {
    quicksearch: string
    setQuicksearch: (quicksearch: string) => void
}

const initialState: QuickSearchProviderState = {
    quicksearch: "",
    setQuicksearch: () => null,
}

const QuickSearchProviderContext = createContext<QuickSearchProviderState>(initialState)

export function QuickSearchProvider({
    children,
    ...props
}: QuickSearchProviderProps) {
    const [quicksearch, setQuicksearch] = useState("");
    const value = {
        quicksearch,
        setQuicksearch,
    }

    // TODO Bind Ctrl+K as activation key?

    return (
        <QuickSearchProviderContext.Provider {...props} value={value}>
            {children}
        </QuickSearchProviderContext.Provider>
    )
}

export const useQuicksearch = () => {
    const context = useContext(QuickSearchProviderContext)

    if (context === undefined)
        throw new Error("useQuicksearch must be used within a QuickSearchProvider")

    return context
}
