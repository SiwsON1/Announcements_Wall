
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from 'react-redux';
import SearchForm from "../../features/SearchForm/SearchForm";
import { getAds } from "../../../redux/adsRedux";

const Home = () => {

  const ads = useSelector(getAds);

  return (
    <>
    <SearchForm />
    <AdsGrid ads={ads} />
    </>
  );
};

  export default Home