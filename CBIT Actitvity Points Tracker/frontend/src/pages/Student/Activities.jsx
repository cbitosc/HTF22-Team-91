import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import { getActivities } from "../../features/activities/activitySlice";
import { Card } from "flowbite-react";
import { getSubmissions, reset } from "../../features/submissions/submissionSlice";
import DisplayActivities from "./DisplayActivities"

export default function StudentActivities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { activities } = useSelector(
    (state) => state.activities
  );
  // const { submissions, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.submissions
  // );
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    // if (isError) {
    //   console.log(message);
    // }
    if (!user) {
      navigate("/login");
    }
    dispatch(getActivities())
    // dispatch(getSubmissions())
    // dispatch(reset())
    // console.log(submissions)
  }, [user, dispatch, navigate]);

  return (
    <>
      <header className="bg-white shadow">
      <div className="mx-auto flex justify-between max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Activities 
          </h1>
          <a
            className="text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-4 py-2.5 text-center mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            onClick={() => setIsShown((current) => !current)}
            >
              {isShown ? <i class="fas fa-times"></i> : "Add an activity"}
          </a>
        </div>
      </header>
      <main className="min-h-screen">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className={isShown ? "block" : "hidden"}><ActivityCard activities={activities}/></div>
      </div>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <DisplayActivities/>
        </div>
      </main>
    </>
  );
}
