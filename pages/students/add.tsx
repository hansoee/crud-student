import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Add.module.css'; 

export default function AddStudent() {
  const [NIM, setNIM] = useState('');
  const [NamaDepan, setNamaDepan] = useState('');
  const [NamaBelakang, setNamaBelakang] = useState('');
  const [TanggalLahir, setTanggalLahir] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ NIM, NamaDepan, NamaBelakang, TanggalLahir }),
    });
    if (res.ok) {
      router.push('/students');
    } else {
      setError("NIM IS ALREADY TAKEN");
    }
  };

  return (
    <div className={styles['form-container']}>
      <h1 className={styles['form-title']}>Add Student</h1>
      {error && <p className={styles['form-error']}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label>NIM</label>
          <input type="text" value={NIM} onChange={(e) => setNIM(e.target.value)} className={styles['form-control']} required />
        </div>
        <div className={styles['form-group']}>
          <label>First Name</label>
          <input type="text" value={NamaDepan} onChange={(e) => setNamaDepan(e.target.value)} className={styles['form-control']} required />
        </div>
        <div className={styles['form-group']}>
          <label>Surname</label>
          <input type="text" value={NamaBelakang} onChange={(e) => setNamaBelakang(e.target.value)} className={styles['form-control']} required />
        </div>
        <div className={styles['form-group']}>
          <label>Date of Birth</label>
          <input type="date" value={TanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} className={styles['form-control']} required />
        </div>
        <div className={styles['form-actions']}>
          <button type="submit" className={styles['form-button']}>Add</button>
        </div>
      </form>

    </div>
  );
}
