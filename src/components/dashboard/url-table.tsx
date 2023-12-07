import prisma from '@/db';
import { User } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { BarChartBig } from 'lucide-react';
import { TableActiveSwitch } from './table-active-switch';

export default async function UrlTable({ user }: { user: User }) {
  const shortUrls = await prisma.shortUrl.findMany({
    where: { userId: user.id },
  });

  return (
    <div className="rounded-md border-2 p-2">
      <h1 className="block text-center text-lg font-semibold md:hidden">
        Please use landscape mode to view QuickLinks table
      </h1>

      <div className="hidden md:block">
        <Table>
          <TableCaption>Your created QuickLinks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[350px]">Destination</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="w-[100px] text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {shortUrls.map((url) => (
              <TableRow key={url.id}>
                <TableCell className="font-medium">{url.name}</TableCell>
                <TableCell>
                  <a href={url.destination}>{url.destination}</a>
                </TableCell>
                <TableCell>
                  <TableActiveSwitch
                    initialCheck={url.active}
                    shortUrlId={url.id}
                  />
                </TableCell>
                <TableCell>{url.expiresAt ? 'Yes' : 'No'}</TableCell>
                <TableCell className="flex gap-2 text-right">
                  <Link
                    href={`/dashboard/url/${url.id}`}
                    className={buttonVariants({ variant: 'default' })}
                  >
                    <BarChartBig className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {shortUrls.length === 0 && (
            <TableFooter>
              <TableRow>
                <TableCell className="text-center" colSpan={4}>
                  You have not created any QuickLinks yet!
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}
