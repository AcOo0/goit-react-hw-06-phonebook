import { useSelector, useDispatch } from 'react-redux';

import MyContactForm from './MyContactForm/MyContactForm';
import MyContactList from './MyContactList/MyContactList';
import Filter from './Filter/Filter';

import { addContact, deleteContact } from '../../redux/contacts/contacts-slice';
import { setFilter } from '../../redux/filter/filter-slice';
import { getFilteredContacts } from '../../redux/contacts/constants-selectors';

import styles from './my-contacts.module.css'

const MyContacts = () => {
    const contacts = useSelector(getFilteredContacts);
    const dispatch = useDispatch();

    const isDublicate = ({ name, number }) => {
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.trim();
        
        const dublicate = contacts.find(item => {
            const normalizeCurrentName = item.name.toLowerCase();
            const normalizeCurrentNumber = item.number.trim();
            return (normalizeCurrentName === normalizedName || normalizeCurrentNumber === normalizedNumber)
        })

        return Boolean(dublicate);
    };

    const onAddContact = (data) => {        
        if (isDublicate(data)) {
            return alert(`${data.name} or Number: ${data.number} is already in contacts.`)
        }
        
        const action = addContact(data);
        dispatch(action);
    };

    const onDeleteContact = (id) => {
        dispatch(deleteContact(id));
    };

    const changeFilter = ({ target }) => dispatch(setFilter(target.value));
    
    return (
        <div className={styles.wrapper}>
            <h1>Phonebook</h1>
            <MyContactForm onSubmit={onAddContact} />
            <div className={styles.listwrapper}>
                <h2>Contacts</h2>
                <Filter onChange={changeFilter} />
                <MyContactList items={contacts} deleteContact={onDeleteContact} />
            </div>
        </div>
    );
}

export default MyContacts;