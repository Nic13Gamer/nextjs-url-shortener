import DemoShortenForm from '@/components/homepage/demo-shorten-form';

export default function Home() {
  return (
    <div className="container flex flex-col gap-20">
      <header className="mt-10 flex flex-col gap-1">
        <h1 className="text-center text-6xl font-bold">Shorten URLs quickly</h1>
        <h2 className="text-center text-xl">
          QuickLink is an open-source URL shortener made in NextJS
        </h2>
      </header>

      <DemoShortenForm />
    </div>
  );
}
