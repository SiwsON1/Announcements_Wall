import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { useNavigate} from "react-router";
import { useDispatch } from "react-redux";
import { editAdsRequest, getAdById } from "../../../redux/adsRedux";
import AdForm from "../../features/AdForm/AdForm";
import { useEffect } from "react";

const AdEdit = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const adById = useSelector(state => getAdById(state, id))

  const handleSubmit = ad => {
      dispatch(editAdsRequest({...ad}, id));
      navigate("/");
  };

  useEffect(() => {
    if (!user || user !== adById.user) {
      navigate("/");
    }
  }, [user, adById, navigate]);

  return (
    <>
      {user === adById.user && (<AdForm 
      action={handleSubmit} 
      actionText="Edit post"
      {...adById} 
      user={adById.user.login} />)}
    </> 
  );
};
  
    export default AdEdit;