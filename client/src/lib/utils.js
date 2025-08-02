import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function extractDomain(url) {
  if (!url) return null;
  
  try {
    const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
    const domain = new URL(urlWithProtocol).hostname;
    return domain.replace('www.', '');
  } catch (error) {
    const domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    return domain || null;
  }
}

export function generateLogoUrl(domain) {
  if (!domain) return null;
  
  const services = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
    `https://favicon.io/favicon/${domain}/64`,
    `https://icon.horse/icon/${domain}`,
  ];
  
  return services[0]; 
}

export function getCredentialLogo(credential) {
  if (!credential) return null;
  
  if (credential.logo && credential.logo !== "/placeholder.svg") {
    return credential.logo;
  }
  
  const domain = extractDomain(credential.site);
  if (domain) {
    return generateLogoUrl(domain);
  }
  
  return "/placeholder.svg";
}
