
export interface Recipe {
  title: string;
  ingredients: string[];
  steps: [string, string, string];
  wellnessTip: string;
  imagePrompt: string;
}

export interface GenerationState {
  recipe: Recipe | null;
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}
