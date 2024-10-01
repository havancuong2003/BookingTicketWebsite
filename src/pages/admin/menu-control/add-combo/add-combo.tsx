import React, { useState } from "react";
import { useMenu } from "../../../../contexts"; // Nhập useMenu để lấy menu items
import { ComboItem, MenuItem } from "../../../../models"; // Nhập ComboItem từ models
import { Button, TextField } from "@mui/material"; // Nhập Button và TextField từ MUI
import { useForm } from "react-hook-form";

interface AddComboProps {
    onAdd: (newCombo: ComboItem) => void; // Hàm callback để thêm combo
}

export const AddCombo: React.FC<AddComboProps> = ({ onAdd }) => {
    const { register, handleSubmit, setValue } = useForm();
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
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <h2 className="text-xl font-bold">Add Combo</h2>
            <TextField
                label="Combo Name"
                {...register("comboName", { required: true })}
                className="mb-2"
            />
            <TextField
                type="number"
                label="Combo Price"
                {...register("comboPrice", { required: true })}
                className="mb-2 ml-2"
            />
            <TextField
                label="Combo Image URL"
                {...register("comboImage", { required: true })}
                className="mb-2"
            />
            <div className="mt-2">
                {menuItems.map((item) => {
                    const selectedItem = selectedItems.find(
                        (selected) => selected.id === item.id
                    );
                    const quantity = selectedItem ? selectedItem.quantity : 0;

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
    );
};
