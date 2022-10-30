import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import { getSubmissions } from "../../features/submissions/submissionSlice";
import { getActivities } from "../../features/activities/activitySlice";
import { useEffect } from "react";
import moment from "moment";

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { activities } = useSelector((state) => state.activities);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // console.log(submissions.length)
    dispatch(getSubmissions());
    dispatch(getActivities());
  }, [user, dispatch, navigate]);

  // const checkIfAlreadySubmitted = (assignment) => {
  //   if (
  //     assignment.submissions.some(
  //       (stud) =>
  //         stud.assignmentname === assignment.name && stud.rollno === user.id_no
  //     )
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  //   // return false;
  // };
  // const totalAssignments = submissions.length;

  // const pendingAssignments = submissions.filter(
  //   (assignment) =>
  //     moment(assignment.duedate) > moment(Date.now()) &&
  //     !checkIfAlreadySubmitted(assignment)
  // );

  // const submittedAssignments = submissions.filter(
  //   (assignment) =>
  //     moment(assignment.duedate) > moment(Date.now()) &&
  //     checkIfAlreadySubmitted(assignment)
  // );

  // const missedAssignments = submissions.filter(
  //   (assignment) =>
  //     moment(assignment.duedate) < moment(Date.now()) &&
  //     !checkIfAlreadySubmitted(assignment)
  // );

  // // const submittedAssignments = (totalAssignments - pendingAssignments.length - missedAssignments.length)

  // const data = [
  //   ["Submission", "Frequency"],
  //   ["Pending", pendingAssignments.length],
  //   ["Submitted", submittedAssignments.length],
  //   ["Missed", missedAssignments.length],
  // ];

  // const options = {
  //   title: "Submission Status",
  // };

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
            <div className="grid grid-cols-1 mx-2 gap-6 md:grid-cols-2">
              {/* <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              /> */}
                <a
                  href="./activities"
                  className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <div className="flex justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Activities participated
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
                        <div className="flex justify-between">
                          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {activity.name}
                          </h5>
                          {/* <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                            <span className="text-md font-extrabold">
                              {" "}
                              Due on{" "}
                            </span>{" "}
                            {moment(assignment.duedate).format("lll")}
                          </h5> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </a>
            </div>
          </div>
          <div className="px-4 py-6 sm:px-0"></div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
}

