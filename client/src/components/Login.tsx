import  { useState } from 'react'
import { UserType, useUser, RegisterUser } from '../context/UserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Login() {
    const { login, registerUser } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    
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

    async function handleRegisterUser (e: { preventDefault: () => void; }) {
        e.preventDefault()
        const user: RegisterUser = {
            username,
            password,
            email
        }
        setUsername("");
        setPassword("");
        setEmail("");
    
        await registerUser(user)
    }

  return (
    <div>
     <h1>Login</h1>  
     {/* <form>
        <input placeholder="username" value= {username} onChange= {(e) => setUsername(e.target.value)}/>
        <input placeholder="password" value= {password} onChange= {(e) => setPassword(e.target.value)}/>
        <button onClick={handleLogin}>SignIn</button>
    </form>  */}
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Username" variant="outlined" value= {username} onChange= {(e) => setUsername(e.target.value)}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" value= {password} onChange= {(e) => setPassword(e.target.value)}/>
      <Button variant="outlined" onClick={handleLogin}>LogIn</Button>
    </Box>
     
    {/* <form>
        <input placeholder="username" value= {username} onChange= {(e) => setUsername(e.target.value)}/>
        <input placeholder="email" value= {email} onChange= {(e) => setEmail(e.target.value)}/>
        <input placeholder="password" value= {password} onChange= {(e) => setPassword(e.target.value)}/>
        <button onClick={handleRegisterUser}>Register new User</button>
    </form>  */}
     <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Username" variant="outlined" value= {username} onChange= {(e) => setUsername(e.target.value)}/>
      <TextField id="outlined-basic" label="Email" variant="outlined" value= {email} onChange= {(e) => setEmail(e.target.value)}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" value= {password} onChange= {(e) => setPassword(e.target.value)}/>
      <Button variant="outlined" onClick={handleRegisterUser}>Register new User</Button>
    </Box>
    
    </div>
  )
}

export default Login