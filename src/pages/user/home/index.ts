import { withClasses } from "../../../hocs/with_classes";
import classes from "./home.module.scss";
import { Home as H } from "./home";

export const Home = withClasses(classes, H);
