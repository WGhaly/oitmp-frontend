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
    text: "OITMP transformed how we manage our research portfolio. The workflow automation saved us countless hours.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    name: "Dr. Sarah Chen",
    role: "Director of Innovation",
  },
  {
    text: "The IP management tools are exceptional. We can now track all our patents and licensing agreements in one place.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    name: "Ahmed Hassan",
    role: "Technology Transfer Manager",
  },
  {
    text: "Excellent platform for managing industry collaborations. The quick actions feature is a game-changer.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    name: "Maria Rodriguez",
    role: "Research Coordinator",
  },
  {
    text: "The system made funding proposal management so much easier. We've increased our success rate by 40%.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    name: "Dr. James Wilson",
    role: "Grant Administrator",
  },
  {
    text: "Outstanding support and intuitive interface. Our entire team was productive within days of implementation.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
    name: "Fatima Al-Rashid",
    role: "Innovation Lead",
  },
  {
    text: "The real-time collaboration features have revolutionized how our research teams work together across departments.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    name: "Dr. Michael Park",
    role: "Research Director",
  },
  {
    text: "OITMP's comprehensive approach to managing the innovation lifecycle is unmatched. Highly recommended.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    name: "Elena Popov",
    role: "IP Manager",
  },
  {
    text: "The reporting and analytics capabilities provide incredible insights into our technology transfer operations.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    name: "David Thompson",
    role: "Operations Manager",
  },
  {
    text: "We've streamlined our entire innovation pipeline. From disclosure to commercialization, everything is seamless.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    name: "Sophia Martinez",
    role: "Innovation Strategist",
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-muted/50 mb-6"
            >
              <Sparkles className="h-4 w-4 text-[#243996]" />
              <span className="text-sm font-medium">Innovation Management Platform</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight"
            >
              Office of Innovation & Technology Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Streamline your innovation pipeline from research to commercialization. 
              Manage IP, funding, and collaborations in one comprehensive platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
            <div className="flex justify-center mb-4">
              <div className="border py-1 px-4 rounded-lg text-sm">Features</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Everything you need
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive tools for managing your entire innovation lifecycle
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
              area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
              icon={<Box className="h-4 w-4" />}
              title="Research Management"
              description="Track research projects, teams, and outputs from conception to completion with comprehensive workflow automation."
            />
            <GridItem
              area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
              icon={<Settings className="h-4 w-4" />}
              title="Dynamic Entity System"
              description="21 entity types with full CRUD operations. Metadata-driven architecture adapts to your needs."
            />
            <GridItem
              area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
              icon={<Lock className="h-4 w-4" />}
              title="IP Protection"
              description="Comprehensive patent, trademark, and IP management. Track applications, disclosures, and prior art searches."
              centerContent
            />
            <GridItem
              area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
              icon={<Sparkles className="h-4 w-4" />}
              title="Workflow Quick Actions"
              description="Streamline your processes with intelligent quick actions that prefill data and guide you through workflows."
            />
            <GridItem
              area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
              icon={<Search className="h-4 w-4" />}
              title="Advanced Search & Filtering"
              description="Powerful search across all entities with customizable column selection and instant filtering."
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
            <div className="flex justify-center">
              <div className="border py-1 px-4 rounded-lg">Testimonials</div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
              What our users say
            </h2>
            <p className="text-center mt-5 opacity-75">
              See what our customers have to say about us.
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
              Ready to Transform Your Innovation Process?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join leading organizations in streamlining their technology transfer operations
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
