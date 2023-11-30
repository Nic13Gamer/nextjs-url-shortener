import { auth } from '@/auth';
import ShortenUrlForm from '@/components/dashboard/shorten-url-form';
import { getUserBySession } from '@/lib/utils';

export default async function Page() {
  const session = await auth();
  const user = await getUserBySession(session);

  return (
    <div className="container">
      <header className="flex flex-col gap-1 mt-7 mb-10">
        <h1 className="text-5xl text-center font-bold">QuickLink Dashboard</h1>
        <h2 className="text-2xl text-center">Welcome, {user?.name}!</h2>
      </header>

      <ShortenUrlForm />
    </div>
  );
}
