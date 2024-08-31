import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const defaultTheme = createTheme();

export function SignUp() {
    const [signUpError, setSignUpError] = useState<string | null>(null);
    const [signUpSuccess, setSignUpSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { handleSignUp } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();
    const onSubmit = async (data: FormData) => {
        setSignUpError(null);
        setSignUpSuccess(null);
        setIsSubmitting(true);
        try {
            const result = await handleSignUp({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            });

            if (!result.success) {
                setSignUpError(
                    result.error || "An error occurred during sign up"
                );
                setIsSubmitting(false); // Set isSubmitting to false on error
            } else {
                setSignUpSuccess(
                    "Sign up successful! Redirecting to login page..."
                );
                setIsSubmitting(true);
                setTimeout(() => {
                    setIsSubmitting(false);
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            console.log("error", error);
            setSignUpError("An unexpected error occurred");
            setIsSubmitting(false); // Set isSubmitting to false on error
        }
    };

    const password = watch("password");
    console.log("submitting", isSubmitting);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng kí
                    </Typography>
                    {signUpError && (
                        <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
                            {signUpError}
                        </Alert>
                    )}
                    {signUpSuccess && (
                        <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
                            {signUpSuccess}
                        </Alert>
                    )}
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    {...register("firstName", {
                                        required: "First name is required",
                                    })}
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...register("lastName", {
                                        required: "Last name is required",
                                    })}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoComplete="family-name"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Email is not valid",
                                        },
                                    })}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters long",
                                        },
                                    })}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("confirmPassword", {
                                        required:
                                            "Confirm password is required",
                                        validate: (value) =>
                                            value === password ||
                                            "Passwords must match",
                                    })}
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ position: "relative", mt: 3, mb: 2 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{
                                    height: 36.5,
                                    opacity: isSubmitting ? 0 : 1,
                                }}
                            >
                                Đăng kí
                            </Button>
                            {isSubmitting && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        marginTop: "-12px",
                                        marginLeft: "-12px",
                                    }}
                                />
                            )}
                        </Box>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="login" variant="body2">
                                    Bạn đã có tài khoản? Đăng nhập
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
