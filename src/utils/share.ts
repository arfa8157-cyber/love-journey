export interface ShareResult {
  success: boolean;
  action: 'shared' | 'copied' | 'failed';
  message: string;
}

/**
 * Builds a safe shareable URL.
 * NOTE: For privacy reasons, never include passwords or secret content in query parameters.
 * Only the non-sensitive public recipient display name is included optionally.
 */
export function getShareableUrl(recipientName?: string): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  if (recipientName && recipientName.trim()) {
    url.searchParams.set('to', recipientName.trim());
  } else {
    url.searchParams.delete('to');
  }
  return url.toString();
}

/**
 * Shares via Web Share API if supported, or gracefully falls back to clipboard copy.
 */
export async function shareExperience(recipientName?: string): Promise<ShareResult> {
  const url = getShareableUrl(recipientName);
  const title = 'A Special Romantic Journey for You';
  const text = recipientName 
    ? `A special liquid glass romantic letter prepared for ${recipientName} ❤️`
    : 'A special liquid glass romantic letter created just for you ❤️';

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url
      });
      return {
        success: true,
        action: 'shared',
        message: 'Shared successfully with love!'
      };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return {
          success: false,
          action: 'failed',
          message: 'Sharing was cancelled.'
        };
      }
      // If Web Share fails for permission/device reasons, proceed to clipboard fallback
      console.warn('Web Share failed, falling back to clipboard copy:', err);
    }
  }

  // Fallback to clipboard
  return await copyUrlToClipboard(recipientName);
}

/**
 * Copies shareable URL to clipboard with legacy fallback.
 */
export async function copyUrlToClipboard(recipientName?: string): Promise<ShareResult> {
  const url = getShareableUrl(recipientName);

  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return {
        success: true,
        action: 'copied',
        message: 'Link copied to clipboard! Share it with someone special.'
      };
    } catch (err) {
      console.warn('Clipboard API write failed, trying fallback:', err);
    }
  }

  // Legacy execCommand fallback for restricted iframe / older browsers
  try {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      return {
        success: true,
        action: 'copied',
        message: 'Link copied to clipboard! Share it with someone special.'
      };
    }
  } catch (err) {
    console.error('Legacy copy failed:', err);
  }

  return {
    success: false,
    action: 'failed',
    message: 'Could not copy link automatically. Please copy the URL from your address bar.'
  };
}
