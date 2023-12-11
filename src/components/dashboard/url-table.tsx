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
import UrlTableRow from './url-table-row';

export default async function UrlTable({ user }: { user: User }) {
  const shortUrls = await prisma.shortUrl.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="rounded-md border-2 p-2">
      <h1 className="block text-center text-lg font-semibold sm:hidden">
        Please use landscape mode to view QuickLinks table
      </h1>

      <div className="hidden sm:block">
        <Table>
          <TableCaption>Your created QuickLinks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[350px]">Destination</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>
                Expires
                <span className="text-xs dark:opacity-75"> (yyyy-mm-dd)</span>
              </TableHead>
              <TableHead className="w-[100px] text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {shortUrls.map((url) => (
              <UrlTableRow key={url.id} url={url} />
            ))}
          </TableBody>

          {shortUrls.length === 0 && (
            <TableFooter>
              <TableRow>
                <TableCell className="text-center" colSpan={5}>
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
