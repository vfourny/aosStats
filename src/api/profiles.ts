import { supabase } from "@/services/supabase";
import { ProfileUpdate } from "@/store/user";

export const getProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .single();
  if (error) throw error
  return data;
};

export const updateProfileById = async (id: string | null, payload: ProfileUpdate) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('id', id)
    .select()
  if (error) throw error
  return data
}
