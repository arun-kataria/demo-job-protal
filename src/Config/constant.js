const ROUTE = {
  REGISTRATION: "registration",
  EMPLOYER: "employer",
  DETAIL: "detail/:id",
  FREELENCER: "freelencer",
  PROFILE: "profile",
};

export const URL = {
  GET_JOBS: "/api/jobs/:id",
  CREATE_USER: "/api/createUser",
  LOGIN_API: "/api/login",
};

export const USER_TYPE = {
  0: "employer",
  1: "freelencer",
};

export default ROUTE;
