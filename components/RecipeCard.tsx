
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-100 rounded-sm animate-fade-in">
      <h2 className="serif text-3xl text-stone-800 mb-8 border-b border-stone-100 pb-4">
        {recipe.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="uppercase text-xs font-semibold tracking-widest text-stone-400 mb-4">
            Ingredients
          </h3>
          <ul className="space-y-3">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx} className="text-stone-600 font-light text-sm flex items-start">
                <span className="mr-2 text-stone-300">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="uppercase text-xs font-semibold tracking-widest text-stone-400 mb-4">
              Preparation
            </h3>
            <div className="space-y-6">
              {recipe.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="serif text-2xl text-stone-200 shrink-0">0{idx + 1}</span>
                  <p className="text-stone-600 text-sm leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-stone-50 p-6 rounded-sm italic text-stone-500 text-sm border-l-2 border-stone-200">
            <span className="font-semibold block mb-1 uppercase text-[10px] tracking-widest not-italic">
              Wellness Note
            </span>
            &ldquo;{recipe.wellnessTip}&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
