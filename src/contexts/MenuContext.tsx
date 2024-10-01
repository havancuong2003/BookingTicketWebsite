import React, { createContext, useContext, useState, ReactNode } from "react";
import {
    addMenuItem as addMenuItemService,
    deleteMenuItem as deleteMenuItemService,
    addCombo as addComboService, // Import the addCombo service
    deleteCombo as deleteComboService, // Import the deleteCombo service
    updateCombo as updateComboService, // Import the updateCombo service
} from "../services"; // Adjust the path as necessary
import { ComboItem, MenuItem } from "../models";

interface MenuContextType {
    menuItems: MenuItem[];
    comboItems: ComboItem[]; // Add this line
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    setComboItems: React.Dispatch<React.SetStateAction<ComboItem[]>>; // Add this line
    addMenuItem: (item: MenuItem) => Promise<void>;
    deleteMenuItem: (id: number) => Promise<void>; // Change to return a Promise
    addCombo: (combo: ComboItem) => Promise<void>; // Add this line
    deleteCombo: (id: number) => Promise<void>; // Add this line
    updateCombo: (combo: ComboItem) => Promise<void>; // Add this line
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [comboItems, setComboItems] = useState<ComboItem[]>([]); // Add this line

    const addMenuItem = async (item: MenuItem) => {
        try {
            const newItem = await addMenuItemService(item); // Call the service
            setMenuItems((prevItems) => [...prevItems, newItem]); // Update state with the new item
        } catch (error) {
            console.error("Failed to add menu item:", error);
            throw error; // Optionally re-throw the error for handling in the component
        }
    };

    const deleteMenuItem = async (id: number) => {
        try {
            await deleteMenuItemService(id); // Call the service to delete the item
            setMenuItems((prevItems) =>
                prevItems.filter((item) => item.id !== id)
            ); // Update state
        } catch (error) {
            console.error("Failed to delete menu item:", error);
            throw error; // Optionally re-throw the error for handling in the component
        }
    };

    const addCombo = async (combo: ComboItem) => {
        try {
            const newCombo = await addComboService(combo); // Call the service to add the combo
            setComboItems((prevCombos) => [...prevCombos, newCombo]); // Cập nhật state với combo mới
        } catch (error) {
            console.error("Failed to add combo:", error);
            throw error; // Optionally re-throw the error for handling in the component
        }
    };

    const deleteCombo = async (id: number) => {
        try {
            await deleteComboService(id); // Call the service to delete the combo
            setComboItems((prevCombos) =>
                prevCombos.filter((combo) => combo.id !== id)
            ); // Update state
        } catch (error) {
            console.error("Failed to delete combo:", error);
            throw error; // Optionally re-throw the error for handling in the component
        }
    };

    const updateCombo = async (combo: ComboItem) => {
        try {
            const updatedCombo = await updateComboService(combo.id!, combo); // Call the service to update the combo
            setComboItems((prevCombos) =>
                prevCombos.map((c) =>
                    c.id === updatedCombo.id ? updatedCombo : c
                )
            ); // Update state with the updated combo
        } catch (error) {
            console.error("Failed to update combo:", error);
            throw error; // Optionally re-throw the error for handling in the component
        }
    };

    return (
        <MenuContext.Provider
            value={{
                menuItems,
                comboItems,
                setMenuItems,
                setComboItems,
                addMenuItem,
                deleteMenuItem,
                addCombo,
                deleteCombo,
                updateCombo,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};
