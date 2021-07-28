import React, { useState } from "react";
import { Link } from "react-router-dom";
import logout from "../images/logout.png";
import icon from "../images/newIcon.png";
export const HeaderView = (payload) => {
  const { onClickLogout, isTicketListLoading } = payload;
  const [islogoutWrapperVisible, setIslogoutWrapperVisible] = useState(false);

  const toggleLgoutWrapper = () => {
    setIslogoutWrapperVisible(!islogoutWrapperVisible);
  };

  return (
    <>
      <div className="nav-wrapper">
        <div className="navbar-left-side">
          <div className="navbar-ticket-wrapper">
            <Link to="/ticketlist"> Tickets </Link>
          </div>
          {/* 
                <div className="navbar-customer-wrapper">
                    Customer
                </div> */}
          <div className="navbar-report-wrapper">
            {/* {isTicketListLoading ? */}
            <div className="disabledLink">Reports</div>
            {/* : */}
            {/* <Link to='/reports'> Reports </Link>
                        } */}
          </div>

          <div className="navbar-report-wrapper">
            <Link to="/approvals"> Approvals </Link>
          </div>
          {/* <div className="navbar-activites-wrapper">
                    Activities
            </div> */}
          {/* <div className="navbar-community-wrapper">
                    Community
            </div>
                <div className="navbar-social-wrapper">
                    Social
            </div> */}
        </div>

        <div className="navbar-right-side">
          <div className="navbar-xebia-brand-wrapper">
            <Link to="/ticketlist">
              {" "}
              <img src={icon} alt="Xenie" height="30px" />
              Xenie
            </Link>
          </div>
          {/* <div className="navbar-search-icon-wrapper">
                    <svg className="bi bi-search" width="45px" height="1.1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="navbar-plus-icon-wrapper">
                    <svg className="bi bi-plus" width="30px" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clipRule="evenodd" />
                    </svg>
                </div>

                <div className="navbar-chat-icon-wrapper">
                    <svg className="bi bi-chat-square" width="30px" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="navbar-settings-icon-wrapper">
                    <i className="fa fa-gear font-size:24px"></i>
                </div> */}
          {/* onClickLogout */}
          <div className="nav__change-password">
            <Link to="/reset-password">Change Password</Link>
          </div>
          <div onClick={onClickLogout} className="profile-picture-wrapper">
            <img src={logout} width="30px" height="30px" />
          </div>
        </div>
      </div>
      {/* {islogoutWrapperVisible ?
                <div className="logout__wrapper">
                    <ul>
                        <li onClick={onClickLogout}>
                            Logout
                        </li>
                        <Link to="/reset-password">
                            <li>
                                Reset Password
                            </li>
                        </Link>
                    </ul>
                </div> : null} */}
    </>
  );
};
