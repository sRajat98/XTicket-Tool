 const API_HOST_PATH = "https://xenie.xebia.in";
 //const API_HOST_PATH = "http://138.91.123.79/ticket-tool/v1";
 //const API_HOST_PATH = "http://138.91.123.79";
 //const API_HOST_PATH = "https://xdesk.herokuapp.com";
// const API_HOST_PATH = "http://168.63.250.105";

export const constants = {
  SUCCESS: "success",
  FAILURE: "failure",
  SERVICE_URLS: {
    LOGIN: `${API_HOST_PATH}/ticket-tool/v1/users/login`,
    TICKET_LISTING: `${API_HOST_PATH}/ticket-tool/v1/tickets`,
    ZOHO_TICKET_LISTING: `${API_HOST_PATH}/ticket-tool/v1/history`,
    GET_DEPARTMENTS: `${API_HOST_PATH}/ticket-tool/v1/master-data/departments`,
    TICKET_DETAILING: `${API_HOST_PATH}/ticket-tool/v1/tickets`,
    TICKET_REPLY: `${API_HOST_PATH}/ticket-tool/v1/tickets/replies/`,
    TICKET_ASSIGN: `${API_HOST_PATH}/ticket-tool/v1/tickets/assign/`,
    TICKET_STATUS: `${API_HOST_PATH}/ticket-tool/v1/tickets/change-status/`,
    TICKET_RESOLUTION: `${API_HOST_PATH}/ticket-tool/v1/tickets/resolution/`,
    TICKET_ADD: `${API_HOST_PATH}/ticket-tool/v1/tickets`,
    TICKET_MASTER_DATA: `${API_HOST_PATH}/ticket-tool/v1/master-data/`,
    TICKET_VIEW_ADMIN: `${API_HOST_PATH}/ticket-tool/v1/users/admins`,
    TICKET_HISTORY: `${API_HOST_PATH}/ticket-tool/v1/tickets/ticket-journey/`,
    GET_TICKET_STATUS: `${API_HOST_PATH}/ticket-tool/v1/tickets/ticket-status`,
    GIVE_FEEDBACK: `${API_HOST_PATH}/ticket-tool/v1/feedback/`,
    DOWNLOAD_FILE: `${API_HOST_PATH}/ticket-tool/v1/tickets/download/3?fileName=`,
    RATING: `${API_HOST_PATH}/ticket-tool/v1/analytics/feedback/user/ratings`,
    DEPARTMENT_RATING: `${API_HOST_PATH}/ticket-tool/v1/analytics/feedback/department/ratings`,
    SLAS_USER_MISSED: `${API_HOST_PATH}/ticket-tool/v1/analytics/slas/user/missed`,
    SLAS_DEPARTMENT_MISSED: `${API_HOST_PATH}/ticket-tool/v1/analytics/slas/department/missed`,
    SLAS_USER_RESOLVED: `${API_HOST_PATH}/ticket-tool/v1/analytics/slas/user/resolved`,
    SLAS_DEPARTMENT_RESOLVED: `${API_HOST_PATH}/ticket-tool/v1/analytics/slas/department/resolved`,
    MISSED_VS_ACHIEVED: `${API_HOST_PATH}/ticket-tool/v1/tickets/user/achieved/missed/`,
    MISSED_BY_STATUS: `${API_HOST_PATH}/ticket-tool/v1/tickets/missed/byuser/status`,
    MISSED_BY_DEPARTMENT: `${API_HOST_PATH}/ticket-tool/v1/tickets/department/users/achieved/missed/`,
    AVERAGE_EFFICIENCY: `${API_HOST_PATH}/ticket-tool/v1/tickets/user/efficiency`,
    SLA_DATE: `${API_HOST_PATH}/ticket-tool/v1/tickets/user/missed/datewise/count`,
    RESET_PASSWORD: `${API_HOST_PATH}/ticket-tool/v1/users/reset-password`,
    APPROVAL_JOURNEY: `${API_HOST_PATH}/ticket-tool/v1/approval/`,
    USER_DETAILS: `${API_HOST_PATH}/ticket-tool/v1/users/userDetails`,
    ADMIN_STATUS_COUNT: `${API_HOST_PATH}/ticket-tool/v1/analytics/tickets/statusCount`,
    // Madhur's Approval Page
    APPROVAL_LIST: `${API_HOST_PATH}/ticket-tool/v1/approval/dashboard`,
    CUSTOM_TICKET_DETAILS: `${API_HOST_PATH}/ticket-tool/v1/tickets/custom/`,
    CUSTOM_TICKET_MEMBERS: `${API_HOST_PATH}/ticket-tool/v1/tickets/custom/detail/`,
    CUSTOM_TICKET_REPLIES: `${API_HOST_PATH}/ticket-tool/v1/tickets/create/cutom/replies/`,
    MONTHLY_FLITER: `${API_HOST_PATH}/ticket-tool/v1/tickets/user/status/monthly/`,
    DOWNLOAD_ALL_TICKETS: `${API_HOST_PATH}/ticket-tool/v1/tickets/user/missed/allslas/file`,
    DOWNLOAD_MISSED_TICKETS: `${API_HOST_PATH}/ticket-tool/v1/tickets/user/missed/department/file`,
  },
  // /v1/tickets/missed/byuser/status
  NO_DATA_FOUND: "No results found...",
};
