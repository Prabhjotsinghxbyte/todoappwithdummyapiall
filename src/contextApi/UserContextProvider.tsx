import type { ILogin } from "@/assets/Types";
import {
  useState,
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface TodoData {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
interface UserContextType {
  userData: ILogin | null;
  setUserData: Dispatch<SetStateAction<ILogin | null>>;
  todos: TodoData[];
  setTodos: Dispatch<SetStateAction<TodoData[]>>;
}

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
  todos: [],
  setTodos: () => {},
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<ILogin | null>(
    JSON.parse(localStorage.getItem("userInfo") || "{}"),
  );
  const [todos, setTodos] = useState<TodoData[]>([]);

  return (
    <UserContext.Provider value={{ userData, setUserData, todos, setTodos }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
