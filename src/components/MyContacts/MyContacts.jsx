import MyContactForm from './MyContactForm/MyContactForm';
import MyContactList from './MyContactList/MyContactList';
import Filter from './Filter/Filter';



import styles from './my-contacts.module.css'

const MyContacts = () => {
    return (
        <div className={styles.wrapper}>
            <h1>Phonebook</h1>
            <MyContactForm />
            <div className={styles.listwrapper}>
                <h2>Contacts</h2>
                <Filter />
                <MyContactList />
            </div>
        </div>
    );
}

export default MyContacts;