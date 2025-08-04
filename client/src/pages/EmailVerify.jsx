import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

const EmailVerify = () => {
  const { backendUrl, isLoggedIn, userData, getUserData, setIsLoggedIn } =
    React.useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || localStorage.getItem("verifyEmail") || "");

  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (email) {
      localStorage.setItem("verifyEmail", email);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }
    if (!email) {
      toast.error("Email not found. Please try registering again.");
      navigate("/sign-up");
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/auth/verify-account",
        { otp, email },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Email verified successfully");
        setIsLoggedIn(true);
        getUserData();
        localStorage.removeItem("verifyEmail");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email not found. Please try registering again.");
      navigate("/sign-up");
      return;
    }
    
    setIsResending(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/auth/send-verify-otp",
        { email },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("OTP resent successfully");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      localStorage.removeItem("verifyEmail");
      navigate("/dashboard");
    }
    // if (!email) {
    //   navigate("/sign-up");
    // }
  }, [isLoggedIn, userData, email, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      <p className="mb-4">Enter the 6-digit code sent to {email}</p>
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
      <div className="flex flex-col gap-2 mt-4">
        <Button type="submit">Verify Email</Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleResendOTP}
          disabled={isResending}
        >
          {isResending ? "Sending..." : "Resend OTP"}
        </Button>
      </div>
    </form>
  );
};

export default EmailVerify;
