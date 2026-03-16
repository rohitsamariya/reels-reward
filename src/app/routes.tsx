import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { UserDashboard } from "./components/UserDashboard";
import { ReelWatch } from "./components/ReelWatch";
import { WalletSection } from "./components/WalletSection";
import { UserProfile } from "./components/UserProfile";
import { Plans } from "./components/Plans";
import { Login } from "./components/Login";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminReels } from "./components/AdminReels";
import { AdminUsers } from "./components/AdminUsers";
import { AdminFinance } from "./components/AdminFinance";
import { AdminAnalytics } from "./components/AdminAnalytics";
import { AdminActivity } from "./components/AdminActivity";
import { Root } from "./Root";

const ErrorBoundary = () => <div className="p-8 text-center text-red-500 font-bold text-xl">Something went wrong</div>;
const ComingSoon = ({ title }: { title: string }) => (
  <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh]">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
    <p className="text-gray-500">This feature is currently under development.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    ErrorBoundary,
    children: [
      { path: "login", Component: Login },
      {
        Component: Layout,
        children: [
          { index: true, Component: UserDashboard },
          { path: "watch/:id", Component: ReelWatch },
          { path: "wallet", Component: WalletSection },
          { path: "plans", Component: Plans },
          { path: "profile", Component: UserProfile },
          
          { path: "admin", Component: AdminDashboard },
          { path: "admin/reels", Component: AdminReels },
          { path: "admin/users", Component: AdminUsers },
          { path: "admin/finance", Component: AdminFinance },
          { path: "admin/analytics", Component: AdminAnalytics },
          { path: "admin/activity", Component: AdminActivity },
        ]
      }
    ]
  }
]);
