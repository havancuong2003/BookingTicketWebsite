import { formatDate, getAllDateOfWeek } from "../../../utils";
export const LandingPage = () => {
    return (
        <div className="min-h-screen flex justify-center">
            {getAllDateOfWeek().map((date) => (
                <div key={date.toString()} className="m-4">
                    <h1>{formatDate(date)}</h1>
                </div>
            ))}
        </div>
    );
};
