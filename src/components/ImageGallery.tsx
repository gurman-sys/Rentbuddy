
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageZoomModal from './ImageZoomModal';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleZoomNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleZoomPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-64">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg cursor-pointer"
          onClick={() => setIsZoomOpen(true)}
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
          onClick={() => setIsZoomOpen(true)}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <ImageZoomModal
        images={images}
        currentIndex={currentIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        onNext={handleZoomNext}
        onPrev={handleZoomPrev}
        title={title}
      />
    </>
  );
};

export default ImageGallery;
