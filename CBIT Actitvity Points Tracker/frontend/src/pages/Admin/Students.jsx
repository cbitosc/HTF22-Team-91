import { useSelector, useDispatch } from "react-redux";
import { getStudents, deleteUser, reset } from "../../features/users/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function Students() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { students, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getStudents());
  }, [user, navigate, isError, isSuccess, message, dispatch]);

  const handleDelete = (student) => {
    const choice = window.confirm(
      `Are you sure you want remove ${student.name}`
    );
    if (choice) {
      dispatch(deleteUser(student._id));
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
            Students
          </h1>
          <a
            className="text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            href="./register"
          >
            Add Student
          </a>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Roll No
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Class
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Year
                    </th>
                    <th scope="col" className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.id_no ? student.id_no : "-"}
                      </th>
                      <td className="py-4 px-6 capitalize">{student.name}</td>
                      <td className="py-4 px-6">{student.email}</td>
                      <td className="py-4 px-6">
                        {student.branch}-{student.section}
                      </td>
                      <td className="py-4 px-6">
                        {student.batch_year}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className="rounded border border-transparent bg-rose-600 text-sm font-medium text-white px-5 py-2 text-center hover:bg-rose-700"
                          onClick={() => handleDelete(student)}
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
