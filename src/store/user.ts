import { getProfileById } from "@/api/profiles";
import { Database } from "@/database.types";
import { supabase } from "@/services/supabase";
import { User } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

type UserState = {
  profile: Profile | null;
  user: User | null;
};

export const useUserStore = defineStore("useUserStore", () => {
  const state: UserState = reactive({ profile: null, user: null });

  const isLoggedIn = computed(() => state.user !== null);

  const initializeAuthListener = () => {
    return new Promise((resolve) =>
      supabase.auth.onAuthStateChange(async (event, session) => {
        state.user = session?.user ? session.user : null;
        state.profile = session ? await getProfileById(session?.user.id) : null;
        resolve(true);
      })
    );
  };

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
      return true;
    } catch (error: any) {
      state.user = null;
      return false;
    }
  };

  const logOut = async () => {
    try {
      await supabase.auth.signOut();
      state.user = null;
      return true;
    } catch (e: any) {
      return false;
    }
  };
  return { initializeAuthListener, isLoggedIn, logOut, loginWithGoogle, state };
});
