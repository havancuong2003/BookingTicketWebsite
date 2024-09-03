import { withClasses } from "../../../hocs";
import classes from "./reset-password.module.scss";
import { ResetPasswordPage as RPP } from "./reset-password";

export const ResetPassword = withClasses(classes, RPP);
