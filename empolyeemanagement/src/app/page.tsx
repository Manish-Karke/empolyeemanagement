import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div className="flex flex-col">
      <Link href="/components/EmpolyeeManagement/">EmpolyeeManagement</Link>
      <Link href="/components/Empolyeedetails/">Empolyeedetails</Link>
    </div>
  );
};
export default page;
