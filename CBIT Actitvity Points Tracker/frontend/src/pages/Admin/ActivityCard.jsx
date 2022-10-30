import { useState, useEffect } from "react";
import { Alert, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addActivity, reset } from "../../features/activities/activitySlice";

export default function ActivityCard() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    points: "",
    max_points: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, category, points, max_points } = formData;

  const { user } = useSelector((state) => state.auth);
  const { activities, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.activities
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

    const ActivityData = {
      name,
      category,
      points,
      max_points,
    };
    dispatch(addActivity(ActivityData));
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
              Add New Activities here
            </h2>
          </div>
          {error ? <ErrorContainer /> : <></>}
          <form className="mt-4 space-y-6" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Activity Name
                </label>
                <input
                  id="Activity-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Activity Name"
                />
              </div>
              {/* <div>
                <label htmlFor="email-address" className="sr-only">
                  Type
                </label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  value={type}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Type of Activity"
                />
              </div> */}
              <div>
              <label htmlFor="roles" className="sr-only">
                    Type of Activity
                  </label>
                  <select
                    id="types"
                    className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                    name="category"
                    value={category}
                    onChange={onChange}
                    required
                  >
                    <option>Type of Activity</option>
                    <option value="Curricular">Curricular </option>
                    <option value="Extra-Curricular">Extra-Curricular</option>
                  </select>
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Points
                </label>
                <input
                  id="points"
                  name="points"
                  type="number"
                  value={points}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Points"
                />
              </div>

              <div>
                <label htmlFor="email-address" className="sr-only">
                  Max Points
                </label>
                <input
                  id="maxpoints"
                  name="max_points"
                  type="number"
                  value={max_points}
                  onChange={onChange}
                  required
                  className="relative block w-full appearance-none rounded-b-md border border-gray-300 capitalize px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="Max Points"
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
