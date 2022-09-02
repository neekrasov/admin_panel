// 1. Формирование фильтров на основании загруженных данных
// 2. Добавление класса активности при нажатии на фильтр
import classNames from "classnames";
import { filterChanged } from "./filtersSlice"
import { useDispatch, useSelector } from "react-redux";

import { useGetAllFiltersQuery } from '../../api/apiSlice'

const HeroesFilters = () => {
    const {data: filters = []} = useGetAllFiltersQuery();
    const {currentFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();

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