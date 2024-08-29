import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from 'react';

interface LogoNameProps {
  logo: string | null;
  name: string | null;
}

export function LogoName({logo, name }: LogoNameProps) {

  return (

      <div className="flex items-center justify-center gap-2 rounded-xl">
        {logo ? (
          <Image
            alt="teste"
            height={0}
            width={30}
            className="rounded-full"
            src={logo ? logo : ""}
          />
        ) : (
          <p>Loading...</p>
        )}
        {name ? (
          <h1 className="font-semibold">{name ? name : ""}</h1>
        ) : (
          <p>Loading...</p>
        )}
      </div>

  );
}
