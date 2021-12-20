import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  assignDepttoUser,
  searchUserAction,
  updateDepartment,
  showLoader,
  cleanUpManageAccess,
  updateDomain,
} from "app/redux/actions/manageAccessActions";
import Loader from "core/Loader/Loader";
import * as styled from "./ManageAccess.styled";

function AddUser() {
  const [state, setState] = useState({
    search: "",
    valid: false,
  });
  const dispatch = useDispatch();
  const manageAccessState = useSelector((state) => state.manageAccess);
  const mapChangesToState = (value) => setState({ ...state, ...value });
  useEffect(() => {
    dispatch(cleanUpManageAccess("addUser"));
  }, []);
  const commonState = useSelector((state) => state.common);

  const handleInputValue = (e) => {
    mapChangesToState({ search: e.target.value });
  };
  const isEmail = (text) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(text);
  };
  const isEmpCode = (text) => {
    var empPattern = /^[a-zA-Z]{2}\d{4}/;
    return empPattern.test(text);
  };
  const searchUser = () => {
    let label = "ecode";
    if (isEmail(state.search)) label = "email";
    if (state.search !== "") {
      dispatch(showLoader("addUser"));
      dispatch(searchUserAction(label, state.search));
    }
  };

  const addUser = () => {
    if (validateForm()) {
      dispatch(showLoader("addUser"));
      dispatch(
        assignDepttoUser(
          Object.keys(manageAccessState.selectedUser).length === 0 ? state.search : manageAccessState.selectedUser.contactInfo.email,
          manageAccessState.department,
          manageAccessState.domain
        )
      );
    }
  };

  const validateForm = () => {
    let valid = true;
    if (manageAccessState.selectedUser.name === '') {
      valid = false;
    }

    if (manageAccessState.department === 0) {
      valid = false;
    }

    if (manageAccessState.departmentName === 'IT' && manageAccessState.domain === 0) {
      valid = false;
    }
    return valid;
  }

  const changeDepartment = (e) => {
    let valid = false;
    if (
      e.target.value > 0 &&
      manageAccessState.selectedUser.name &&
      manageAccessState.selectedUser.name !== ""
    )
      valid = true;
    mapChangesToState({ valid });
    dispatch(updateDepartment(e.target.value, e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text));
  };

  const changeDomain = (e) => {
    dispatch(updateDomain(e.target.value));
  }

  return (
    <>
      <div className="row">
        <div className="mt-4 col-md-4 col-sm-8">
          <div className="form-group">
            <div className="input-group mb-3">
              <styled.input
                type="text"
                className="form-control"
                placeholder="Search User by Email"
                value={state.search}
                onChange={handleInputValue}
              />
              <div className="input-group-append">
                <styled.searchUserBtn
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={searchUser}
                >
                  Search
                </styled.searchUserBtn>
              </div>
            </div>
          </div>
          {Object.keys(manageAccessState.selectedUser).length ? (
            <div className="form-group">
              <styled.label>Selected User</styled.label>
              <styled.input
                className="form-control"
                type="text"
                readOnly
                value={manageAccessState.selectedUser.name}
              />
            </div>
          ) : null}
          <div className="form-group">
            <styled.label>Select Department</styled.label>
            <styled.select
              className="form-control"
              onChange={changeDepartment}
              value={manageAccessState.department}
            >
              <option value="0">-- Select Department --</option>
              {commonState.departments && commonState.departments.length
                ? commonState.departments.map((department) => (
                  <option key={department.name} value={department.id}>
                    {department.name}
                  </option>
                ))
                : null}
            </styled.select>
          </div>
          {manageAccessState.departmentName !== '' && manageAccessState.departmentName === "IT" ?
            (<div className="form-group">
              <styled.label>Select Domain</styled.label>
              <styled.select
                className="form-control"
                onChange={changeDomain}
                value={manageAccessState.domain}
              >
                <option value="0">-- Select Domain --</option>
                {commonState.domains && commonState.domains.length
                  ? commonState.domains.map((domain) => (
                    <option key={domain.id} value={domain.id}>
                      {domain.profileName}
                    </option>
                  ))
                  : null}
              </styled.select>
            </div>) : null}
          <div className="form-group">
            <styled.addBtn
              type="button"
              //   className={`btn btn-primary ${state.valid ? "" : "disabled"}`}
              // disabled={!state.valid}
              onClick={addUser}
            >
              Add
            </styled.addBtn>
          </div>
        </div>
        {manageAccessState.loading ? (
          <div className="mt-3 align-self-start">
            <Loader height="33px" />
          </div>
        ) : null}
      </div>
      <div className="row">
        {manageAccessState.error ? (
          <div className="mt-4 col">
            <div className="alert alert-danger" role="alert">
              {manageAccessState.errorMessage}
            </div>
          </div>
        ) : null}
        {manageAccessState.success ? (
          <div className="mt-4 col">
            <div className="alert alert-success" role="alert">
              {manageAccessState.successMessage}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default AddUser;
