import { motion } from "framer-motion";

export default function TermsOfService() {
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
            Terms of Service
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
              Welcome to Urbania Cabs Bangalore. By accessing or using our cab
              booking services, you agree to comply with and be bound by these
              Terms of Service. Please read them carefully before using our
              services.
            </p>
          </section>

          {/* SERVICES */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              2. Services Provided
            </h2>
            <p>
              We provide cab services including airport transfers, outstation
              travel, city tours, and pilgrimage packages. All bookings are
              subject to availability and confirmation.
            </p>
          </section>

          {/* BOOKINGS */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              3. Booking & Payments
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Bookings must be made through our website or phone.</li>
              <li>Advance payment may be required for confirmation.</li>
              <li>Prices are transparent and shared before booking.</li>
              <li>No hidden charges unless additional services are requested.</li>
            </ul>
          </section>

          {/* CANCELLATION */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              4. Cancellation & Refunds
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cancellations must be made at least 24 hours in advance.</li>
              <li>Late cancellations may incur charges.</li>
              <li>Refunds will be processed within 5–7 business days.</li>
            </ul>
          </section>

          {/* USER RESPONSIBILITY */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              5. User Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate pickup and drop details.</li>
              <li>Maintain proper behavior with drivers.</li>
              <li>Follow local laws and travel regulations.</li>
            </ul>
          </section>

          {/* LIABILITY */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              We are not responsible for delays caused by traffic, weather, or
              unforeseen circumstances. However, we strive to provide timely and
              reliable services at all times.
            </p>
          </section>

          {/* PRIVACY */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              7. Privacy Policy
            </h2>
            <p>
              Your personal data is handled securely. Please refer to our Privacy
              Policy for detailed information on how we collect and use your
              data.
            </p>
          </section>

          {/* CHANGES */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              8. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these Terms at any time. Continued
              use of our services indicates your acceptance of the updated terms.
            </p>
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              9. Contact Us
            </h2>
            <p>
              If you have any questions regarding these Terms, please contact us
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