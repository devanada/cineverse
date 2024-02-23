import Link from "next/link";

type Props =
  | {
      title: string;
      showSeeMore?: false;
      navigate?: string;
    }
  | {
      title: string;
      showSeeMore: true;
      navigate: string;
    };

const Heading = (props: Props) => {
  const { title, showSeeMore, navigate } = props;

  return (
    <div className="w-full h-fit my-6 py-4 flex items-center justify-between border-b">
      <p className="font-medium text-2xl">{title}</p>
      {showSeeMore ? (
        <Link className="font-light text-sm" href={navigate}>
          See more
        </Link>
      ) : null}
    </div>
  );
};

export default Heading;
