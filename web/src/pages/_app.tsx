import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="grid h-screen font-serif bg-dark-gray place-items-center">
      <div>
        <Component {...pageProps} />
        <SpeedInsights />
      </div>
    </div>
  );
}
