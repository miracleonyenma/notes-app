import SiteHeader from "../components/SiteHeader";
import Head from "next/head";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Nottes app</title>
        <meta name="description" content="Simple way to create, keep and share valuable thoughts ✨" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Nottes — Simple way to create, keep and share valuable thoughts ✨" />
        <meta name="description" content="With Nottes you can create, keep and share simple notes. Never lose a burst of inspiration." />

        {/* <!-- Open Graph / Facebook --/> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nottes.netlify.app/" />
        <meta property="og:title" content="Nottes — Simple way to create, keep and share valuable thoughts ✨" />
        <meta property="og:description" content="With Nottes you can create, keep and share simple notes. Never lose a burst of inspiration." />
        <meta property="og:image" content="https://nottes.netlify.app/img/nottes-cover.jpg" />

        {/* <!-- Twitter --/> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nottes.netlify.app/" />
        <meta property="twitter:title" content="Nottes — Simple way to create, keep and share valuable thoughts ✨" />
        <meta property="twitter:description" content="With Nottes you can create, keep and share simple notes. Never lose a burst of inspiration." />
        <meta property="twitter:image" content="https://nottes.netlify.app/img/nottes-cover.jpg" />
      </Head>

      <SiteHeader />
      {children}
    </>
  );
};

export default DefaultLayout;
