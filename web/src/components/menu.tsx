import Link from "next/link";
import { ThemeSwitcher } from "./theme/theme-switcher";

export function Menu(){
  return (
    <div className="flex flex-row justify-center pt-4 gap-4">
     <Link href={'/'}>Home</Link>
     <ThemeSwitcher/>
    </div>
  )
}