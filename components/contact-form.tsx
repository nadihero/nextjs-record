'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ContactFormProps {
  onSave: () => void;
}

const ContactForm = ({ onSave }: ContactFormProps) => {
  const [total, setTotal] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    try {
      const { data, error } = await supabase
        .from('contacts') // Ganti 'contacts' dengan nama tabel Anda
        .insert([{ total, tanggal }]);

      if (error) {
        throw error;
      }
      setTotal('');
      setTanggal('');
      if (onSave) onSave(); // Panggil callback setelah berhasil menyimpan
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="col-lg-12">
        <div className="row">
          <div className="mb-4">

            <label htmlFor="tanggal">Tanggal</label>
            <div className="input-group mb-3">
              <input
                className="form-control"
                type="date"
                id="tanggal"
                placeholder="Tanggal"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
              />
            </div>

            <label htmlFor="total">Total</label>
            <div className="input-group mb-3">
              <input
                className="form-control"
                type="text"
                id="total"
                placeholder="Total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                required
              />
            </div>




          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">Error: {error}</p>}


          <div className="flex items-center justify-between">
            <button
              className="btn btn-primary col-12 mb-5"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Tambah'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;