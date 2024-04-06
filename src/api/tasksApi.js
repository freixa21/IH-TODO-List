import { supabase } from '@/api/supabase'

const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const createTask = async (task) => {
  const { error } = await supabase
  .from(TABLE_NAME)
  .insert(task)
  
  if (error) {
    throw new Error(error.message)
  }

  return true
}


export const deleteTask = async (task) => {
  const { error } = await supabase
  .from(TABLE_NAME)
  .delete()
  .match({ 'id': task.id, 'user_id': task.user_id });
  if (error) {
    throw new Error(error.message)
  }
}

export const markTaskAsCompleted = async (task) => {
  const { error } = await supabase
  .from(TABLE_NAME)
  .update({ is_complete: 1 })
  .match({ 'id': task.id, 'user_id': task.user_id });
  if (error) {
    throw new Error(error.message)
  }
}


export const markTaskAsIncompleted = async (task) => {
  const { error } = await supabase
  .from(TABLE_NAME)
  .update({ is_complete: 0 })
  .match({ 'id': task.id, 'user_id': task.user_id });
  if (error) {
    throw new Error(error.message)
  }
}