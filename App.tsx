
import React, { useState } from 'react';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import { generateRecipe, generateFoodImage } from './services/geminiService';
import { GenerationState } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<GenerationState>({
    recipe: null,
    imageUrl: null,
    loading: false,
    error: null,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setState({ ...state, loading: true, error: null, recipe: null, imageUrl: null });

    try {
      // Step 1: Generate Recipe & Prompt
      const recipe = await generateRecipe(input);
      setState(prev => ({ ...prev, recipe }));

      // Step 2: Generate Image
      const imageUrl = await generateFoodImage(recipe.imagePrompt);
      setState(prev => ({ ...prev, imageUrl, loading: false }));
    } catch (err) {
      console.error(err);
      setState({
        ...state,
        loading: false,
        error: "Our kitchen is momentarily busy. Please try another mindful request.",
      });
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col">
      <Header />

      <main className="flex-grow space-y-12">
        {/* Sticky Input Area */}
        <section className="sticky top-4 z-10 bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg border border-stone-100 transition-all duration-300">
          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are you craving today? (e.g., Refreshing summer salad, warm quinoa bowl...)"
              className="flex-grow bg-stone-50/50 border-none focus:ring-1 focus:ring-stone-200 px-6 py-4 rounded-xl text-stone-700 placeholder:text-stone-400 font-light outline-none transition-all"
            />
            <button
              type="submit"
              disabled={state.loading}
              className={`px-8 py-4 rounded-xl font-medium tracking-wide transition-all duration-300 ${
                state.loading 
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                : 'bg-stone-800 text-white hover:bg-stone-900 active:scale-[0.98]'
              }`}
            >
              {state.loading ? 'Creating...' : 'Nourish Me'}
            </button>
          </form>
        </section>

        {/* Loading State */}
        {state.loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="w-12 h-12 border-2 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
            <p className="text-stone-400 italic font-light animate-pulse">
              {state.recipe ? "Capturing the aesthetic..." : "Curating your wellness recipe..."}
            </p>
          </div>
        )}

        {/* Error State */}
        {state.error && (
          <div className="bg-red-50 text-red-500 p-6 rounded-xl border border-red-100 text-center font-light">
            {state.error}
          </div>
        )}

        {/* Results */}
        {(state.recipe || state.imageUrl) && (
          <div className="grid grid-cols-1 gap-12 lg:items-start">
            {/* Image Preview - Shows early if available */}
            {state.imageUrl && (
              <div className="w-full aspect-[4/3] rounded-sm overflow-hidden shadow-2xl bg-stone-100 group">
                <img 
                  src={state.imageUrl} 
                  alt={state.recipe?.title || "Wellness food"} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
              </div>
            )}

            {/* Recipe Content */}
            {state.recipe && <RecipeCard recipe={state.recipe} />}
          </div>
        )}

        {/* Empty State */}
        {!state.loading && !state.recipe && !state.error && (
          <div className="py-24 text-center">
            <p className="serif text-2xl text-stone-300 italic">
              Share your ingredients or mood to begin...
            </p>
          </div>
        )}
      </main>

      <footer className="mt-20 text-center text-[10px] uppercase tracking-[0.2em] text-stone-300">
        &copy; {new Date().getFullYear()} AuraChef Studio. Crafted for Wellness.
      </footer>
    </div>
  );
};

export default App;
