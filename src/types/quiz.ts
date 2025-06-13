export interface QuizQuestion {
  id: number;
  question: string;
  correct_answer: string;
  type: string;
  options: string[];
  explanation?: string | null;
  difficulty: string; 
}

export interface QuizAnswer {
  id?: number;
  answered_at: string;
  profile_id: string;
  question_id: number;
  selected_answer: string;
  is_correct: boolean;
}