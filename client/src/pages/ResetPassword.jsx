import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const { backendUrl } = useContext(AppContext);

  axios.defaults.withCredentials = true;

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "/auth/send-reset-otp", {
        email,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      setOtp(otp);
      setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitNewPassword = async (e) =>{
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/auth/reset-password', {email, otp, newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
          <p className="mb-4">Enter your email to reset your password</p>
          <Input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Reset Password
          </Button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Reset Password OTP</h1>
          <p className="mb-4">Enter the 6-digit code sent to your email id</p>
          <InputOTP maxLength={6} required value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} required />
              <InputOTPSlot index={1} required />
              <InputOTPSlot index={2} required />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} required />
              <InputOTPSlot index={4} required />
              <InputOTPSlot index={5} required />
            </InputOTPGroup>
          </InputOTP>
          <Button type="submit">Submit</Button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">New Password</h1>
          <p className="mb-4">Enter your new password</p>
          <Input
            type="password"
            placeholder="New Password"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
