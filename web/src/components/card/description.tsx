interface DescriptionProps {
  description: string | null;
}

export function Description({description}: DescriptionProps){
  return (
    <div className="item d h-full">
    {description ? (
      <div className="border-2 dark:border-slate-800 p-3 rounded-xl h-full">
        {description}
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}