import { ThumbnailImageProps } from "react-grid-gallery";
import { motion } from "framer-motion";

const Thumbnail = (props: ThumbnailImageProps) => {
  return (
    <motion.img
      //@ts-ignore
      layoutId={props.item.metadata.id.toString()}
      alt="Thumbnail"
      src={props.imageProps.src}
      height={props.item.height}
      width={props.item.width}
      className="object-cover w-full h-full"
    />
  );
};

export default Thumbnail;
