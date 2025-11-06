import { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/store";
import { addContact, updateContact, Contact, ContactType } from "@/features/contacts/contactsSlice";

interface ContactFormValues {
  type: ContactType;
  value: string;
  description: string | null;
}

interface Props {
  show: boolean;
  handleClose: () => void;
  mode?: 'create' | 'edit';
  contact?: Contact | null;
}

const schema = yup.object({
  type: yup
    .mixed<ContactType>()
    .oneOf(["phone", "email", "adress", "other"], "Выберите тип контакта")
    .required("Выберите тип контакта"),
  value: yup.string().required("Введите контакт"),
  description: yup.string().notRequired().default(""),
});

export const ContactFormModal = ({
  show,
  handleClose,
  mode = 'create',
  contact = null,
}: Props) => {
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { type: "" as ContactType, value: "", description: "" },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    if (mode === 'create') {
      dispatch(addContact({ ...data, description: data.description || undefined }))
    } else if (contact && mode === 'edit') {
      dispatch(updateContact({ ...contact, ...data, description: data.description ?? undefined }));
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      handleClose();
      reset();
    }, 2000);
  };

  useEffect(() => {
    if (contact && mode === 'edit') {
      reset({
        type: contact.type,
        value: contact.value,
        description: contact.description ?? '',
      });
    }
  }, [contact, mode, reset]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'create' ? 'Добавить контакт' : 'Редактировать контакт'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {showAlert &&
          <Alert variant="success">
            {mode === 'create'
              ? 'Контакт успешно добавлен'
              : 'Контакт успешно обновлён'
            }
          </Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Тип</Form.Label>
            <Form.Select {...register("type")}>
              <option value="">Выберите тип</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="adress">Adress</option>
              <option value="other">Other</option>
            </Form.Select>
            {errors.type && <Form.Text className="text-danger">{errors.type.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Контакт</Form.Label>
            <Form.Control {...register("value")} />
            {errors.value && <Form.Text className="text-danger">{errors.value.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" rows={2} {...register("description")} />
          </Form.Group>

          <Button variant="primary" type="submit">
            {mode === 'create' ? 'Сохранить' : 'Обновить'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};