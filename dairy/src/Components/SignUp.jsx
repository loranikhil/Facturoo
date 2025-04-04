import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:5000/send-otp", { email });
      alert("OTP sent to your email!");
      setOtpSent(true);
    } catch (error) {
      alert("Error sending OTP: " + error.response.data.error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      alert(response.data.message);
      setVerified(true);
    } catch (error) {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {!otpSent ? (
        <div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : !verified ? (
        <div>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      ) : (
        <h3>OTP Verified! You can now log in.</h3>
      )}
    </div>
  );
};

export default SignUp;
