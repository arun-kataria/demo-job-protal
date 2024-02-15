import { handlers } from "./handlers";
import { worker } from "./setup-msw";

worker.use(...handlers);

export { worker };
