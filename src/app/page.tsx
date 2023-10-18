"use client";
import { useEnv } from "@/hooks/useEnv";

const Home = () => {
  const env = useEnv();

  return (
    <div>
      <h1>Home</h1>
      <h2>FON - {env["Settings:FontColor"]}</h2>
    </div>
  );
};

export default Home;
