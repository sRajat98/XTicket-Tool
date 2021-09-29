import XenieApi from "../../httpsRequests/api.js";
import { exportUrl } from "../../httpsRequests/ExportUrl.js";
import configs from "../../httpsRequests/configs.js";
import * as types from "../actionTypes";

//get ticket by Status
export const getTicketByStatus = (requestParams, status) => (dispatch) => {
  XenieApi.get(
    `${exportUrl + configs.getTicketsByStatus}/${status}`,
    null,
    requestParams
  ).then(
    (response) => {
      dispatch({
        type: types.GET_ALL_TICKETS_BY_STATUS_SUCCESS,
        data: response.data,
        status,
      });
    },
    (error) =>
      dispatch({ type: types.GET_ALL_TICKETS_BY_STATUS_FAILURE, error })
  );
};
//Search ticket by ID
export const getTicketByStatusAndTicketID = (requestParams, status) => (dispatch) => {
  XenieApi.get(
    `${exportUrl + configs.getTicketsByStatus}/${status}/find`,
    null,
    requestParams
  ).then(
    (response) => {
      dispatch({
        type: types.GET_ALL_TICKETS_BY_STATUS_SUCCESS,
        data: response.data,
        status,
      });
    },
    (error) =>
      dispatch({ type: types.GET_ALL_TICKETS_BY_STATUS_FAILURE, error })
  );
};
/******Function to get the tickets with Filters********/

export const getTicketByStatusFilter = (requestParams, status) => (dispatch) => {
  XenieApi.get(
    `${exportUrl + configs.getTicketsByStatus}/${status}`,
    null,
    requestParams
  ).then(
    (response) => {
      dispatch({
        type: types.GET_ALL_TICKETS_BY_STATUS_SUCCESS,
        data: response.data,
        status,
      });
    },
    (error) =>
      dispatch({ type: types.GET_ALL_TICKETS_BY_STATUS_FAILURE, error })
  );
};
export const startGetTicketByStatusLoader = () => (dispatch) => {
  dispatch({ type: types.GET_ALL_TICKETS_BY_STATUS_LOADING });
};

export const resetGetTicketByStatus = () => (dispatch) => {
  dispatch({ type: types.RESET_TICKETS_BY_STATUS });
};

export const changeTicketAssignee = (assignee, ticketId) => (dispatch) => {
  XenieApi.put(exportUrl + configs.changeTicketAssignee + `${ticketId}?emailId=${assignee.value}&reason=`).then(
    (response) => {
      dispatch({ type: types.CHANGE_TICKET_ASSIGNEE, data: { 'resp': response.data, assignee, ticketId } });
    },
    (error) => {
      // handle error here
      dispatch({ type: types.CHANGE_ASSIGNEE_ERROR, data: { error: error.response.data, ticketId } });
    }
  );
};

export const startChangeAssigneeLoader = (ticketId) => (dispatch) => {
  dispatch({ type: types.SHOW_CHANGE_ASSIGNEE_LOADER, data: { ticketId } });
};
export const closeErrorModalAction = (ticketId) => (dispatch) => {
  dispatch({ type: types.CLOSE_ERROR_MODAL, data: { ticketId } });
};


