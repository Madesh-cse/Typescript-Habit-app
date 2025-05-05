import "../../styles/Components/_resgister.scss";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../Firebase";

interface LoginUserData {
  Email: string;
  password: string;
}

function Login() {
  const [userCredential, setUserCredential] = useState<LoginUserData>({
    Email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, userCredential.Email, userCredential.password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid Email or Password");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Google login failed");
    }
  };

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
                      <input
                        type="email"
                        value={userCredential.Email}
                        onChange={(e) =>
                          setUserCredential({
                            ...userCredential,
                            Email: e.target.value,
                          })
                        }
                        placeholder="Enter the Email"
                      />
                    </div>
                    <div className="register-password">
                      <label>Password</label>
                      <input
                        type="password"
                        value={userCredential.password}
                        onChange={(e) =>
                          setUserCredential({
                            ...userCredential,
                            password: e.target.value,
                          })
                        }
                        placeholder="Enter the Password"
                      />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Submit</button>
                  </form>
                  <div className="third-party">
                    <p>
                      <span>
                        <FaApple />
                      </span>
                      Apple
                    </p>
                    <p onClick={handleGoogleLogin} style={{ cursor: "pointer" }}>
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
                Don't have an account? <NavLink to="/Register">Register</NavLink>
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
