import useSWR from 'swr';
import Link from 'next/link';
import axios from 'axios';
import styles from './Students.module.css'; 

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Students() {
  const { data, error } = useSWR('/api/students', fetcher);

  if (error) return <div className={styles['students-container']}>Failed to load</div>;
  if (!data) return <div className={styles['students-container']}>Loading...</div>;

  return (
    <div className={styles['students-container']}>
      <h1 className={styles['students-title']}>Students List</h1>
      <Link href="/students/add" className={styles['add-student-button']}>
        Add Student
      </Link>
      <table className={styles['students-table']}>
        <thead>
          <tr>
            <th>NIM</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student: any) => (
            <tr key={student.NIM}>
              <td>{student.NIM}</td>
              <td>
                    {student.NamaDepan}
              </td>
              <td>{student.NamaBelakang}</td>
              <td>
                <Link href={`/students/${student.NIM}`} className={styles['student-link']}>
                    Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
