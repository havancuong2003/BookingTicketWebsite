import { withClasses } from "../../../hocs/with_classes";
import classes from "./landing-page.module.scss";
import { LandingPage as LP } from "./landing-page";

export const LandingPage = withClasses(classes, LP);
