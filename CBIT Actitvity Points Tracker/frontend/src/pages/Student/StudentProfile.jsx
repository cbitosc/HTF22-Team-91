import userPic from "../../assets/user.webp";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../features/auth/authSlice";
import { Alert, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name,
    id_no: user.id_no,
    password: "",
    confirmPassword: "",
  });
  //   const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const { name, id_no, password, confirmPassword } = formData;

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (!user) {
      navigate("/login");
    }
    if (isSuccess) {
      dispatch(logout());
      navigate("/login");
    }
  }, [user, navigate, isError, isSuccess, isLoading, message, dispatch]);

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
        password,
      };

      dispatch(updateUser(userData));
      alert("User updated successfully.");
    }
    if (isSuccess && !isError) {
      setMsg("User updated successfully!");
    }
  };

  if (isLoading) {
    return <Spinner aria-label="Default status example" />;
  }

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
          <span className="font-medium">
            Success! User Updated Successfully.{" "}
            <a className=" font-semibold text-teal-700" href="/login">
              please login again
            </a>
          </span>{" "}
          {msg}
        </span>
      </Alert>
    );
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center px-4 py-6 sm:px-0">
            <div className=" w-full md:w-4/5 lg:w-3/5 m-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center p-10">
                <img
                  className="mb-3 w-24 h-24 rounded-full shadow-lg"
                  src={userPic}
                  alt="user"
                />
                <h5 className="mb-1 text-xl capitalize font-medium text-gray-900 dark:text-white">
                  {user.name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {user.role}
                </span>
                <div className="mt-4 w-full">
                  {error ? <ErrorContainer /> : <></>}
                  {msg ? <SuccessContainer /> : <></>}
                </div>
                <form className="min-w-full mt-6" onSubmit={onSubmit}>
                  <div class="relative ">
                    <input
                      type="text"
                      id="floating_filled"
                      class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                      placeholder=" "
                      name="name"
                      value={name}
                      onChange={onChange}
                      required
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Full Name
                    </label>
                  </div>
                  <div class="relative ">
                    <input
                      type="text"
                      id="floating_filled"
                      class="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                      placeholder=" "
                      name="id_no"
                      value={id_no}
                      onChange={onChange}
                      required
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      ID
                    </label>
                  </div>
                  <div class="relative ">
                    <input
                      type="file"
                      id="floating_filled"
                      class="block rounded-none px-2.5 pb-2 pt-5 w-full text-xs text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                      placeholder=" "
                      disabled
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Upload Profile Picture
                    </label>
                  </div>
                  <div class="relative ">
                    <input
                      type="email"
                      id="floating_filled"
                      class="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                      placeholder=" "
                      name="email"
                      value={user.email}
                      disabled
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Email
                    </label>
                  </div>
                  <div class="relative ">
                    <input
                      type="password"
                      id="floating_filled"
                      class="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                      placeholder=" "
                      name="password"
                      value={password}
                      onChange={onChange}
                      required
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Password
                    </label>
                  </div>
                  <div class="relative mb-4">
                    <input
                      type="password"
                      id="floating_filled"
                      class="block rounded-b-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                      placeholder=" "
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={onChange}
                      required
                    />
                    <label
                      for="floating_filled"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Repeat Password
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
