import { withClasses } from "../hocs/with_classes";
import { Layout as L } from "./layout";
import classes from "./layout.module.scss";

export const Layout = withClasses(classes, L);
