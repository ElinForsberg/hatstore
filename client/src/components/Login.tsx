import  { useState } from 'react'
import { UserType, useUser } from '../context/UserContext';



function Login() {
    const { login } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    
    async function handleLogin (e: { preventDefault: () => void; }) {
        e.preventDefault()
        const user: UserType = {
            username,
            password
        }
        setUsername("");
        setPassword("");
    
        await login(user)
    }
  return (
    <div>
     <h1>Login</h1>  
     <form>
        <input placeholder="username" value= {username} onChange= {(e) => setUsername(e.target.value)}/>
        <input placeholder="password" value= {password} onChange= {(e) => setPassword(e.target.value)}/>
        <button onClick={handleLogin}>SignIn</button>
    </form> 

    <form>
        <input placeholder="username"/>
        <input placeholder="email"/>
        <input placeholder="password"/>
        <button>Register new User</button>
    </form> 
    
    </div>
  )
}

export default Login