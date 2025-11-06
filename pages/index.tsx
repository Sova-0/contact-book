import { Button, Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from '../store/index';
import { addContact, setFilterType, setSortOrder, selectFilteredContacts, ContactType } from "@/features/contacts/contactsSlice";
import { useState } from "react";
import { ContactFormModal } from '@/components/ContactFormModal';
import { ContactsList } from "@/components/ContactList";
import { ContactsFilter } from "@/components/FilterPanel";

export default function Home() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectFilteredContacts);
  const filterType = useAppSelector(state => state.contacts.filterType);
  const sortOrder = useAppSelector(state => state.contacts.sortOrder);
  
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAdd = () => {
    dispatch(addContact({ type: 'email', value: 'test@email.com', description: 'testDescription' }))
  }
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>
          Контактная книга
        </h2>
        <Button variant='primary' onClick={handleOpen}>Добавить контакт</Button>
      </div>
      
       <ContactsFilter
        filterType={filterType}
        sortOrder={sortOrder}
         onFilterChange={(type: ContactType | 'all') => dispatch(setFilterType(type))}
        onSortChange={(order: 'new' | 'old') => dispatch(setSortOrder(order))}
      />
      <ContactsList/>
      <ContactFormModal show={showModal} handleClose={handleClose} />
    </Container>
  );
}
