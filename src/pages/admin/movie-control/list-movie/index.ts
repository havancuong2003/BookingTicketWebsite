import { withClasses } from "../../../../hocs/with_classes";
import classes from "./list-movie.module.scss";
import { ListMovie as LM } from "./list-movie";

export const ListMovie = withClasses(classes, LM);
