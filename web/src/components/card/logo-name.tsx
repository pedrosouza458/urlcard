import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from 'react';

interface LogoNameProps {
  logo: string;
  name: string ;
}

export function LogoName({logo, name }: LogoNameProps) {

  return (

      <div className="flex items-center justify-center gap-2 rounded-xl">
          <Image
            alt="teste"
            height={0}
            width={30}
            className="rounded-full"
            src={logo}
          /> 

          <h1 className="font-semibold">{name}</h1>
        
      </div>

  );
}
