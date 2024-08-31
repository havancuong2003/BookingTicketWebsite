import { withClasses } from "../../../hocs";
import classes from "./verify-email.module.scss";
import { VerifyEmail as VE } from "./verify-email";

export const VerifyEmail = withClasses(classes, VE);
