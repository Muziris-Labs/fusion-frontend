import Image from "next/image";
import Link from "next/link";

export default function Socials() {
  return (
    <div className="flex items-center gap-4 px-9 pb-5">
      <Link href="https://x.com/fusionwallet" target="_blank">
        <Image
          src="/socials/twitter.png"
          alt="Twitter"
          width={18}
          height={20}
          className="dark:invert"
        />
      </Link>
      <Link href="https://discord.gg/H2rG8nddeD" target="_blank">
        <Image
          src="/socials/discord.png"
          alt="Discord"
          width={25}
          height={20}
          className="dark:invert"
        />
      </Link>
    </div>
  );
}
