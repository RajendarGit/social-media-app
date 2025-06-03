"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, X, Users, FileText, TrendingUp, Clock, Hash, User, MessageSquare } from "lucide-react"
import AvatarImageContainer from "./avatar-image-container"
import { imgPath } from "@/lib/utils"

interface SearchResult {
  id: string
  type: "friend" | "user" | "post" | "trending" | "action"
  title: string
  subtitle?: string
  avatar?: string
  badge?: string
  icon?: any
}

interface SearchBarProps {
  placeholder?: string
}

export default function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<SearchResult[]>([])

  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { friends, suggestedFriends } = useSelector((state: RootState) => state.friends)
  const { posts } = useSelector((state: RootState) => state.posts)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading recent searches:", error)
      }
    }
  }, [])

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback(
    (result: SearchResult) => {
      const updated = [result, ...recentSearches.filter((r) => r.id !== result.id)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem("recentSearches", JSON.stringify(updated))
    },
    [recentSearches],
  )

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }

  // Remove individual recent search
  const removeRecentSearch = (id: string) => {
    const updated = recentSearches.filter((r) => r.id !== id)
    setRecentSearches(updated)
    localStorage.setItem("recentSearches", JSON.stringify(updated))
  }

  // Search logic
  const getSearchResults = useCallback((): SearchResult[] => {
    if (!query.trim()) return []

    const results: SearchResult[] = []
    const searchTerm = query.toLowerCase()

    // Search friends
    const friendResults = [...friends, ...suggestedFriends]
      .filter((friend) => friend.name.toLowerCase().includes(searchTerm))
      .slice(0, 3)
      .map((friend) => ({
        id: `friend-${friend.id}`,
        type: "friend" as const,
        title: friend.name,
        subtitle: `${friend.mutualFriends} mutual friends`,
        avatar: friend.avatar,
        badge: friend.status,
      }))

    // Search posts
    const postResults = posts
      .filter(
        (post) => post.content.toLowerCase().includes(searchTerm) || post.userName.toLowerCase().includes(searchTerm),
      )
      .slice(0, 3)
      .map((post) => ({
        id: `post-${post.id}`,
        type: "post" as const,
        title: post.content.slice(0, 50) + (post.content.length > 50 ? "..." : ""),
        subtitle: `by ${post.userName} • ${post.timestamp}`,
        avatar: post.userAvatar,
      }))

    // Trending topics (mock data)
    const trendingResults = [
      { tag: "#TechNews", posts: "12.5k" },
      { tag: "#Photography", posts: "8.2k" },
      { tag: "#Travel", posts: "15.1k" },
      { tag: "#Coding", posts: "6.8k" },
    ]
      .filter((trend) => trend.tag.toLowerCase().includes(searchTerm))
      .slice(0, 2)
      .map((trend, index) => ({
        id: `trending-${index}`,
        type: "trending" as const,
        title: trend.tag,
        subtitle: `${trend.posts} posts`,
        icon: Hash,
        badge: `#${index + 1}`,
      }))

    // Add results in order
    if (friendResults.length > 0) {
      results.push(...friendResults)
    }
    if (postResults.length > 0) {
      results.push(...postResults)
    }
    if (trendingResults.length > 0) {
      results.push(...trendingResults)
    }

    // Add quick actions if no specific results
    if (results.length === 0) {
      results.push(
        {
          id: "action-find-friends",
          type: "action",
          title: "Find Friends",
          subtitle: "Discover people you may know",
          icon: Users,
        },
        {
          id: "action-browse-posts",
          type: "action",
          title: "Browse Posts",
          subtitle: "See what's trending",
          icon: FileText,
        },
      )
    }

    return results.slice(0, 8)
  }, [query, friends, suggestedFriends, posts])

  const searchResults = getSearchResults()
  const showResults = isOpen && (query.trim() || recentSearches.length > 0)
  const displayResults = query.trim() ? searchResults : []

  // Handle result selection
  const handleResultSelect = (result: SearchResult) => {
    console.log("Search result selected:", result)

    // Handle different result types
    switch (result.type) {
      case "friend":
      case "user":
        // Navigate to user profile or show user details
        console.log("Navigate to user:", result.title)
        break
      case "post":
        // Navigate to post or show post details
        console.log("Navigate to post:", result.title)
        break
      case "trending":
        // Show trending topic or search results
        console.log("Show trending:", result.title)
        break
    }

    saveRecentSearch(result)
    setQuery("")
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults) return

    const totalResults = query.trim() ? displayResults.length : recentSearches.length

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % totalResults)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + totalResults) % totalResults)
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          const result = query.trim() ? displayResults[selectedIndex] : recentSearches[selectedIndex]
          if (result) handleResultSelect(result)
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getResultIcon = (result: SearchResult) => {
    switch (result.type) {
      case "friend":
      case "user":
        return User
      case "post":
        return MessageSquare
      case "trending":
        return TrendingUp
      case "action":
        return result.icon || Search
      default:
        return Search
    }
  }

  const getResultBadgeColor = (badge: string) => {
    switch (badge) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const getUserById = (id: string) => {
    // Remove the prefix if present (e.g., "friend-")
    const cleanId = id.replace(/^friend-/, "");
    return (
      friends.find((f) => f.id === cleanId) ||
      suggestedFriends.find((f) => f.id === cleanId)
    );
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10 bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedIndex(-1)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => {
              setQuery("")
              setSelectedIndex(-1)
              inputRef.current?.focus()
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 animate-fade-in">
          {query.trim() ? (
            // Search Results
            <>
              {displayResults.length > 0 ? (
                <div className="p-2">
                  {/* Group by type */}
                  {displayResults.some((r) => r.type === "friend") && (
                    <>
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        People
                      </div>
                      {displayResults
                        .filter((r) => r.type === "friend")
                        .map((result, index) => {
                          const globalIndex = displayResults.indexOf(result)
                          const IconComponent = getResultIcon(result)
                          const user = getUserById(result.id)
                          return (
                            <div
                              key={result.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                selectedIndex === globalIndex
                                  ? "bg-blue-50 dark:bg-blue-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                              onClick={() => handleResultSelect(result)}
                            >
                              {result.avatar ? (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={result.avatar || "/placeholder.svg"} alt={result.title} />
                                  <AvatarFallback>{result.title.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                  <IconComponent className="h-4 w-4 text-gray-500" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {result.title}
                                </p>
                                {result.subtitle && <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>}
                              </div>
                              {result.badge && (
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${
                                    result.type === "friend" ? getResultBadgeColor(result.badge) : ""
                                  }`}
                                >
                                  {result.badge}
                                </Badge>
                              )}
                            </div>
                          )
                        })}
                    </>
                  )}

                  {displayResults.some((r) => r.type === "post") && (
                    <>
                      {displayResults.some((r) => r.type === "friend") && <Separator className="my-2" />}
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Posts</div>
                      {displayResults
                        .filter((r) => r.type === "post")
                        .map((result) => {
                          const globalIndex = displayResults.indexOf(result)
                          const IconComponent = getResultIcon(result)
                          const user = getUserById(result.id)
                          return (
                            <div
                              key={result.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                selectedIndex === globalIndex
                                  ? "bg-blue-50 dark:bg-blue-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                              onClick={() => handleResultSelect(result)}
                            >
                              {result.avatar ? (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={result.avatar || "/placeholder.svg"} alt={result.title} />
                                  <AvatarFallback>{result.title.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                  <IconComponent className="h-4 w-4 text-gray-500" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {result.title}
                                </p>
                                {result.subtitle && <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>}
                              </div>
                            </div>
                          )
                        })}
                    </>
                  )}

                  {displayResults.some((r) => r.type === "trending") && (
                    <>
                      {(displayResults.some((r) => r.type === "friend") ||
                        displayResults.some((r) => r.type === "post")) && <Separator className="my-2" />}
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Trending
                      </div>
                      {displayResults
                        .filter((r) => r.type === "trending")
                        .map((result) => {
                          const globalIndex = displayResults.indexOf(result)
                          const IconComponent = getResultIcon(result)
                          const user = getUserById(result.id)
                          return (
                            <div
                              key={result.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 ${
                                selectedIndex === globalIndex
                                  ? "ring-2 ring-blue-500"
                                  : "hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30"
                              }`}
                              onClick={() => handleResultSelect(result)}
                            >
                              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <IconComponent className="h-4 w-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {result.title}
                                </p>
                                {result.subtitle && <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>}
                              </div>
                              {result.badge && (
                                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                                  {result.badge}
                                </Badge>
                              )}
                            </div>
                          )
                        })}
                    </>
                  )}

                  {displayResults.some((r) => r.type === "action") && (
                    <>
                      {displayResults.some((r) => r.type !== "action") && <Separator className="my-2" />}
                      {displayResults
                        .filter((r) => r.type === "action")
                        .map((result) => {
                          const globalIndex = displayResults.indexOf(result)
                          const IconComponent = getResultIcon(result)
                          const user = getUserById(result.id)
                          return (
                            <div
                              key={result.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                selectedIndex === globalIndex
                                  ? "bg-blue-50 dark:bg-blue-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                              onClick={() => handleResultSelect(result)}
                            >
                              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <IconComponent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {result.title}
                                </p>
                                {result.subtitle && <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>}
                              </div>
                            </div>
                          )
                        })}
                    </>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No results found for "{query}"</p>
                  <p className="text-xs text-gray-400 mt-1">Try searching for friends, posts, or trending topics</p>
                </div>
              )}
            </>
          ) : (
            // Recent Searches
            recentSearches.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recent</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-500 hover:text-gray-700 h-auto p-1"
                  >
                    Clear all
                  </Button>
                </div>
                {recentSearches.map((result, index) => {
                  const IconComponent = getResultIcon(result)
                  const user = getUserById(result.id)
                  return (
                    <div
                      key={result.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors group ${
                        selectedIndex === index
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => handleResultSelect(result)}
                    >
                      <Clock className="h-4 w-4 text-gray-400" />
                      {result.avatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImageContainer
                            avatarSrc={
                              result.avatar
                                ? result.avatar
                                : user
                                  ? user.gender === "male"
                                    ? imgPath("boy.webp")
                                    : imgPath("girl.webp")
                                  : "/placeholder.svg"
                            }
                            avatarAlt={result.title}
                            avatarName={result.title}
                          />
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <IconComponent className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{result.title}</p>
                        {result.subtitle && <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeRecentSearch(result.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
