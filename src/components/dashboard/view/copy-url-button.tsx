'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShortUrl } from '@prisma/client';
import { ClipboardCopy } from 'lucide-react';
import { toast } from 'sonner';

export function CopyUrlButton({
  url,
  expired,
}: {
  url: ShortUrl;
  expired: boolean;
}) {
  function copy() {
    navigator.clipboard.writeText(`${window.location.origin}/r/${url.name}`);
    toast.info('Copied to clipboard!');
  }

  return (
    <Button
      disabled={!url.active || expired}
      className={cn('disabled:pointer-events-auto disabled:cursor-not-allowed')}
      onClick={copy}
    >
      <ClipboardCopy className="mr-2 h-4 w-4" />
      Copy
    </Button>
  );
}
