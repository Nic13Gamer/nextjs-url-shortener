import { auth } from '@/auth';
import { getUser } from '@/lib/utils';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = await auth();
  const user = await getUser(session);

  // TODO: protect page to only the short url author!!

  return (
    <>
      <p>View/edit short url Id: {id}</p>
    </>
  );
}
