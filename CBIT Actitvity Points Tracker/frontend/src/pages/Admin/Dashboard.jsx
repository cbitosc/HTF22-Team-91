import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import { getSubmissions } from "../../features/submissions/submissionSlice";
import { useEffect } from "react";
import { getStudents, getMentors } from "../../features/users/userSlice";
//import { getClasses } from "../../features/classes/classSlice";
import { getActivities } from "../../features/activities/activitySlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { students, mentors } = useSelector((state) => state.users);
  const { activities } = useSelector((state) => state.activities)
  //const { classes } = useSelector((state) => state.classes);


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // console.log(submissions.length)
    dispatch(getSubmissions());
    dispatch(getMentors())
    dispatch(getStudents())
    dispatch(getActivities())
  }, [user, dispatch, navigate]);

  const data = [
    ["Batch Year", "Students", "Mentors/Classes"],
    ["2018", 45, 15],
    ["2019", 54, 18],
    ["2021", 63, 22],
    ["2022", 67, 25],
  ];

  const options = {
    chart: {
      title: "College Stats",
      subtitle: "Students, Mentors, and Classes: 2018-2022",
    },
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div>
            <div className="grid grid-rows-1 mx-2 gap-4 ">
              <Chart
                chartType="Bar"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
              <div className="grid grid-cols-3 my-10 gap-4">
                <a
                  href="./activities"
                  className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Activities
                    </h5>
                    <p className=" font-semibold font-mono text-3xl text-gray-700 dark:text-gray-400">
                      {activities.length}
                    </p>
                  </div>
                  <div
                    id="assignments_container"
                    className=" grid mt-4 w-full h-72 rounded-md dark:bg-gray-700 overflow-auto"
                  >
                    {activities.map((activity) => (
                      <div className="block p-6 max-w-full  bg-gray-300 rounded-none border border-gray-200 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-900 dark:hover:bg-gray-700">
                        {/* <div className="flex justify-between"> */}
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {activity.name}
                        </h5>
                        <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                          {activity.max_points} Max. Points
                        </h5>
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                </a>

                <a
                  href="./students"
                  className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Students
                    </h5>
                    <p className=" font-semibold font-mono text-3xl text-gray-700 dark:text-gray-400">
                      {students.length}
                    </p>
                  </div>
                  <div
                    id="assignments_container"
                    className=" grid mt-4 w-full h-72 rounded-md dark:bg-gray-700 overflow-auto"
                  >
                    {students.map((student) => (
                      <div className="block p-6 max-w-full  bg-gray-300 rounded-none border border-gray-200 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-900 dark:hover:bg-gray-700">
                        {/* <div className="flex justify-between"> */}
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {student.name}
                        </h5>
                        {/* <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                            {} semester
                          </h5> */}
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                </a>

                <a
                  href="./mentors"
                  className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      mentors
                    </h5>
                    <p className=" font-semibold font-mono text-3xl text-gray-700 dark:text-gray-400">
                      {mentors.length}
                    </p>
                  </div>
                  <div
                    id="assignments_container"
                    className=" grid mt-4 w-full h-72 rounded-md dark:bg-gray-700 overflow-auto"
                  >
                    {mentors.map((mentor) => (
                      <div className="block p-6 max-w-full  bg-gray-300 rounded-none border border-gray-200 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-900 dark:hover:bg-gray-700">
                        {/* <div className="flex justify-between"> */}
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {mentor.name}
                        </h5>
                        {/* <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                            {} semester
                          </h5> */}
                        {/* </div> */}
                      </div>
                    ))}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
