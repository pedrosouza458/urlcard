interface DescriptionProps {
  description: string | null;
}

export function Description({description}: DescriptionProps){
  return (

 
      <div className="border-2  h-full dark:border-slate-800 p-3 rounded-xl">
        {description}
      </div>

  )
}