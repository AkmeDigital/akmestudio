import Image from "next/image";
import logo from "../../public/akme_svg.svg";
import CurrentTime from "./currentTime";

export default function SecondaryFooter() {
  return (
    <div className="w-full mt-auto z-10">
      <div className="grid grid-cols-12 items-center gap-4 p-4">
        {/* First Column */}
        <div className="col-start-1 col-span-5 flex items-center">
          <Image src={logo} alt="Footer logo" width={100} height={100} className="w-full svg-color"/>
        </div>

        {/* Second Column */}
        <div className="col-start-8 col-span-4">
          <p>
            Multidisciplinary independent design studio based in Sydney, Australia.  
          </p>
        </div>

        {/* Third Column */}
        <div className="col-start-12 col-span-1 text-right">
          <CurrentTime />
        </div>
      </div>
    </div>
  );
}
