import React, { useEffect, useState } from "react";
import {
    FaUser,
    FaPhone,
    FaMapMarkerAlt,
    FaEnvelope,
    FaLock,
    FaStar,
    FaTicketAlt,
} from "react-icons/fa";
import { getUserInfo } from "../../../services";
import { add } from "ramda";

type UserType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string;
    picture: string;
};
export const Setting = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editField, setEditField] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
        phoneNumber: "",
        picture: "",
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = (await getUserInfo()) as UserType; // Call getUserInfo instead
                setUser(userInfo);
                setFormData(userInfo);
            } catch (err) {
                setError("Không thể lấy thông tin người dùng.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    const handleEdit = (field: string) => {
        setEditField(field);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        console.log("Updated user info:", formData);
        setEditField(null);
    };

    if (loading) return <p>Đang tải thông tin...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
                <div className="md:flex">
                    <div
                        className="md:w-1/3 bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80')",
                        }}
                    >
                        <div className="h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-50 p-4">
                            <h2 className="text-4xl font-bold mb-2">
                                Xin chào,{" "}
                                {formData.firstName + " " + formData.lastName}
                            </h2>
                            <p className="text-xl">Thành viên từ 2021</p>
                        </div>
                    </div>
                    <div className="p-8 md:w-2/3">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Cài Đặt Tài Khoản
                        </h2>
                        <div className="space-y-6">
                            {/* Name */}
                            <SettingField
                                icon={<FaUser />}
                                label="Tên"
                                value={
                                    formData.firstName + " " + formData.lastName
                                }
                                editField={editField}
                                field="name"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                handleSave={handleSave}
                            />
                            {/* Phone */}
                            <SettingField
                                icon={<FaPhone />}
                                label="Số điện thoại"
                                value={formData.phoneNumber}
                                editField={editField}
                                field="phone"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                handleSave={handleSave}
                            />
                            {/* Address */}
                            {/* <SettingField
                                icon={<FaMapMarkerAlt />}
                                label="Địa chỉ"
                                value={formData.address}
                                editField={editField}
                                field="address"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                handleSave={handleSave}
                            /> */}
                            {/* Email */}
                            <SettingField
                                icon={<FaEnvelope />}
                                label="Email"
                                value={formData.email}
                                editField={editField}
                                field="email"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                handleSave={handleSave}
                            />
                            {/* Password */}
                            <SettingField
                                icon={<FaLock />}
                                label="Mật khẩu"
                                value="******"
                                editField={editField}
                                field="password"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                handleSave={handleSave}
                                isPassword={true}
                            />
                            {/* Loyalty Points & Vouchers */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-400 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Điểm tích lũy: 1500
                                    </span>
                                </div>
                                <div>
                                    <FaTicketAlt className="text-indigo-600 mr-2 inline" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Voucher có sẵn: 3
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Component nhỏ hơn để tái sử dụng các field
const SettingField = ({
    icon,
    label,
    value,
    editField,
    field,
    handleChange,
    handleEdit,
    handleSave,
    isPassword = false,
}: any) => {
    return (
        <div className="mb-4">
            {/* Row for icon and field name */}
            <div className="flex items-center mb-1">
                <span className="mr-2">{icon}</span>
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            </div>

            {/* Row for value and edit button */}
            {editField === field ? (
                <div className="flex items-center justify-between">
                    <input
                        type={isPassword ? "password" : "text"}
                        name={field}
                        value={value}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button onClick={handleSave} className="ml-2 text-blue-500">
                        Lưu
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <span className="mt-1 block">{value}</span>
                    <button
                        onClick={() => handleEdit(field)}
                        className="ml-2 text-blue-500"
                    >
                        Sửa
                    </button>
                </div>
            )}
        </div>
    );
};
