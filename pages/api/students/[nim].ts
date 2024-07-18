import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

type ResponseData = {
    NIM: number,
    NamaDepan: string,
    NamaBelakang: string,
    TanggalLahir: number,
  }

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse<ResponseData>) {
    const { nim } = req.query;

    if (req.method === 'GET') {
        try {
        const [rows] = await pool.query('SELECT * FROM students WHERE NIM = ?', [nim]);
        res.status(200).json(rows[0]);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'PUT') {
        const { NamaDepan, NamaBelakang, TanggalLahir } = req.body;
        try {
        await pool.query('UPDATE students SET NamaDepan = ?, NamaBelakang = ?, TanggalLahir = ? WHERE NIM = ?', [NamaDepan, NamaBelakang, TanggalLahir, nim]);
        res.status(200).json({ message: 'Student updated' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'DELETE') {
        try {
        await pool.query('DELETE FROM students WHERE NIM = ?', [nim]);
        res.status(200).json({ message: 'Student deleted' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    }
