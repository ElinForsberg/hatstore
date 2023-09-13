import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";


interface IUserContext {
    loggedInUser?: User | null;
    setLoggedInUser: React.Dispatch<React.SetStateAction<undefined>>,
    login: (user:UserType) => Promise<void>;
    registerUser: (user:RegisterUser) => Promise<void>;
    // showAlert: () => void;
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
showAlert: () => {}

}


const UserContext = createContext<IUserContext>(defaultValues);

export const useUser = () => useContext(UserContext);

const UserProvider = ({children}: PropsWithChildren) => {
    const [ loggedInUser, setLoggedInUser ] = useState();
    // const [loginAlert, setLoginAlert] = useState("");

    // const showAlert = () => {
    //     setLoginAlert("Wrong email or password!")
    //   }

    useEffect(() => {
        const authorization = async () => {
          try {
            const response = await fetch("/api/user/authorize");
            const data = await response.json();
            if (response.status === 200 || response.status === 304) {
              setLoggedInUser(data);
              console.log(data);
              
            }
     
          } catch (err) {
            console.log(err);
          }
        };
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
                    console.log(data);
                } 
                // }  showAlert(); 
                
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
           loggedInUser,
           registerUser,
        //    showAlert
            
        }}
        >
            {children}
        </UserContext.Provider>
    );
};


export default UserProvider;