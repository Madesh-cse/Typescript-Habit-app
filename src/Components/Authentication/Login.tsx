import "../../styles/Components/_resgister.scss";
import { NavLink } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { auth,googleProvider } from "../../Firebase";
import { useNavigate } from "react-router-dom";

interface LoginUserData {
    Email:string,
    password:string
}

function Login() {

    const Naviagate = useNavigate()

    const[userCredential,setuserCredential] = useState<LoginUserData>({
        Email:'',
        password:''
    })
    const[error,seterror] = useState('')

    const handleLogin = async (e:React.FormEvent)=>{
        e.preventDefault()
        seterror('')

        try{
            await signInWithEmailAndPassword(auth,userCredential.Email,userCredential.password)
            Naviagate('/')

        }catch(error:any){
            seterror('Invalid Email or Password')
        }
    }

    const handleGoogleLogin = async()=>{

        try{
            await signInWithPopup(auth,googleProvider)
            Naviagate('/')
        }catch(error:any){
            seterror('Google Login Fails')
        }
    }
  return (
    <div className="Register-Card">
      <div className="card">
        <div className="Card-responsive">
          <div className="Form-data">
            <div className="crestio">
              <p>Crextio</p>
            </div>
            <div className="register-align">
              <div className="register-form">
                <h2>Log in</h2>
                <p>Enjoy Your Work with App.do</p>
                <div className="form-card">
                  <form onSubmit={handleLogin}>
                    <div className="register-email">
                      <label>Email</label>
                      <input type="email" value={userCredential.Email} onChange={(e)=>setuserCredential({...userCredential,Email:e.target.value})} placeholder="Enter the Email" />
                     {error && <p>{error}</p>}
                    </div>
                    <div className="register-password">
                      <label>Password</label>
                      <input type="password" value={userCredential.password} onChange={(e)=>setuserCredential({...userCredential,password:e.target.value})} placeholder="Enter the Password" />
                      {error && <p>{error}</p>}
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                  <div className="third-party">
                    <p>
                      <span>
                        <FaApple />
                      </span>
                      Apple
                    </p>
                    <p onClick={handleGoogleLogin}>
                      <span>
                        <FcGoogle />
                      </span>
                      Google
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="extra-feature">
              <p>
                Have an account? <NavLink to="/Register">Register</NavLink>
              </p>
              <p>Terms & Conditions</p>
            </div>
          </div>
          <div className="card-image">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Team Meeting"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
