import PropTypes from "prop-types";

// ----------------------------------------------------------------------

import ThemeProvider from "../theme";
import { primaryFont } from "src/theme/typography";
import MotionLazy from "src/components/animate/motion-lazy";
import { SettingsDrawer, SettingsProvider } from "src/components/settings";

// ----------------------------------------------------------------------

export const metadata = {
  title: "EFSET",
  description: "EFSET QUIZ Application",
  keywords: "react,material,kit,application,dashboard,admin,template",
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      url: "/favicon/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: "light", // 'light' | 'dark'
        themeDirection: "ltr", //  'rtl' | 'ltr'
      }}
    >
      <ThemeProvider>
        {/* <MotionLazy> */}
          <SettingsDrawer />
          {children}
        {/* </MotionLazy> */}
      </ThemeProvider>
    </SettingsProvider>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
