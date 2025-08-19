import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { motion } from "motion/react"
 import {
  Database,
  EyeOff,
  GlobeLock,
  Lock,
  LockIcon,
  ShieldCheck,
  ShieldCheckIcon,
} from "lucide-react";
import Pill from "./ui/pill";
import { BrowserSecurity, EndToEndEncryption, LocalFirstEncryption, PasswordHashing, ZeroKnowledgeArchitecture} from "./ui/visual-wrapper";

export default function Security() {
  return (
    <>
      <section
        id="security"
        className="w-full py-20 px-6 md:px-12 bg-background relative overflow-hidden border-t"
      >
        <Pill pill="Security" />
        <div className="relative z-20 py-6 lg:py-3 max-w-4xl mx-auto px-8">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Effortless, Ironclad Security
          </h4>
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            Advanced encryption, zero-knowledge storage, and modern
            authentication keep your data safe at all times
          </p>
        </div>
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem] rounded-xl">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </section>
    </>
  );
}

const items = [
  {
    title: "End-to-End AES Encryption",
    description: (
      <span className="text-sm">
        Protects your stored credentials with bank-grade encryption from device
        to cloud.
      </span>
    ),
    header: <EndToEndEncryption />,
    className: "md:col-span-1",
    icon: <Lock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Zero-Knowledge Architecture",
    description: (
      <span className="text-sm">
        Only you can access your passwords — we can’t see or retrieve them.
      </span>
    ),
    header: <ZeroKnowledgeArchitecture />,
    className: "md:col-span-1",
    icon: <EyeOff className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "JWT & Bcrypt Protection",
    description: (
      <span className="text-sm">
        Modern authentication and hashing ensure sessions and credentials stay
        secure.
      </span>
    ),
    header: <PasswordHashing />,
    className: "md:col-span-1",
    icon: <ShieldCheck className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Browser API Security",
    description: (
      <span className="text-sm">
        Uses Microsoft Edge Extension APIs for secure autofill and credential
        storage.
      </span>
    ),
    header: <BrowserSecurity />,
    className: "md:col-span-2",
    icon: <GlobeLock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Local-First Encryption",
    description: (
      <span className="text-sm">
        Encrypts credentials before they leave your device for maximum safety.
      </span>
    ),
    header: <LocalFirstEncryption />,
    className: "md:col-span-1",
    icon: <Database className="h-4 w-4 text-neutral-500" />,
  },
];