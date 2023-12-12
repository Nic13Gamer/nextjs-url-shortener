import { ShortUrl } from '@prisma/client';
import UrlBarChart from './url-bar-chart';
import prisma from '@/db';

type ChartDataArrayElement = {
  date: string;
  uses: number;
};

export default async function UrlUseChart({ url }: { url: ShortUrl }) {
  const uses = await prisma.shortUrlUse.findMany({
    where: { shortUrlId: url.id },
    orderBy: { createdAt: 'asc' },
  });

  const chartData: ChartDataArrayElement[] = [];
  uses.forEach((use) => {
    const date = use.createdAt.toISOString().split('T')[0];

    const existingElement = chartData.find((e) => e.date === date);
    if (existingElement) {
      existingElement.uses += 1;
    } else {
      chartData.push({ date, uses: 1 });
    }
  });

  return (
    <div className="h-[400px] w-full rounded-md border-2">
      <div className="flex h-full w-full flex-col gap-2 pr-2 pt-2">
        <h1 className="text-center text-xl font-medium">Usage by date</h1>

        {chartData.length > 0 ? (
          <UrlBarChart data={chartData} />
        ) : (
          <p className="text-center opacity-80">
            There is not enough data to display...
          </p>
        )}
      </div>
    </div>
  );
}
