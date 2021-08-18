import React, { useState, useEffect } from "react";
import DropDown from "core/DropDown/DropDown";
import * as actionCreators from "app/redux/actions/employeeDashboardActions";
import EmployeeDashBoardFilters from "./EmployeeDashBoardFilters/EmployeeDashBoardFilters";
import EmployeeDashboardTicketsContainer from "./EmployeeDashboardTickets/EmployeeDashboardTicketsContainer";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  converDatatoDropDownData,
  getOnlyLabelValuePair,
} from "utils/Constants";
import {
  getUserTickets,
  showLoader,
  resetData,
} from "app/redux/actions/employeeDashboardActions";
import * as styled from "./EmployeeDashboard.styled";
import EmployeeDashBoardNavbar from "./EmployeeDashBoardNavBar/EmployeeDashBoardNavbar";
import EmployeeDasboardReports from "./EmployeeDashboardReports/EmployeeDasboardReports";
import Pagination from "core/Pagination/Pagination";
const EmployeeDashboardBody = (props) => {
  const [state, setState] = useState({
    selectedUser: null,
    allUsers: [],
    allStatus: [],
    selectedStatus: [],
    currentSelectedTicket: {},
    selectedNavItem: "employeeTickets",
    currentPageNumber: 1,
  });
  const [show, setShow] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const mapChangesToState = (value) => setState({ ...state, ...value });
  const commonState = useSelector((state) => state.common);
  const dashboardState = useSelector((state) => state.employeeDashboard);
  const getnumberOfPages = useSelector((state) => state.getnumberOfPages);
  const handleTicketClick = (currentSelectedTicket) => {
    if (!state.isPreviewVisible)
      mapChangesToState({ currentSelectedTicket, isPreviewVisible: true });
  };
  useEffect(() => {
    dispatch(resetData());
    if (
      commonState.allAdminData &&
      commonState.allAdminData.allAdminUsersInDept &&
      commonState.allAdminData.allAdminUsersInDept.length
    ) {
      const allUsers = getOnlyLabelValuePair(
        converDatatoDropDownData(
          commonState.allAdminData.allAdminUsersInDept,
          "name",
          "emailId"
        )
      );
      const allStatus = getOnlyLabelValuePair(
        converDatatoDropDownData(
          commonState.allStatusData.allStatus,
          "status",
          "id"
        )
      );
      mapChangesToState({ allUsers, allStatus });
    }
  }, [commonState.allAdminData]);
 
  const getAllDashboardData = (email, startDate, requestParams) => {
    dispatch(showLoader());
    const getTicketParams = {
      page: state.currentPageNumber - 1,
      limit: 10,
      email: email,
      startDate,
      endDate: toDate,
      status: (state.selectedStatus.length && state.selectedStatus.map(status => status.label).toString()) || ""
    }
    dispatch(getUserTickets(getTicketParams));
    props.dispatch(actionCreators.resetEmployeeTicketStatusCount());
    props.dispatch(actionCreators.startEmployeeTicketStatusCountLoader());
    props.dispatch(actionCreators.getEmployeeTicketStatusCount(requestParams));
    props.dispatch(actionCreators.resetEmployeeSlaInfo());
    props.dispatch(actionCreators.startEmployeeSlaInfoLoader());
    props.dispatch(actionCreators.getEmployeeSlaInfo(requestParams));
  };

  useEffect(()=>{
    let todayDate = new Date().toISOString().slice(0, 10);
    let startdate = fromDate || todayDate;
    console.log(state.selectedUser);
    let user=state.selectedUser ? state.selectedUser.value : "admin";
    const requestParams = {
      email: user,
      startDate:fromDate || todayDate,
      endDate: toDate || "",
    };

    
    getAllDashboardData(user, startdate, requestParams)
  },[state.currentPageNumber]);
  const increasePageCount = () => {
    mapChangesToState({ currentPageNumber: state.currentPageNumber + 1 });
  };
  const decreasePageCount = () => {
    mapChangesToState({ currentPageNumber: state.currentPageNumber - 1 });
  };
  const setUser = (user) => {
    mapChangesToState({ selectedUser: user });
    let todayDate = new Date().toISOString().slice(0, 10);
    let startDate = fromDate || todayDate;
    const requestParams = {
      email: user.value,
      startDate,
      endDate: toDate,
    };
    if (user.value) {
      setValid(true);
      getAllDashboardData(user.value, startDate, requestParams);
    }
  };

  const updateSelectedStatus = (status) => {
    mapChangesToState({ selectedStatus: status });
  };

  const filterTickets = () => {
    let todayDate = new Date().toISOString().slice(0, 10);
    let startDate = fromDate || todayDate;
    const requestParams = {
      email: state.selectedUser.value,
      startDate,
      endDate: toDate,
    };
    if (state.selectedUser && state.selectedUser.value) {
      setShow(false);
      getAllDashboardData(state.selectedUser.value, startDate, requestParams);
    }
  };
  const getPageTrackingInformation = () => {
    return (
      <div style={{display: "flex",flexDirection: "row-reverse",position:"relative"}}>
        <div>
       
                {state.selectedUser  ? <Pagination
                    currentPage={state.currentPageNumber}
                    maxPages={dashboardState.getnumberOfPages}
                    nextPage={increasePageCount}
                    prevPage={decreasePageCount}
                    limit={10}
                  />: ""}
       </div>
       <styled.pageTracker>
        Page {state.currentPageNumber} of {dashboardState.getnumberOfPages}
      </styled.pageTracker>
      </div>
     
      
    );
  };
  return (
    
    <styled.body>
      <styled.selectSubHeading>Select Employee</styled.selectSubHeading>
      <styled.dropDownContainer>
        <DropDown
          isClearable={false}
          value={state.selectedUser}
          options={state.allUsers}
          optionSelected={(user) => setUser(user)}
        />
      </styled.dropDownContainer>

      <styled.filterContainer>
        <styled.filterBtn variant="light" onClick={handleShow}>
          Filter
        </styled.filterBtn>
      </styled.filterContainer>
      <EmployeeDashBoardFilters
        show={show}
        handleClose={handleClose}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        selectedStatus={state.selectedStatus}
        allStatus={state.allStatus}
        updateSelectedStatus={updateSelectedStatus}
        filterTickets={filterTickets}
        valid={valid}
      />

      {state.selectedUser ? (
        <>
          <EmployeeDashBoardNavbar
            mapChangesToState={mapChangesToState}
            selectedNavItem={state.selectedNavItem}
          />
           
          {state.selectedNavItem === "employeeTickets" && (
            <div>
              {getPageTrackingInformation()}
              <EmployeeDashboardTicketsContainer
              dashboardState={dashboardState}
              allUsers={state.allUsers}
              mapChangesToState={mapChangesToState}
              handleTicketClick={handleTicketClick}
            />
            </div>
            
          )}
          {state.selectedNavItem === "employeeRepors" && (
            <EmployeeDasboardReports />
          )}
        </>
      ) : null}
    </styled.body>
  );
};

const mapStatetoProps = (state) => {
  return {
    allAdminData: state.common.allAdminData,
    employeeDashboard: state.employeeDashboard,
    common: state.common,
    getnumberOfPages:state.getnumberOfPages
  };
};

export default connect(mapStatetoProps)(EmployeeDashboardBody);
