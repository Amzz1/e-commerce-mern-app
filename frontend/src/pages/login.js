//login.js
import API_URL from "../apiUrl/apiUrl"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/authReducer";
import { useState, useRef, useEffect } from "react";



const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  console.log(API_URL)

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
        `${API_URL}/auth/login`,
        JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
      );
      dispatch(loginSuccess(response.data));
      console.log('hiencute')
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      // setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      setSuccess(true);

      // Check if the user is an admin
      const isAdmin = response.data.isAdmin;

      if (isAdmin) {
        // If user is an admin, navigate to "/admin/dashboard"
        navigate("/admin/dashboard");
      } else {
        // If user is not an admin, navigate to "/"
        navigate("/");
      }
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
        <section>
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