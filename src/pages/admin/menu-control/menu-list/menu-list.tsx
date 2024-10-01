import React, { useEffect, useState } from "react";
import {
    getMenuItems,
    deleteMenuItem,
    getCombos, // Đảm bảo import getCombos
    deleteCombo,
} from "../../../../services";

import { Snackbar, Alert } from "@mui/material";
import { AddMenu } from "../add-menu";
import { useMenu } from "../../../../contexts"; // Đảm bảo ComboItem được xuất khẩu từ menuContext
import { AddCombo } from "../add-combo";
import { ComboItem } from "../../../../models";

export const MenuList: React.FC = () => {
    const { menuItems, setMenuItems, comboItems, setComboItems, addCombo } =
        useMenu(); // Lấy comboItems từ context
    const [message, setMessage] = useState<string>("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const items = await getMenuItems();
                setMenuItems(items);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        const fetchCombos = async () => {
            // Thêm hàm lấy danh sách combo
            try {
                const combos = await getCombos();
                setComboItems(combos); // Cập nhật state với danh sách combo
            } catch (error) {
                console.error("Error fetching combos:", error);
            }
        };

        fetchMenuItems();
        fetchCombos(); // Gọi hàm lấy danh sách combo
    }, [setMenuItems, setComboItems]); // Thêm setComboItems vào dependency array

    const handleDeleteMenuItem = async (id: number) => {
        try {
            await deleteMenuItem(id);
            setMenuItems(menuItems.filter((item) => item.id !== id));
            setMessage("Menu item deleted successfully!");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting menu item:", error);
            setMessage("Failed to delete menu item.");
            setOpenSnackbar(true);
        }
    };

    const handleDeleteCombo = async (id: number | undefined) => {
        if (id === undefined) return; // Prevent deletion if id is undefined
        try {
            await deleteCombo(id);
            setComboItems(comboItems.filter((combo) => combo.id !== id));
            setMessage("Combo deleted successfully!");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error deleting combo:", error);
            setMessage("Failed to delete combo.");
            setOpenSnackbar(true);
        }
    };

    const handleAddCombo = async (newCombo: ComboItem) => {
        try {
            await addCombo(newCombo); // Gọi hàm addCombo từ context
            setMessage("Combo added successfully!");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error adding combo:", error);
            setMessage("Failed to add combo.");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Movie Ticket Booking - Food & Drinks
            </h1>
            <AddMenu />
            <AddCombo onAdd={handleAddCombo} />
            <h1 className="text-2xl font-bold mt-4">Menu Items</h1>
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center p-2 border rounded-md shadow-md"
                    >
                        <h1>{item.id}</h1>
                        <div className="flex items-center">
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md mr-4"
                                />
                            )}
                            <span className="text-lg">
                                {item.name} - {item.price} - {item.type}
                            </span>
                        </div>
                        <button
                            onClick={() =>
                                item.id !== undefined &&
                                handleDeleteMenuItem(item.id)
                            }
                            className="text-red-600 hover:text-red-800"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <h1 className="text-2xl font-bold mt-4">Combos</h1>
            <ul className="space-y-2">
                {comboItems.map(
                    (
                        combo // Sử dụng comboItems từ context
                    ) => (
                        <li
                            key={combo.id}
                            className="flex justify-between items-center p-2 border rounded-md shadow-md"
                        >
                            <div className="flex items-center">
                                {combo.image && (
                                    <img
                                        src={combo.image}
                                        alt={combo.name}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                    />
                                )}
                                <span className="text-lg">
                                    {combo.name} - {combo.price}
                                </span>
                            </div>
                            <button
                                onClick={() => handleDeleteCombo(combo.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </li>
                    )
                )}
            </ul>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};
