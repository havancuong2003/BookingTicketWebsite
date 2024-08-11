import clsx from "clsx";

type HeaderProps = {
    classes?: {
        [key: string]: string;
    };
};

export const Header: React.FC<HeaderProps> = ({ classes }) => {
    return <div className={clsx(classes?.with, "")}>Header</div>;
};
