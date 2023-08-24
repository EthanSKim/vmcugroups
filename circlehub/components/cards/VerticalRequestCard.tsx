import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import avatar_2 from "/public/images/avatar-2.png";


interface RequestProps {
  id: string;
  name: string;
  year: string;
  major: string;
}

const VerticalRequestCard = ({
  data,
  reqType,
}: {
  data: RequestProps;
  reqType: string;
}) => {
  const { year, id, name, major } = data;
  return (
    <div className="single-box p-5">
      {/* <div className="avatar">
        <Image className="avatar-img w-100" src={avt} alt="avatar" />
      </div> */}
      <h6 className="m-0 mb-2 mt-3">{name}</h6>
      <p className="m-0 mb-2 mt-3">{year}</p>
      <p className="m-0 mb-2 mt-3">{major}</p>
      {/* <div className="friends-list d-center gap-1 text-center">
        <ul className="d-center">
          <li>
            <Image src={avatar_2} alt="image" />
          </li>
          <li>
            <Image src={avatar_2} alt="image" />
          </li>
          <li>
            <Image src={avatar_2} alt="image" />
          </li>
        </ul>
        <span className="smtxt m-0">{mutual} mutual friends</span>
      </div> */}
      {/* <div className="d-center gap-2 mt-4">
        <button className="cmn-btn">{reqType}</button>
        <button className="cmn-btn alt">Delete</button>
      </div> */}
    </div>
  );
};

export default VerticalRequestCard;
