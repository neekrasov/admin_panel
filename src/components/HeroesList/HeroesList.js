import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useGetAllHeroesQuery } from '../../api/apiSlice';
import HeroesListItem from "../HeroesListItem/HeroesListItem";
import Spinner from '../Spinner/Spinner';
import './HeroesList.sass';



// 1. При клике на "крестик" идет удаление персонажа из общего состояния и из файла json.

const HeroesList = () => {
    const {
        data: heroes = [],
        isLoading,
        isError
    } = useGetAllHeroesQuery();

    const currentFilter = useSelector(state=> state.filters.currentFilter);

    const filteredHeroes = useMemo(() => {
        const heroesCopy = heroes.slice();
        if (currentFilter !== 'all') return heroesCopy.filter(({element}) => element === currentFilter);
        return heroesCopy;
    }, [heroes, currentFilter])

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
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
            {renderHeroesList(filteredHeroes)}
        </TransitionGroup>
    )
}

export default HeroesList;