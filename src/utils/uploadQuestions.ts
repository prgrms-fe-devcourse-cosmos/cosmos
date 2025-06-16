import supabase from './supabase-node'
import { level1Questions, level2Questions, level3Questions } from '../data/quizData'

async function uploadQuestions() {
  const allQuestions = [...level1Questions, ...level2Questions, ...level3Questions]

  const { data, error } = await supabase
    .from('quiz_questions')
    .upsert(
      allQuestions.map(q => ({
        id: q.id,
        question: q.question,
        type: q.type,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        difficulty: q.difficulty,
      }))
    )

  if (error) {
    console.error('❌ 업로드 실패:', error)
  } else {
    console.log('✅ 업로드 성공:', data)
  }
}

uploadQuestions();