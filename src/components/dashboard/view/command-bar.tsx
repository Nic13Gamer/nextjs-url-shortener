import { ShortUrl } from '@prisma/client';
import { CopyUrlButton } from './copy-url-button';
import { isExpired } from '@/lib/shortUrl';
import prisma from '@/db';
import DeleteUrlButton from './delete-url-button';
import { Separator } from '@/components/ui/separator';
import UrlActiveSwitch from './url-active-switch';

export default async function CommandBar({ url }: { url: ShortUrl }) {
  const uses = await prisma.shortUrlUse.count({
    where: { shortUrlId: url.id },
  });

  return (
    <div className="flex rounded-md border-2 p-2">
      <div className="flex items-center gap-2">
        <CopyUrlButton url={url} expired={isExpired(url)} />

        <Separator orientation="vertical" />

        <UrlActiveSwitch
          shortUrlId={url.id}
          initialCheck={url.active}
          expired={isExpired(url)}
        />
        <DeleteUrlButton url={url} />
      </div>

      <Separator orientation="vertical" className="mx-3" />

      <div className="flex h-full flex-col justify-center text-center text-2xl">
        <p>
          Total QuickLink uses: <b>{uses}</b>
        </p>
      </div>
    </div>
  );
}
