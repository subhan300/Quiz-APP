import { ContextProvider } from "@/context/context";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import AuthGuard from "@/components/AuthGuard";
import { SettingsDrawer, SettingsProvider } from "@/components/settings";
import { primaryFont } from '../theme/typography';
import ThemeProvider from "../theme";
import Layout from "@/components/Layout";
import RootLayout from "@/layouts/layout";
import "../styles/globals.css";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoad, setPageLoading] = useState(false);
  const onLoad = () => setPageLoading(true);
  const onDone = () => setPageLoading(false);

  // Events For page loading
  useEffect(() => {
    router.events.on("routeChangeStart", onLoad);
    router.events.on("routeChangeComplete", onDone);
    router.events.on("routeChangeError", onDone);
    return () => {
      router.events.off("routeChangeStart", onLoad);
      router.events.off("routeChangeComplete", onDone);
      router.events.off("routeChangeError", onDone);
    };
  });

  const getLayout = Component.getLayout ?? ((page) => page);
  return (
   
    <ContextProvider>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <>
          {pageLoad && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="primary" />
            </Stack>
          )}
          <SettingsProvider
            defaultSettings={{
              themeMode: "light", // 'light' | 'dark'
              themeDirection: "ltr", //  'rtl' | 'ltr'
              themeColorPresets: "red", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            }}
          >
          <SettingsDrawer />
          <ThemeProvider>
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
          </SettingsProvider>
        </>
      )}
    </ContextProvider>
   
  );
}
