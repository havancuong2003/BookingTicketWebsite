import { withClasses } from "../../../../hocs/with_classes";
import classes from "./add-new-movie.module.scss";
import { AddNewMovie as AM } from "./add-new-movie";

export const AddNewMovie = withClasses(classes, AM);
