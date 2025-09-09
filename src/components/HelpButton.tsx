import React from 'react';

const HelpButton: React.FC = () => {
  const handleHelpClick = () => {
    console.log('Help button clicked');
  };

  return (
    <button
      onClick={handleHelpClick}
      className="fixed w-16 h-16 items-center gap-2 cursor-pointer bg-[#F7B34D] p-4 rounded-[100px] bottom-8 right-8 max-sm:w-14 max-sm:h-14 max-sm:p-3 max-sm:bottom-6 max-sm:right-6 hover:bg-[#e6a043] transition-colors flex z-50"
      aria-label="Ajuda"
    >
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<svg id=\"3504:102\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"help-icon\" style=\"width: 32px; height: 32px\"> <g clip-path=\"url(#clip0_3504_102)\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 0C7.16347 0 1.55069e-05 7.16345 1.55069e-05 16C1.55069e-05 19.1266 0.897899 22.0464 2.44994 24.5122L0.0817565 30.4327C-0.0740085 30.8222 -0.00396049 31.2656 0.264251 31.5879C0.532461 31.9104 0.955739 32.0601 1.36701 31.9778L9.08774 30.4336C11.1812 31.4379 13.5265 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16345 24.8366 0 16 0Z\" fill=\"white\"></path> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.7142 11.7143C13.7142 10.4519 14.7376 9.42857 15.9999 9.42857C17.2623 9.42857 18.2856 10.4519 18.2856 11.7143C18.2856 12.9766 17.2623 14 15.9999 14C15.0532 14 14.2856 14.7675 14.2856 15.7143V17.4286C14.2856 18.3753 15.0532 19.1429 15.9999 19.1429C16.9467 19.1429 17.7142 18.3753 17.7142 17.4286V17.167C20.0326 16.4388 21.7142 14.2729 21.7142 11.7143C21.7142 8.55838 19.1558 6 15.9999 6C12.844 6 10.2856 8.55838 10.2856 11.7143C10.2856 12.6611 11.0532 13.4286 11.9999 13.4286C12.9467 13.4286 13.7142 12.6611 13.7142 11.7143ZM18.2856 23.7143C18.2856 22.4519 17.2623 21.4286 15.9999 21.4286C14.7376 21.4286 13.7142 22.4519 13.7142 23.7143C13.7142 24.9767 14.7376 26 15.9999 26C17.2623 26 18.2856 24.9767 18.2856 23.7143Z\" fill=\"#F7B34D\"></path> </g> <defs> <clipPath id=\"clip0_3504_102\"> <rect width=\"32\" height=\"32\" fill=\"white\"></rect> </clipPath> </defs> </svg>",
        }}
      />
    </button>
  );
};

export default HelpButton;
