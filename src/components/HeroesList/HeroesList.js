import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect'

import { fetchHeroes } from '../../actions';
import HeroesListItem from "../HeroesListItem/HeroesListItem";
import Spinner from '../Spinner/Spinner';
import './HeroesList.sass';


// 1. При клике на "крестик" идет удаление персонажа из общего состояния и из файла json.

const HeroesList = () => {
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const filterHeroesSelector = createSelector(
        state => state.heroes.heroes,
        state => state.filters.currentFilter,
        (heroes, filter) => {
            if (filter !== 'all') return heroes.filter(({element}) => element === filter);
            return heroes;
        }
    )
    const heroes = useSelector(filterHeroesSelector);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request))
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr === undefined || arr.length === 0) {
            return (
                    <CSSTransition timeout={300} classNames="itemHero">
                        <h5 className="text-center mt-5"> Героев пока нет </h5>
                    </CSSTransition>
                    )
        }

        return arr.map(({id, ...props}) => {
            return (
                    <CSSTransition key={id} timeout={500} classNames="itemHero">
                        <HeroesListItem id={id} {...props}/>
                    </CSSTransition>
                    )
        })
    }
    return (
        <TransitionGroup component="ul">
            {renderHeroesList(heroes)}
        </TransitionGroup>
    )
}

export default HeroesList;