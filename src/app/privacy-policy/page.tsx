
const PrivacyPolicy = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Privacy Policy for Daily Wiser
      </h1>
      <p className="mb-4">Last updated: {currentDate}</p>

      <p className="mb-4">
        At Daily Wiser, we are committed to protecting your privacy and ensuring
        the security of your information. This Privacy Policy explains how we
        handle your data when you use our gamified micro-learning platform.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        Daily Wiser collects certain information from you when you use our
        platform. This may include:
        <ul className="mb-4 list-inside list-disc">
          <li>Username and password for account creation</li>
          <li>Progress and achievements within the platform</li>
          <li>
            Any information you choose to share with us through our support
            channels
          </li>
        </ul>
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">
        We use the information we collect to provide and improve our services,
        including:
        <ul className="mb-4 list-inside list-disc">
          <li>Personalizing your learning experience</li>
          <li>Tracking your progress and achievements</li>
          <li>Providing customer support</li>
        </ul>
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">3. Data Security</h2>
      <p className="mb-4">
        We take data security seriously. We use industry-standard encryption
        protocols to protect your data during transmission and storage.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        4. Third-Party Services
      </h2>
      <p className="mb-4">
        Daily Wiser may use third-party services to provide certain features and
        functionality. These services may have their own data collection and
        privacy practices. We encourage you to review their privacy policies to
        understand how they handle your information.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        5. Children&apos;s Privacy
      </h2>
      <p className="mb-4">
        Daily Wiser does not knowingly collect or store any personal information
        from children under the age of 13. If you are under 13, please use our
        service only with the involvement of a parent or guardian.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        6. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page and
        updating the &ldquo;Last updated&rdquo; date at the top of this Privacy
        Policy.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">7. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at:
      </p>
      <p className="mb-4">
        Daily Wiser
        <br />
        https://www.dailywiser.xyz
      </p>

      <p className="mt-8 text-sm text-gray-600">
        By using Daily Wiser, you agree to the practices described in this
        Privacy Policy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
