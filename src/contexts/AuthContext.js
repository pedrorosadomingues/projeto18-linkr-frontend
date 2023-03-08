import { createContext, useState } from "react"


export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    
    const loggedUser = JSON.parse(localStorage.getItem("token"))
    const [token, setToken] = useState(loggedUser !== null ? loggedUser : {})
    
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}
