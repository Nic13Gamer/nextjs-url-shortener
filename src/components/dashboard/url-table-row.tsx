import { ShortUrl } from '@prisma/client';
import { TableCell, TableRow } from '../ui/table';
import { cn } from '@/lib/utils';
import { TableActiveSwitch } from './table-active-switch';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { BarChartBig } from 'lucide-react';

const EXPIRED_CLASSNAME = 'opacity-50';
const SWITCH_EXPIRED_CLASSNAME = 'opacity-80';

function isExpired(url: ShortUrl) {
  return Boolean(url.expiresAt && Date.now() > url.expiresAt.getTime());
}

export default function UrlTableRow({ url }: { url: ShortUrl }) {
  return (
    <TableRow>
      <TableCell
        className={cn('font-medium', isExpired(url) && EXPIRED_CLASSNAME)}
      >
        <p>{url.name}</p>
      </TableCell>

      <TableCell>
        {!isExpired(url) ? (
          <a href={url.destination} target="_blank">
            {url.destination}
          </a>
        ) : (
          <p
            className={cn(
              'cursor-not-allowed',
              isExpired(url) && EXPIRED_CLASSNAME
            )}
          >
            {url.destination}
          </p>
        )}
      </TableCell>

      <TableCell className={cn(isExpired(url) && SWITCH_EXPIRED_CLASSNAME)}>
        <TableActiveSwitch
          initialCheck={url.active}
          shortUrlId={url.id}
          expired={isExpired(url)}
        />
      </TableCell>

      <TableCell>
        <p className={cn(isExpired(url) && EXPIRED_CLASSNAME)}>
          {url.expiresAt ? url.expiresAt.toISOString().split('T')[0] : 'Never'}
        </p>
      </TableCell>

      <TableCell className="flex gap-2 text-right">
        <Link
          href={`/dashboard/view/${url.id}`}
          className={buttonVariants({ variant: 'default' })}
        >
          <BarChartBig className="mr-2 h-4 w-4" />
          View
        </Link>
      </TableCell>
    </TableRow>
  );
}
