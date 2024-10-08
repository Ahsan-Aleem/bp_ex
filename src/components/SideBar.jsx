import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GiBeveledStar, GiCricketBat, GiHorseHead, GiHound, GiTennisRacket } from "react-icons/gi";
import { TiWorld } from "react-icons/ti";
import gsap from "gsap";

// Define your routes for the sidebar
const routes = [
  {
    path: "/soccer",
    name: "Soccer",
    icon: <MdOutlineSportsSoccer />,
  },
  {
    path: "/cricket",
    name: "Cricket",
    icon: <GiCricketBat />,
  },
  {
    path: "/tennis",
    name: "Tennis",
    icon: <GiTennisRacket />,
  },
  {
    path: "/horse_riding",
    name: "Horse Race",
    icon: <GiHorseHead />,
  },{
    path: "/greyhounds",
    name: "GreyHound",
    icon: <GiHound />,
  },
  {
    path: "/casino-royal",
    name: "Royal Star Casino",
    icon: <GiBeveledStar />,
  },
  {
    path: "/star-casino",
    name: "Star Casino",
    icon: <GiBeveledStar />,
  },
  {
    path: "/world-casino",
    name: "World Casino",
    icon: <TiWorld />,
  },
  {
    path: "/royal-casino",
    name: "Royal Casino",
    icon: <BsCoin />,
  },
  // {
  //   path: "/betfair-games",
  //   name: "BetfairGames",
  //   icon: <AiFillHeart />,
  // },
  // {
  //   path: "/teen-patti",
  //   name: "TeenPatti Studio",
  //   icon: <AiFillHeart />,
  // },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconsRef = useRef([]);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    // Loop through the icons and set different rotation directions
    iconsRef.current.forEach((icon, index) => {
      // Randomly decide rotation direction (clockwise or counterclockwise)
      const direction = Math.random() > 0.5 ? 1 : -1; // 1 for clockwise, -1 for counterclockwise

      gsap.to(icon, {
        rotate: direction * 360, // Rotate either clockwise or counterclockwise
        scale: 1.5, // Increase size of the icons
        duration: 2, // Duration of each full rotation
        ease: "power1.inOut",
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse animation after each loop
        stagger: 0.2, // Stagger animation for each icon
      });
    });
  }, []);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  BP_exchange
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          {/* Routes Section */}
          <section className="routes">
            {routes.map((route, index) => (
              <NavLink
                to={route.path}
                key={index}
                className={({ isActive }) => (isActive ? "link active" : "link")}
              >
                <div
                  className="icon"
                  ref={(el) => (iconsRef.current[index] = el)}
                  style={{ fontSize: "15px" }} // Larger size for icons
                >
                  {route.icon}
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </section>
        </motion.div>

        {/* <main>{children}</main> */}
      </div>
    </>
  );
};

export default SideBar;
