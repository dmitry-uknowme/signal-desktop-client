import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CentrifugeContext from "../../../context/centrifuge/Context";

interface SidebarProps {
  isMobileMenuVisible: boolean;
  setIsMobileMenuVisible: () => any;
}

const animationVariants = {
  menu: {
    show: { x: "-5%" },
    hide: { x: "-140%" },
  },
};

const Sidebar: React.FC<SidebarProps> = ({
  isMobileMenuVisible,
  setIsMobileMenuVisible,
}) => {
  const { detectedAutoNumbers } = useContext(CentrifugeContext);
  return (
    <>
      <motion.div
        className="sidebar h-100 d-xl-none d-lg-none d-md-block"
        animate={isMobileMenuVisible ? "show" : "hide"}
        variants={animationVariants.menu}
      >
        <h2 className="sidebar__title">
          Signal Client
          <svg
            enableBackground="new 0 0 32 32"
            id="Слой_1"
            version="1.1"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="sidebar__back"
            onClick={() => setIsMobileMenuVisible(false)}
          >
            <path
              clipRule="evenodd"
              d="M32,16.009c0-0.267-0.11-0.522-0.293-0.714  l-9.899-9.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l8.193,8.275H1c-0.552,0-1,0.452-1,1.01  s0.448,1.01,1,1.01h27.586l-8.192,8.275c-0.391,0.394-0.39,1.034,0,1.428c0.391,0.394,1.024,0.394,1.414,0l9.899-9.999  C31.894,16.534,31.997,16.274,32,16.009z"
              fill="#fff"
              fillRule="evenodd"
              id="Arrow_Forward"
            />
          </svg>
        </h2>
        <div className="sidebar__menu">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="sidebar__item">Панель управления</div>
          </Link>
          <Link to="/stats" style={{ textDecoration: "none" }}>
            <div className="sidebar__item">Статистика</div>
          </Link>
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <div className="sidebar__item">Настройки</div>
          </Link>
        </div>
      </motion.div>
      <div className="sidebar h-100 d-xl-block d-lg-block d-md-none">
        <h2 className="sidebar__title">Signal Client</h2>
        <div className="sidebar__menu">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="sidebar__item">Панель управления</div>
          </Link>
          <Link to="/stats" style={{ textDecoration: "none" }}>
            <div className="sidebar__item">Статистика</div>
          </Link>
          <Link to="/settings" style={{ textDecoration: "none" }}>
            <div className="sidebar__item">Настройки</div>
          </Link>
          {/* <Link to="/camera" style={{ textDecoration: "none" }}>
            <div className="sidebar__item">Камера</div>
          </Link> */}
        </div>
        <div
          className="row mt-4"
          style={{ position: "absolute", bottom: "30%" }}
          // style={{ display: 'flex', justifyContent: 'center' }}
          // style={{ marginLeft: '0.05rem', marginRight: '0.05rem' }}
        >
          <h5 className="text-center">Распознанные номера:</h5>
          {/* <div className="d-flex align-items-center justify-content-center"> */}
          <div className="text-center">
            <b>Въезд</b> -{" "}
            <span
              style={{
                background: "#fff",
                border: "2px solid #111",
                borderRadius: "0.2em",
                color: "black",
                padding: "0.1rem 0.3rem",
                textTransform: "uppercase",
              }}
            >
              {detectedAutoNumbers?.IN}
            </span>
          </div>
          <div className="text-center mt-2">
            <b>Выезд</b> -{" "}
            <span
              style={{
                background: "#fff",
                border: "2px solid #111",
                borderRadius: "0.2em",
                color: "black",
                padding: "0.1rem 0.3rem",
                textTransform: "uppercase",
              }}
            >
              {detectedAutoNumbers?.OUT}
            </span>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
