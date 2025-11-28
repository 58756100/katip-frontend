"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="w-full py-16 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900">FAQs</h2>
        <p className="text-gray-500 mt-2 text-base">
          Everything you need to know about Ka-Tip.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          
          {/* Left Column */}
          <Accordion type="single" collapsible className="space-y-2">
            
            <AccordionItem value="q1">
              <AccordionTrigger className="text-left text-[15px] font-medium">
                How does tipping work with QR codes?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                Scan the worker’s QR → we resolve an alias → you see the name + fee → 
                you pay securely using your chosen payment rail.<br /><br />
                Your contact info is never shared. The worker only sees the tip amount and
                your chosen alias (if you set one). Receipts show the worker’s alias only.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2">
              <AccordionTrigger className="text-left text-[15px] font-medium">
                Do you share my phone number or email?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                No. Ka-Tip is designed to protect both workers and guests.<br /><br />
                • Guests: Workers never see your phone, email, or payment details.<br />
                • Workers: Guests see only your alias — not your contact information.<br /><br />
                Only required compliance data is shared with our payment processor (PSP)
                for anti-fraud and KYC/AML checks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3">
              <AccordionTrigger className="text-left text-[15px] font-medium">
                When do workers receive their money?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                Payout speed depends on the payment rail and our PSP.<br /><br />
                Typical timing:<br />
                • M-Pesa: near instant or within minutes<br />
                • Card rails (Visa/Mastercard): same-day or next-day<br />
                • Bank transfers: 1–2 business days (varies by bank)<br /><br />
                Workers always see an estimated payout time before confirming a withdrawal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q4">
              <AccordionTrigger className="text-left text-[15px] font-medium">
                What fees apply?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                Fees depend on the payment method selected by the guest and the payout
                method selected by the worker.<br /><br />
                • Guests: Fees are shown transparently before paying.<br />
                • Workers: Payout fees vary by rail (e.g., M-Pesa cash-out fees).<br /><br />
                Ka-Tip does not markup third-party rails — all rates follow official PSP pricing.
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* Right Column */}
          <Accordion type="single" collapsible className="space-y-2">

            <AccordionItem value="q5">
              <AccordionTrigger className="text-left text-[15px] font-medium">
                Can venues track tips without guest data?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                Yes. Venues see only aggregated totals by worker or shift.<br /><br />
                No guest names, emails, or phone numbers are shown.  
                This protects guest privacy while still giving venues accurate tip reporting.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q6">
              <AccordionTrigger className="text-left text-[15px] font-medium">
                Which payment rails are supported?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                Supported rails vary by country.<br /><br />
                In Kenya (EAT region), the following are available:<br />
                • M-Pesa<br />
                • Visa<br />
                • Mastercard<br />
                • Bank transfers<br /><br />
                Additional rails are added as partners onboard through our payment PSP.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q7">
              <AccordionTrigger className="text-left text-[15px] font-medium">
                Can I set a monthly tipping budget?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                Yes. Guests can set a monthly cap inside the app.<br /><br />
                Once the budget is reached, you’re notified and asked to confirm before
                sending additional tips — giving you full control over your spending.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q8">
              <AccordionTrigger className="text-left text-[15px] font-medium">
                How do refunds or disputes work?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600 leading-relaxed">
                Since tips are voluntary payments, refunds are rare but still possible.<br /><br />
                • Accidental double payment? We can reverse before funds are withdrawn.<br />
                • Fraud or unauthorized activity? Our PSP handles investigations.<br /><br />
                Workers cannot issue refunds directly — all requests are handled by Ka-Tip
                support to prevent misuse and maintain safety.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

      </div>
    </section>
  );
}
