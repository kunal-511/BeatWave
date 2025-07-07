import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/home" className="rounded-lg flex items-center gap-2 ">
          <img
            src="https://alternative.me/media/256/beatwave-icon-8x42bk54wwlw7535-c.png"
            className="size-10 text-black"
          />
          <p className="text-2xl"> BeatWave</p>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 mt-1">Manage your music catalog</p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};
export default Header;
