import { Card, Button, ButtonGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteContact, selectFilteredContacts } from "@/features/contacts/contactsSlice";
import { useState } from "react";
import { ContactFormModal } from "./ContactFormModal";
import { Contact } from "@/features/contacts/contactsSlice";

export const ContactsList = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectFilteredContacts);

    const [editContact, setEditContact] = useState<Contact | null>(null);

    const handleDelete = (id: string) => {
        dispatch(deleteContact({ id }));
    };

    const handleEdit = (contact: Contact) => {
        setEditContact(contact);
    };

    return (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {contacts.length === 0 && <p className="text-muted">Контактов пока нет</p>}

            {contacts.map((contact) => (
                <Card key={contact.id} style={{ width: "18rem" }}>
                    <Card.Body>
                        <Card.Title className="text-capitalize">{contact.type}</Card.Title>
                        <Card.Text>
                            <strong>Значение:</strong> {contact.value}
                            {contact.description && (
                                <>
                                    <br />
                                    <strong>Описание:</strong> {contact.description}
                                </>
                            )}
                        </Card.Text>

                        <ButtonGroup className="w-100">
                            <Button variant="outline-danger" onClick={() => handleDelete(contact.id)}>
                                Удалить
                            </Button>
                            <Button variant="outline-secondary" onClick={() => handleEdit(contact)}>
                                Редактировать
                            </Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            ))}

            {editContact && (
                <ContactFormModal
                    show={!!editContact}
                    handleClose={() => setEditContact(null)}
                    mode="edit"
                    contact={editContact}
                />
            )}
        </div>
    );
};