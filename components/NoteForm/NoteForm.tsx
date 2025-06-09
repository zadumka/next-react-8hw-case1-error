'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, CreateNoteData } from '@/lib/api';
import css from './NoteForm.module.css';
import { Tag } from '@/types/note';
import { useRouter } from 'next/navigation';


export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();


  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });



  const handleSubmit = (formData: FormData) => {
    const data: CreateNoteData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as Tag,
    };
    mutate(data);
  };

  const handleClose = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor=""title"">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          required
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          name="content"
          className={css.textarea}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          defaultValue="Todo"
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleClose}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
