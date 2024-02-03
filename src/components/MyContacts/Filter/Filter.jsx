import { useSelector, useDispatch } from 'react-redux';

import { setFilter } from '../../../redux/filter/filter-slice';
import { getFilter } from '../../../redux/filter/filter-selectors';

import styles from './filter.module.css'

const Filter = () => {

    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    const changeFilter = ({ target }) => dispatch(setFilter(target.value));

    return (<>
        <p className={styles.findInputText}>Find contacts by name</p>
        <input
            type='text'
            value={filter}
            onChange={changeFilter}
            className={styles.serchInput}
            name='filter'
            placeholder='Search' />
    </>
    )
};

export default Filter;