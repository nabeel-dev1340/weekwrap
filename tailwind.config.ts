import type { Config } from "tailwindcss";

const config: Config = {
  // ... other config
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
};

export default config;
