import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, FileText, TrendingUp, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="font-bold text-brand-navy text-xl">OITMP</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-brand-navy mb-6 leading-tight">
            Manage Innovation from
            <br />
            <span className="text-brand-blue">Research to Commercialization</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            OITMP is a comprehensive platform for managing research projects,
            intellectual property, and technology transfer processes.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
          Everything You Need in One Platform
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Lightbulb className="h-8 w-8 text-brand-blue" />}
            title="Research Management"
            description="Track research projects, teams, outputs, and funding from start to finish."
          />
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-brand-blue" />}
            title="IP Protection"
            description="Manage invention disclosures, prior art searches, patents, and licensing."
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8 text-brand-blue" />}
            title="Commercialization"
            description="Tech and market assessments to guide your commercialization strategy."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-brand-blue" />}
            title="Collaboration"
            description="Connect with industry partners through challenges and solutions."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="500+" label="Research Projects" />
            <StatCard number="200+" label="Patents Filed" />
            <StatCard number="50+" label="Active Licenses" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="bg-gradient-to-r from-brand-blue to-brand-lightBlue rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Innovation Management?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join leading research institutions using OITMP
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Free Trial <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">O</span>
                </div>
                <span className="font-bold text-brand-navy">OITMP</span>
              </div>
              <p className="text-sm text-gray-600">
                Streamlining innovation management for research institutions worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-blue">Features</a></li>
                <li><a href="#" className="hover:text-brand-blue">Pricing</a></li>
                <li><a href="#" className="hover:text-brand-blue">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-blue">About</a></li>
                <li><a href="#" className="hover:text-brand-blue">Contact</a></li>
                <li><a href="#" className="hover:text-brand-blue">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-brand-navy mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-brand-blue">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-blue">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 OITMP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-brand-blue transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-brand-navy mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-5xl font-bold mb-2">{number}</div>
      <div className="text-lg opacity-90">{label}</div>
    </div>
  );
}
