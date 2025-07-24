'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Pastikan path ini benar

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data, error } = await supabase
          .from('contacts') // Ganti 'contacts' dengan nama tabel Anda
          .select('*');

        if (error) {
          throw error;
        }
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <p>Loading Database...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th width="10%">#</th>
          <th width="30%">Tanggal</th>
          <th width="40%">Total</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact, index) => (
          <tr key={contact.id}>
            <td>{index + 1}</td>
            <td>{contact.tanggal}</td>
            <td>{contact.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;