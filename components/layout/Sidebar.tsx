"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Settings, ChevronRight, ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ENTITY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const entityGroups = {
  "Research & Innovation": [
    "research",
    "research-outputs",
  ],
  "Intellectual Property": [
    "invention-disclosure",
    "prior-art-search",
    "patent-utility",
    "design-right",
    "know-how",
    "license",
  ],
  "Assessments": [
    "tech-assessment",
    "market-assessment",
  ],
  "Support Services": [
    "consultation",
    "equipment",
    "events",
  ],
  "Funding": [
    "fund-type",
    "fund",
    "proposal",
  ],
  "Industry Collaboration": [
    "industry-challenge",
    "challenge-solution",
  ],
  "System": [
    "user",
    "entity",
  ],
};

const CollapsibleSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-2">
      <button
        className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-brand-blue/10 text-sm font-semibold text-brand-navy"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="py-1 pl-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const mobileSidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image src="/nctc-logo.png" alt="NCTC Logo" width={100} height={33} className="h-8 w-auto" />
          <div className="h-8 w-px bg-gray-300" />
          <div>
            <p className="font-bold text-brand-navy text-lg">OITMP</p>
            <p className="text-xs text-gray-500">Innovation Platform</p>
          </div>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "flex gap-2 items-center w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors",
                pathname === "/dashboard"
                  ? "bg-brand-blue text-white"
                  : "text-brand-navy hover:bg-brand-blue/10"
              )}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Entity Groups */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Entities
          </p>
          {Object.entries(entityGroups).map(([groupName, entities]) => (
            <CollapsibleSection key={groupName} title={groupName}>
              <ul className="space-y-0.5">
                {entities.map((entity) => (
                  <li key={entity}>
                    <Link
                      href={`/dashboard/${entity}`}
                      className={cn(
                        "flex items-center w-full py-1.5 px-4 rounded-lg text-sm transition-colors",
                        pathname === `/dashboard/${entity}`
                          ? "bg-brand-lightBlue text-white font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {ENTITY_LABELS[entity]}
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          ))}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/dashboard/settings"
          className="flex gap-2 items-center w-full py-2 px-4 rounded-lg text-sm font-medium text-brand-navy hover:bg-brand-blue/10 transition-colors"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
            />
            {/* Sidebar */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileSidebarVariants}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed inset-y-0 left-0 z-30 w-72">
        <SidebarContent />
      </div>
    </>
  );
}
