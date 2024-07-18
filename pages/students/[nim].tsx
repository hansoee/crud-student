import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './Nim.module.css';
import Link from 'next/link';

export default function EditStudent() {
  const router = useRouter();
  const { nim } = router.query;
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    if (nim) {
      axios.get(`/api/students/${nim}`)
        .then((res) => setStudent(res.data))
        .catch((error) => console.error(error));
    }
  }, [nim]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/students/${nim}`, student);
      if (res.status === 200) {
        router.push('/students');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/students/${nim}`);
      if (res.status === 200) {
        router.push('/students');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className={styles['form-container']}>
      <h1 className={styles['form-title']}>Edit Student</h1>
      <form onSubmit={handleUpdate}>
        <div className={styles['form-group']}>
          <label>NIM</label>
          <input type="text" value={student.NIM} readOnly className={styles['form-control']} />
        </div>
        <div className={styles['form-group']}>
          <label>First Name</label>
          <input
            type="text"
            value={student.NamaDepan}
            onChange={(e) => setStudent({ ...student, NamaDepan: e.target.value })}
            className={styles['form-control']}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Surname</label>
          <input
            type="text"
            value={student.NamaBelakang}
            onChange={(e) => setStudent({ ...student, NamaBelakang: e.target.value })}
            className={styles['form-control']}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Date of Birth</label>
          <input
            type="date"
            value={student.TanggalLahir}
            onChange={(e) => setStudent({ ...student, TanggalLahir: e.target.value })}
            className={styles['form-control']}
            required
          />
        </div>
        <div className={styles['form-actions']}>
          <button type="submit" className={styles['form-button']}>Update</button>
          <button onClick={handleDelete} className={styles['form-button']}>Delete</button>
        </div>
        <div className={styles['form-actions']}>
            <Link href="/students" className={styles['form-button']}>
                Back to Students
            </Link>
        </div>
      </form>
    </div>
  );
}
