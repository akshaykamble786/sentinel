import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Pill from "./ui/pill";

const Faq = () => {
  return (
    <section
      id="faqs"
      className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden border-t"
    >
      <Pill pill="FAQ" />
      {/* Background grid */}
      <div className="relative z-20 py-6 lg:py-3 max-w-4xl mx-auto px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Answers You’re Looking For
        </h4>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Get quick, clear answers to the most common questions about our
          platform
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-16 mt-4 relative z-10">
        <Accordion
          type="single"
          collapsible
          className="w-full text-lg"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold">
              How secure is my data?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <p>
                We use industry-standard AES-256 encryption with a
                zero-knowledge architecture, meaning your passwords are
                encrypted before they leave your device, and even we can’t
                access them.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-bold">
              What happens if I forget my master password?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <p>
                For security reasons, we cannot recover your master password.
                You can reset your account, but all previously stored
                credentials will be lost to maintain zero-knowledge protection.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-bold">
              Does the browser extension store my passwords locally or in the
              cloud?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <p>
                Your passwords are encrypted locally on your device before being
                securely synced to the cloud, ensuring they remain safe and
                accessible across devices.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="font-bold">
              Can I use the password manager on multiple devices?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <p>
                Yes. Your encrypted credentials sync seamlessly across all your
                devices using secure authentication and encryption protocols.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="font-bold">
              How is this different from my browser’s built-in password manager?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <p>
                Unlike most browser password managers, we offer advanced
                encryption, zero-knowledge architecture, strong password
                generation, and cross-platform access while giving you full
                control over your data.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
