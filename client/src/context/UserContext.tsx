import { PropsWithChildren, createContext, useContext, useState } from "react";


interface IUserContext {
    loggedInUser?: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<undefined>>,
    login: (user:UserType) => Promise<void>;
}

interface User {
    username: string;
    email: string;
    password: string;
    id: string;
}

export type UserType = {
    username: string;
    password: string;
}

const defaultValues = {
loggedInUser: null,
login: async () => {},
setLoggedInUser: () => {}

}


const UserContext = createContext<IUserContext>(defaultValues);

export const useUser = () => useContext(UserContext);

const UserProvider = ({children}: PropsWithChildren) => {
    const [ loggedInUser, setLoggedInUser ] = useState();

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
                    console.log(data);
                    
                }
            } catch(err) {
                console.log(err);
                
            }
        }
    }

    return (
        <UserContext.Provider
        value={{
           login,
           setLoggedInUser,
           loggedInUser
            
        }}
        >
            {children}
        </UserContext.Provider>
    );
};


export default UserProvider;