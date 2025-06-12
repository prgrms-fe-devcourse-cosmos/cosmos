import supabase from '../../utils/supabase';

// 특정 게시글(post_id)에 대해 현재 사용자가 좋아요 눌렀는지 확인
export async function checkUserLike(
  post_id: number,
  profile_id: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', post_id)
    .eq('profile_id', profile_id);

  if (error) {
    console.error('checkUserLike error:', error);
    return false;
  }

  return data && data.length > 0;
}

// 좋아요 추가
export async function addLike(
  post_id: number,
  profile_id: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('likes')
    .insert([{ post_id, profile_id }])
    .select();

  if (error) {
    console.error('addLike error:', error);
    return false;
  }

  return data && data.length > 0;
}

// 좋아요 삭제
export async function removeLike(
  post_id: number,
  profile_id: string
): Promise<boolean> {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('post_id', post_id)
    .eq('profile_id', profile_id);

  if (error) {
    console.error('removeLike error:', error);
    return false;
  }

  return true;
}

// 게시글 좋아요 총 개수 조회
export async function getLikesCount(post_id: number): Promise<number> {
  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', post_id);

  if (error) {
    console.error('getLikesCount error:', error);
    return 0;
  }

  return count || 0;
}
