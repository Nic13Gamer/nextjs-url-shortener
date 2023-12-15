'use client';

import { toggleShortUrlActive } from '@/actions';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type UrlActiveSwitchProps = {
  initialCheck: boolean;
  shortUrlId: string;
  expired: boolean;
};

export default function UrlActiveSwitch({
  initialCheck,
  shortUrlId,
  expired,
}: UrlActiveSwitchProps) {
  const [checked, setChecked] = useState(initialCheck);

  useEffect(() => {
    async function toggleActive() {
      const active = await toggleShortUrlActive(
        {
          active: checked,
          shortUrlId,
        },
        true
      );

      if (active?.message) toast.error(active.message);
    }

    toggleActive();
  }, [checked, shortUrlId]);

  return (
    <div className="flex h-full items-center gap-1 rounded-md border bg-secondary/10 px-2">
      <label htmlFor="activeSwitch">Active:</label>

      <Switch
        id="activeSwitch"
        checked={expired ? false : checked}
        onCheckedChange={(e) => setChecked(e.valueOf())}
        disabled={expired}
      />
    </div>
  );
}
