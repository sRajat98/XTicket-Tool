import React, { useState, useEffect } from "react";
import {
  capitalizeFirstLetter,
  converDatatoDropDownData,
  getOnlyLabelValuePair,
} from "../../utils/Constants";
import { errorText } from "../../app/utils/TicketListingNavigationUtils";
import ComponentError from "core/ComponentError/ComponentError";
import Loader from "../Loader/Loader";
import * as actionCreators from "../../app/redux/actions/ticketListingActions";
import * as styled from "./TicketListingByStatusPage.styled";
import * as GlobalStyled from "../../app/themes/GlobalStyles";
import { useDispatch, connect, batch } from "react-redux";
import Ticket from "../Ticket/Ticket";
import { AnimatePresence } from "framer-motion";
import TicketPreview from "core/TicketPreview/TicketPreview";
import Pagination from "core/Pagination/Pagination";
import Filters from "core/Filters/Filters";

const TicketListingByStatusPage = (props) => {
  //console.log("test",props.ticketList)
  const dispatch = useDispatch();
  const [state, setState] = useState({
    allAdminData: [],
    defaultAssignee: { label: "rajat", value: "Rajat" },
    currentAssignee: { label: "rajat", value: "Rajat" },
    isPreviewVisible: false,
    currentSelectedTicket: {},
    currentPageNumber: 1,
    ticketID: '',
  });

  const mapChangesToState = (value) => {
    setState({ ...state, ...value });
  };

  const handleTicketClick = (currentSelectedTicket) => {
    if (!state.isPreviewVisible)
      mapChangesToState({ currentSelectedTicket, isPreviewVisible: true });
  };

  const closePreview = () => {
    mapChangesToState({ isPreviewVisible: false });
  };
  const increasePageCount = () => {
    mapChangesToState({ currentPageNumber: state.currentPageNumber + 1 });
  };
  const decreasePageCount = () => {
    mapChangesToState({ currentPageNumber: state.currentPageNumber - 1 });
  };
  const getPageTrackingInformation = () => {
    return (
      <styled.pageTracker>
        Page {state.currentPageNumber} of {props.ticketList.totalPages}
      </styled.pageTracker>
    );
  };
  useEffect(() => {
    mapChangesToState({ ticketID: "" });
    const requestParams = {
      page: state.currentPageNumber - 1,
      limit: 15,
    };
    batch(() => {
      dispatch(actionCreators.resetGetTicketByStatus());
      dispatch(actionCreators.startGetTicketByStatusLoader());
      dispatch(
        actionCreators.getTicketByStatus(requestParams, props.selectedKey)
      );
    });

  }, [props.selectedKey, state.currentPageNumber]);

  useEffect(() => {
    if (
      props.common.allAdminData &&
      props.common.allAdminData.allAdminUsers &&
      props.common.allAdminData.allAdminUsers.length
    ) {
      const allAdminData = getOnlyLabelValuePair(
        converDatatoDropDownData(
          props.common.allAdminData.allAdminUsers,
          "name",
          "emailId"
        )
      );
      mapChangesToState({ allAdminData });
    }

  }, [props.common.allAdminData]);

  const handleInputValue = (e) => {
    mapChangesToState({ ticketID: e.target.value });
  };

  const clearSearch = () => {
    if (state.ticketID !== "") {
      mapChangesToState({ ticketID: "" });
      const requestParams = {
        page: state.currentPageNumber - 1,
        limit: 15,
      };
      batch(() => {
        dispatch(actionCreators.resetGetTicketByStatus());
        dispatch(actionCreators.startGetTicketByStatusLoader());
        dispatch(
          actionCreators.getTicketByStatus(requestParams, props.selectedKey)
        );
      });
    }
  };

  const onSearchClick = () => {
    if (state.ticketID !== "") {
      const requestParams = {
        ticketId: state.ticketID
      };
      batch(() => {
        dispatch(actionCreators.resetGetTicketByStatus());
        dispatch(actionCreators.startGetTicketByStatusLoader());
        dispatch(
          actionCreators.getTicketByStatusAndTicketID(requestParams, props.selectedKey)
        );
      });
    }
  };

  const { ticketListFailure, ticketListLoading } = props.ticketList;
  return (
    <>
      <styled.header>
        <styled.heading>
          {capitalizeFirstLetter(props.selectedKey)} Tickets&nbsp;<span>
            <styled.countbubble style={{ "background": `${props.color}` }}> {props.ticketList.ticketcount}</styled.countbubble>
          </span>
        </styled.heading>
        <Pagination
          currentPage={state.currentPageNumber}
          maxPages={props.ticketList.totalPages}
          nextPage={increasePageCount}
          prevPage={decreasePageCount}
        />
      </styled.header>

      {/* <div>      
      <Filters status={props.selectedKey}></Filters>
      </div> */}

      <div className="form-group">
        <div className="input-group col-lg-5 col-md-9 col-12 mb-3 ml-3 mt-3">
          <styled.input
            type="number"
            className="form-control"
            placeholder="Enter Ticked ID"
            value={state.ticketID}
            onChange={handleInputValue}
            pattern="[0-9]"
          />
          <div className="input-group-append">
            <styled.searchUserBtn
              className="btn btn-outline-secondary"
              type="button" onClick={onSearchClick}
            >
              Search
            </styled.searchUserBtn>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <styled.clearBtn
              type="button" onClick={clearSearch}
            >
              Clear
            </styled.clearBtn>
          </div>
        </div>
      </div>

      <styled.container>
        {ticketListLoading ? (
          <GlobalStyled.loaderContainer height={"65vh"}>
            <Loader height={"60px"} loadingText={"Fetching Tickets..."} />
          </GlobalStyled.loaderContainer>
        ) : ticketListFailure ? (
          <ComponentError
            errorContainerStyles={styled.errorContainerStyles}
            paragraphStyles={styled.paragraphStyles}
            errorText={errorText}
          />
        ) : (
          <>
            {getPageTrackingInformation()}
            {props.ticketList &&
              props.ticketList.ticketList &&
              props.ticketList.ticketList.length ? (
              props.ticketList.ticketList.map((ticketData) => {
                return (
                  <Ticket
                    allAdminData={state.allAdminData}
                    data={ticketData}
                    key={ticketData.id}
                    mapChangesToState={mapChangesToState}
                    handleTicketClick={handleTicketClick}
                  />
                );
              })
            ) : (
              <styled.noTicketsContainer>
                <styled.noTicketsText>No Tickets Found</styled.noTicketsText>
              </styled.noTicketsContainer>
            )}
          </>
        )}
      </styled.container>
      <AnimatePresence>
        {state.isPreviewVisible ? (
          <TicketPreview
            data={state.currentSelectedTicket}
            closePreview={closePreview}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    common: state.common,
    ticketList: state.ticketList
  };
};

export default connect(mapStatetoProps)(React.memo(TicketListingByStatusPage));
