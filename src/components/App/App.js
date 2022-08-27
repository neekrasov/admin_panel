import HeroesList from '../HeroesList/HeroesList';
import HeroesAddForm from '../HeroesAddForm/HeroesAddForm';
import HeroesFilters from '../HeroesFilters/HeroesFilters';

import './App.sass';

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;