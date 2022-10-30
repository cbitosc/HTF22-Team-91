import { LockClosedIcon, ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import MainLogo from "../../assets/mainlogo.png";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess && user) {
      if (user.role === "Admin"){
        navigate("/admin/dashboard");
      }
      else if (user.role === "Mentor"){
        navigate("/mentor/dashboard");
      }
      else {
        navigate("/student/dashboard");
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, msg, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const ErrorContainer = () => {
    return (
      <Alert color="failure">
        <span>
          <span className="font-medium">Error!</span> {error}
        </span>
      </Alert>
    );
  };

  const SuccessContainer = () => {
    return (
      <Alert color="success">
        <span>
          <span className="font-medium">Success!</span> {msg}
        </span>
      </Alert>
    );
  };

  return (
    <>
      <a href="/">
        <ArrowLeftCircleIcon
          className="h-10 w-10 absolute m-4 text-teal-500 hover:text-teal-600"
          aria-hidden="true"
        />
      </a>
      <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
          <img class="mx-auto h-12 w-auto" src={MainLogo} alt="Your Company"/>
            {/* <h1 className="font-mono text-center text-slate-900 text-2xl font-semibold">CBIT</h1> */}
            <h2 className="mt-3 mb-3 text-center text-3xl font-bold tracking-normal text-gray-900">
              Sign in to your account
            </h2>
            {/* <p className="mb-3 text-center text-sm text-gray-600">
              Or{' '}
              <a href="/register" className="font-medium text-teal-600 hover:text-teal-500">
                New here
              </a>
            </p> */}
            {error ? <ErrorContainer /> : <></>}
            {message ? <SuccessContainer /> : <></>}
          </div>
          <form className=" space-y-6" onSubmit={onSubmit}>
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
                    aria-hidden="true"
                  />
                </span>
                {isLoading ? <Spinner aria-label="Default status example" /> :  "Sign in"}
              </button>
            </div>

            <div className="text-center">
              <p className="mt-2 text-center text-sm text-gray-600">
                Or <a className="font-medium text-teal-600">Signup with:</a>
              </p>

              <div className="mt-4 flex justify-center gap-2">
                <button
                  type="button"
                  className="p-0 w-10 h-10 rounded-full border border-transparent bg-teal-600 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <i className="fab fa-facebook-f text-base"></i>
                  {/* <FaFacebook/> */}
                </button>

                <button
                  type="button"
                  className="p-0 w-10 h-10 rounded-full border border-transparent bg-teal-600 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  // onClick={handleGoogleLogin}
                >
                  <i className="fab fa-google text-base"></i>
                  {/* <FaGoogle/> */}
                </button>

                <button
                  type="button"
                  className="p-0 w-10 h-10 rounded-full border border-transparent bg-teal-600 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <i className="fab fa-github text-base"></i>
                  {/* <FaGithub/> */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
