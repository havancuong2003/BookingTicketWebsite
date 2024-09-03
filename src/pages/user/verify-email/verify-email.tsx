import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Alert,
    CircularProgress,
} from "@mui/material";
import {
    verifyEmail,
    getTimeRemainingForVerification,
    resendVerificationEmail,
} from "../../../services/authenticate/authenticate";
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

    const handleBackToLogin = useCallback(() => {
        setToken("");
        setError(null);
        setSuccess(false);
        setTimeRemaining(null);
        setLoading(false);
        setResending(false);
        navigate("/login");
    }, [navigate]);

    const fetchTimeRemaining = useCallback(async () => {
        if (!email) {
            setError("Email is missing");
            setLoading(false);
            return;
        }
        try {
            const response = await getTimeRemainingForVerification(email);
            setTimeRemaining(response.timeRemaining);
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
            const result = await resendVerificationEmail(email);
            if (result.statusCode === 400) {
                setError(result.message);
                return;
            }
            await fetchTimeRemaining();
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
            if (result.statusCode === 400) {
                setError(result.message);
                return;
            }
            console.log("check result", result);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
        } catch (err) {
            console.error("Verification error:", err);
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                        "An error occurred during verification"
                );
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    marginTop: 4,
                    marginBottom: 2,
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Button
                    onClick={handleBackToLogin}
                    variant="outlined"
                    color="primary"
                >
                    Back to Login
                </Button>
            </Box>
            <Box
                sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Verify Your Email
                </Typography>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ mt: 2, mb: 2, fontWeight: "bold" }}
                >
                    Your email: {email}
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
