import { ContextProvider } from "@/context/context";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Navbar from "@/components/navbar";
import Listening from "@/components/ListentingComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import AuthGuard from "@/components/AuthGuard";
import PageWithTabWarning from "@/components/PageWithTabWarning";
import contentful from "../../lib/contentful";
import GlobalFunctions from "../../lib/GlobalFunctions";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [menuCollection, setMenuCollection] = useState([]);
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

  const getAllQuizes = async () => {
    const allQuizes = await contentful.fetchEntries();
    const menus = GlobalFunctions.filterDuplicates(allQuizes);
    const temperMenu = menus.map((val) => {
      let slug = val.sys.contentType.sys.id;
      let title = slug.slice(5);
      return { slug, title };
    });
    setMenuCollection(temperMenu);
  };
  useEffect(() => {
    getAllQuizes();
  }, []);

  return (
    <ContextProvider>
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        <>
          <Navbar menuCollection={menuCollection} />
          {pageLoad && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="primary" />
            </Stack>
          )}
          <Component {...pageProps} />
        </>
      )}
    </ContextProvider>
  );
}
