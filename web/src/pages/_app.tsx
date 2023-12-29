import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log(" process.env.BACKEND_URL>> ", process.env.NEXT_PUBLIC_BACKEND_URL);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="grid h-screen font-serif bg-blue-950 place-items-center">
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
}
