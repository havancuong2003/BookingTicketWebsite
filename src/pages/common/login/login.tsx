import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";

type FormLogin = {
    email: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const {
        loginWithCredentials,
        isAuthenticated,
        loginWithGoogle,
        loginError,
        setLoginError,
    } = useAuth();
    const [showError, setShowError] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (loginError) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                setLoginError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [loginError, setLoginError]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLogin>();
    const onSubmit = async (data: FormLogin) => {
        localStorage.setItem("lastLoginEmail", data.email);
        setShowError(false);
        setRedirecting(false);
        const result = await loginWithCredentials(data.email, data.password);

        if (!result.success) {
            setShowError(true);
            if (result.requireEmailVerification) {
                setLoginError(
                    "Email is not verified. Redirecting to verification page..."
                );
                setRedirecting(true);
                setTimeout(() => {
                    navigate(
                        `/verify-email?email=${encodeURIComponent(
                            result.email || ""
                        )}`
                    );
                }, 2000);
            } else {
                setLoginError(result.error);
            }
        }
    };

    const handleGoogleLogin = () => {
        loginWithGoogle();
    };

    useEffect(() => {
        setShowError(false);
        setLoginError(null);
        setRedirecting(false);
    }, []);
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
                    Đăng nhập
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        onClick={handleGoogleLogin}
                        sx={{ mb: 2 }}
                    >
                        <FcGoogle size={20} style={{ marginRight: "10px" }} />
                        Sign in with Google
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                {showError && loginError && (
                    <Alert
                        severity={redirecting ? "info" : "error"}
                        sx={{ width: "100%", mt: 2 }}
                    >
                        {loginError}
                    </Alert>
                )}
            </Box>
        </Container>
    );
}
