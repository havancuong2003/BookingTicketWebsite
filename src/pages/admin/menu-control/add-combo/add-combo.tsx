import React, { useState } from "react";
import { useMenu } from "../../../../contexts"; // Nhập useMenu để lấy menu items
import { ComboItem, MenuItem } from "../../../../models"; // Nhập ComboItem từ models
import { Button, TextField } from "@mui/material"; // Nhập Button và TextField từ MUI
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaGlassWhiskey } from "react-icons/fa";

interface AddComboProps {
    onAdd: (newCombo: ComboItem) => void; // Hàm callback để thêm combo
}

export const AddCombo: React.FC<AddComboProps> = ({ onAdd }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { menuItems } = useMenu();
    const [selectedItems, setSelectedItems] = useState<
        { id: number; quantity: number }[]
    >([]);

    const handleQuantityChange = (id: number, quantity: number) => {
        setSelectedItems((prev) => {
            const existingItem = prev.find((item) => item.id === id);
            if (existingItem) {
                if (quantity <= 0) {
                    return prev.filter((item) => item.id !== id);
                }
                return prev.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                );
            }
            return [...prev, { id, quantity }];
        });
    };

    const onSubmit = (data: any) => {
        const totalQuantity = selectedItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );
        if (totalQuantity < 2) {
            alert("Quantity ít nhất là 2 thì mới tính combo");
            return;
        }
        const newCombo: ComboItem = {
            name: data.comboName,
            items: selectedItems
                .map(({ id, quantity }) => {
                    const menuItem = menuItems.find((item) => item.id === id);
                    return menuItem ? { ...menuItem, quantity } : null;
                })
                .filter((item) => item !== null) as MenuItem[],
            price: data.comboPrice,
            image: data.comboImage,
        };
        onAdd(newCombo);
        setSelectedItems([]);
        reset(); // Reset form after submission
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 p-6 rounded-lg"
            >
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <FaGlassWhiskey className="mr-2" /> Combo Item
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="comboName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Combo Name
                        </label>
                        <TextField
                            id="comboName"
                            {...register("comboName", {
                                required: "Combo name is required",
                            })} // Đăng ký trường comboName
                            error={!!errors.comboName}
                            helperText={
                                typeof errors.comboName?.message === "string"
                                    ? errors.comboName.message
                                    : ""
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="comboPrice"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Combo Price
                        </label>
                        <TextField
                            type="number"
                            id="comboPrice"
                            {...register("comboPrice", {
                                required: "Combo price is required",
                                min: {
                                    value: 0,
                                    message: "Price must be positive",
                                },
                            })} // Đăng ký trường comboPrice
                            error={!!errors.comboPrice}
                            helperText={
                                typeof errors.comboPrice?.message === "string"
                                    ? errors.comboPrice.message
                                    : ""
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="comboImage"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Combo Image URL
                        </label>
                        <TextField
                            id="comboImage"
                            {...register("comboImage", {
                                required: "Image URL is required",
                            })} // Đăng ký trường comboImage
                            error={!!errors.comboImage}
                            helperText={
                                typeof errors.comboImage?.message === "string"
                                    ? errors.comboImage.message
                                    : ""
                            }
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="mt-2">
                        {menuItems.map((item) => {
                            const selectedItem = selectedItems.find(
                                (selected) => selected.id === item.id
                            );
                            const quantity = selectedItem
                                ? selectedItem.quantity
                                : 0;

                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between mb-2"
                                >
                                    <span>
                                        {item.name} - {item.price}
                                    </span>
                                    <div className="flex items-center">
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                if (item.id !== undefined) {
                                                    handleQuantityChange(
                                                        item.id,
                                                        (quantity || 0) - 1
                                                    );
                                                }
                                            }}
                                            disabled={quantity <= 0}
                                        >
                                            -
                                        </Button>
                                        <TextField
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => {
                                                if (item.id !== undefined) {
                                                    handleQuantityChange(
                                                        item.id,
                                                        Number(e.target.value)
                                                    );
                                                }
                                            }}
                                            className="mx-2 w-16"
                                            inputProps={{ min: 0 }}
                                        />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                if (item.id !== undefined) {
                                                    handleQuantityChange(
                                                        item.id,
                                                        quantity + 1
                                                    );
                                                }
                                            }}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="mt-2"
                    >
                        Add Combo
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};
