"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight, Lightbulb, Box, Lock, Search, Settings, Sparkles, FileText, TrendingUp, Users } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "OITMP transformed our technology transfer office. The automated workflow from invention disclosure to patent filing reduced our processing time by 60%.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    name: "Dr. Sarah Chen",
    role: "Director, Office of Technology Commercialization",
  },
  {
    text: "Managing our IP portfolio has never been easier. We can track every patent application, licensing agreement, and commercialization milestone in real-time.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    name: "Ahmed Hassan",
    role: "Technology Licensing Manager",
  },
  {
    text: "The industry collaboration features helped us connect with the right partners. We've signed 3 major licensing deals this quarter alone.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    name: "Maria Rodriguez",
    role: "Business Development Officer",
  },
  {
    text: "Prior art searches and patent analytics are now centralized. Our researchers can see the IP landscape before they even file a disclosure.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    name: "Dr. James Wilson",
    role: "IP Strategy Advisor",
  },
  {
    text: "From disclosure intake to market assessment, OITMP guides our team through each stage. New staff members are productive within days.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
    name: "Fatima Al-Rashid",
    role: "Technology Transfer Associate",
  },
  {
    text: "The technology assessment tools help us make data-driven decisions on which innovations to commercialize. Our ROI has significantly improved.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    name: "Dr. Michael Park",
    role: "Commercialization Director",
  },
  {
    text: "Managing know-how, design rights, and patents across multiple jurisdictions used to be a nightmare. OITMP makes it seamless.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    name: "Elena Popov",
    role: "IP Portfolio Manager",
  },
  {
    text: "The analytics dashboard gives leadership clear visibility into our technology transfer pipeline and performance metrics.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    name: "David Thompson",
    role: "Associate Vice President for Innovation",
  },
  {
    text: "Industry challenge matching has opened new revenue streams. Companies post challenges and our researchers propose solutions—all within OITMP.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    name: "Sophia Martinez",
    role: "Industry Partnership Coordinator",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/nctc-logo.png" alt="NCTC Logo" width={120} height={40} className="h-10 w-auto" />
            <div className="h-8 w-px bg-gray-300" />
            <span className="text-xl font-bold text-[#10112f]">OITMP</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-[#243996] transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-[#243996] transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-[#243996] transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#243996] hover:bg-[#4a81f6]">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight"
            >
              Open Innovation & Technology Management Platform
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Empower your Office of Technology Commercialization to manage the complete innovation lifecycle—from research disclosures and IP protection to licensing, commercialization, and industry partnerships.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <Button size="lg" className="bg-[#243996] hover:bg-[#4a81f6] text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Complete Technology Transfer Management
            </h2>
            <p className="text-xl text-muted-foreground">
              Built specifically for Offices of Technology Commercialization to streamline every stage of innovation
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
              area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              icon={<Box className="h-4 w-4" />}
              title="Research & Invention Disclosure"
              description="Capture and manage invention disclosures from researchers. Track research outputs, patents, and intellectual property from initial disclosure through commercialization."
            />
            <GridItem
              area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
              icon={<Settings className="h-4 w-4" />}
              title="Automated Workflow Management"
              description="Smart workflow automation guides your team through each stage—from prior art searches to patent filing, licensing negotiations, and technology transfer agreements."
            />
            <GridItem
              area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
              icon={<Lock className="h-4 w-4" />}
              title="IP Portfolio Management"
              description="Comprehensive management of patents, trademarks, design rights, and know-how. Track patent applications, maintenance fees, and licensing agreements in one centralized system."
              centerContent
            />
            <GridItem
              area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
              icon={<Sparkles className="h-4 w-4" />}
              title="Technology Assessment & Valuation"
              description="Conduct technical and market assessments to evaluate commercialization potential. Make data-driven decisions on which innovations to pursue."
            />
            <GridItem
              area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
              icon={<Search className="h-4 w-4" />}
              title="Industry Collaboration Hub"
              description="Connect with industry partners through challenge-solution matching. Manage consultations, proposals, and funding opportunities seamlessly."
            />
          </ul>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-background my-20 relative px-4">
        <div className="container z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
              Trusted by Leading Institutions
            </h2>
            <p className="text-center mt-5 opacity-75">
              See how technology transfer offices are transforming their operations with OITMP.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#243996] to-[#4a81f6]">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Technology Transfer Operations?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join research institutions and universities worldwide in streamlining their innovation management
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#10112f] text-white">
        <div className="container mx-auto text-center">
          <p className="text-white/70">
            © 2024 OITMP. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  centerContent?: boolean;
}

const GridItem = ({ area, icon, title, description, centerContent = false }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className={cn(
          "relative flex h-full flex-col gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6",
          centerContent ? "justify-center items-center text-center" : "justify-between"
        )}>
          <div className={cn(
            "relative flex flex-1 flex-col gap-3",
            centerContent ? "justify-center items-center" : "justify-between"
          )}>
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-5xl font-bold mb-2">{number}</div>
      <div className="text-lg opacity-90">{label}</div>
    </div>
  );
}
