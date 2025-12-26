
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <h1 className="serif text-5xl md:text-6xl text-stone-800 font-bold mb-2 tracking-tight">
        AuraChef
      </h1>
      <p className="text-stone-500 font-light tracking-widest uppercase text-xs md:text-sm">
        Nourish your body & soul
      </p>
      <div className="mt-4 w-16 h-px bg-stone-200 mx-auto"></div>
    </header>
  );
};

export default Header;
