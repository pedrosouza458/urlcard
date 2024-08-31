interface imageProps {
  image: string | null;
}

export function WebImage({ image }: imageProps) {
  return (
    <div className="item c" data-swapy-item="c">
    {image ? (
      <div className="flex-shrink-0">
        <img className="rounded-lg h-80 w-full object-cover" src={image} alt="" />
      </div>
    ) : (
      <p>Loading</p>
    )}
  </div>
  )
}
