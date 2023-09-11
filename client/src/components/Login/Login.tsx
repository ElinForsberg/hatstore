import  { useState } from 'react'
import { UserType, useUser, RegisterUser } from '../../context/UserContext';
import "./Login.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';


function Login() {
    const { login, registerUser, loggedInUser } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    
    async function handleLogin (e: { preventDefault: () => void; }) {
        e.preventDefault()
        const user: UserType = {
            email,
            password
        }
        setEmail("");
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
    <Header/>
   
    {loggedInUser &&
      <Box sx={{height: 100, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop: 5}}>
        <h2>
        You are succesfully logged in!
        </h2>
        <Link to = "/">
          <Button>Go shopping</Button>
        </Link>
       
      </Box>
    }
     <div className="loginWrapper">
    <Box className="boxContainer"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: 7,
        width:900
       
      }}
      >
    <Box className="leftBox"
      component="form"
      sx={{
       width: 300,
       height: 300,
       display:"flex",
       flexDirection: "column",
       alignItems:"center",
       justifyContent: "center",
       paddingTop: 10,
       paddingBottom: 10,
       border: "1px solid black",
       borderRadius: 2,
      //  marginLeft: 10,
       backgroundColor: "white",
       boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" 
       

      }}
      noValidate
      autoComplete="off"
    >
      <h3>Login</h3> 
      <TextField id="outlined-basic" 
      required
      size="small"
      label="Email" 
      variant="outlined"
      value={email}  
      
      onChange= {(e) => setEmail(e.target.value)}
      sx={{marginBottom: 5, marginTop: 10}}
      />
      <TextField id="outlined-basic" 
      required
      size="small"
      label="Password" 
      type= "password"
      variant="outlined" 
      value={password}  
      onChange= {(e) => setPassword(e.target.value)}
      sx={{marginBottom: 5}}
      />
      <Button variant="outlined" 
      size="small"
      onClick={handleLogin}
      sx={{marginBottom: 5}}
      >
        LogIn
      </Button>
    </Box>
     
   
     <Box className="rightBox"
      component="form"
        sx={{
          width: 300,
          height: 300,
          display:"flex",
          flexDirection: "column",
          alignItems:"center",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
          border: "1px solid black",
          borderRadius: 2,
          // marginRight: 10,
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" 
          
         }}
    
      noValidate
      autoComplete="off"
    >
      <h3>Register</h3> 
      <TextField id="outlined-basic" 
      required
      size="small"
      label="Username" 
      variant="outlined"  
      value={username} 
      onChange= {(e) => setUsername(e.target.value)}
      sx={{marginBottom: 5, marginTop: 10}}
      />
      <TextField id="outlined-basic" 
      required
      size="small"
      label="Email" 
      variant="outlined"
      value={email}   
       onChange= {(e) => setEmail(e.target.value)}
       sx={{marginBottom: 5}}
       />
      <TextField id="outlined-basic" 
      required
      size="small"
      label="Password" 
      type= "password"
      variant="outlined"  
      value={password} 
      onChange= {(e) => setPassword(e.target.value)}
      sx={{marginBottom: 5}}
      />
      <Button variant="outlined" size="small" onClick={handleRegisterUser}>Register new User</Button>
    </Box>
    </Box>
   
    </div>
    </div>
  )
}

export default Login