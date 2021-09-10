import React from "react";
import EmployeeDasboardReports from "core/EmployeeDasboard/EmployeeDashboardReports/EmployeeDasboardReports";
import EmployeeDashboard from "core/EmployeeDasboard/EmployeeDashboard";
import TicketListingByStatusPage from "../TicketListingByStatusPage/TicketListingByStatusPage";
import * as styled from "./TicketListingPage.styled";
import ManageAccess from "core/ManageAccess/ManageAccess";
const TicketListingComponents = (props) => {
  return (
    <styled.ticketListingComponent>
      {props.selectedKey === "OPEN" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#fa9418" />
      ) : null}
      {props.selectedKey === "ASSIGNED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#232d37"/>
      ) : null}
      {props.selectedKey === "INPROGRESS" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#E3E109" />
      ) : null}
      {props.selectedKey === "AWAITING" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#6114FD" />
      ) : null}
      {props.selectedKey === "REVIEW" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#232d37" />
      ) : null}
      {props.selectedKey === "ESCALATED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#E30928" />
      ) : null}
      {props.selectedKey === "CLOSED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#0AFD5E" />
      ) : null}
      {props.selectedKey === "REOPENED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#232d37" />
      ) : null}
      {props.selectedKey === "RESOLVED" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#98FF00" />
      ) : null}
      {props.selectedKey === "AWAITINGVENDOR" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#354255" />
      ) : null}
      {props.selectedKey === "AWAITINGUSER" ? (
        <TicketListingByStatusPage selectedKey={props.selectedKey} color="#354255" />
      ) : null}
      {props.selectedKey === "manageAccess" ? <ManageAccess /> : null}
      {props.selectedKey === "employeeDashboard" ? <EmployeeDashboard /> : null}
    </styled.ticketListingComponent>
  );
};

export default TicketListingComponents;
