import { rest } from "msw";
import { URL } from "../Config/constant";
import { jobsList } from "./mockData";
//import { mockEvents } from "./mockData";

export const handlers = [
  rest.post(URL.CREATE_USER, (req, res, ctx) => {
    console.log("HTTp api");
    const createUser = {
      [req.body.emailId]: req.body,
    };
    const storedData = localStorage.getItem("data");
    let data = storedData ? JSON.parse(storedData) : null;
    if (data) {
      data = { ...data, ...createUser };
    } else {
      data = createUser;
    }
    localStorage.setItem("data", JSON.stringify(data));
    return res(
      ctx.status(200),
      ctx.json({ message: "Data stored successfully" })
    );
  }),
  rest.post(URL.LOGIN_API, (req, res, ctx) => {
    const storedData = localStorage.getItem("data");
    const data = storedData ? JSON.parse(storedData) : null;
    if (data && data[req.body.emailId]) {
      console.log("scuss");
      return res(ctx.status(200), ctx.json({ data: data[req.body.emailId] }));
    } else {
      return res(ctx.status(401), ctx.json({ data }));
    }
  }),
  rest.get(URL.GET_JOBS, (req, res, ctx) => {
    return res(
      ctx.json({
        status_code: 200,
        data: jobsList,
      })
    );
  }),
];
