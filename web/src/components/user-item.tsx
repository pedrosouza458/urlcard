import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { FC } from 'react';

interface UserItemProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
}
const UserItem: FC<UserItemProps> = (props) => {
  const { id, name, email } = props.user;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=''
    >
       <div>
      <h1 className="text-center">Card from url: teste</h1>
    <div className="p-4 flex justify-center">

        <div  className="flex">
          
          <div className=" w-[50rem] border-2 px-4 py-4 rounded-xl dark:border-slate-800">
            <div className="flex items-center justify-center gap-2 rounded-xl">
              <Image
                height={0}
                width={30}
                className="rounded-full"
                src=""
                alt=""
              />
              <h1 className="font-semibold">name</h1>
            </div>
            <h1 className="my-4 border-2 dark:border-slate-800 p-3 rounded-xl font-semibold text-xl overflow-hidden text-ellipsis whitespace-nowrap">
           title
            </h1>
            <div className="flex gap-4 rounded-xl">
              <div className="flex-shrink-0">
                <img
                  className="rounded-lg h-72 w-80 object-cover"
                  src=""
                  alt=""
                />
              </div>
              <div className="flex-grow flex flex-col gap-3">
                <div className="border-2 dark:border-slate-800 p-3 h-full rounded-xl flex-grow">
                  description
                </div>
                <div className="border-2 dark:border-slate-800  rounded-xl p-3">
                  Made with ❤️ by URLCard
                </div>
              </div>
            </div>
          </div>
        </div>
  
      {/* <button onClick={prepareURL}>Download</button> */}
    </div>
    </div>
   
      {/* <button {...attributes} {...listeners} className='cursor-move'>
        Drag
      </button> */}
    </div>
  );
};

export default UserItem;