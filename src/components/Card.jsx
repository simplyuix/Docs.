
import React from 'react'; 
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoMdClose, IoMdTrash } from "react-icons/io"; 
import { motion } from "framer-motion";


function Card({ data, reference, onDelete }) {

  
  const tagColorStyles = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600',
    
  };
  const currentTagColorClass = tagColorStyles[data.tag?.tagColor?.toLowerCase()] || 'bg-gray-600';


const handleDelete = async () => {
  console.log('Card.jsx - data.id for delete:', data.id); 
    if (window.confirm("Are you sure you want to delete this card?")) {
        if (data && data.id) {
            onDelete(data.id);
        } else {
            console.error("Error: data.id is undefined in Card.jsx");
        }
    }
};
  return (
    <>
      <motion.div 
        drag 
        dragConstraints={reference} 
        className='relative w-60 h-72 rounded-[40px] bg-zinc-900/90 text-white px-5 py-8 text-sm overflow-hidden shadow-lg' 
      >
        {}
        {}

        <div className="flex items-center mb-3"> {}
          <FaRegFileAlt size="1.1em" className="mr-2 flex-shrink-0" /> 
          {}
        </div>
        <p className='text-xs leading-snug h-[calc(100%-120px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800'> {}
          {data.desc}
        </p>
        
        <div className='footer absolute bottom-0 w-full left-0'>
          <div className='flex items-center justify-between px-5 py-3 mb-2 border-t border-zinc-700/50'> {}
            <h5>{data.filesize}</h5>
            <span className='w-5 h-5 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-500'>
              {data.close ? <IoMdClose size=".9em" /> : <MdOutlineFileDownload size=".9em" color='#fff' />}
            </span>
          </div>
          {data.tag?.isOpen && ( 
            <div className={`tag w-full py-3 items-center flex justify-center ${currentTagColorClass}`}> {}
              <h3 className='text-xs font-semibold'>{data.tag.tagTitle}</h3>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Card;