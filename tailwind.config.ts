import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App Router
    "./pages/**/*.{js,ts,jsx,tsx}",      // Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // Composants réutilisables
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};

export default config;
