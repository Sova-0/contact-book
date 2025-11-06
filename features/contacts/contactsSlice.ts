import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export type ContactType = 'phone' | 'email' | 'adress' | 'other';

export interface Contact {
  id: string;
  type: ContactType;
  value: string;
  description?: string;
  createdAt: string;
}

interface ContactsState { 
  contactList: Contact[];
  filterType: ContactType | 'all';
  sortOrder: 'new' | 'old';
} 

const initialState: ContactsState = {
  contactList: [],
  filterType: 'all',
  sortOrder: 'new',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state, action: PayloadAction<Contact>) => {
        state.contactList.unshift(action.payload);
      },
      prepare: (contact: Omit<Contact, 'id' | 'createdAt'>) => ({
        payload: { id: uuidv4(), createdAt: new Date().toISOString(), ...contact },
      })
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contactList.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contactList[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<{ id: string }>) => {
      state.contactList = state.contactList.filter(c => c.id !== action.payload.id);
    },
    setFilterType: (state, action: PayloadAction<ContactType | 'all'>) => {
      state.filterType = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'new' | 'old'>) => {
      state.sortOrder = action.payload;
    },
  }
});

export const { addContact, updateContact, deleteContact, setFilterType, setSortOrder } = contactsSlice.actions;
export default contactsSlice.reducer;

export const selectFilteredContacts = (state: { contacts: ContactsState }) => {
  const { contactList, filterType, sortOrder } = state.contacts;
  let filtered = [...contactList];

  if (filterType !== 'all') {
    filtered = filtered.filter(contact => contact.type === filterType);
  }

  filtered.sort((a, b) => {
    if (sortOrder === 'new') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  return filtered;
};