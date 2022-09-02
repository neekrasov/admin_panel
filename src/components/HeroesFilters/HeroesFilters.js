// 1. Формирование фильтров на основании загруженных данных
// 2. Добавление класса активности при нажатии на фильтр

import { useEffect } from "react";
import classNames from "classnames";
import { fetchFilters, selectAll } from "./filtersSlice";
import { filterChanged } from "./filtersSlice"
import { useDispatch, useSelector } from "react-redux";
import store from '../../store';

const HeroesFilters = () => {
    const {currentFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());

        // eslint-disable-next-line
    }, []);

    const renderFilters = (arr) => {
        if (arr.length === 0) return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        return arr.map(({name, className, label}) => <button 
                                                        key={name} 
                                                        id={name} 
                                                        className={classNames('btn', className, {'active': name === currentFilter})}
                                                        onClick={() => dispatch(filterChanged(name))}
                                                        >{label}</button>)
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters (filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;