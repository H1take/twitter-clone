import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// import mailer from "../core/mailer";
import { UserModel, UserModelInterface, UserModelDocumentInterface } from "../models/UserModel";
import { isValidObjectId } from "../utils/isValidObjectId";
import { generateMD5 } from "../utils/generateHash";
import { sendEmail } from "../utils/sendEmail";

class UserController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec();

      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async show(req: any, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findById(userId).exec();

      if (!user) {
        res.status(404).send();
        return;
      }

      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { email, fullname, username, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", errors: errors.array() });
        return;
      }

      const data: UserModelInterface = {
        email: email,
        fullname: fullname,
        username: username,
        password: generateMD5(password + process.env.SECRET_KEY),
        confirmHash: generateMD5(
          process.env.SECRET_KEY || Math.random().toString()
        ),
      };

      const user = await UserModel.create(data);

      res.json({
        status: "success",
        data: user,
      });

      sendEmail(
        {
          emailFrom: "admin@twitter.com",
          emailTo: data.email,
          subject: "Подтверждение почты Twitter Clone Tutorial",
          html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/auth/verify/${data.confirmHash}">по этой ссылке</a>`,
        },
        (err: Error | null) => {
          if (err) {
            res.status(500).json({
              status: "error",
              message: err,
            });
          } else {
            res.status(201).json({
              status: "success",
              data: user,
            });
          }
        }
      );
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;

      if (!hash) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findOne({ confirmHash: hash }).exec();

      if (user) {
        user.confirmed = true;
        await user.save();

        res.json({
          status: "success",
          data: {
            ...user.toJSON(),
            token: jwt.sign(
              { data: user.toJSON() },
              process.env.SECRET_KEY || "123",
              {
                expiresIn: "30 days",
              }
            ),
          },
        });
      } else {
        res
          .status(404)
          .json({ status: "error", message: "Пользователь не найден" });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {

      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;

      res.json({
        status: "success",
        data: {
          ...user,
          token: jwt.sign({ data: req.user}, process.env.SECRET_KEY || "123", {
            expiresIn: "30d"
          })
        }
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
    try {

      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;

      res.json({
        status: "success",
        data: {
          ...user
        }
      })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

export const UserCtrl = new UserController();
