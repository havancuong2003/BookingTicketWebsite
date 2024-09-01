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
    console.log("check login error", loginError);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (loginError === "Email is not verified") {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                setLoginError(null);
                const email = localStorage.getItem("lastLoginEmail");
                if (email) {
                    navigate(
                        `/verify-email?email=${encodeURIComponent(email)}`
                    );
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [loginError, navigate, setLoginError]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLogin>();
    const onSubmit = async (data: FormLogin) => {
        localStorage.setItem("lastLoginEmail", data.email);
        const result = await loginWithCredentials(data.email, data.password);
        // if (!result.error) {
        //     navigate("/");
        // }
        console.log("check result", result);
    };

    const handleGoogleLogin = () => {
        loginWithGoogle();
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
                        type="button"
                        fullWidth
                        variant="text"
                        sx={{
                            mt: 3,
                            mb: 2,
                            color: "black",
                            border: "1px solid black",
                        }}
                        onClick={handleGoogleLogin}
                    >
                        <FcGoogle size={30} />{" "}
                        <span className="ml-10">Đăng nhập với Google</span>
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="signup" variant="body2">
                                {"Bạn chưa có tài khoản? Đăng kí"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                {showError && (
                    <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                        Email is not verified. Redirecting to verification
                        page...
                    </Alert>
                )}
            </Box>
        </Container>
    );
}
