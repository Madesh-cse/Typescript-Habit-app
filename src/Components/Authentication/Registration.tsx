import "../../styles/Components/_resgister.scss";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithRedirect,getRedirectResult } from "firebase/auth";
import { auth, googleProvider, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

interface UserInformation {
  firstname: string;
  Email: string;
  password: string;
}

function Registration() {
  const [userData, setUserData] = useState<UserInformation>({
    firstname: "",
    Email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<UserInformation>>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const isValid = (): boolean => {
    const newErrors: Partial<UserInformation> = {};

    if (!userData.firstname || userData.firstname.trim().length < 3) {
      newErrors.firstname = "Full name must be at least 3 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.Email)) {
      newErrors.Email = "Enter a valid email";
    }

    if (!userData.password || userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    if (!isValid()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.Email,
        userData.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: userData.firstname,
        email: userData.Email,
        provider: "email",
      });

      setSubmitted(true);
      alert('You are registered')
      navigate("/Login");
    } catch (error: any) {
      setErrors({ Email:'Permission is not allowed'});
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);

      const result = await getRedirectResult(auth);

      if (result?.user) {
        const user = result.user;
  
        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          provider: "google",
          photoURL: user.photoURL,
        });
  
        navigate("/");
      }
      navigate("/");
    } catch (error: any) {
      setErrors({ Email: error.message });
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
                <h2>Create an account</h2>
                <p>Sign up and get a 30-day free trial</p>
                <div className="form-card">
                  <form onSubmit={handleRegister}>
                    <div className="register-name">
                      <label>Full name</label>
                      <input
                        type="text"
                        value={userData.firstname}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            firstname: e.target.value,
                          })
                        }
                        placeholder="Enter the Name"
                      />
                      {errors.firstname && <p>{errors.firstname}</p>}
                    </div>
                    <div className="register-email">
                      <label>Email</label>
                      <input
                        type="email"
                        value={userData.Email}
                        onChange={(e) =>
                          setUserData({ ...userData, Email: e.target.value })
                        }
                        placeholder="Enter the Email"
                      />
                      {errors.Email && <p>{errors.Email}</p>}
                    </div>
                    <div className="register-password">
                      <label>Password</label>
                      <input
                        type="password"
                        value={userData.password}
                        onChange={(e) =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                        placeholder="Enter the Password"
                      />
                      {errors.password && <p>{errors.password}</p>}
                    </div>
                    <button type="submit">Submit</button>
                  </form>

                  {submitted && (
                    <p className="success-msg">Registration successful!</p>
                  )}

                  <div className="third-party">
                    <p>
                      <span>
                        <FaApple />
                      </span>
                      Apple
                    </p>
                    <p onClick={signInWithGoogle}>
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
                Have an account? <NavLink to="/Login">Sign in</NavLink>
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

export default Registration;
