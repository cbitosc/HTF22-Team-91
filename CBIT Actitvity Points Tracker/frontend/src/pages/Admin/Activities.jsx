import { useSelector, useDispatch } from "react-redux";
import { getActivities, addActivity, deleteActivity, reset } from "../../features/activities/activitySlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Spinner } from "flowbite-react";
import ActivityCard from "./ActivityCard";

export default function Activities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { activities, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.activities
  );
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getActivities());
  }, [user, navigate, isError, isSuccess, message, dispatch]);

  const handleDelete = (activity) => {
    const choice = window.confirm(
      `Are you sure you want remove ${activity.name}`
    );
    if (choice) {
      dispatch(deleteActivity(activity._id));
      dispatch(reset());
    }
  };

  if (isLoading) {
    return (
      <div className="absolute top-2/4 left-2/4">
        <Spinner aria-label="Default status example" />
      </div>
    );
  }

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto flex justify-between max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Activities
          </h1>
          <a
            className="text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            onClick={() => setIsShown((current) => !current)}
            >
              {isShown ? <i class="fas fa-times fa-lg"></i> : "Add New Activity"}
          </a>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className={isShown ? "block" : "hidden"}><ActivityCard/></div>
          <div className="px-4 py-6 sm:px-0">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Type
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Points
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Max Points
                    </th>
                    <th scope="col" className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr
                      key={activity._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {activity.name}
                      </th>
                      <td className="py-4 px-6 capitalize">{activity.category}</td>
                      <td className="py-4 px-6">{activity.points}</td>
                      <td className="py-4 px-6">
                        {activity.max_points}
                        {/* {new Date(activity.createdAt).toLocaleString("en-US")} */}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className="rounded border border-transparent bg-rose-600 text-sm font-medium text-white px-5 py-2 text-center hover:bg-rose-700"
                          onClick={() => handleDelete(activity)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
