import Logo from "../../assets/logo.png";
import Language from "../../assets/language.svg";
import Phone from "../../assets/phone.svg";
import Heart from "../../assets/heart.svg";
import Basket from "../../assets/basket.svg";
import User from "../../assets/user.svg";

const PublicNavbar = () => {
  return (
    <div>
      <div className="grid grid-cols-3">
        <div></div>
        <div className="justify-self-center">
          <img className="w-36" src={Logo} alt="logo" />
        </div>
        <div className="flex justify-self-end self-start mt-2 mr-16">
          {[Language, Phone, Heart, Basket, User].map((icon, index) => (
            <img className="w-6 m-3" key={index} src={icon} alt="icon" />
          ))}
        </div>
      </div>
      <div className="flex justify-center"> 
        {
            ["HOME", "MENU", "ABOUT", "PROMOTION"].map((item, index) => (
                <div key={index} className="py-3 mx-4 hover:border-b hover:border-b-[#970024]">{item}</div>
            ))
        }
      </div>
    </div>
  );
};

export default PublicNavbar;
