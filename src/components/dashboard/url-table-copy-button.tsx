'use client';

import { ShortUrl } from '@prisma/client';
import { Button } from '../ui/button';
import { ClipboardCopy } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function UrlTableCopyButton({ url }: { url: ShortUrl }) {
  function copy() {
    navigator.clipboard.writeText(`${window.location.origin}/r/${url.name}`);
    toast.info('Copied to clipboard!');
  }

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={!url.active}
      className={cn(
        !url.active &&
          'disabled:pointer-events-auto disabled:cursor-not-allowed'
      )}
      onClick={copy}
    >
      <ClipboardCopy className="mr-2 h-4 w-4" />
      Copy
    </Button>
  );
}
