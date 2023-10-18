"use client";
import { useEnv } from "@/hooks/useEnv";

const Home = () => {
  const { FON } = useEnv();

  return (
    <div>
      <h1>Home</h1>
      <h2>FON - {FON}</h2>
    </div>
  );
};

export default Home;
