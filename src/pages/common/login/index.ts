import { withClasses } from "../../../hocs/with_classes";
import { Login as Lg } from "./login";
import classes from "./login.module.scss";

export const Login = withClasses(classes, Lg);
