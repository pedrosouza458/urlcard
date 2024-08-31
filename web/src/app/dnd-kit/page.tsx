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
const LogoNameComponent = () => (
  <LogoName
    name={"Github"}
    logo={"https://cdn-icons-png.flaticon.com/512/25/25231.png"}
  />
);
const TitleComponent = () => <Title title={"Testing DND Kit"} />;
const ImageComponent = () => (
  <WebImage
    image={
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPbbrTRmmZ5ry2_WKv8XNPUuvv2TeegHtbA&s"
    }
  />
);
const DescriptionComponent = () => <Description description={"This is the url description"} />;
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

const SortableItem = ({ id, component: Component, style }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const combinedStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    // border: '1px solid black',
    // padding: '1em',
    // boxSizing: 'border-box',
    // cursor: 'grab',
    // ...style, // Merge additional styles
  };
  return (
    <div ref={setNodeRef} style={combinedStyle}  className={`p-4 ${style}`} {...attributes} {...listeners}>
      <Component /> {/* Render the component here */}
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
  const [items, setItems] = useState(getItems());

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
  // col-span-4 row-span-2 bg-red-500
  const styleMap: { [key: number]: string } = {
    0: "col-span-2 row-span-2", // Applies to the first item
    1: "col-span-3 row-span-2", // Applies to the second item
    2: "col-span-1 row-span-2", // Applies to the third item
    3: "col-span-1 row-span-1", // Applies to the fourth item
    4: "col-span-2 row-span-1", // Applies to the fifth item
  };
  
  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                id={item.id}
                component={item.component}
                style={styleMap[index]} // Apply the style based on the index
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
