import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Alert,
    CircularProgress,
} from "@mui/material";
import { verifyEmail } from "../../../services/authenticate/authenticate";
import axios from "axios"; // Make sure to import axios

export const VerifyEmail = () => {
    const [token, setToken] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [resending, setResending] = useState(false);

    const fetchTimeRemaining = useCallback(async () => {
        if (!email) {
            setError("Email is missing");
            setLoading(false);
            return;
        }
        try {
            console.log("check env", import.meta.env.VITE_BACKEND_URL);

            const response = await axios.post(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/auth/time-remaining-verify`,
                { email }
            );
            console.log("check time remaining", response.data);
            setTimeRemaining(response.data.timeRemaining);
            setError(null);
        } catch (err) {
            setError("Failed to fetch remaining time");
        } finally {
            setLoading(false);
        }
    }, [email]);

    useEffect(() => {
        fetchTimeRemaining();
    }, [fetchTimeRemaining]);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (timeRemaining && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime === null || prevTime <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timeRemaining]);

    const handleResendEmail = async () => {
        if (!email) {
            setError("Email is missing");
            return;
        }
        setResending(true);
        try {
            await axios.post(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/auth/send-verification-email`,
                { email }
            );
            await fetchTimeRemaining(); // Fetch the new time remaining after sending email
            setError(null);
        } catch (err) {
            setError("Failed to resend verification email");
        } finally {
            setResending(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            if (!email) throw new Error("Email is missing");
            const result = await verifyEmail(email, token);
            console.log("check result", result);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred during verification"
            );
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Verify Your Email
                </Typography>
                {success ? (
                    <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
                        Email verified successfully! Redirecting to login...
                    </Alert>
                ) : (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="token"
                            label="Verification Token"
                            name="token"
                            autoFocus
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Verify Email
                        </Button>
                        {error && (
                            <Alert
                                severity="error"
                                sx={{ mt: 2, width: "100%" }}
                            >
                                {error}
                            </Alert>
                        )}
                    </Box>
                )}
            </Box>
            <Box sx={{ mt: 2, textAlign: "center" }}>
                {loading ? (
                    <CircularProgress />
                ) : timeRemaining !== null && timeRemaining > 0 ? (
                    <Typography>
                        Time remaining: {formatTime(timeRemaining)}
                    </Typography>
                ) : (
                    <Button
                        onClick={handleResendEmail}
                        disabled={resending}
                        variant="contained"
                    >
                        {resending ? "Sending..." : "Resend Verification Email"}
                    </Button>
                )}
            </Box>
        </Container>
    );
};

// Helper function to format time
const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
