export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  // TODO: protect page to only the short url author!!

  return (
    <>
      <p>View/edit short url Id: {id}</p>
    </>
  );
}
