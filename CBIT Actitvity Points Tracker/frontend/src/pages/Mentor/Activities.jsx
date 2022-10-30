import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getSubmissions,
  reset,
  updateSubmission,
} from "../../features/submissions/submissionSlice";
import { Card } from "flowbite-react";
import { useState } from "react";

export default function MentorActivities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allotedpoints, setAllotedpoints] = useState("NA");
  const [feedback, setFeedback] = useState("")
  const [studentId, setStudentId] = useState(-1);
  const { user } = useSelector((state) => state.auth);
  const { submissions, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.submissions
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getSubmissions());
    // console.log(submissions);
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newData = {
      id: studentId,
      activityData: {
        allotedpoints,
      },
    };
    console.log(newData)
    const studentData = {
      id: studentId,
      activityData: {
        feedback
      },
    };
    dispatch(updateSubmission(newData));
    dispatch(reset());
    navigate(0);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Students Activities
          </h1>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit}>
          <div className="grid md:grid-cols-2 gap-4 min-w-full">
            {submissions
              .filter(
                (submission) =>
                  submission.batch_year === user.batch_year &&
                  submission.branch === user.branch &&
                  submission.section === user.section
              )
              .map((submission) => (
                <Card key={submission._id}>
                  <div className="grid gap-2">
                    <h5 className="text-md font-medium text-gray-700 dark:text-white">
                      <span className="text-md font-extrabold"> Name : </span>{" "}
                      {submission.name}
                    </h5>
                    <h5 className="text-md font-medium text-gray-700 dark:text-white">
                      <span className="text-md font-extrabold">
                        {" "}
                        Roll No :{" "}
                      </span>{" "}
                      {submission.id_no}
                    </h5>
                    <h5 className="text-md font-medium text-gray-700 dark:text-white">
                      <span className="text-md font-extrabold">
                        {" "}
                        Activities :{" "}
                      </span>
                    </h5>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                      
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                              <th
                                scope="col"
                                className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                              >
                                Activity Name
                              </th>
                              <th scope="col" className="py-3 px-6">
                                Allot Points
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {submission.activities.map((activity) => (
                              <tr className="border-b border-gray-200 dark:border-gray-700" key={activity._id}>
                                <th
                                  scope="row"
                                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                                >
                                  {activity.activity_name}
                                </th>
                                <td className="py-4 px-6">
                                  <input
                                    type="number"
                                    id="small_outlined"
                                    name="allotedpoints"
                                    onChange={(e) => {
                                      setStudentId(activity._id);
                                      // if (feedback === "") {
                                      //   setFeedback(submission.feedback);
                                      // }
                                      setAllotedpoints(e.target.value);
                                    }}
                                    defaultValue={submission.allotedpoints}
                                    className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                                  />
                                </td>
                              </tr>
                            ))}

                          </tbody>
                        </table>
                      
                    </div>
                    <h5 className="text-md font-medium text-gray-700 dark:text-white">
                      <span className="text-md font-extrabold">
                        {" "}
                        Feedback :{" "}
                      </span>
                    </h5>
<textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"  placeholder="Your message..."></textarea>
<button type="submit" className="text-white w-full bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800">Submit</button>
                  </div>
                </Card>
              ))}
          </div>
          
          </form>
        </div>
      </main>
    </>
  );
}
