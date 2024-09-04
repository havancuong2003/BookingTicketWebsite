import { decodeAccessToken } from "../../../utils";
export const Offer = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken", accessToken);

    const decodedToken = decodeAccessToken(accessToken as string);
    console.log("decodedToken", decodedToken);
    return <div></div>;
};
