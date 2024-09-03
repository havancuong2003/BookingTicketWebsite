import { useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../services/authenticate/authenticate";

type FormResetPassword = {
    newPassword: string;
    confirmNewPassword: string;
};

export const ResetPassword = ({ email }: { email: string; token: string }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormResetPassword>();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    const onSubmit = async (data: FormResetPassword) => {
        setError(null);
        setSuccess(false);
        if (data.newPassword !== data.confirmNewPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await resetPassword(email, data.newPassword);
            if (response.statusCode !== 200) {
                setError(response.message);
                return;
            }
            setSuccess(true);
            setRedirecting(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ||
                        "Failed to reset password. Please try again."
                );
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
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
                    Reset Password
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
                        label="New Password"
                        type="password"
                        id="newPassword"
                        autoComplete="new-password"
                        {...register("newPassword", {
                            required: "New password is required",
                        })}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        id="confirmNewPassword"
                        autoComplete="new-password"
                        {...register("confirmNewPassword", {
                            required: "Confirm new password is required",
                        })}
                        error={!!errors.confirmNewPassword}
                        helperText={errors.confirmNewPassword?.message}
                    />
                    {redirecting ? (
                        <CircularProgress sx={{ mt: 3, mb: 2 }} />
                    ) : (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset Password
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
                        Password reset successfully! Redirecting to login...
                    </Alert>
                )}
            </Box>
        </Container>
    );
};
