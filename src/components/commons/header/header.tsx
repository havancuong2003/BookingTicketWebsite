import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts";

const pages: Pages = {
    "Lịch chiếu rạp": "/schedule",
    Phim: "/movie",
    Voucher: "/voucher",
    "Ưu đãi": "/offer",
    "Hỗ trợ": "/support",
};

type Pages = {
    [key: string]: string;
};

export function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/login"); // Call navigate after logout
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "rgb(42 157 184)" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: 80 }}>
                    {/* Logo trên PC */}
                    <Link to="/">
                        <Box
                            component="img"
                            sx={{
                                height: 100,
                                display: { xs: "none", md: "flex" },
                                flex: { xs: 4, md: 3 },
                            }}
                            alt="Logo"
                            src={logo}
                        />
                    </Link>

                    {/* NAV */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            flex: { xs: 4, md: 6 },
                            display: { xs: "flex", md: "flex" },
                            justifyContent: { xs: "center", md: "center" },
                        }}
                    >
                        {Object.keys(pages).map((page) => (
                            <Link key={page} to={pages[page]}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: { xs: "none", md: "block" },
                                        marginLeft: { xs: 0, md: 3 },
                                        fontWeight: "bold",
                                        fontSize: "18px",
                                    }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {Object.keys(pages).map((page) => (
                                <Link key={page} to={pages[page]}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: "black",
                                            display: {
                                                xs: "block",
                                                md: "none",
                                            },
                                            marginLeft: { xs: 0, md: 3 },
                                            fontWeight: "bold",
                                            fontSize: "15px",
                                        }}
                                    >
                                        {page}
                                    </Button>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo trên Mobile */}
                    <Link to="/">
                        <Box
                            component="img"
                            sx={{
                                height: 80,
                                width: 250,
                                display: { xs: "flex", md: "none" },
                                flex: { xs: 4, md: 3 },
                            }}
                            alt="Logo"
                            src={logo}
                        />
                    </Link>

                    {/* User */}
                    <Box
                        sx={{
                            flexGrow: 0,
                            flex: { xs: 4, md: 3 },
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    <span>Trang cá nhân</span>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    <span>Thành viên</span>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    onClick={handleLogout}
                                >
                                    <span>Đăng xuất</span>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
