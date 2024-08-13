import { withClasses } from "../../../hocs/with_classes";
import classes from "./movie.module.scss";
import { Movie as MV } from "./movie";

export const Movie = withClasses(classes, MV);
