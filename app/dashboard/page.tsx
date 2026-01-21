import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Lightbulb,
  TrendingUp,
  Users,
  Award,
  DollarSign,
  ArrowRight,
  Activity,
} from "lucide-react";
import { mockData } from "@/lib/entities";

export default function DashboardPage() {
  const stats = [
    {
      title: "Active Research",
      value: mockData.research?.length || 0,
      icon: <Lightbulb className="h-5 w-5" />,
      change: "+12%",
      href: "/dashboard/research",
    },
    {
      title: "Patents",
      value: mockData["patent-utility"]?.length || 0,
      icon: <Award className="h-5 w-5" />,
      change: "+8%",
      href: "/dashboard/patent-utility",
    },
    {
      title: "Active Licenses",
      value: mockData.license?.length || 0,
      icon: <FileText className="h-5 w-5" />,
      change: "+5%",
      href: "/dashboard/license",
    },
    {
      title: "Total Users",
      value: mockData.user?.length || 0,
      icon: <Users className="h-5 w-5" />,
      change: "+15%",
      href: "/dashboard/user",
    },
  ];

  const recentActivities = [
    { action: "New research project created", entity: "Advanced AI Diagnostics", time: "2 hours ago" },
    { action: "Patent application filed", entity: "US20240123456", time: "5 hours ago" },
    { action: "Invention disclosure submitted", entity: "Novel AI System", time: "1 day ago" },
    { action: "License agreement signed", entity: "TechCorp Industries", time: "2 days ago" },
  ];

  const quickActions = [
    { label: "Create Research", href: "/dashboard/research", icon: <Lightbulb className="h-5 w-5" /> },
    { label: "New Disclosure", href: "/dashboard/invention-disclosure", icon: <FileText className="h-5 w-5" /> },
    { label: "Add User", href: "/dashboard/user", icon: <Users className="h-5 w-5" /> },
    { label: "View Reports", href: "/dashboard/reports", icon: <TrendingUp className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your innovation portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:border-brand-blue transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="text-brand-blue">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your innovation portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1">
                    <Activity className="h-4 w-4 text-brand-blue" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.entity}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    {action.icon}
                    {action.label}
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Entity Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Entity Overview</CardTitle>
          <CardDescription>Quick access to all entity types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { label: "Research Projects", value: mockData.research?.length || 0, href: "/dashboard/research" },
              { label: "Invention Disclosures", value: mockData["invention-disclosure"]?.length || 0, href: "/dashboard/invention-disclosure" },
              { label: "Patents", value: mockData["patent-utility"]?.length || 0, href: "/dashboard/patent-utility" },
              { label: "Licenses", value: mockData.license?.length || 0, href: "/dashboard/license" },
              { label: "Funds", value: mockData.fund?.length || 0, href: "/dashboard/fund" },
              { label: "Proposals", value: mockData.proposal?.length || 0, href: "/dashboard/proposal" },
              { label: "Users", value: mockData.user?.length || 0, href: "/dashboard/user" },
              { label: "Entities", value: mockData.entity?.length || 0, href: "/dashboard/entity" },
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <div className="p-4 border rounded-lg hover:border-brand-blue hover:bg-brand-blue/5 transition-colors cursor-pointer">
                  <div className="text-2xl font-bold text-brand-navy">{item.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
