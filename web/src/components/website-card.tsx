import Image from "next/image";
import { useEffect, useState } from "react";
import { useRef } from "react";

// leaving these here you know you can tweak stuff further
const options = {
  allowTaint: true,
  useCORS: true,
  backgroundColor: "rgba(0,0,0,0)",
  removeContainer: true,
};

interface WebsiteCardProps {
  url: string;
}

interface WebsiteData {
  logo?: string;
  name?: string;
  title?: string;
  img?: string;
  description?: string;
}

export default function WebsiteCard({ url }: WebsiteCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const prepareURL = async () => {
    const cardElement = cardRef.current;

    if (!cardElement) return;

    try {
      // lazy load this package
      const html2canvas = await import(
        /* webpackPrefetch: true */ "html2canvas"
      );

      const result = await html2canvas.default(cardElement, options);

      const asURL = result.toDataURL("image/jpeg");
      // as far as I know this is a quick and dirty solution
      const anchor = document.createElement("a");
      anchor.href = asURL;
      anchor.download = "your-card.jpeg";
      anchor.click();
      anchor.remove();
     // maybe this part should set state with `setURLData(asURL)`
     // and when that's set to something you show the download button 
     // which has `href=URLData`, so that people can click on it
    } catch (reason) {
      console.log(reason);
    }
  };

  const [data, setData] = useState<WebsiteData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/websites?url=${url}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch website data:", error);
      }
    };

    fetchData();
  }, [url]);
  return (
    <div>
      <h1 className="text-center">Card from url: {url}</h1>
    <div className="p-4 flex justify-center">
      <article ref={cardRef}>
      {data ? (
        <div  className="flex">
          
          <div className="bg-white w-[50rem] border-2 px-4 py-4 rounded-xl">
            <div className="flex items-center justify-center gap-2 rounded-xl">
              <Image
                height={0}
                width={30}
                src={data.logo ? data.logo : ""}
                alt={data.name ? data.name : ""}
              />
              <h1 className="font-semibold">{data.name ? data.name : ""}</h1>
            </div>
            <h1 className="my-4 border-2 p-3 rounded-xl font-semibold text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
              {data.title}
            </h1>
            <div className="flex gap-4 rounded-xl">
              <div className="flex-shrink-0">
                <img
                  className="rounded-lg h-72 w-80 object-cover"
                  src={
                    data.img
                      ? data.img
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gCpA9648HkRfJeqGdtRQaockL1jH-ai4IQ&s"
                  }
                  alt=""
                />
              </div>
              <div className="flex-grow flex flex-col gap-3">
                <div className="border-2 p-3 h-full rounded-xl flex-grow">
                  {data.description ? data.description : ""}
                </div>
                <div className="border-2 rounded-xl p-3">
                  Made with ❤️ by URLCard
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : <p>Loading...</p>}
      </article>
      {/* <button onClick={prepareURL}>Download</button> */}
    </div>
    </div>
  );
}