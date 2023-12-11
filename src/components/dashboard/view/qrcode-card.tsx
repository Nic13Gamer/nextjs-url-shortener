import { isExpired } from '@/lib/shortUrl';
import { cn } from '@/lib/utils';
import { ShortUrl } from '@prisma/client';
import Image from 'next/image';
import QRCode from 'qrcode';

export default async function QRCodeCard({ url }: { url: ShortUrl }) {
  const qrCodeImage = await QRCode.toDataURL(
    `https://nextjs-shortener.vercel.app/r/${url.name}`,
    { margin: 0.5, errorCorrectionLevel: 'medium' }
  );
  const expired = isExpired(url);

  return (
    <div className="flex h-fit w-fit flex-col gap-2 rounded-md border-2 p-2">
      <h1 className="text-center text-2xl font-medium">QR Code</h1>

      <div className="relative h-[256px] w-[256px]">
        <Image
          src={qrCodeImage}
          alt="QR Code"
          className={cn(
            'h-full w-full rounded-sm',
            (expired || !url.active) && 'blur-sm'
          )}
          width={256}
          height={256}
        />
        {(expired || !url.active) && (
          <div className="absolute inset-x-0 bottom-0 flex h-full w-full flex-col justify-center">
            <p className="rounded-lg bg-destructive p-2 text-center">
              QR Code not available for {expired ? 'expired' : 'inactive'}{' '}
              QuickLinks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
