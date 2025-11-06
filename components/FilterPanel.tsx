import { Form, Row, Col } from "react-bootstrap";
import { ContactType } from "@/features/contacts/contactsSlice";

interface ContactsFilterProps {
    filterType: ContactType | 'all';
    sortOrder: 'new' | 'old';
    onFilterChange: (type: ContactType | 'all') => void;
    onSortChange: (order: 'new' | 'old') => void;
}

export const ContactsFilter = ({ filterType, sortOrder, onFilterChange, onSortChange }: ContactsFilterProps) => {
    return (
        <Form className="mb-3">
            <Row className="g-3">
                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label>Фильтр по типу</Form.Label>
                        <Form.Select value={filterType} onChange={e => onFilterChange(e.target.value as ContactType | 'all')}>
                            <option value="all">Все</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="adress">Adress</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                    <Form.Group>
                        <Form.Label>Сортировка</Form.Label>
                        <Form.Select value={sortOrder} onChange={e => onSortChange(e.target.value as 'new' | 'old')}>
                            <option value="new">Сначала новые</option>
                            <option value="old">Сначала старые</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
};