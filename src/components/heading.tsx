import React from "react";

import { Separator } from "@/components/ui/separator";

interface Props {
  title: string;
}

const Heading = (props: Props) => {
  const { title } = props;

  return (
    <div className="w-full h-fit my-6 py-4 flex flex-col items-start border-b">
      <p className="font-medium text-2xl">{title}</p>
    </div>
  );
};

export default Heading;
