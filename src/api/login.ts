import supabase from '../utils/supabase';
import { userStore } from '../stores/userStore';

export async function Uid() {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error('유저 정보를 가져올 수 없습니다:', error);
    userStore.getState().clearUid();
    return;
  }

  userStore.getState().setUid(data.user.id);
}
