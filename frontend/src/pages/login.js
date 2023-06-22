//login.js
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authReducer";
import { useState, useRef, useEffect } from "react";



const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
      );
      dispatch(loginSuccess(response.data));
      console.log(JSON.stringify(response?.data));
      setUser('');
      setPwd('');
      setSuccess(true);

      navigate("/");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setErrMsg("User not found")
          dispatch(loginFailure({ message: "User not found" }));
        } else if (err.response.status === 400) {
          setErrMsg("Wrong username or password!")
          dispatch(loginFailure({ message: "Wrong username or password!" }));
        } else {
          setErrMsg()
          dispatch(loginFailure({ message: err.response.data.message }));
        }
      } else {
        dispatch(loginFailure({ message: "An error occurred" }));
      }
    }
  };

  return (
    <>
    {success ? (
        <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
                <a href="#">Go to Home</a>
            </p>
        </section>
    ) : (
        <section className="login_section section">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleClick}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </section>
    )}
</>
  );
};

export default Login;