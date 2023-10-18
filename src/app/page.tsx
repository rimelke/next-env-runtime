"use client";
import { useEnv } from "@/hooks/useEnv";
import Link from "next/link";

const Home = () => {
  const { FON } = useEnv();

  return (
    <div>
      <h1>Home</h1>
      <h2>FON - {FON}</h2>
      <Link href="/about">about</Link>
    </div>
  );
};

export default Home;
