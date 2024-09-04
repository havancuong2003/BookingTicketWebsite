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

import { useNavigate } from "react-router-dom";
import { requestResetPassword } from "../../../services/authenticate/authenticate";

type FormRequestReset = {
    email: string;
};

export const RequestResetPassword = ({
    onEmailSubmitted,
}: {
    onEmailSubmitted: (email: string) => void;
}) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormRequestReset>();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notice, setNotice] = useState<string | null>(null);

    const onSubmit = async (data: FormRequestReset) => {
        setError(null);
        setSuccess(false);
        setLoading(true);
        try {
            const response = await requestResetPassword(data.email);
            setNotice(response.message);
            setSuccess(true);
            setTimeout(() => {
                setLoading(false);
                onEmailSubmitted(data.email);
            }, 3000);
        } catch (err) {
            setError("Failed to send reset password email. Please try again.");
            setTimeout(() => {
                setLoading(false);
            }, 1000);
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
                    Request Password Reset
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
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        {...register("email", {
                            required: "Email is required",
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
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
                            Send Reset Email
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
                        {notice} Redirecting to token entry...
                    </Alert>
                )}
            </Box>
        </Container>
    );
};
