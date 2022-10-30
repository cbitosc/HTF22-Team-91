import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useEffect } from "react";
import Navbar from "../pages/Student/Navbar";

export default function Student(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user && isSuccess) {
      navigate("/");
    }
    if (user.role !== "Student") {
      navigate("/login");
    }
  }, [user, isSuccess, isLoading, isError, message, navigate, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "./dashboard", current: props.dashboard },
    { name: 'Activities', href: './activities', current: props.activities },
    { name: 'Queries', href: './queries', current: props.queries },
  ];
  
  return (
    <>
      <div className="min-h-full">
        <Navbar navigation={navigation} onLogout={onLogout} user={user} />
        <div className="component min-h-screen">{props.studentComponent}</div>
      </div>
    </>
  );
}
