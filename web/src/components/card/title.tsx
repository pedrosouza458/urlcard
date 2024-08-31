interface TitleProps {
  title: string | null;
}

export function Title({title}: TitleProps){
  return (
  
      <h1 className="my-4 max-h-full border-2 dark:border-slate-800 p-3 rounded-xl font-semibold text-xl overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h1>
  
  )
}