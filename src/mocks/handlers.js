import { rest } from "msw";
import { URL } from "../Config/constant";
import { jobsList } from "./mockData";

const storedJobs = localStorage.getItem("jobsList");
if (storedJobs == null) {
  localStorage.setItem("jobsList", JSON.stringify(jobsList));
}

export const handlers = [
  rest.post(URL.CREATE_USER, (req, res, ctx) => {
    const createUser = {
      [req.body.emailId]: { ...req.body, userId: Date.now() },
    };
    const storedData = localStorage.getItem("userDb");
    let data = storedData ? JSON.parse(storedData) : null;
    if (data) {
      data = { ...data, ...createUser };
    } else {
      data = createUser;
    }
    localStorage.setItem("userDb", JSON.stringify(data));
    return res(
      ctx.status(200),
      ctx.json({ message: "Data stored successfully" })
    );
  }),
  rest.post(URL.LOGIN_API, (req, res, ctx) => {
    const storedData = localStorage.getItem("userDb");
    const data = storedData ? JSON.parse(storedData) : null;
    if (data && data[req.body.emailId]) {
      console.log("scuss");
      return res(ctx.status(200), ctx.json({ data: data[req.body.emailId] }));
    } else {
      return res(ctx.status(401), ctx.json({ data }));
    }
  }),
  rest.get(URL.GET_JOBS, (req, res, ctx) => {
    const skip = parseInt(req.url.searchParams.get("skip") || "0", 10);
    const limit = parseInt(req.url.searchParams.get("limit") || "10", 10);

    // Adjusted parsing logic for minSalary and maxSalary
    const minSalaryParam = req.url.searchParams.get("minSalary");
    const maxSalaryParam = req.url.searchParams.get("maxSalary");
    const minSalary =
      minSalaryParam !== null && minSalaryParam !== ""
        ? parseInt(minSalaryParam, 10)
        : null;
    const maxSalary =
      maxSalaryParam !== null && maxSalaryParam !== ""
        ? parseInt(maxSalaryParam, 10)
        : null;

    // Adjusted parsing logic for tags
    const tagsParam = req.url.searchParams.get("tags");
    const tags = tagsParam && tagsParam !== "" ? tagsParam.split(",") : [];

    const storedData = localStorage.getItem("jobsList");
    const allJobs = storedData ? JSON.parse(storedData) : [];

    // Apply filters only if parameters are validly provided
    const filteredJobs = allJobs.filter((job) => {
      const salaryWithinRange =
        (minSalary !== null ? job.salaryPerHour >= minSalary : true) &&
        (maxSalary !== null ? job.salaryPerHour <= maxSalary : true);
      const tagsMatch =
        tags.length > 0
          ? tags.some((tag) => job.tags && job.tags.includes(tag))
          : true;
      return salaryWithinRange && tagsMatch;
    });

    const paginatedJobsList = filteredJobs.slice(skip, skip + limit);

    if (isNaN(skip) || isNaN(limit) || skip < 0 || limit <= 0) {
      return res(
        ctx.status(400),
        ctx.json({
          status_code: 400,
          message: "Invalid skip or limit parameter",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        status_code: 200,
        data: paginatedJobsList,
        total: filteredJobs.length,
      })
    );
  }),
  rest.post(URL.CREATE_JOB, (req, res, ctx) => {
    let job = req.body;
    const newJobId = Date.now();
    const newJob = { ...job, id: newJobId };

    const storedJobs = localStorage.getItem("jobsList");
    const jobs = storedJobs ? JSON.parse(storedJobs) : [];

    jobs.push(newJob);

    localStorage.setItem("jobsList", JSON.stringify(jobs));

    return res(
      ctx.status(201),
      ctx.json({ data: newJob, message: "Job created successfully" })
    );
  }),
  rest.post(URL.APPLY_JOB, (req, res, ctx) => {
    const { userId, itemId } = req.body;

    const storedJobs = localStorage.getItem("jobsList");
    const jobs = storedJobs ? JSON.parse(storedJobs) : [];

    // Find the job with the given itemId
    const jobIndex = jobs.findIndex((job) => job.id === itemId);
    if (jobIndex !== -1) {
      // Job found
      const job = jobs[jobIndex];

      if (!job.leadCount.includes(userId)) {
        job.leadCount.push(userId);
        jobs[jobIndex] = job;

        localStorage.setItem("jobsList", JSON.stringify(jobs));

        return res(
          ctx.status(201),
          ctx.json({ message: "Job applied successfully" })
        );
      } else {
        return res(
          ctx.status(200),
          ctx.json({ message: "User already applied to this job" })
        );
      }
    } else {
      return res(ctx.status(404), ctx.json({ error: "Job not found" }));
    }
  }),
];
