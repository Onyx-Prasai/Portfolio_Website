import { supabase } from '../supabaseClient';

export const createService = <T extends { id?: string }>(tableName: string) => {
  return {
    async getAll() {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      // Map 'id' to '_id' if needed to maintain compatibility with existing frontend
      return data.map(item => ({ ...item, _id: item.id }));
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return { ...data, _id: data.id };
    },

    async create(item: Partial<T>) {
      // Remove _id if present to let Supabase generate a new UUID
      const { _id, ...rest } = item as any;
      const { data, error } = await supabase
        .from(tableName)
        .insert([rest])
        .select()
        .single();
      
      if (error) throw error;
      return { ...data, _id: data.id };
    },

    async update(id: string, item: Partial<T>) {
      // Remove _id and id from update body
      const { _id, id: _, ...rest } = item as any;
      const { data, error } = await supabase
        .from(tableName)
        .update(rest)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return { ...data, _id: data.id };
    },

    async delete(id: string) {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { success: true };
    }
  };
};

export const skillsService = createService('skills');
export const projectsService = createService('projects');
export const experiencesService = createService('experiences');
export const educationsService = createService('educations');
export const conferencesService = createService('conferences');
