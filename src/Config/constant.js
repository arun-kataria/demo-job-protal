const ROUTE = {
  REGISTRATION: "/registration",
  EMPLOYER: "/employer",
  DETAIL: "/detail/:id",
  FREELENCER: "/freelencer",
  PROFILE: "/profile",
  JOB_LIST: "/jobList",
};

export const URL = {
  GET_JOBS: "/api/jobs/:id",
  CREATE_USER: "/api/createUser",
  LOGIN_API: "/api/login",
  CREATE_JOB: "/api/createJob",
  APPLY_JOB: "/api/applyJob",
};

export const USER_TYPE = {
  0: "employer",
  1: "freelencer",
};

export default ROUTE;
