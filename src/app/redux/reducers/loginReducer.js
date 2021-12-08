import * as types from "../actionTypes";

const initalState = {
  loginData: [],
  isLoginSuccess: false,
  isLoginFailure: false,
  isLoginLoading: false,
};

const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_LOGIN_CREDS_LOADING: {
      return {
        ...state,
        isLoginSuccess: false,
        isLoginFailure: false,
        isLoginLoading: true,
      };
    }
    case types.GET_LOGIN_CREDS_SUCCESS: {
      const token = action.data.token;
      const loginData = action.data.result;
      window.localStorage.setItem("xenieToken", token);
      window.localStorage.setItem("userId", action.data.result.userId);
      window.localStorage.setItem("userEmail", action.data.result.contactInfo.email);
      return {
        ...state,
        loginData,
        isLoginSuccess: true,
        isLoginFailure: false,
        isLoginLoading: false,
      };
    }
    case types.GET_LOGIN_CREDS_FAILURE: {
      return {
        ...state,
        isLoginSuccess: false,
        isLoginFailure: true,
        isLoginLoading: false,
      };
    }
    case types.RESET_LOGIN_CREDS: {
      return {
        ...state,
        loginData: [],
        isLoginSuccess: false,
        isLoginFailure: false,
        isLoginLoading: false,
      };
    }
    case types.LOGOUT_USER: {
      return {
        ...state,
        loginData: [],
        isLoginSuccess: false,
        isLoginFailure: false,
        isLoginLoading: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default loginReducer;
