"use client";

import Logo from "./logo";
import NavigateButtons from "./navigate-buttons";
import SearchBar from "./search-bar";
import UserMenu from "./user-menu";

interface HeaderProps {
  onNavigate: (page: "feed" | "profile") => void;
  currentPage: "feed" | "profile";
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Logo />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <SearchBar placeholder="Search for friends, posts, or pages..." />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <NavigateButtons
              onNavigate={() => onNavigate("feed")}
              currentPage={currentPage}
            />

            {/* User Menu */}
            <UserMenu onNavigate={() => onNavigate("profile")} />
          </div>
        </div>
      </div>
    </header>
  );
}
