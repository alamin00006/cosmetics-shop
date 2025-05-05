/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface ProductThumbnailsProps {
  thumbnails: string[];
  onThumbnailClick: (image: string) => void;
}

const ProductThumbnails: React.FC<ProductThumbnailsProps> = ({ thumbnails, onThumbnailClick }) => {
  return (
    <div className="flex flex-col space-y-2">
      {thumbnails.map((thumbnail, index) => (
        <img
          key={index}
          src={thumbnail}
          alt={`Thumbnail ${index + 1}`}
          className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 object-cover rounded border border-gray-200 cursor-pointer hover:border-gray-400"
          onClick={() => onThumbnailClick(thumbnail)}
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/64?text=Thumbnail`;
          }}
        />
      ))}
    </div>
  );
};

export default ProductThumbnails;