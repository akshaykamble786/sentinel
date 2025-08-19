import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { YoutubeIcon } from "lucide-react";
import Pill from "./ui/pill";

export default function Features() {
  const features = [
    {
      title: "Save, Manage & Autofill",
      description:
        "Store, organize, and autofill your credentials directly without leaving the browser.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border dark:border-white/[0.2] rounded-tl-sm",
    },
    {
      title: "AES Encryption",
      description:
        "Safeguard your data with industry-grade AES encryption for end-to-end protection.",
      skeleton: <SkeletonTwo />,
      className:
        "border col-span-1 lg:col-span-2 dark:border-white/[0.2] rounded-tr-sm",
    },
    {
      title: "JWT & Bcrypt Security",
      description:
        "Secure user sessions and protect passwords with JWT authentication and bcrypt hashing.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 border dark:border-white/[0.2]",
    },
    {
      title: "Browser Extension Integration",
      description:
        "Access and autofill passwords securely using Microsoft Edge Extension APIs.",
      skeleton: <SkeletonFour />,
      className:
        "col-span-1 lg:col-span-3 border dark:border-white/[0.2]",
    },
    {
      title: "Built-in Password Generator",
      description:
        "Generate strong, unique passwords instantly to keep your accounts secure.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border dark:border-white/[0.2] rounded-bl-sm",
    },
    {
      title: "Two-Factor Authentication Support",
      description:
        "Add an extra layer of security to your logins.",
      skeleton: <SkeletonTwo />,
      className:
        "border col-span-1 lg:col-span-2 dark:border-white/[0.2] rounded-br-sm",
    },
  ];
  
  return (
    <section
      id="features"
      className="w-full py-20 px-6 md:px-12 bg-card relative overflow-hidden border-t"
    >
      <Pill pill="Features" />
      <div className="relative z-20 py-6 lg:py-3 max-w-4xl mx-auto px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Your Credential Powerhouse
        </h4>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Protect, manage, and autofill your credentials with robust encryption,
          seamless browser integration, and advanced authentication
        </p>
      </div>
      <div className="relative z-20 max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-8 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ children, className }) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-4 px-2 h-auto">
    </div>
  );
};

export const SkeletonThree = () => {
  return (
      <div className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
        </div>
      </div>
  );
};

export const SkeletonTwo = () => {
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="relative h-auto w-full">
    </div>
  );
};
