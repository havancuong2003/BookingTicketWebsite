import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FcGoogle } from "react-icons/fc";
import { loginGG } from "../../../services";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts";
import { useNavigate } from "react-router-dom";

type FormLogin = {
    email: string;
    password: string;
};

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormLogin>();
    const navigate = useNavigate();
    const { login } = useAuth();
    const onSubmit = async (data: FormLogin) => {
        await login(data, navigate);
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
                        onClick={loginGG}
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
            </Box>
        </Container>
    );
}
