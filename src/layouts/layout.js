import PropTypes from "prop-types";

// ----------------------------------------------------------------------

import ThemeProvider from "../theme";
import { primaryFont } from "src/theme/typography";
import MotionLazy from "src/components/animate/motion-lazy";
import { SettingsDrawer, SettingsProvider } from "src/components/settings";

// ----------------------------------------------------------------------



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
