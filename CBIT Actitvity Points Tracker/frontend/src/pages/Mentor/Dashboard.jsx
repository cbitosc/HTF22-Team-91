import { useDispatch, useSelector } from "react-redux";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import { getSubmissions } from "../../features/submissions/submissionSlice";
import { getStudents } from "../../features/users/userSlice";
import { useEffect } from "react";
import moment from "moment";

export default function MentorDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const { students } = useSelector((state) => state.students);
  const { submissions } = useSelector((state) => state.submissions);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // console.log(submissions.length)
    dispatch(getStudents());
    dispatch(getSubmissions());
  }, [user, dispatch, navigate])


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
            {/* <Chart
              chartType="BarChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            /> */}
            <div className="grid grid-cols-1 mt-6 mx-2 gap-4 md:grid-cols-2">
              <a
                href="./activities"
                className="block p-6 max-w-full  bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="flex justify-between">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    No. of Submissions
                  </h5>
                  <p className=" font-semibold font-mono text-3xl text-gray-700 dark:text-gray-400">
                    {submissions.length}
                  </p>
                </div>
                <div
                  id="assignments_container"
                  className=" grid mt-4 w-full h-72 rounded-md dark:bg-gray-700 overflow-auto"
                >
                  {submissions.map((submission) => (
                    <div key={submission._id} className="block p-6 max-w-full  bg-gray-300 rounded-none border border-gray-200 shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-900 dark:hover:bg-gray-700">
                    <div className="flex justify-between">
                      <div className="grid gap-1">
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {submission.student_name}
                        </h5>
                        {/* <h5 className="text-sm font-medium text-gray-700 dark:text-white">
                          <span className="text-md font-extrabold">
                            {" "}
                            Due on{" "}
                          </span>{" "}
                          {moment(assignment.duedate).format("lll")}
                        </h5> */}
                      </div>
                      <div>
                        {/* <p className=" font-semibold font-mono text-2xl text-gray-700 dark:text-gray-400">
                          {assignment.submissions.length}/{10}
                        </p>
                        <p className="font-semibold font-mono text-xs text-gray-700 dark:text-gray-400">
                          students
                        </p> */}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="px-4 py-6 sm:px-0"></div>
      </main>
    </>
  );
}