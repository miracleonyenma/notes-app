import SiteHeader from "../components/SiteHeader";
import Head from "next/head";
import SiteFooter from "../components/SiteFooter";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Nottes app</title>
        <meta name="title" content="Nottes" key={`meta-title`} />
        <meta name="description" content="Simple way to create, keep and share valuable thoughts ✨" key={`meta-description`} />

        {/* <!-- Open Graph / Facebook --/> */}
        <meta property="og:type" content="website" key={`og-type`} />
        <meta property="og:url" content="https://nottes.netlify.app/" key={`og-url`} />
        <meta property="og:title" content="Nottes — Simple way to create, keep and share valuable thoughts ✨" key={`og-title`} />
        <meta property="og:description" content="With Nottes you can create, keep and share simple notes. Never lose a burst of inspiration." key={`og-description`} />
        <meta property="og:image" content="https://nottes.netlify.app/img/nottes-cover.jpg" key={`og-image`} />

        {/* <!-- Twitter --/> */}
        <meta property="twitter:card" content="summary_large_image" key={`twitter-card`} />
        <meta property="twitter:url" content="https://nottes.netlify.app/" key={`twitter-url`} />
        <meta property="twitter:title" content="Nottes — Simple way to create, keep and share valuable thoughts ✨" key={`twitter-title`} />
        <meta property="twitter:description" content="With Nottes you can create, keep and share simple notes. Never lose a burst of inspiration." key={`twitter-description`} />
        <meta property="twitter:image" content="https://nottes.netlify.app/img/nottes-cover.jpg" key={`twitter-image`} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
};

export default DefaultLayout;
