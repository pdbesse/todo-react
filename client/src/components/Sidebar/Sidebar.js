import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import "./Sidebar.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Sidebar = () => {
  return (
    <>
      <div className="menu">
        <ul>
          <li>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Home</Tooltip>}
            >
              <a href="/" className="header_a">
                <AiFillHome />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Profile</Tooltip>}
            >
              <a href="/profile" className="header_a">
                <FaUserCircle />
              </a>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id={`tooltip-bottom`}>Matches</Tooltip>}
            >
              <a href="/todo" className="header_a">
                <FiCheckSquare />
              </a>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
      <div className="vertical"></div>
    </>
  );
};

export default Sidebar;
