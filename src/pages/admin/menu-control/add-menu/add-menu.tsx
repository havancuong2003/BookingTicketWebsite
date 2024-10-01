import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Snackbar } from "@mui/material";
import { useMenu } from "../../../../contexts/MenuContext"; // Adjust the path as necessary

interface MenuItem {
    name: string;
    type: "FOOD" | "DRINK";
    price: number;
    image?: string;
}

export const AddMenu: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MenuItem>();
    const [message, setMessage] = React.useState<string>(""); // Adjusted the initial state
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const { addMenuItem } = useMenu();

    const onSubmit = async (data: MenuItem) => {
        try {
            const newItem = { ...data }; // Generate a unique ID
            addMenuItem(newItem);
            setMessage("Menu item added successfully!");
            setOpenSnackbar(true);
            reset();
        } catch (error) {
            console.error("Error adding menu item:", error);
            setMessage("Failed to add menu item.");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="mb-4 p-4 border rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Add Menu Item</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </div>
                <div>
                    <TextField
                        label="Type"
                        select
                        variant="outlined"
                        fullWidth
                        {...register("type", { required: "Type is required" })}
                        error={!!errors.type}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="">Select Type</option>
                        <option value="FOOD">Food</option>
                        <option value="DRINK">Drink</option>
                    </TextField>
                    {errors.type && (
                        <p className="text-red-500">{errors.type.message}</p>
                    )}
                </div>
                <div>
                    <TextField
                        label="Price"
                        type="number"
                        variant="outlined"
                        fullWidth
                        {...register("price", {
                            required: "Price is required",
                            min: {
                                value: 0,
                                message: "Price must be positive",
                            },
                        })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                </div>
                <div>
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        fullWidth
                        {...register("image")}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">
                    Add Menu Item
                </Button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={message}
            />
        </div>
    );
};
