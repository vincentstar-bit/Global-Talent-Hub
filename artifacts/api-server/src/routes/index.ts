import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import workersRouter from "./workers";
import jobsRouter from "./jobs";
import leaveTypesRouter from "./leaveTypes";
import leaveRequestsRouter from "./leaveRequests";
import leaveLettersRouter from "./leaveLetters";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(workersRouter);
router.use(jobsRouter);
router.use(leaveTypesRouter);
router.use(leaveRequestsRouter);
router.use(leaveLettersRouter);
router.use(dashboardRouter);

export default router;
