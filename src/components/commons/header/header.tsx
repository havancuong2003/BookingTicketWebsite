import clsx from "clsx";

type HeaderProps = {
    classes?: {
        [key: string]: string;
    };
};

export const Header: React.FC<HeaderProps> = ({ classes }) => {
    return (
        <div
            className={clsx(
                classes?.with,
                "text-3xl center flex justify-center items-center h-10 md:hidden lg:block"
            )}
        >
            <p>adasdasdsa</p>
        </div>
    );
};
