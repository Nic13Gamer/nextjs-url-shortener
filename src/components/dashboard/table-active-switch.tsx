'use client';

import { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';
import { toggleShortUrlActive } from '@/actions';
import { toast } from 'sonner';

type TableActiveSwitchProps = {
  initialCheck: boolean;
  shortUrlId: string;
};

export function TableActiveSwitch({
  initialCheck,
  shortUrlId,
}: TableActiveSwitchProps) {
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
      checked={checked}
      onCheckedChange={(e) => setChecked(e.valueOf())}
    />
  );
}
