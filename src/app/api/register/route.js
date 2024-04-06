import { User } from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;

  // Перевірка довжини пароля
  if (!pass || pass.length < 5) {
    throw new Error("password must be at least 5 characters");
  }

  // Хешування пароля
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  try {
    // Створення користувача
    const createdUser = await User.create(body);
    return Response.json(createdUser);
  } catch (error) {
    // Обробка помилок під час створення користувача
    throw new Error("Error!");
  }
}
