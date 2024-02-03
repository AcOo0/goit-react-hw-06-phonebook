import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from "nanoid";

import { getFilteredContacts } from '../../../redux/contacts/constants-selectors';
import { addContact } from "../../../redux/contacts/contacts-slice";

import styles from './my-contact-form.module.css'

const INITIAL_STATE = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
};

const MyContactForm = () => {
    const [state, setState] = useState({ ...INITIAL_STATE });
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
            alert(`${data.name} or Number: ${data.number} is already in contacts.`);
            return;
        }
        
        const action = addContact(data);
        dispatch(action);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState({
            ...state,
            [name]: value,
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddContact({ ...state });
        if (!isDublicate({ ...state })) {
            reset();
        }
    };

    const reset = () => {
        setState({ ...INITIAL_STATE });
    };

    
    const contactNameId = nanoid();
    const contactNumberId = nanoid();
    
    const { name, number } = state;

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formElements}>
                <label htmlFor={contactNameId}>Name</label>
                <input
                    value={name}
                    onChange={handleChange}
                    id={contactNameId}
                    name="name"
                    required
                    type="text"
                    placeholder="Name" />
            </div>
            <div className={styles.formElements}>
                <label htmlFor={contactNumberId}>Number</label>
                <input
                    value={number}
                    onChange={handleChange}
                    id={contactNumberId}
                    name="number"
                    required
                    pattern="^[+0-9\-\(\)\s]+$"
                    type="tel"
                    placeholder="Number" />
            </div>
            <button className={styles.btn} type="submit">Add contact</button>
        </form>
    );
}

export default MyContactForm;