import { SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { LayoutDashboardIcon, Search, X, Loader2, Crown, Star } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePremiumStore } from "@/stores/usePremiumStore";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { useMusicStore } from "@/stores/useMusicStore";
import { useState, useEffect, useRef } from "react";
import { Song } from "@/types";
import { usePlayerStore } from "@/stores/usePlayerStore";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  const { isSignedIn } = useUser();
  const { searchSongs, clearSearch, searchResults, isSearching } = useMusicStore();
  const { playAlbum } = usePlayerStore();
  const { premiumStatus, fetchPremiumStatus, isLoading: premiumLoading } = usePremiumStore();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (isSignedIn) {
      fetchPremiumStatus();
    }
  }, [isSignedIn, fetchPremiumStatus]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchSongs(searchQuery);
        setShowResults(true);
      } else {
        clearSearch();
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchSongs, clearSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSongPlay = (song: Song) => {
    playAlbum([song], 0);
    setShowResults(false);
    setSearchQuery("");
  };

  const clearSearchInput = () => {
    setSearchQuery("");
    clearSearch();
    setShowResults(false);
  };
  const handlePremiumClick = () => {
    if (premiumStatus.isPremium) {
      navigate("/home"); 
    } else {
      navigate("/premium");
    }
  };

  const formatPremiumEndDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div
        className="flex gap-2 items-center cursor-pointer relative"
        onClick={() => navigate("/home")}
      >
        <div className="relative">
          <img
            src="https://alternative.me/media/256/beatwave-icon-8x42bk54wwlw7535-c.png"
            alt="BeatWave Logo"
            className="size-8"
          />
        
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            BeatWave
          </span>
          {premiumStatus.isPremium && (
            <span className="text-xs text-yellow-400 font-medium -mt-1 flex items-center gap-1">
              <Star className="size-2.5 fill-current" />
              Premium Active
            </span>
          )}
        </div>
      </div>

      <div className="relative max-w-md w-full mx-8" ref={searchRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <Input
            placeholder="Search for songs, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
            className="pl-10 pr-10 bg-zinc-800/50 border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500/20 placeholder:text-zinc-400 transition-all duration-200 hover:bg-zinc-800/70"
          />
          {searchQuery && (
            <button
              onClick={clearSearchInput}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-white" />
            </button>
          )}
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-lg border border-zinc-700 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
            <div className="p-2">
              {searchResults.slice(0, 8).map((song) => (
                <div
                  key={song._id}
                  onClick={() => handleSongPlay(song)}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-zinc-800/50 cursor-pointer transition-all duration-150 group"
                >
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">
                      {song.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {song.artist}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showResults && searchQuery && !isSearching && searchResults.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-lg border border-zinc-700 rounded-lg shadow-xl z-50">
            <div className="p-4 text-center text-muted-foreground">
              No songs found for "{searchQuery}"
            </div>
          </div>
        )}
      </div>
      {isSignedIn && (
        <div className="relative">
          {premiumLoading ? (
            <Button disabled className="bg-zinc-700 text-zinc-400">
              <Loader2 className="size-4 mr-2 animate-spin" />
              Loading...
            </Button>
          ) : premiumStatus.isPremium ? (
            <div className="flex flex-col items-center">
              <Button 
                onClick={handlePremiumClick} 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold shadow-lg relative overflow-hidden group"
              >
                <Crown className="size-4 mr-2" />
                Premium Active
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </Button>
              {premiumStatus.premiumEndDate && (
                <span className="text-xs text-zinc-400 mt-1">
                  Until {formatPremiumEndDate(premiumStatus.premiumEndDate)}
                </span>
              )}
            </div>
          ) : (
            <Button 
              onClick={handlePremiumClick} 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold shadow-lg relative overflow-hidden group"
            >
              <Star className="size-4 mr-2" />
              Go Premium
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </Button>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;
