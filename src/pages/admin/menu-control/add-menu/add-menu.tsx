import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaUtensils } from "react-icons/fa";
import { useMenu } from "../../../../contexts";
import { MenuItem } from "../../../../models";

export const AddMenu: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MenuItem>();

    const { addMenuItem } = useMenu();
    const onSubmit = async (data: MenuItem) => {
        try {
            const newItem = { ...data };
            await addMenuItem(newItem);

            reset(); // Reset form after successful submission
        } catch (error) {
            console.error("Error adding menu item:", error);
        }
    };

    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 p-6 rounded-lg"
            >
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <FaUtensils className="mr-2" /> Individual Item
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="individualName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Item Name
                        </label>
                        <input
                            type="text"
                            id="individualName"
                            {...register("name", {
                                required: "Name is required",
                            })} // Đăng ký trường name
                            className={`mt-1 block w-full rounded-md shadow-sm ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            aria-invalid={errors.name ? "true" : "false"}
                            aria-describedby={
                                errors.name ? "individualName-error" : undefined
                            }
                        />
                        {errors.name && (
                            <p
                                className="mt-2 text-sm text-red-600"
                                id="individualName-error"
                                role="alert"
                            >
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="individualPrice"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            id="individualPrice"
                            {...register("price", {
                                required: "Price is required",
                                min: {
                                    value: 0,
                                    message: "Price must be positive",
                                },
                            })} // Đăng ký trường price
                            step="0.01"
                            className={`mt-1 block w-full rounded-md shadow-sm ${
                                errors.price
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            aria-invalid={errors.price ? "true" : "false"}
                            aria-describedby={
                                errors.price
                                    ? "individualPrice-error"
                                    : undefined
                            }
                        />
                        {errors.price && (
                            <p
                                className="mt-2 text-sm text-red-600"
                                id="individualPrice-error"
                                role="alert"
                            >
                                {errors.price.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="individualImage"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="individualImage"
                            {...register("image")} // Đăng ký trường image
                            className={`mt-1 block w-full rounded-md shadow-sm ${
                                errors.image
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            aria-invalid={errors.image ? "true" : "false"}
                            aria-describedby={
                                errors.image
                                    ? "individualImage-error"
                                    : undefined
                            }
                        />
                        {errors.image && (
                            <p
                                className="mt-2 text-sm text-red-600"
                                id="individualImage-error"
                                role="alert"
                            >
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="individualType"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Type
                        </label>
                        <select
                            id="individualType"
                            {...register("type", {
                                required: "Type is required",
                            })} // Register the type field
                            className={`mt-1 block w-full rounded-md shadow-sm ${
                                errors.type
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50`}
                            aria-invalid={errors.type ? "true" : "false"}
                            aria-describedby={
                                errors.type ? "individualType-error" : undefined
                            }
                        >
                            <option value="">Select Type</option>
                            <option value="FOOD">Food</option>
                            <option value="DRINK">Drink</option>
                        </select>
                        {errors.type && (
                            <p
                                className="mt-2 text-sm text-red-600"
                                id="individualType-error"
                                role="alert"
                            >
                                {errors.type.message}
                            </p>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                    >
                        Add Individual Item
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};
