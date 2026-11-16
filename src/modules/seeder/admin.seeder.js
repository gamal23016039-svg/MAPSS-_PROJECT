const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Staff = require("../models/staff.model");
require("dotenv").config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await Staff.findOne({
            role: "Admin"
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await Staff.create({
            firstName: process.env.ADMIN_FIRST_NAME,
            lastName: process.env.ADMIN_LAST_NAME,
            email: process.env.ADMIN_EMAIL,
            phone: process.env.ADMIN_PHONE,
            password: hashedPassword,
            role: "Admin"
        });

        console.log("Admin created successfully");

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
