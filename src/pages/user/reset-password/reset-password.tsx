import { useState } from "react";
import {
    EnterToken,
    RequestResetPassword,
    ResetPassword,
} from "../../../components";

export const ResetPasswordPage = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    return (
        <>
            {!email && (
                <RequestResetPassword
                    onEmailSubmitted={(email) => setEmail(email)}
                />
            )}
            {email && !token && (
                <EnterToken
                    email={email}
                    onTokenSubmitted={(token) => setToken(token)}
                />
            )}
            {email && token && <ResetPassword email={email} token={token} />}
        </>
    );
};
