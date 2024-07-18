import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const [rows] = await pool.query('SELECT * FROM students');
    res.status(200).json(rows);
  } else if (req.method === 'POST') {
    const { NIM, NamaDepan, NamaBelakang, TanggalLahir } = req.body;
    await pool.query('INSERT INTO students (NIM, NamaDepan, NamaBelakang, TanggalLahir) VALUES (?, ?, ?, ?)', [NIM, NamaDepan, NamaBelakang, TanggalLahir]);
    res.status(201).json({ message: 'Student added' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
