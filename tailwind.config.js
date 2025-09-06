/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["var(--font-geist-sans)", "sans-serif"],
          mono: ["var(--font-geist-mono)", "monospace"],
          hero: ["var(--font-newsreader)", "serif"], // Jamie’deki font
          // istersen Playfair de bırakabilirsin:
          serif: ["var(--font-playfair)", "serif"],
        },
      },
    },
    plugins: [],
  };
  