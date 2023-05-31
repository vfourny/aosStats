import { supabase } from "@/services/supabase"

export const getGamesByPlayerId = async (playerId: string) => {
  const { data, error } = await supabase.from('games').select().eq('player_id', playerId)
  if (error) throw error
  return data
}

export const createGame = async (payload: any) => {
  const { data, error } = await supabase
    .from('games')
    .insert(payload)
    .select()
  if (error) throw error
  return data
}

export const deleteGameById = async (id: string) => {
  const { error } = await supabase.from('games')
    .delete()
    .eq('id', id)
  if (error) throw error
}
