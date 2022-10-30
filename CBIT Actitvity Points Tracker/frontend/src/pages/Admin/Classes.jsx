import { useSelector, useDispatch } from "react-redux";
import { deleteClass, getClasses, reset } from "../../features/classes/classSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Spinner } from "flowbite-react";
import ClassCard from "./ClassCard";

export default function Classes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { classes, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.classes
  );
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getClasses());
  }, [user, navigate, isError, isSuccess, message, dispatch]);

  const handleDelete = (classs) => {
    const choice = window.confirm(
      `Are you sure you want remove ${classs.name}`
    );
    if (choice) {
      dispatch(deleteClass(classs._id));
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
            Classes
          </h1>
          <a
              className="text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 font-medium rounded-full text-sm px-3.5 py-2.5 transition-all text-center mr-2 mb-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
              // href="./classes"
              onClick={() => setIsShown((current) => !current)}
            >
              {isShown ? <i class="fas fa-times fa-lg"></i> : "Add New classs"}
            </a>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className={isShown ? "block" : "hidden"}><ClassCard/></div>
          {/* <div className={isShown ? "block" : "hidden"}><classsCard/></div> */}
          <div className="px-4 py-6 sm:px-0">
            <div className="grid sm:grid-cols-2 gap-2 min-w-full">
              {classes.map((classs) => (
                <Card
                  key={classs._id}
                  horizontal={true}
                  // imgSrc="https://flowbite.com/docs/images/blog/image-4.jpg"
                >
                  <button
                    className="absolute -ml-10 -mt-28"
                    onClick={() => handleDelete(classs)}
                  >
                    <div className="p-1 rounded-full transition-all bg-slate-300 dark:text-white hover:bg-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </button>

                  <h5 className="text-2xl w-full font-bold tracking-tight text-gray-900 dark:text-white">
                    {classs.class_name}
                  </h5>
                  <p className="font-normal w-full text-gray-700 dark:text-gray-400">
                    {classs.batch_year}st Year {classs.branch}-{classs.section}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
