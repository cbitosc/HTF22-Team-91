import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addSubmission,
  reset,
} from "../../features/submissions/submissionSlice";

export default function ActivityCard(props) {
  const { activities } = props;
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { submissions, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.submissions
  );

  const [formData, setFormData] = useState({
    activity_name: "",
    rollno: user.id_no,
    student_name: user.name,
    certificate: "",
  });

  const { activity_name, rollno, student_name, certificate } = formData;

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (!user) {
      navigate("/login");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const classData = {
      activity_name,
      rollno,
      student_name,
      certificate: selectedFile,
    };
    dispatch(addSubmission(classData));
    dispatch(reset());
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
      <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add your activities here
            </h2>
          </div>
          {error ? <ErrorContainer /> : <></>}
          <form className="mt-4 space-y-6" onSubmit={onSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="relative ">
                <input
                  type="text"
                  id="floating_filled"
                  className="block rounded-none px-2.5 pb-2.5 pt-5 w-full rounded-t-md text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  name="activity_name"
                  value={activity_name}
                  onChange={onChange}
                  required
                />
                <label
                  htmlFor="floating_filled"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Activity Name
                </label>
              </div>
              {/* <div>
                <select
                  id="types"
                  className="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  // value={category}
                  // onChange={onChange}
                  required
                >
                  <option>Select an activity</option>
                  <option value="Bootcamp"><Bootcamp></Bootcamp> </option>
                  <option value="Etr-">Extra-Curricular</option>
                </select>
                  <label
                    htmlFor="floating_filled"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Select an Activity
                  </label>
              </div> */}
              <div>
                <select
                  id="types"
                  className="block rounded-none px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  // value={category}
                  // onChange={onChange}
                  required
                >
                  <option>Type of Activity</option>
                  <option value="Curricular">Co-Curricular </option>
                  <option value="Extra-Curricular">Extra-Curricular</option>
                </select>
                <label
                    htmlFor="floating_filled"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Type of Activity
                  </label>
              </div>
              <div className="relative ">
                <input
                  type="file"
                  id="small_size"
                  name="certificate"
                  //   value={certificate}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="block rounded-none px-2.5 pb-2 pt-5 w-full rounded-b-md text-xs text-gray-900 bg-gray-100 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="small_size"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                >
                  Upload Certificate
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
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
