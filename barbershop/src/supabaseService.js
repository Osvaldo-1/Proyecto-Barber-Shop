// supabaseService.js
import supabase from './supabaseClient';

// Función reutilizable para insertar datos en una tabla
export const insertData = async (tableName, dataToInsert) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert([dataToInsert])
        .select(); // Para obtener los datos insertados (opcional)
  
      if (error) {
        console.error(`Error inserting data into ${tableName}:`, error);
        return { error };
      }
  
      return { data };
    } catch (error) {
      console.error(`Unexpected error inserting into ${tableName}:`, error);
      return { error: { message: error.message } };
    }
  };

export const fetchData = async (tableName, filters = {}) => {
  let query = supabase.from(tableName).select();

  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      query = query.eq(key, filters[key]);
    }
  }

  try {
    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error(`Unexpected error fetching from ${tableName}:`, error);
    return { error: { message: error.message } };
  }
};



// Puedes agregar aquí otras funciones para insertar, actualizar, eliminar, etc.    