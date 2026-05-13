import NoteRepositories from '../repositories/note-repositories.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import response from '../../../utils/response.js';
import NotFoundError from '../../../exceptions/not-found-error.js';

export const createNote = async (req, res, next) => {
  const { title, tags, body } = req.validated;
  const note = await NoteRepositories.createNote({
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', note);
};

export const getNotes = async (req, res) => {
  const notes = await NoteRepositories.getNotes();
  return response(res, 200, 'Catatan sukses ditampilkan', notes);
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await NoteRepositories.getNoteById(id);

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil ditampilkan', note);
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, tags } = req.validated;

  const note = await NoteRepositories.updateNoteById({
    id,
    title,
    body,
    tags,
  });

  if (!note) {
    return next(new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', note);
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const deleteNote = await NoteRepositories.deleteNoteById(id);

  if (!deleteNote) {
    return next(new NotFoundError('Gagal menghapus catatan. Id tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil dihapus', deleteNote);
};
