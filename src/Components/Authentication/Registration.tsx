import "../../styles/Components/_resgister.scss";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase";

interface RegisterUserData {
  Email: string;
  password: string;
}

function Registration() {
  const [userCredential, setUserCredential] = useState<RegisterUserData>({
    Email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userCredential.Email,
        userCredential.password
      );

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to register");
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Google registration failed");
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
                <h2>Register</h2>
                <p>Join the Crextio team</p>
                <div className="form-card">
                  <form onSubmit={handleRegister}>
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
                        placeholder="Enter your Email"
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
                        placeholder="Enter your Password"
                      />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Register</button>
                  </form>
                  <div className="third-party">
                    <p>
                      <span>
                        <FaApple />
                      </span>
                      Apple
                    </p>
                    <p onClick={handleGoogleSignUp} style={{ cursor: "pointer" }}>
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
                Already have an account? <NavLink to="/Login">Login</NavLink>
              </p>
              <p>Terms & Conditions</p>
            </div>
          </div>
          <div className="card-image">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Team Work"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
