import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClass, reset } from "../../features/classes/classSlice";

export default function ClassCard() {
  const [formData, setFormData] = useState({
    class_name: "",
    branch: "",
    batch_year: "",
    section: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { class_name, branch, batch_year, section } = formData;

  const { user } = useSelector((state) => state.auth);
  const { classes, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.classes
  );

  useEffect(() => {
    if (user.role !== "Admin") {
      navigate("/");
    }
    if (isError) {
      setError(message);
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
      class_name,
      branch,
      batch_year,
      section,
    };
    dispatch(addClass(classData));
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
              Add New Class here
            </h2>
          </div>
          {error ? <ErrorContainer /> : <></>}
          <form className="mt-4 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Class Name
                </label>
                <input
                  id="classname"
                  name="class_name"
                  type="text"
                  value={class_name}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Class Name"
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
                  className="relative block w-full appearance-none rounded-none border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Branch Name"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Batch Year
                </label>
                <input
                  id="batch"
                  name="batch_year"
                  type="number"
                  value={batch_year}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Batch Year"
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
                  className="relative block w-full appearance-none rounded-b-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Section No"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-teal-500 group-hover:text-teal-400"
                    aria-hidden="true"
                  />
                </span> */}
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
