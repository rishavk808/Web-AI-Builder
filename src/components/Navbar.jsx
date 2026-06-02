import React from 'react'

const Navbar = ({ isDarkMode = true, setIsDarkMode }) => {
  const handleToggle = () => {
    if (typeof setIsDarkMode === 'function') {
      setIsDarkMode(!isDarkMode);
    }
  };

  return (
    <div className="nav flex items-center justify-between px-[120px] h-[70px]">
      <div className="logo">
        <h3 className="text-[25px] font-bold bg-gradient-to-br from-violet-400 to-purple-600 bg-clip-text text-transparent">
          WebAI
        </h3>
      </div>
      <div className="icons flex items-center gap-[15px]">
        {/* Toggle Theme Option on click with safety check */}
        <button 
          className="icon cursor-pointer select-none transition-all duration-300 hover:opacity-[.8] focus:outline-none bg-transparent border-none p-0" 
          onClick={handleToggle}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            // Custom high-quality Sun SVG (replacing IoMdSun)
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-[20px] h-[20px] text-yellow-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 256c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16s16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-352c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16zm154.8 296.8c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l22.6 22.6c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-22.6-22.6zm-261.6-261.6c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l22.6 22.6c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-22.6-22.6zM448 240h-32c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16zM96 240H64c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16zm314.8-103.2c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l22.6-22.6zm-261.6 261.6c-6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l22.6-22.6z"></path>
            </svg>
          ) : (
            // Custom high-quality Moon SVG (replacing IoMdMoon)
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg">
              <path d="M263.9 10.4c-4.4-.3-8.8.4-12.8 2.3-10.4 4.8-15.5 16.3-12.2 27.2C263.7 122 250 206.5 190.2 266.3c-59.8 59.8-144.3 73.5-226.4 48.7-10.9-3.3-22.4 1.8-27.2 12.2-4.9 10.5-1.5 23.2 8.1 29.8 44.8 30.6 98 48.4 155.3 48.4 154.6 0 280-125.4 280-280 0-57.3-17.8-110.5-48.4-155.3-5.8-8.5-15.7-12.9-25.1-13c-1-.1-2-.1-2.6-.1z"></path>
            </svg>
          )}
        </button>

        {/* Custom high-quality User SVG (replacing FaUser) */}
        <span className="icon flex items-center justify-center">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg">
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C100.2 288 0 388.2 0 512h448c0-123.8-100.2-224-224-224z"></path>
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Navbar