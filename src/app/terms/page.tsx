
const TermsAndConditions = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        Terms and Conditions for Daily Wiser
      </h1>
      <p className="mb-4">Last updated: {currentDate}</p>
      <p className="mb-4">
        Please read these Terms and Conditions (&ldquo;Terms&rdquo;,
        &ldquo;Terms and Conditions&rdquo;) carefully before using the
        Daily Wiser mobile application (the &ldquo;Service&rdquo;) operated by
        Daily Wiser (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or
        &ldquo;our&rdquo;).
      </p>
      <p className="mb-4">
        Your access to and use of the Service is conditioned on your acceptance
        of and compliance with these Terms. These Terms apply to all visitors,
        users and others who access or use the Service.
      </p>
      <p className="mb-4">
        By accessing or using the Service you agree to be bound by these Terms.
        If you disagree with any part of the terms then you may not access the
        Service.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        1. Use of the Service
      </h2>
      <p className="mb-4">
        Daily Wiser is an app designed to provide gamified micro-learning with AI
        personalization and blockchain integration. By using our Service, you
        agree to:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>Provide accurate and complete information when using the app</li>
        <li>
          Use the Service only for lawful purposes and in accordance with these
          Terms
        </li>
        <li>
          Not use the Service in any way that could damage, disable, overburden,
          or impair the Service
        </li>
      </ul>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">2. User Content</h2>
      <p className="mb-4">
        Our Service allows you to post, link, store, share and otherwise make
        available certain information, text, or images (&ldquo;Content&rdquo;).
        You are responsible for the Content that you post to the Service,
        including its legality, reliability, and appropriateness.
      </p>
      <p className="mb-4">
        By posting Content to the Service, you grant us the right and license to
        use, modify, publicly perform, publicly display, reproduce, and
        distribute such Content on and through the Service. You retain any and
        all of your rights to any Content you submit, post or display on or
        through the Service and you are responsible for protecting those rights.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        3. Intellectual Property
      </h2>
      <p className="mb-4">
        The Service and its original content (excluding Content provided by
        users), features and functionality are and will remain the exclusive
        property of Daily Wiser and its licensors. The Service is
        protected by copyright, trademark, and other laws of both the United
        States and foreign countries. Our trademarks and trade dress may not
        be used in connection with any product or service without the prior
        written consent of Daily Wiser.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">
        4. Links To Other Web Sites
      </h2>
      <p className="mb-4">
        Our Service may contain links to third-party web sites or services that
        are not owned or controlled by Daily Wiser.
      </p>
      <p className="mb-4">
        Daily Wiser has no control over, and assumes no responsibility
        for, the content, privacy policies, or practices of any third party web
        sites or services. You further acknowledge and agree that Daily Wiser
        shall not be responsible or liable, directly or indirectly, for
        any damage or loss caused or alleged to be caused by or in connection
        with use of or reliance on any such content, goods or services available
        on or through any such web sites or services.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">5. Termination</h2>
      <p className="mb-4">
        We may terminate or suspend access to our Service immediately, without
        prior notice or liability, for any reason whatsoever, including without
        limitation if you breach the Terms.
      </p>
      <p className="mb-4">
        All provisions of the Terms which by their nature should survive
        termination shall survive termination, including, without limitation,
        ownership provisions, warranty disclaimers, indemnity and limitations of
        liability.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">6. Disclaimer</h2>
      <p className="mb-4">
        Your use of the Service is at your sole risk. The Service is provided on
        an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. The Service
        is provided without warranties of any kind, whether express or implied,
        including, but not limited to, implied warranties of merchantability,
        fitness for a particular purpose, non-infringement or course of
        performance.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">7. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed and construed in accordance with the laws
        of the United States, without regard to its conflict of law provisions.
      </p>
      <p className="mb-4">
        Our failure to enforce any right or provision of these Terms will not be
        considered a waiver of those rights. If any provision of these Terms is
        held to be invalid or unenforceable by a court, the remaining provisions
        of these Terms will remain in effect.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">8. Changes</h2>
      <p className="mb-4">
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material we will try to provide at
        least 30 days&apos; notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole discretion.
      </p>
      <p className="mb-4">
        By continuing to access or use our Service after those revisions become
        effective, you agree to be bound by the revised terms. If you do not
        agree to the new terms, please stop using the Service.
      </p>
    </div>
  );
};

export default TermsAndConditions;
