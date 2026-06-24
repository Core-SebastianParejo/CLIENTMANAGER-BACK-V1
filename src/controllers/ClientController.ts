import type { Request, Response } from 'express';
import { Client } from '../models/Client.js';
import { ClientResponse } from '../views/responses/ClientResponse.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

export class ClientController {
  static create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullName, email, phone, company } = req.body;
      const client = await Client.create({ fullName, email, phone, company });

      res.status(201).json(ClientResponse.from(client));
    } catch (error) {
      if ((error as Error).message.includes('Ya Existe')) {
        res.status(409).json({ error: (error as Error).message });
        return;
      }
      if (
        (error as Error).message.includes('Invalido') ||
        (error as Error).message.includes('caracteres')
      ) {
        res.status(422).json({ error: (error as Error).message });
        return;
      }
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  static findAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const clients = await Client.findAll();
      res
        .status(200)
        .json(clients.map((client) => ClientResponse.from(client)));
    } catch (_error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  static findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const client = await Client.findById(id);
      if (!client) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      res.status(200).json(ClientResponse.from(client));
    } catch (_error) {
      res.status(500).json({ error: 'Error interno del servidor: ' });
    }
  };

  static update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const { fullName, email, phone, company } = req.body;
      const client = await Client.update(id, {
        fullName,
        email,
        phone,
        company,
      });
      res.status(200).json(ClientResponse.from(client));
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  static delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      await Client.delete(id);
      res.status(204).send();
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
