"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
  image: string;
};

const Logged = ({ image }: User) => {
    console.log(image)
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => signOut}
        className="bg-gray-700 text-white text-sm px-6 py-2 rounded-lg"
      >
        Sign out
      </button>
      <Link href={"/dashboard"}>
        <Image src={image} alt="" priority width={64} height={64} />
      </Link>
    </li>
  );
};

export default Logged;
