import { redirect } from "react-router-dom";
import supabase from "../utils/supabase";

export const requireAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    return redirect("/login");
  }
};

export const requireNoAuth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    return redirect("/");
  }
};
