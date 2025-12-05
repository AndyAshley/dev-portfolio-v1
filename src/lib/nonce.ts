import { headers } from 'next/headers';

/**
 * Get the CSP nonce for the current request.
 * This should be used to add nonce attributes to script and style tags.
 * 
 * @returns The nonce string or undefined if not available
 */
export async function getNonce(): Promise<string | undefined> {
  try {
    const headersList = await headers();
    const nonce = headersList.get('x-nonce');
    return nonce ?? undefined;
  } catch (error) {
    // In client-side rendering or when headers aren't available
    console.warn('Failed to get nonce from headers:', error);
    return undefined;
  }
}

/**
 * Get the nonce synchronously from the document (client-side only).
 * This is a fallback for client components that need the nonce.
 * 
 * @returns The nonce string or undefined
 */
export function getNonceFromMeta(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const metaTag = document.querySelector('meta[name="csp-nonce"]');
  return metaTag?.getAttribute('content') || undefined;
}
