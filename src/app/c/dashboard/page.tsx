
import {
  CreditCard,
  Clock,
  Activity,
  Layers,
  User,
  TrendingUp,
  DollarSign,
  BarChart2,
  ArrowUpRight,
  Heart,
  Coffee,
  Utensils,
  Star,
  Calendar,
  Award,
  Users,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const dashboardItems = [
  { name: "Wallet", icon: CreditCard, color: "from-blue-500 to-blue-600", href: "/c/dashboard/wallet" },
  { name: "Tip History", icon: Clock, color: "from-purple-500 to-purple-600", href: "/c/dashboard/tipping-history" },
  { name: "Send Tip", icon: Activity, color: "from-green-500 to-green-600", href: "/c/dashboard/wallet-tip" },
  { name: "Become Provider", icon: Layers, color: "from-orange-500 to-orange-600", href: "/c/dashboard/become-provider" },
  { name: "Profile", icon: User, color: "from-pink-500 to-pink-600", href: "/c/dashboard/profile" },
];

const recentTips = [
  {
    id: 1,
    provider: "Sarah's Coffee Shop",
    message: "☕ Amazing latte art! Keep up the great work!",
    amount: 15.00,
    date: "2 hours ago",
    icon: Coffee,
    category: "Food & Beverage"
  },
  {
    id: 2,
    provider: "Mike's Delivery",
    message: "🚀 Super fast delivery, thank you so much!",
    amount: 20.00,
    date: "5 hours ago",
    icon: Zap,
    category: "Delivery"
  },
  {
    id: 3,
    provider: "Bella's Restaurant",
    message: "🍝 The pasta was incredible! Chef's kiss!",
    amount: 25.00,
    date: "1 day ago",
    icon: Utensils,
    category: "Food & Beverage"
  },
  {
    id: 4,
    provider: "Alex's Taxi Service",
    message: "⭐ Smooth ride and great conversation!",
    amount: 10.00,
    date: "2 days ago",
    icon: Star,
    category: "Transportation"
  },
];

const monthlyData = [
  { month: "Jan", tips: 145 },
  { month: "Feb", tips: 220 },
  { month: "Mar", tips: 180 },
  { month: "Apr", tips: 290 },
  { month: "May", tips: 310 },
  { month: "Jun", tips: 425 },
];

const weeklyActivity = [
  { day: "Mon", amount: 45 },
  { day: "Tue", amount: 65 },
  { day: "Wed", amount: 35 },
  { day: "Thu", amount: 85 },
  { day: "Fri", amount: 95 },
  { day: "Sat", amount: 120 },
  { day: "Sun", amount: 75 },
];

const categoryData = [
  { name: "Food & Beverage", value: 45, color: "#3b82f6" },
  { name: "Transportation", value: 25, color: "#8b5cf6" },
  { name: "Delivery", value: 20, color: "#10b981" },
  { name: "Services", value: 10, color: "#f59e0b" },
];

const Page = () => {
  const maxMonthly = Math.max(...monthlyData.map(d => d.tips));
  const maxWeekly = Math.max(...weeklyActivity.map(d => d.amount));
  const totalCategory = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Hero Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 md:p-10 rounded-2xl shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold">Welcome Back, Ray!</h1>
                <p className="text-blue-100 mt-1">Premium Member since 2024</p>
              </div>
            </div>
            <p className="text-lg md:text-xl max-w-3xl leading-relaxed">
              You're part of the <span className="font-bold">Katip revolution</span> – empowering service providers worldwide with instant, seamless appreciation. 🚀
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                <p className="text-sm text-blue-100">Total Tips Given</p>
                <p className="text-2xl font-bold">$1,675</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                <p className="text-sm text-blue-100">Providers Supported</p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl">
                <p className="text-sm text-blue-100">Impact Score</p>
                <p className="text-2xl font-bold flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" /> 4.9
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {dashboardItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative overflow-hidden bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative flex flex-col items-center gap-3">
                <div className={`p-4 bg-gradient-to-br ${item.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-sm text-center text-gray-700 dark:text-gray-200">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white text-sm font-medium opacity-90">
                <DollarSign size={18} /> Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-1">$1,250</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowUpRight size={16} />
                <span>+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white text-sm font-medium opacity-90">
                <TrendingUp size={18} /> Monthly Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-1">$425</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowUpRight size={16} />
                <span>+37% increase</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white text-sm font-medium opacity-90">
                <Heart size={18} /> Average Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-1">$17.50</p>
              <div className="flex items-center gap-1 text-sm">
                <span>Per transaction</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white text-sm font-medium opacity-90">
                <Users size={18} /> Providers tipped
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-1">28</p>
              <div className="flex items-center gap-1 text-sm">
                <span>This month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tipping Trend - Area Chart */}
          <Card className="lg:col-span-2 shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart2 size={20} className="text-blue-600" /> 
                Tipping Activity Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <div className="flex items-end justify-between h-full gap-2 pb-8">
                  {monthlyData.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="relative w-full flex items-end justify-center" style={{ height: '240px' }}>
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 group-hover:from-blue-700 group-hover:to-blue-500 relative"
                          style={{ height: `${(item.tips / maxMonthly) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ${item.tips}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown - Donut Chart */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers size={20} className="text-purple-600" /> 
                Category Split
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="transform -rotate-90">
                    {categoryData.map((item, i) => {
                      const prevSum = categoryData.slice(0, i).reduce((sum, d) => sum + d.value, 0);
                      const startAngle = (prevSum / totalCategory) * 360;
                      const endAngle = ((prevSum + item.value) / totalCategory) * 360;
                      const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                      
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;
                      
                      const x1 = 100 + 70 * Math.cos(startRad);
                      const y1 = 100 + 70 * Math.sin(startRad);
                      const x2 = 100 + 70 * Math.cos(endRad);
                      const y2 = 100 + 70 * Math.sin(endRad);
                      
                      const pathData = `M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`;
                      
                      return (
                        <path
                          key={i}
                          d={pathData}
                          fill={item.color}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      );
                    })}
                    <circle cx="100" cy="100" r="45" fill="white" className="dark:fill-gray-800" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-2 w-full">
                  {categoryData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity - Bar Chart */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar size={20} className="text-green-600" /> 
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <div className="flex items-end justify-between h-full gap-3 pb-8">
                {weeklyActivity.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex items-end justify-center" style={{ height: '200px' }}>
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-300 group-hover:from-green-700 group-hover:to-green-500 relative"
                        style={{ height: `${(item.amount / maxWeekly) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ${item.amount}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tips */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity size={20} className="text-orange-600" /> 
              Recent Tips & Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTips.map((tip) => (
                <div 
                  key={tip.id}
                  className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 rounded-xl hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white flex-shrink-0">
                    <tip.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {tip.provider}
                      </h4>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400 whitespace-nowrap">
                        ${tip.amount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                      {tip.message}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {tip.date}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                        {tip.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
              View All Tipping History
            </button>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award size={20} className="text-yellow-600" /> 
                Generous Tipper
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You've supported 28 providers this month! You're in the top 10% of Katip users. 🏆
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart size={20} className="text-pink-600" /> 
                Community Hero
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your tips have made 28 people smile today. Keep spreading the love! 💖
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp size={20} className="text-green-600" /> 
                Rising Star
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                37% increase in tipping this month! You're making a real difference. ⭐
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;