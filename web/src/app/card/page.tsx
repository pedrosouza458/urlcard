"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, FormEvent } from "react";
import { createSwapy } from "swapy";
import dynamic from "next/dynamic";

const DEFAULT: Record<string, "a" | "b" | "c" | "d" | "e"> = {
  "1": "a",
  "2": "b",
  "3": "c",
  "4": "d",
  "5": "e",
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
function A({ data }: { data: WebsiteData }) {
  return (
    <div className="item a" data-swapy-item="a">
      {data ? (
        <div className="flex items-center justify-center gap-2 rounded-xl">
          <Image
            alt="teste"
            height={0}
            width={30}
            className="rounded-full"
            src={data.logo ? data.logo : ""}
          />
          <h1 className="font-semibold">{data.name}</h1>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function B({ data }: { data: WebsiteData }) {
  return (
    <div className="item b w-full h-full" data-swapy-item="b">
      {data ? (
        <h1 className="my-4 h-full w-full border-2 dark:border-slate-800 p-3 rounded-xl font-semibold text-xl overflow-hidden text-ellipsis whitespace-nowrap">
          {data.title}
        </h1>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

function C({ data }: { data: WebsiteData }) {
  return (
    <div className="item c" data-swapy-item="c">
      {data ? (
        <div className="flex-shrink-0">
          <img
            className="rounded-lg h-72 w-full object-cover"
            src={data.img}
            alt=""
          />
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
function D({ data }: { data: WebsiteData }) {
  return (
    <div className="item d flex-grow h-full" data-swapy-item="d">
      {data ? (
        <div className="border-2 dark:border-slate-800 p-3 rounded-xl h-full w-full">
          {data.description}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function E() {
  return (
    <div className="item e flex-grow h-full" data-swapy-item="e">
      <div className="border-2 dark:border-slate-800 rounded-xl p-3 h-full w-full">
        Made with ❤️ by URLCard
      </div>
    </div>
  );
}
interface WebsiteData {
  logo?: string;
  name?: string;
  title?: string;
  img?: string;
  description?: string;
}

function getItemById(
  itemId: "a" | "b" | "c" | "d" | "e" | null,
  data: WebsiteData | null
) {
  switch (itemId) {
    case "a":
      return <A data={data} />;
    case "b":
      return <B data={data} />;
    case "c":
      return <C data={data} />;
    case "d":
      return <D data={data} />;
    case "e":
      return <E />;
    default:
      return null;
  }
}

function App() {
  const [data, setData] = useState<WebsiteData | null>(null);
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/websites?url=${url}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch website data:", error);
      }
    };

    fetchData();
  }, [url]);

  const slotItems: Record<string, "a" | "c" | "d" | null> =
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
  const router = useRouter();
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const url = formData.get("url");
    router.push(`/card?url=${url}`);
    // ...
  }
  return (
    <div className="flex justify-center">
      <div className="container w-[50rem] border-2 px-4 py-4 rounded-xl dark:border-slate-800">
        <div className="slot a" data-swapy-slot="1">
          {getItemById(slotItems["1"], data)}
        </div>
        <div className="slot b" data-swapy-slot="2">
          {getItemById(slotItems["2"], data)}
        </div>
        <div className="flex gap-4 rounded-xl">
          <div className="slot c" data-swapy-slot="3">
            {getItemById(slotItems["3"], data)}
          </div>
          <div className="flex-grow flex flex-col gap-3">
            <div className="slot d flex-grow" data-swapy-slot="4">
              {getItemById(slotItems["4"], data)}
            </div>

            <div className="slot e" data-swapy-slot="5">
              {getItemById(slotItems["5"], data)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-row gap-3">
        <form onSubmit={onSubmit}>
          <input
            className="bg-slate-100 dark:bg-slate-800 w-96 p-4 rounded-xl"
            name="url"
            type="text"
            placeholder="Place you url"
          />
          <button
            type="submit"
            className="p-4 bg-black text-white dark:bg-white dark:text-black rounded-xl"
          >
            Create card
          </button>
        </form>
      </div>
    </div>
  );
}
