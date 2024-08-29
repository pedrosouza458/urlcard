"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createSwapy } from "swapy";
import dynamic from "next/dynamic";
const DEFAULT = {
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
      {/* <div className="handle" data-swapy-handle></div> */}
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

function E({ data }: { data: WebsiteData }) {
  return (
    <div className="item e flex-grow h-full" data-swapy-item="e">
      {data ? (
        <div className="border-2 dark:border-slate-800 rounded-xl p-3 h-full w-full">
          Made with ❤️ by URLCard
        </div>
      ) : (
        <p>Loading...</p>
      )}
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

function getItemById(itemId: "a" | "b" | "c" | "d" | "e" | null) {
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
      return <E data={data} />;
  }
}

function App() {
  const slotItems: Record<string, "a" | "b" | "c" | "d" | null> =
    localStorage.getItem("slotItem")
      ? JSON.parse(localStorage.getItem("slotItem")!)
      : DEFAULT;

  useEffect(() => {
    const container = document.querySelector(".container");
    if (!container) return; // Ensure the container exists

    try {
      const swapy = createSwapy(container);

      // Optional: Add error handling for node manipulation
      swapy.onSwap(({ data }) => {
        try {
          localStorage.setItem("slotItem", JSON.stringify(data.object));
        } catch (error) {
          console.error("Swapy Error:", error);
        }
      });
    } catch (error) {
      console.error("Swapy Initialization Error:", error);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container w-[50rem] border-2 px-4 py-4 rounded-xl dark:border-slate-800">
        <div className="slot a" data-swapy-slot="1">
          {getItemById(slotItems["1"]) || <div>Loading...</div>}
        </div>
        <div className="slot b" data-swapy-slot="2">
          {getItemById(slotItems["2"]) || <div>Loading...</div>}
        </div>
        <div className="flex flex-grow gap-4 rounded-xl">
          <div className="slot c" data-swapy-slot="3">
            {getItemById(slotItems["3"]) || <div>Loading...</div>}
          </div>
          <div className="flex-grow flex flex-col gap-3">
            <div className="slot d flex-grow" data-swapy-slot="4">
              {getItemById(slotItems["4"]) || <div>Loading...</div>}
            </div>
            <div className="slot e" data-swapy-slot="5">
              {getItemById(slotItems["5"]) || <div>Loading...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}