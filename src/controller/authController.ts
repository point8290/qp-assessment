import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User/User";
import connection from "../config/typeorm";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const userRepository = connection.getRepository(User);

export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const db_User = await userRepository.findOne({ where: { email } });

    if (!db_User) {
      throw new Error("Incorrect email or password");
    }

    const isValidPassword = await compare(password, db_User.password);

    if (!isValidPassword) {
      throw new Error("Incorrect email or password");
    }

    const token = sign(
      {
        userId: db_User.id,
        role: db_User.role,
      },
      process.env.JWT_SECRET_KEY || "",
      { expiresIn: "1hr" }
    );

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
export const signup = async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { firstName, lastName, email, role, phone, password } = request.body;

    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("User with email already exist");
    }

    const hashedPassword = await hash(password, 10);

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      role,
      phone,
      password: hashedPassword,
    });

    await userRepository.save(user);

    response.status(201).send({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};
