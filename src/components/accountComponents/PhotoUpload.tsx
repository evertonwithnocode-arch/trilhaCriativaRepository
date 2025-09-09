import React, { useRef } from 'react';

interface PhotoUploadProps {
  onPhotoSelect: (file: File | null) => void;
  currentPhoto?: string | null;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoSelect, currentPhoto }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onPhotoSelect(file);
  };

  return (
    <div className="w-full mt-7 max-md:mt-10">
      <div className="aspect-[1/1] flex flex-col items-center justify-center w-40 h-40 bg-[#FEF9E5] px-8 rounded-[60px] max-md:px-5 cursor-pointer" onClick={handlePhotoClick}>
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="Profile"
            className="w-full h-full object-cover rounded-[60px]"
          />
        ) : (
          <img
            src="https://api.builder.io/api/v1/image/assets/7866627671144d8d8b91ecf861203027/1873f207ac256093f7845df66a91a1e4cc16d313?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-14"
            alt="Upload icon"
          />
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Selecionar foto do perfil"
      />
      
      <button
        type="button"
        onClick={handlePhotoClick}
        className="justify-center items-center flex min-h-10 gap-2 text-sm text-[#2C2623] font-extrabold tracking-[0.14px] leading-none bg-[#FCE699] mt-6 px-5 py-2.5 rounded-xl w-full hover:bg-[#F7B34D] transition-colors"
      >
        <span className="text-[#2C2623] self-stretch my-auto">
          Adicionar foto
        </span>
      </button>
    </div>
  );
};
