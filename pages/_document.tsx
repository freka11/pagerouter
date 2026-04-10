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
