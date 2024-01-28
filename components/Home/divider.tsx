import divider from 'app/divider.png';
import Image from 'next/image';

export default function Divider() {
  return (
    <div className="my-5 flex w-full items-center justify-center">
      <Image alt="curvy divider" src={divider} />
    </div>
  );
}
