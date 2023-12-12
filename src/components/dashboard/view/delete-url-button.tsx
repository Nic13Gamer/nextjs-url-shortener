'use client';

import { deleteShortUrl } from '@/actions';
import { Button } from '@/components/ui/button';
import { ShortUrl } from '@prisma/client';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DeleteUrlButton({ url }: { url: ShortUrl }) {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  async function buttonClick() {
    setClicked(true);

    const result = await deleteShortUrl(url.id);
    if (result.message) {
      toast.error(result.message);
    }
    if (result.success === true) {
      toast.success('The QuickLink was deleted.');
      router.replace(window.location.origin + '/dashboard');
    }
  }

  return (
    <Button variant="destructive" disabled={clicked} onClick={buttonClick}>
      {!clicked ? (
        <>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete QuickLink
        </>
      ) : (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
    </Button>
  );
}
