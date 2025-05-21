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

// Actualizar registros genéricamente
export const updateData = async (tableName, idField, idValue, changes) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(changes)
      .eq(idField, idValue)
      .select(); // opcional: devuelve lo actualizado

    if (error) {
      console.error(`Error updating ${tableName}:`, error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.error(`Unexpected error updating ${tableName}:`, error);
    return { error: { message: error.message } };
  }
};

// Borrar registros genéricamente
export const deleteData = async (tableName, idField, idValue) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq(idField, idValue);

    if (error) {
      console.error(`Error deleting from ${tableName}:`, error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.error(`Unexpected error deleting from ${tableName}:`, error);
    return { error: { message: error.message } };
  }
};


//
// ————— Funciones específicas para citas —————
//

// Traer lista de citas junto con el detalle de estado
export const fetchCitas = async () => {
  try {
    const { data, error } = await supabase
      .from('cita')
      .select(`
        idcita,
        fechacita,
        horacita,
        usuarioidusuario (
          idusuario,
          nombreusuario
        ),
        estadoidestado (
          detalle
        )
      `)
    if (error) {
      console.error('Error fetching citas:', error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.error('Unexpected error fetching citas:', error);
    return { error: { message: error.message } };
  }
};

// Actualizar una cita (fecha, hora, estado…)
export const updateCita = (idcita, cambios) =>
  updateData('cita', 'idcita', idcita, cambios);

// Eliminar una cita
export const deleteCita = (idcita) =>
  deleteData('cita', 'idcita', idcita);

export const fetchComentarios = async () => {
  try {
    const { data, error } = await supabase
      .from('comentario')
      .select(`
        idcomentario,
        descripcioncomentario,
        usuarioidusuario,
        usuarioidusuario (
          idusuario,
          nombreusuario
        )
      `);

    if (error) {
      console.error('Error fetching comentarios:', error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.error('Unexpected error fetching comentarios:', error);
    return { error: { message: error.message } };
  }
};

// Actualizar comentario por id
export const updateComentario = (idcomentario, cambios) =>
  updateData('comentario', 'idcomentario', idcomentario, cambios);

// Eliminar comentario por id
export const deleteComentario = (idcomentario) =>
  deleteData('comentario', 'idcomentario', idcomentario);


// Obtener todos los artículos
export const fetchArticulos = async () => {
  try {
    const { data, error } = await supabase
      .from("articulo")
      .select("*");

    if (error) {
      console.error("Error al obtener artículos:", error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error("Error inesperado al obtener artículos:", error);
    return { error: { message: error.message } };
  }
};


// Puedes agregar aquí otras funciones para insertar, actualizar, eliminar, etc.    