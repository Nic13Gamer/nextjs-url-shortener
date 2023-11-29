import DemoShortenForm from '@/components/homepage/demo-shorten-form';

export default function Home() {
  return (
    <div className="container flex flex-col gap-20">
      <header className="flex flex-col gap-1 mt-10">
        <h1 className="text-6xl text-center font-bold">Shorten URLs quickly</h1>
        <h2 className="text-xl text-center">
          QuickLink is an open-source URL shortener made in NextJS
        </h2>
      </header>

      <DemoShortenForm />
    </div>
  );
}
