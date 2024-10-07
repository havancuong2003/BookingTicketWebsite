import React, { useEffect, useState } from "react";
import {
    getMenuItems,
    getCombos,
    deleteMenuItem,
    deleteCombo,
} from "../../../../services";
import { Snackbar, Alert } from "@mui/material";
import { AddMenu } from "../add-menu";
import { useMenu } from "../../../../contexts";
import { AddCombo } from "../add-combo";

import { motion } from "framer-motion";
import { FaUtensils, FaGlassWhiskey } from "react-icons/fa";

export const MenuList: React.FC = () => {
    const { menuItems, setMenuItems, comboItems, setComboItems, addCombo } =
        useMenu();
    console.log("comboItems", comboItems);

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
            try {
                const combos = await getCombos();
                setComboItems(combos);
            } catch (error) {
                console.error("Error fetching combos:", error);
            }
        };

        fetchMenuItems();
        fetchCombos();
    }, [setMenuItems, setComboItems]);

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
        if (id === undefined) return;
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

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Movie Ticket Booking - Food & Drinks
            </h1>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <AddMenu />
                <AddCombo onAdd={addCombo} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Individual Items Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 p-6 rounded-lg"
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <FaUtensils className="mr-2" /> Menu Items
                    </h2>
                    <ul className="space-y-2">
                        {menuItems?.map((item) => (
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
                                        {item.name} - {item.price} - {item.type}{" "}
                                        - {item.quantity}
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
                </motion.div>

                {/* Combos Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-50 p-6 rounded-lg"
                >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <FaGlassWhiskey className="mr-2" /> Combos
                    </h2>
                    <ul className="space-y-2">
                        {comboItems.map((combo) => (
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
                        ))}
                    </ul>
                </motion.div>
            </div>
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
