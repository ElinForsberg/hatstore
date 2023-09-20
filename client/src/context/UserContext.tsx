import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useOrderContext } from "./OrderContext";

interface IUserContext {
    loggedInUser?: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (user:UserType) => Promise<void>;
    registerUser: (user:RegisterUser) => Promise<void>;
    isRegistered: boolean;
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
    loginAlert: boolean;
    setLoginAlert: React.Dispatch<React.SetStateAction<boolean>>;
    registerAlert: boolean;
    setRegisterAlert: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => void;
    authorization: () => void;
}

interface User {
    username: string;
    email: string;
    password: string;
    id: string;
}

export type UserType = {
    email: string;
    password: string; 
}

export type RegisterUser= {
    username: string;
    password: string;
    email: string;
}

const defaultValues = {
    loggedInUser: null,
    login: async () => {},
    registerUser: async () => {},
    setLoggedInUser: () => {},
    isRegistered: false,
    setIsRegistered: () => {},
    loginAlert: false,
    setLoginAlert: () => {},
    registerAlert: false,
    setRegisterAlert: () => {},
    logout: async () => {},
    authorization:() => {}
}

    const UserContext = createContext<IUserContext>(defaultValues);
    export const useUser = () => useContext(UserContext);

    const UserProvider = ({children}: PropsWithChildren) => {
        const [ loggedInUser, setLoggedInUser ] = useState<User | null>(null);
        const [ isRegistered, setIsRegistered ] = useState(false);
        const [loginAlert, setLoginAlert] = useState(false);
        const [registerAlert, setRegisterAlert] = useState(false);
        const {  getOrders } = useOrderContext();


    const authorization = async () => {
        try {
          const response = await fetch("/api/user/authorize");
          const data = await response.json();
            if (response.status === 200 || response.status === 304) {
                setLoggedInUser(data);
             }
         } catch (err) {
          console.log(err);
         }
     };

    useEffect(() => {
        authorization();
      }, []);

         async function login (user: UserType) {
             if (user ) {
                try {
                    const response = await fetch("/api/user/login", {
                        method: "POST",
                         headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(user)
                    });
                    const data = await response.json();
                        if(response.status === 200) {
                            setLoggedInUser(data);
                            getOrders();
                    }  else {
                        setLoginAlert(true);
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        }

            async function registerUser (user: RegisterUser) {
                if (user) {
                try {
                    const response = await fetch("/api/user/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(user)
                    });
                    await response.json();
                        if(response.status === 200) {
                            setIsRegistered(true)    
                } else {
                   setRegisterAlert(true)
                }
            } catch(err) {
                console.log(err);
                }
            } 
            }

const logout = async () => {
    try {
      const response = await fetch("api/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
      if (response.status === 204) {
        setLoggedInUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

    return (
        <UserContext.Provider
            value={{
            login,
            setLoggedInUser,
            loggedInUser,
            registerUser,
            isRegistered,
            setIsRegistered,
            loginAlert,
            setLoginAlert,
            registerAlert,
            setRegisterAlert,
            logout,
            authorization    
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;