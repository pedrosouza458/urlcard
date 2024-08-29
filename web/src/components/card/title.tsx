interface TitleProps {
  title: string | null;
}

export function Title({title}: TitleProps){
  return (
    <div className="item b w-full h-full" data-swapy-item="b">
    {title ? (
      <h1 className="my-4 h-full w-full border-2 dark:border-slate-800 p-3 rounded-xl font-semibold text-xl overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h1>
    ) : (
      <p>Loading</p>
    )}
  </div>
  )
}