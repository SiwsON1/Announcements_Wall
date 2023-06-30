import { useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { useEffect } from "react";
import { logOut } from "../../../redux/usersRedux";
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: 'DELETE',
    };
  
    fetch(`${API_URL}/auth/logout`, options)
      .then(() => {
        dispatch(logOut(navigate("/")));
      });
  }, [dispatch, navigate]);

    return (null);
  };
  
    export default Logout;