import { useSelector, useDispatch } from 'react-redux';

import { deleteContact } from '../../../redux/contacts/contacts-slice';
import { getFilteredContacts } from '../../../redux/contacts/constants-selectors';

import styles from "./my-contact-list.module.css"

const MyContactList = () => {
    const contacts = useSelector(getFilteredContacts);
    const dispatch = useDispatch();

    const onDeleteContact = (id) => {
        dispatch(deleteContact(id));
    };
    const elements = contacts.map(({ id, name, number }) =>
        <li
            className={styles.list}
            key={id}
        >
            {name}: {number}
            <button
                onClick={() => onDeleteContact(id)}
                className={styles.btn}
                type="button">
                Delete
            </button>
        </li>)
    
    return (
        <ul>
            {elements}
        </ul>
    )
};

export default MyContactList;