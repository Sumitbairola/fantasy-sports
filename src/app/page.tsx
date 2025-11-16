"use client";

import { useMatches } from "@/hooks/useMatches";
import { MatchList } from "@/components/features/match-selector/match-list";
import { TABS, MATCH_TABS } from "@/lib/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { User, Wallet, Plus, LogOut, Settings, History } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SPORTS = [
  { id: "cricket", name: "Cricket", emoji: "🏏" },
  { id: "football", name: "Football", emoji: "⚽" },
  { id: "basketball", name: "Basketball", emoji: "🏀" },
  { id: "rugby", name: "Rugby", emoji: "🏉" },
  { id: "hockey", name: "Hockey", emoji: "🏑" },
];

export default function HomePage() {
  const { data: matches, isLoading, error } = useMatches();
  const [activeTab, setActiveTab] = useState("all");
  const [activeMatchTab, setActiveMatchTab] = useState("matches");
  const [activeSport, setActiveSport] = useState("cricket");

  const handleAddMoney = () => {
    alert("Add money functionality - Integrate payment gateway");
  };

  const handleProfile = () => {
    alert("Navigate to profile page");
  };

  const handleSettings = () => {
    alert("Navigate to settings page");
  };

  const handleHistory = () => {
    alert("Navigate to transaction history");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logout functionality");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Error loading matches</p>
      </div>
    );
  }

  const showEmptyState = activeSport !== "cricket";

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-900 to-purple-900 px-4 md:px-8 lg:px-12 pt-12 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            {/* Profile Section */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity outline-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <p className="sm:hidden block text-white font-semibold text-sm md:text-base">
                  Bhupender singh
                </p>
                <div className="hidden sm:block">
                  <p className="text-white font-semibold text-sm md:text-base">
                    Bhupender singh
                  </p>
                  <p className="text-white/70 text-xs">View Profile</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem
                  onClick={handleProfile}
                  className="cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSettings}
                  className="cursor-pointer"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wallet Section */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                <Wallet className="w-4 h-4 text-white" />
                <p className="text-white font-bold text-sm md:text-base">
                  ₹12,120.99
                </p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddMoney();
                  }}
                  className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={handleAddMoney}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Money
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleHistory}
                  className="cursor-pointer"
                >
                  <History className="w-4 h-4 mr-2" />
                  Transaction History
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Sports Icons */}
          <div className="flex items-center justify-between md:justify-center md:space-x-8 mb-6 px-2">
            {SPORTS.map((sport) => (
              <button
                key={sport.id}
                onClick={() => setActiveSport(sport.id)}
                className="flex flex-col items-center space-y-2 group"
              >
                <div
                  className={cn(
                    "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all",
                    activeSport === sport.id
                      ? "bg-linear-to-r from-pink-500 to-red-500 scale-110"
                      : "bg-white/10 backdrop-blur-sm group-hover:bg-white/20"
                  )}
                >
                  <span className="text-white text-xl md:text-2xl">
                    {sport.emoji}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-xs md:text-sm transition-colors",
                    activeSport === sport.id
                      ? "text-white font-semibold"
                      : "text-white/70"
                  )}
                >
                  {sport.name}
                </p>
              </button>
            ))}
          </div>

          {/* Banner */}
          {activeSport === "cricket" && (
            <div className="bg-linear-to-r from-orange-400 to-pink-500 rounded-2xl p-4 md:p-6 mb-6 relative overflow-hidden max-w-4xl mx-auto">
              <div className="relative z-10">
                <h2 className="text-white font-bold text-base md:text-lg mb-1">
                  MAKE YOUR TEAM & PLAY
                </h2>
                <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl mb-1">
                  WIN UPTO ₹1,00,000
                </h3>
                <p className="text-white text-xs md:text-sm">
                  Make your team now »
                </p>
              </div>
            </div>
          )}

          {/* Match Tabs */}
          {activeSport === "cricket" && (
            <div className="flex items-center justify-center space-x-10 md:space-x-4 overflow-x-auto">
              {MATCH_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveMatchTab(tab.id)}
                  className={cn(
                    "px-4 md:px-6 py-2 rounded-full font-medium text-xs md:text-sm transition-all whitespace-nowrap",
                    activeMatchTab === tab.id
                      ? "bg-white text-indigo-900 shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-t-3xl px-4 md:px-8 lg:px-12 py-6 min-h-[calc(100vh-15rem)] pb-32">
        <div className="max-w-7xl mx-auto">
          {showEmptyState ? (
            <div className="text-center py-16 md:py-24 min-h-[60vh] flex flex-col items-center justify-center">
              <div className="text-6xl md:text-8xl mb-6">
                {SPORTS.find((s) => s.id === activeSport)?.emoji}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                No {SPORTS.find((s) => s.id === activeSport)?.name} Matches
                Available
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                {activeMatchTab === "matches" &&
                  "No upcoming matches at the moment"}
                {activeMatchTab === "live" && "No live matches right now"}
                {activeMatchTab === "completed" &&
                  "No completed matches to show"}
              </p>
            </div>
          ) : (
            <>
              {/* Filter Tabs */}
              <div className="flex items-center space-x-4 mb-6">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-4 md:px-6 py-2 rounded-full font-medium text-xs md:text-sm transition-all",
                      activeTab === tab.id
                        ? "bg-linear-to-r from-pink-500 to-red-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Matches List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                {matches && <MatchList matches={matches} />}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
