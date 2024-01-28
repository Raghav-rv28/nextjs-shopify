import { Card, CardContent, CardTitle } from 'components/ui/card';
import { getCollections } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export default async function Collections() {
  const collections = await getCollections();

  return (
    <div className="my-8 flex w-full flex-col items-center justify-center text-center">
      <h2 className="my-3 text-5xl text-orange-300">Shop By Collections</h2>
      <h4 className="mb-5 text-2xl">
        Browse through your favorite categories. We&apos;ve got them all!
      </h4>
      <div className="mx-10 flex flex-row flex-wrap items-center justify-center gap-5">
        {collections
          .filter((val) => val.image)
          .map((val) => (
            <Link key={val.handle} href={`${val.path}`}>
              <Card className="group max-w-[svw] rounded-lg transition duration-1000">
                <CardTitle className="my-4">{val.title}</CardTitle>
                <CardContent>
                  <Image
                    className="rounded-lg group-hover:scale-105"
                    src={val.image?.url}
                    height={250}
                    width={250}
                    alt={val.image?.altText || ''}
                    priority={false}
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
