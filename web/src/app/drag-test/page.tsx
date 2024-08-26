"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createSwapy } from "swapy";

const DEFAULT = {
  "1": "a",
  "2": "b",
  "3": "c",
  "4": "d",
  "5": "e",
};

function A() {
  return (
    <div className="item a" data-swapy-item="a">
      <div className="handle" data-swapy-handle></div>
      <div className="flex items-center justify-center gap-2 rounded-xl">
        <Image
          alt="teste"
          height={0}
          width={30}
          className="rounded-full"
          src="https://utfs.io/f/503dc239-2ada-4caf-9f5a-ef92a778c194-n8l1zp.png"
        />
        <h1 className="font-semibold">Teste</h1>
      </div>
    </div>
  );
}

function B() {
  return (
    <div className="item b" data-swapy-item="b">
      <h1 className="my-4 border-2 dark:border-slate-800 p-3 rounded-xl font-semibold text-xl overflow-hidden text-ellipsis whitespace-nowrap">
        This is the url title
      </h1>
    </div>
  );
}

function C() {
  return (
    <div className="item c" data-swapy-item="c">
      <div className="flex-shrink-0">
        <img
          className="rounded-lg h-72 w-80 object-cover"
          src="https://opengraph.githubassets.com/fc6e88dbc0cd177daaa61171b6651dfdc8a21de146b3e97ec546a9c9e0505787/pedrosouza458/urlcard"
          alt=""
        />
      </div>
    </div>
  );
}

function D() {
  return (
    <div className="item d" data-swapy-item="d">
      <div className="border-2 dark:border-slate-800 p-3 h-full rounded-xl flex-grow">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis,
        quidem dolore voluptas deleniti eveniet sed pariatur, consequatur amet
        porro omnis magnam voluptatem culpa adipisci, nulla quod dignissimos
        veritatis temporibus voluptatum?
      </div>
    </div>
  );
}

function E() {
  return (
    <div className="item e" data-swapy-item="e">
      <div className="border-2 dark:border-slate-800  rounded-xl p-3">
        Made with ❤️ by URLCard
      </div>
    </div>
  );
}

function getItemById(itemId: "a" | "b" | "c" | "d" | "e" | null) {
  switch (itemId) {
    case "a":
      return <A />;
    case "b":
      return <B />;
    case "c":
      return <C />;
    case "d":
      return <D />;
    case "e":
      return <E />;
  }
}

function App() {
  const slotItems: Record<string, "a" | "b" | "c" | "d" | null> =
    localStorage.getItem("slotItem")
      ? JSON.parse(localStorage.getItem("slotItem")!)
      : DEFAULT;
  useEffect(() => {
    const container = document.querySelector(".container")!;
    const swapy = createSwapy(container);
    swapy.onSwap(({ data }) => {
      localStorage.setItem("slotItem", JSON.stringify(data.object));
    });
  }, []);
  return (
    <div className="flex justify-center">
      <div className="container w-[50rem] border-2 px-4 py-4 rounded-xl dark:border-slate-800">
        <div className="slot a" data-swapy-slot="1">
          {getItemById(slotItems["1"])}
        </div>
        <div className="slot b" data-swapy-slot="2">
          {getItemById(slotItems["2"])}
          teste
        </div>
        <div className="flex gap-4 rounded-xl">
          <div className="slot c" data-swapy-slot="3">
            {getItemById(slotItems["3"])}
          </div>
          <div className="flex-grow flex flex-col gap-3">
            <div className="slot d" data-swapy-slot="4">
              {getItemById(slotItems["4"])}
            </div>

            <div className="slot e" data-swapy-slot="5">
              {getItemById(slotItems["5"])}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
