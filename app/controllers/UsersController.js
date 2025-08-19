import UsersModel from "../models/UsersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";
import sendEmail from "../utility/emailUtility.js";

export const Registration = async (req, res) => {
  try {
    let reqBody = req.body;
    await UsersModel.create(reqBody);
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(404).json({ status: "failed", message: err.toString() });
  }
};

export const Login = async (req, res) => {
  try {
    let reqBody = req.body;

    //Check email and pass exist in reqBody
    if (!reqBody.email || !reqBody.password) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email and password are required" });
    }

    //Find User
    let data = await UsersModel.findOne({ email: reqBody.email });
    if (data == null) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    //Match password
    if (data.password !== reqBody.password) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid password" });
    }

    //Generate token
    let token = TokenEncode(data["email"], data["id"]);
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: { token: token },
    });
  } catch (err) {
    return res.status(404).json({ status: "failed", message: err.toString() });
  }
};

export const ProfileDetails = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let data = await UsersModel.findOne({ _id: user_id });
    return res.json({
      status: "success",
      message: "Profile details fetched successfully",
      data: data,
    });
  } catch (err) {
    return res.status(404).json({ status: "failed", message: err.toString() });
  }
};

export const ProfileUpdate = async (req, res) => {
  try {
    let reqBody = req.body;
    let user_id = req.headers.user_id;
    await UsersModel.updateOne({ _id: user_id }, reqBody);
    return res.json({
      status: "success",
      message: "Profile updated successfully",
    });
  } catch (err) {
    return res.json({ status: "failed", message: err.toString() });
  }
};

export const EmailVerify = async (req, res) => {
  try {
    let email = req.params.email;
    let data = await UsersModel.findOne({ email: email });
    if (data == null) {
      return res
        .status(404)
        .json({ status: "failed", message: "This email doesn't exist" });
    } else {
      let code = Math.floor(100000 + Math.random() * 900000);
      let EmailTo = data.email;
      let EmailSubject = "Task Manager - Verification Code";
      let EmailText = `Your verification code is ${code}. Please use this code to verify your email address.`;
      await sendEmail(EmailTo, EmailSubject, EmailText);

      //Update OTP in the database
      await UsersModel.updateOne({ email: email }, { otp: code });
      return res.json({
        status: "success",
        message: "Verification code sent to your email.",
      });
    }
  } catch (err) {
    return res.json({ status: "failed", message: err.toString() });
  }
};

export const OTPVerify = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await UsersModel.findOne({
      email: reqBody.email,
      otp: reqBody.otp,
    });
    if (data == null) {
      return res.status(404).json({ status: "failed", message: "Invalid OTP" });
    } else {
      return res.json({
        status: "success",
        message: "OTP verified successfully",
      });
    }
  } catch (err) {
    return res.json({ status: "failed", message: err.toString() });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await UsersModel.findOne({
      email: reqBody.email,
      otp: reqBody.otp,
    });
    if (data == null) {
      return res.status(404).json({ status: "failed", message: "Invalid OTP" });
    } else {
      await UsersModel.updateOne(
        { email: reqBody.email },
        { otp: 0, password: reqBody.password }
      );
      return res.json({
        status: "success",
        message: "Password reset successfully",
      });
    }
  } catch (err) {
    return res.json({ status: "failed", message: err.toString() });
  }
};
