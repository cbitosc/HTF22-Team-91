import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { LockClosedIcon, ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, reset } from "../../features/users/userSlice";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    id_no: "",
    email: "",
    role: "",
    batch_year: "",
    branch: "",
    section: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, id_no, email, role, batch_year, section, branch, password, confirmPassword } = formData;

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (user.role !== "Admin"){
      navigate("/")
    }
    if (isError) {
      setError(message);
    }
    if (isSuccess) {
      navigate("/admin/dashboard");
    }
  }, [user, users, isError, isSuccess, message, navigate, dispatch, error]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match");
    } else {
      const userData = {
        name,
        id_no,
        email,
        role,
        batch_year,
        branch,
        section,
        password,
      };
      dispatch(addUser(userData));
      dispatch(reset());
    }
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

  return (
    <>
      <a onClick={() => navigate("/admin/students")}>
        <ArrowLeftCircleIcon
          className="h-10 w-10 absolute m-4 text-teal-500 hover:text-teal-600 cursor-pointer"
          aria-hidden="true"
        />
      </a>
      <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create New User
            </h2>
          </div>
          {error ? <ErrorContainer /> : <></>}
          <form className="mt-4 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  ID Number
                </label>
                <input
                  id="id_no"
                  name="id_no"
                  type="text"
                  value={id_no}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="ID Number"
                />
              </div>
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
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <div className="flex">
                  <button
                    className="relative block w-max appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    type="button"
                    disabled
                  >
                    Role
                  </button>
                  <label htmlFor="roles" className="sr-only">
                    Select an option
                  </label>
                  <select
                    id="roles"
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    name="role"
                    value={role}
                    onChange={onChange}
                    required
                  >
                    <option>Choose a Role</option>
                    {/* <option value="Admin">Admin </option> */}
                    <option value="Mentor">Mentor</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                    Year
                </label>
                <input
                  id="year"
                  name="batch_year"
                  type="number"
                  value={batch_year}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Batch Year"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Branch
                </label>
                <input
                  id="branch"
                  name="branch"
                  type="text"
                  value={branch}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Branch Name"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Section
                </label>
                <input
                  id="section"
                  name="section"
                  type="number"
                  value={section}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Section No"
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
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
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
                {isLoading ? (
                  <Spinner aria-label="Default status example" />
                ) : (
                  <>Add</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
