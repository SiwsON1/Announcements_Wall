import { useParams } from "react-router-dom";
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from "react-redux";
import { getAdsBySearch } from "../../../redux/adsRedux";


const Searched = () => {

  const { searchPhrase } = useParams();
  const filteredAds = useSelector(state => getAdsBySearch(state, searchPhrase))

    return (
      <>
        <div class="alert alert-info" role="alert">
           <h1>You are looking for : {searchPhrase}</h1> 
        </div>
        <AdsGrid ads={filteredAds}/>
      </>
    );
  };
  
    export default Searched;