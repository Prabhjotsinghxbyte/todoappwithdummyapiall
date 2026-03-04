import { useState, createContext, type ReactNode, type Dispatch, type SetStateAction } from "react"
export interface User {
    accessToken: string
    email: string
    firstName: string
    gender: "male" | "female"
    id: number
    image: string
    lastName: string
    refreshToken: string
    username: string
    password: string
}
interface TodoData {
    id: number
    todo: string
    completed: boolean
    userId: number
}
interface UserContextType {
    userData: User | null
    setUserData: Dispatch<SetStateAction<User | null>>
    todos: TodoData[]
    setTodos: Dispatch<SetStateAction<TodoData[]>>
}

export const UserContext = createContext<UserContextType>({
    userData: null,
    setUserData: () => { },
    todos: [],
    setTodos: () => { },
})

const UserContextProvider = ({ children }: { children: ReactNode }) => {

    const [userData, setUserData] = useState<User | null>(JSON.parse(localStorage.getItem("userInfo") || "{}")
    )
    const [todos, setTodos] = useState<TodoData[]>([])

    return (
        <UserContext.Provider value={{ userData, setUserData, todos, setTodos }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider