export async function POST(req: Request) {
  const { token } = await req.json();

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    { method: "POST" }
  );

  const data = await response.json();

  if (data.success && data.score > 0.5) {
    // Process form submission
    return Response.json({ success: true });
  }

  return Response.json({
    success: false,
    error: "ReCAPTCHA verification failed",
  });
}