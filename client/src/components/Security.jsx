import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  Database,
  EyeOff,
  GlobeLock,
  Lock,
  ShieldCheck,
} from "lucide-react";
import Pill from "./ui/pill";

export default function Security() {
  return (
    <>
      <section
        id="security"
        className="w-full py-20 px-6 md:px-12 bg-background relative overflow-hidden"
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

const SkeletonOne = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] flex-col space-y-2">
      <div className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </div>
      <div className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white">
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </div>
      <div className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </div>
    </div>
  );
};
const SkeletonTwo = () => {
  const arr = new Array(6).fill();
  return (
    <div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <div
          key={"skelenton-two" + i}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></div>
      ))}
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="h-full w-full rounded-lg"></div>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <div
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Just code in Vanilla Javascript
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Delusional
        </p>
      </div>
      <div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <img
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Tailwind CSS is cool, you know
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Sensible
        </p>
      </div>
      <div
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <img
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          I love angular, RSC, and Redux.
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Helpless
        </p>
      </div>
    </div>
  );
};

const SkeletonFive = () => {
  return (
    <div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <div
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <img
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </div>
      <div
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Use PHP.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </div>
    </div>
  );
};

const items = [
  {
    title: "End-to-End AES Encryption",
    description: (
      <span className="text-sm">
        Protects your stored credentials with bank-grade encryption from device
        to cloud.
      </span>
    ),
    header: <SkeletonOne />,
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
    header: <SkeletonTwo />,
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
    header: <SkeletonThree />,
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
    header: <SkeletonFour />,
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
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <Database className="h-4 w-4 text-neutral-500" />,
  },
];