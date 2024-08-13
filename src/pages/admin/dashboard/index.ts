import { withClasses } from "../../../hocs/with_classes";
import classes from "./dashboard.module.scss";
import { Dashboard as D } from "./dashboard";

export const Dashboard = withClasses(classes, D);
