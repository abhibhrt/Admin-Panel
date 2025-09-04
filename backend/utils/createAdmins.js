import prisma from "./prismaClient.js";
import bcrypt from "bcryptjs";

const admin = {
  name: "Hameem Khan",
  role: "superadmin",
  email: "adjack720@gmail.com", // khanhameem77@gmail.com
  password: "admin@123"
};

export default async function createAdmins() {
  try {
    const adminExisting = await prisma.admin.findUnique({
      where: { email: admin.email }
    });

    if (!adminExisting) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      const insertIntoDB = await prisma.admin.create({
        data: { ...admin, password: hashedPassword }
      });
      console.log("Admin Created:", insertIntoDB.email);
    } else {
      console.log(`Welcome Back: ${adminExisting.name}`);
    } 
  } catch (err) {
    console.error(" Error creating admin:", err);
  }
}
