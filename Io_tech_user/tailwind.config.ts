import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
             height: {
        'fill-available': '-webkit-fill-available',
      },
      minHeight: {
        'fill-available': '-webkit-fill-available',
      },
        },
    },
    plugins: [],
};
export default config;
