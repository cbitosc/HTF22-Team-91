import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { getSubmissions } from "../../features/submissions/submissionSlice";

export default function DisplayActivities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { submissions, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.submissions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getSubmissions());
  }, [user, isError, isSuccess, navigate, dispatch]);

  return (
    <>
      <div className="px-4 py-6 sm:px-0">
       
          {submissions
            .filter((submission) => submission.id_no === user.id_no)
            .map((submission) => (
              <div key={submission._id}>
                 <div className="grid sm:grid-cols-2 gap-2 min-w-full">
                {submission.activities.map((activity) => (
                  <Card key={activity._id}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {activity.activity_name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    <a
                    className=" font-semibold text-sky-600"
                    target={"_blank"}
                    href={activity.certificate}
                  >
                    Certificate
                  </a>
                    </p>
                  </Card>
                ))}
                </div>
              </div>
            ))}
        
      </div>
    </>
  );
}
