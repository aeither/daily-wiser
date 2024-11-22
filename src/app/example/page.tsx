"use client";

import { useReCaptcha } from "@/utils/captcha";

export default function FormComponent() {
  const { executeReCaptcha } = useReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = await executeReCaptcha("submit");
      // Send token to your backend for verification
      const response = await fetch("/api/captcha", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("🚀 ~ handleSubmit ~ response:", await response.json())
    } catch (error) {
      console.error("ReCAPTCHA error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}