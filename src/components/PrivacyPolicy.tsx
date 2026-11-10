import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-background py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">

          {/* INTRO */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              1. Introduction
            </h2>
            <p>
              Urbania Cabs Bangalore values your privacy. This Privacy Policy
              explains how we collect, use, and protect your personal
              information when you use our services.
            </p>
          </section>

          {/* DATA COLLECTION */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Name, phone number, and email address</li>
              <li>Pickup and drop locations</li>
              <li>Payment and transaction details</li>
              <li>Device and usage data (for analytics)</li>
            </ul>
          </section>

          {/* DATA USAGE */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and manage bookings</li>
              <li>To provide customer support</li>
              <li>To improve our services and user experience</li>
              <li>To send booking confirmations and updates</li>
            </ul>
          </section>

          {/* SHARING */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              4. Information Sharing
            </h2>
            <p>
              We do not sell your personal data. Your information may be shared
              with drivers or service partners only for the purpose of fulfilling
              your booking.
            </p>
          </section>

          {/* COOKIES */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              5. Cookies & Tracking
            </h2>
            <p>
              We may use cookies and similar technologies to enhance your
              browsing experience and analyze website traffic.
            </p>
          </section>

          {/* DATA SECURITY */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              6. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              personal data from unauthorized access, misuse, or disclosure.
            </p>
          </section>

          {/* USER RIGHTS */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              7. Your Rights
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You can request access to your personal data</li>
              <li>You can request correction or deletion of your data</li>
              <li>You can opt out of marketing communications</li>
            </ul>
          </section>

          {/* THIRD PARTY */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              8. Third-Party Services
            </h2>
            <p>
              Our website may use third-party tools (such as analytics or payment
              gateways). These services have their own privacy policies.
            </p>
          </section>

          {/* POLICY CHANGES */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, contact us
              at:
            </p>
            <p className="mt-2">
              📞 Phone: +91 96323 45415 <br />
              📧 Email: skycabsbangalore@gmail.com
            </p>
          </section>

        </div>
      </div>
    </section>
  );
}