// 1. Формирование фильтров на основании загруженных данных
// 2. Добавление класса активности при нажатии на фильтр

import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import classNames from "classnames";
import { fetchFilters, filterChanged } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const HeroesFilters = () => {
    const {filters, currentFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request))

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

    const loadFilters = renderFilters (filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {loadFilters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;