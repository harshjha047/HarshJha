import Art from "./Art.jsx";
import Work from "./Work.jsx";
import Profile from "./Profile.jsx"
const Content = () => {
  return (
    <>
    <div className="w-full flex flex-col items-center">
      <Art />
      <Work />
      <Profile/>
      </div>
    </>
  );
};
export default Content;
