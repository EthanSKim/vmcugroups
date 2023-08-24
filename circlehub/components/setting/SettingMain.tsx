import Settings from "../common/Settings";
import HomeLeft from "../menu/HomeLeft";

interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
  avatar: string;
}

const SettingMain = ({curUser}:{curUser:RequestProps}) => {
  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-4">
            {/* Home Left */}
            <HomeLeft clss="d-lg-none" curUser={curUser}/>
          </div>
          <div className="col-xl-9 col-lg-8 cus-mar setting-row">
            <div className="head-area mb-6 text-start">
              <h5>Settings</h5>
            </div>
            {/* Settings */}
            <Settings curUser={curUser}/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingMain;
