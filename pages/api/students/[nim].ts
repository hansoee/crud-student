import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Student extends RowDataPacket {
  NIM: number;
  NamaDepan: string;
  NamaBelakang: string;
  TanggalLahir: string; 
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const { nim } = req.query;

  if (req.method === 'GET') {
    try {
      const [rows] = await pool.query<Student[]>('SELECT * FROM students WHERE NIM = ?', [nim]);
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else if (req.method === 'PUT') {
    const { NamaDepan, NamaBelakang, TanggalLahir } = req.body;
    try {
      const [result] = await pool.query<ResultSetHeader>('UPDATE students SET NamaDepan = ?, NamaBelakang = ?, TanggalLahir = ? WHERE NIM = ?', [NamaDepan, NamaBelakang, TanggalLahir, nim]);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Student updated' });
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const [result] = await pool.query<ResultSetHeader>('DELETE FROM students WHERE NIM = ?', [nim]);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Student deleted' });
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
