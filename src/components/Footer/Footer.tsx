import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="fixed left-0 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col justify-center items-center gap-4 p-4">
      <div className="flex flex-col justify-center items-center gap-3">
        <ul className="flex flex-col gap-5">
          <li>
            <Link to="https://github.com/kulembetov">
              <FaGithub
                size={30}
                className="hover:transform hover:scale-125 transition-transform duration-300"
              />
            </Link>
          </li>
          <li>
            <Link to="https://linkedin.com/in/kulembetov">
              <FaLinkedin
                size={30}
                className="hover:transform hover:scale-125 transition-transform duration-300"
              />
            </Link>
          </li>
          <li>
            <Link to="https://twitter.com/arturkulembetov">
              <FaTwitter
                size={30}
                className="hover:transform hover:scale-125 transition-transform duration-300"
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
