import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import React, { useContext, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl, isLoggedIn, userData } = useContext(AppContext);

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/auth/send-reset-otp", {
        email,
      });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigate("/dashboard")
    }
  }, [isLoggedIn, userData])

  return (
    <div>
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
        >
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
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>
        </form>
      )}

      {isEmailSent && (
        <form
          onSubmit={onSubmitReset}
          className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
          <p className="mb-4">Enter the 6-digit OTP sent to your email and your new password</p>
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
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;