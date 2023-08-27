import { User } from "@/types";
import { createContext } from "react";

type UserContextType = {
    user: User
}
const AuthContext = createContext<User | undefined>(undefined)
export default AuthContext;
