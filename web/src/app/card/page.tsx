"use client";

import { useEffect, useState } from "react";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { LogoName } from "@/components/card/logo-name";
import { Title } from "@/components/card/title";
import { WebImage } from "@/components/card/image";
import { Description } from "@/components/card/description";
import { Footer } from "@/components/card/footer";
import { useSearchParams } from "next/navigation";

// Components
const LogoNameComponent = ({ data }: { data: WebsiteData }) => (
  <>
    {data ? (
      <LogoName
        name={data.name ? data.name : "Escreva o nome"}
        logo={
          data.logo
            ? data.logo
            : "https://png.pngtree.com/png-clipart/20201029/ourmid/pngtree-circle-clipart-gray-circle-png-image_2381994.jpg"
        }
      />
    ) : (
      <p>Loading...</p>
    )}
  </>
);
const TitleComponent = ({ data }: { data: WebsiteData }) => (
  <>
  {data ? (
  <Title title={data?.title || "Testing DND Kit"} />
  ) : <p>Loading...</p>}
  </>
);
const ImageComponent = ({ data }: { data: WebsiteData }) => (
 <>
 {data ? (
 <WebImage
 image={
   data?.img ||
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPbbrTRmmZ5ry2_WKv8XNPUuvv2TeegHtbA&s"
 }
/>
 ) : <p>Loading...</p>}
 </>
 
);
const DescriptionComponent = ({ data }: { data: WebsiteData }) => (
  <>
  {data ? (
  <Description
  description={data?.description || "This is the url description"}
/>
  ) : <p>Loading...</p>}
  </>
);
const FooterComponent = () => <Footer />;

// List of Components
const componentsList = [
  LogoNameComponent,
  TitleComponent,
  ImageComponent,
  DescriptionComponent,
  FooterComponent,
];

const getItems = () => {
  return componentsList.map((Component, index) => ({
    id: index + 1,
    component: Component,
  }));
};

const SortableItem = ({ id, component: Component, style, data }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const combinedStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
      className={`p-4 border-2 border-blue-400 dark:border-blue-300 ${style}`}
      {...attributes}
      {...listeners}
    >
      <Component data={data} /> {/* Pass the data as a prop to the component */}
    </div>
  );
};

interface WebsiteData {
  logo?: string;
  name?: string;
  title?: string;
  img?: string;
  description?: string;
}

function App() {
  const [items, setItems] = useState(getItems());
  const [data, setData] = useState<WebsiteData | null>(null);
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    setItems((items) => {
      const oldIndex = items.findIndex((it) => it.id === active.id);
      const newIndex = items.findIndex((it) => it.id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const styleMap: { [key: number]: string } = {
    0: "col-span-2 row-span-2",
    1: "col-span-3 row-span-2",
    2: "col-span-1 row-span-2",
    3: "col-span-1 row-span-1",
    4: "col-span-2 row-span-1",
  };

  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[54rem] ">
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                id={item.id}
                component={item.component}
                style={styleMap[index]}
                data={data} // Pass the fetched data to SortableItem
              />
            ))}
          </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
