import { useState, useEffect, useCallback } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
    verifyResetToken,
    getTimeRemainingForReset,
    requestResetPassword,
} from "../../../services/authenticate/authenticate";
import { useNavigate } from "react-router-dom";

type FormEnterToken = {
    token: string;
};

export const EnterToken = ({
    email,
    onTokenSubmitted,
}: {
    email: string;
    onTokenSubmitted: (token: string) => void;
}) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormEnterToken>();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [resending, setResending] = useState(false);

    const fetchTimeRemaining = useCallback(async () => {
        try {
            const response = await getTimeRemainingForReset(email);
            setTimeRemaining(response.timeRemaining);
            setError(null);
        } catch (err) {
            setError("Failed to fetch remaining time");
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

    const onSubmit = async (data: FormEnterToken) => {
        setError(null);
        setSuccess(false);
        setLoading(true);
        try {
            await verifyResetToken(email, data.token);
            setSuccess(true);
            setTimeout(() => {
                onTokenSubmitted(data.token);
            }, 1000);
        } catch (err) {
            setError("Invalid token. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendToken = async () => {
        setResending(true);
        try {
            await requestResetPassword(email);
            await fetchTimeRemaining();
            setError(null);
            setSuccess(true);
        } catch (err) {
            setError("Failed to resend reset password email");
        } finally {
            setResending(false);
        }
    };

    const handleBackToLogin = () => {
        navigate("/login");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 4, mb: 2 }}>
                <Button onClick={handleBackToLogin} variant="outlined">
                    Back to Login
                </Button>
            </Box>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Enter Reset Token
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="token"
                        label="Reset Token"
                        autoFocus
                        {...register("token", {
                            required: "Token is required",
                        })}
                        error={!!errors.token}
                        helperText={errors.token?.message}
                    />
                    {loading ? (
                        <CircularProgress sx={{ mt: 3, mb: 2 }} />
                    ) : (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Verify Token
                        </Button>
                    )}
                </Box>
                {error && (
                    <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
                        Token verified successfully! Redirecting to password
                        reset...
                    </Alert>
                )}
                <Box sx={{ mt: 2, textAlign: "center" }}>
                    {timeRemaining !== null && timeRemaining > 0 ? (
                        <Typography>
                            Time remaining: {formatTime(timeRemaining)}
                        </Typography>
                    ) : (
                        <Button
                            onClick={handleResendToken}
                            disabled={resending}
                            variant="contained"
                        >
                            {resending ? "Sending..." : "Resend Reset Token"}
                        </Button>
                    )}
                </Box>
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
