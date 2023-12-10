'use client';

import { ShortUrl } from '@prisma/client';
import { Button } from '../ui/button';
import { ClipboardCopy } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Switch } from '../ui/switch';
import { toggleShortUrlActive } from '@/actions';
import { useEffect, useState } from 'react';

export function UrlTableCopyButton({ url }: { url: ShortUrl }) {
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

type UrlTableActiveSwitchProps = {
  initialCheck: boolean;
  shortUrlId: string;
  expired: boolean;
};

export function UrlTableActiveSwitch({
  initialCheck,
  shortUrlId,
  expired,
}: UrlTableActiveSwitchProps) {
  const [checked, setChecked] = useState(initialCheck);

  useEffect(() => {
    async function toggleActive() {
      const active = await toggleShortUrlActive({
        active: checked,
        shortUrlId,
      });

      if (active?.message) toast.error(active.message);
    }

    toggleActive();
  }, [checked, shortUrlId]);

  return (
    <Switch
      checked={expired ? false : checked}
      onCheckedChange={(e) => setChecked(e.valueOf())}
      disabled={expired}
    />
  );
}

