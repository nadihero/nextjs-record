
'use client'; // Tambahkan ini jika Anda ingin interaksi langsung di halaman ini

import { useState } from 'react';
import ContactTable from "@/components/contact-table";
import ContactForm from "@/components/contact-form";

export default function Home() {
  const [refreshTable, setRefreshTable] = useState(false);

  const handleSave = () => {
    setRefreshTable(prev => !prev);
  };
  return (
    <div className="container">
      <div className="mt-4">
        <h2 className="">Record HM</h2>
      </div>
      <ContactForm onSave={handleSave} />
      <ContactTable key={refreshTable ? 'refresh' : 'no-refresh'} /> {/* Gunakan key untuk memaksa refresh */}
    </div>
  )

}