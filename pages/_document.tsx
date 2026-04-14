import { Html, Head, Main, NextScript } from "next/document";
import { Metadata } from "next";



 


 

export default function Document() {
  const title= "PageRouter";
  const description= "A Next.js application built with Pages Router featuring posts ";
   return (
    <Html lang="en">
      <Head>
       <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="PageRouter - A Next.js Pages Router Application" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.jpg" />

        {
          <meta
            name="keywords"
            content={`nextjs, react, page router, posts`}
          />
        }
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
