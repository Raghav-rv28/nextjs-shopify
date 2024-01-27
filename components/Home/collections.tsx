import { getCollections } from 'lib/shopify';
import Image from 'next/image';

export default async function Collections() {
  const collections = await getCollections();
  console.log(collections);
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center">
      <h2 className="my-3 text-5xl text-orange-300">Shop By Category</h2>
      <h4 className="mb-5 text-2xl">
        Browse through your favorite categories. We&apos;ve got them all!
      </h4>
      {collections
        .filter((val) => val.image)
        .map((val) => (
          <Image
            key={val.handle}
            src={val.image?.url}
            height={val.image?.height}
            width={val.image?.width}
            alt={val.image?.altText || ''}
          />
        ))}
    </div>
  );
}
