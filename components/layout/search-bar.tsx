import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Search } from "lucide-react";

const highlight = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded px-1">{part}</span>
    ) : (
      part
    )
  );
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { friends } = useSelector((state: RootState) => state.friends);
  const { posts } = useSelector((state: RootState) => state.posts);
  const cmdkInputRef = useRef<HTMLInputElement>(null);

  // Focus the dialog input when dialog opens
  useEffect(() => {
    if (open && cmdkInputRef.current) {
      cmdkInputRef.current.focus();
    }
  }, [open]);

  const filteredFriends = searchQuery
    ? friends.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredPosts = searchQuery
    ? posts.filter((p) =>
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setSearchQuery("");
  };

  return (
    <div className="flex-1 max-w-md mx-8">
      <div className="relative">
        {!open && (
          <>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for friends, posts, or pages..."
              className="pl-10 bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-blue-500 w-full rounded-md py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              autoComplete="off"
            />
          </>
        )}
        <CommandDialog open={open} onOpenChange={handleOpenChange}>
          <CommandInput
            ref={cmdkInputRef}
            value={searchQuery}
            onValueChange={setSearchQuery}
            placeholder="Search for friends, posts, or pages..."
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {filteredFriends.length > 0 && (
              <CommandGroup heading="Friends">
                {filteredFriends.map((friend) => (
                  <CommandItem key={friend.id} className="flex items-center gap-3 cursor-pointer">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{highlight(friend.name, searchQuery)}</span>
                    <span className="ml-auto text-xs text-gray-500">Friend</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {filteredPosts.length > 0 && (
              <CommandGroup heading="Posts">
                {filteredPosts.map((post) => (
                  <CommandItem key={post.id} className="flex items-center gap-3 cursor-pointer">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={post.userAvatar || "/placeholder.svg"} alt={post.userName} />
                      <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{highlight(post.userName, searchQuery)}</span>
                      <span className="text-xs text-gray-500 max-w-xs truncate">{highlight(post.content, searchQuery)}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </CommandDialog>
      </div>
    </div>
  );
};

export default SearchBar;
