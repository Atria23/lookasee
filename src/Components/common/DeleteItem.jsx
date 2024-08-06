import React, { useEffect, useState } from 'react';
import { supabase } from '../../client';

function DeleteItem() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('items').select('id, item_name, image_path');

      if (error) {
        throw error;
      }

      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (itemId, filePath) => {
    try {
      // Hapus item dari tabel
      const { error: deleteError } = await supabase.from('items').delete().eq('id', itemId);

      if (deleteError) {
        throw deleteError;
      }

      // Hapus file terkait dari storage
      const { error: storageError } = await supabase.storage.from('itemImages').remove([filePath]);

      if (storageError) {
        throw storageError;
      }

      // Perbarui daftar item setelah berhasil dihapus
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

      alert('Item dan file berhasil dihapus.');
    } catch (error) {
      console.error('Error deleting item or file:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
      <div>
        <h1>Daftar Item</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id} className='m-6'>
              <p>{item.item_name}</p>
              <p>{item.image_path}</p>
              <button onClick={() => deleteItem(item.id, item.image_path)}>Hapus</button><br />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default DeleteItem;
