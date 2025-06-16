import supabase from '../../utils/supabase';

// 좋아요 눌렀는지 확인
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

// 좋아요 총 개수 조회
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

// posts.like_count 업데이트 좋아요추가
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

  // posts.like_count 다시 조회
  const { count, error: countError } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', post_id);

  if (countError) {
    console.error('countError in addLike:', countError);
  } else {
    const { error: updateError } = await supabase
      .from('posts')
      .update({ like_count: count })
      .eq('id', post_id);

    if (updateError) {
      console.error('Failed to update like_count in posts:', updateError);
    }
  }

  return data && data.length > 0;
}

// posts.like_count 좋아요삭제
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

  // posts.like_count 다시 조회
  const { count, error: countError } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', post_id);

  if (countError) {
    console.error('countError in removeLike:', countError);
  } else {
    const { error: updateError } = await supabase
      .from('posts')
      .update({ like_count: count })
      .eq('id', post_id);

    if (updateError) {
      console.error('Failed to update like_count in posts:', updateError);
    }
  }

  return true;
}
