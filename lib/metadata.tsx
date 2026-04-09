import React from 'react';

export interface Metadata {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
    type?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
    };
  };
  icons?: {
    icon?: string;
    apple?: string;
  };
  manifest?: string;
}

export function generateMetadataTags(metadata: Metadata, baseUrl: string = ''): React.ReactNode[] {
  const tags: React.ReactNode[] = [];
  
  // Basic meta tags
  if (metadata.title) {
    tags.push(<title key="title">{metadata.title}</title>);
  }
  
  if (metadata.description) {
    tags.push(<meta key="description" name="description" content={metadata.description} />);
  }
  
  if (metadata.keywords) {
    tags.push(<meta key="keywords" name="keywords" content={metadata.keywords.join(', ')} />);
  }
  
  if (metadata.author) {
    tags.push(<meta key="author" name="author" content={metadata.author} />);
  }
  
  // Open Graph
  if (metadata.openGraph) {
    if (metadata.openGraph.title) {
      tags.push(<meta key="og:title" property="og:title" content={metadata.openGraph.title} />);
    }
    
    if (metadata.openGraph.description) {
      tags.push(<meta key="og:description" property="og:description" content={metadata.openGraph.description} />);
    }
    
    if (metadata.openGraph.url) {
      tags.push(<meta key="og:url" property="og:url" content={baseUrl + metadata.openGraph.url} />);
    }
    
    if (metadata.openGraph.siteName) {
      tags.push(<meta key="og:site_name" property="og:site_name" content={metadata.openGraph.siteName} />);
    }
    
    if (metadata.openGraph.type) {
      tags.push(<meta key="og:type" property="og:type" content={metadata.openGraph.type} />);
    }
    
    if (metadata.openGraph.images) {
      metadata.openGraph.images.forEach((image, index) => {
        tags.push(<meta key={`og:image:${index}`} property="og:image" content={image.url} />);
        if (image.width) tags.push(<meta key={`og:image:width:${index}`} property="og:image:width" content={image.width.toString()} />);
        if (image.height) tags.push(<meta key={`og:image:height:${index}`} property="og:image:height" content={image.height.toString()} />);
        if (image.alt) tags.push(<meta key={`og:image:alt:${index}`} property="og:image:alt" content={image.alt} />);
      });
    }
  }
  
  // Twitter
  if (metadata.twitter) {
    if (metadata.twitter.card) {
      tags.push(<meta key="twitter:card" name="twitter:card" content={metadata.twitter.card} />);
    }
    
    if (metadata.twitter.title) {
      tags.push(<meta key="twitter:title" name="twitter:title" content={metadata.twitter.title} />);
    }
    
    if (metadata.twitter.description) {
      tags.push(<meta key="twitter:description" name="twitter:description" content={metadata.twitter.description} />);
    }
    
    if (metadata.twitter.images) {
      metadata.twitter.images.forEach((image, index) => {
        tags.push(<meta key={`twitter:image:${index}`} name="twitter:image" content={image} />);
      });
    }
    
    if (metadata.twitter.creator) {
      tags.push(<meta key="twitter:creator" name="twitter:creator" content={metadata.twitter.creator} />);
    }
  }
  
  // Robots
  if (metadata.robots) {
    const robotsContent = [
      metadata.robots.index !== false ? 'index' : 'noindex',
      metadata.robots.follow !== false ? 'follow' : 'nofollow'
    ].join(', ');
    tags.push(<meta key="robots" name="robots" content={robotsContent} />);
    
    if (metadata.robots.googleBot) {
      const googleBotContent = [
        metadata.robots.googleBot.index !== false ? 'index' : 'noindex',
        metadata.robots.googleBot.follow !== false ? 'follow' : 'nofollow'
      ].join(', ');
      tags.push(<meta key="googlebot" name="googlebot" content={googleBotContent} />);
    }
  }
  
  // Icons
  if (metadata.icons) {
    if (metadata.icons.icon) {
      tags.push(<link key="icon" rel="icon" href={metadata.icons.icon} />);
    }
    if (metadata.icons.apple) {
      tags.push(<link key="apple-touch-icon" rel="apple-touch-icon" href={metadata.icons.apple} />);
    }
  }
  
  // Manifest
  if (metadata.manifest) {
    tags.push(<link key="manifest" rel="manifest" href={metadata.manifest} />);
  }
  
  return tags;
}
