// 1. Cоздание нового героя с данными введёнными из формы. 
//              Он должен:
//                  1. Попадать в общее состояние и отображаться в списке.
//                  2. Фильтроваться.
// 2. Генерация персонажа через uiid.
// 3. Персонаж создается и в файле json.
// 4. Элементы <option></option> формируются исходя из данных в базе.

import { ErrorMessage, Field, Form, Formik } from "formik";
import {v4 as uuidv4} from "uuid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { createHero, filtersFetched, filtersFetching, filtersFetchingError} from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../Spinner/Spinner";

const HeroesAddForm = () => {
    const {heroes, filters, filtersLoadingStatus} = useSelector(state=>state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(()=>{
        dispatch(filtersFetching());
        request(`http://localhost:3001/filters/`)
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));
    // eslint-disable-next-line 
    }, [])

    const onCreate = (values) => {
        const {name, text, element} = values;
        const hero = {
            id: uuidv4(),
            name: name,
            element: element,
            description: text
        };

        request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(hero))
        .then(() => dispatch(createHero(hero)));
    }

    const renderFilters = (filters, filtersLoadingStatus) => {
        if (!filters && filters.length === 0) return;
        if (filtersLoadingStatus === "loading") return <Spinner/>;
        else if (filtersLoadingStatus === "error") return <option>Ошибка загрузки</option>;
        else if (filtersLoadingStatus === "idle") return filters.map((item, index) => <option key={index} value={item}>{item}</option>);
    }

    const loadFilters = renderFilters(filters, filtersLoadingStatus);

    return (
            <Formik
                initialValues = {{
                    name: "",
                    element: "",
                    text: ""
                }}

                validationSchema = {
                    Yup.object({
                        name: Yup.string()
                                .min(3, "Минимум 3 символа!")
                                .required("Обязательное поле!"),
                        text: Yup.string()
                                .min(20, "Минимум 20 символов!")
                                .required("Обязательное поле!"),
                        element: Yup.string()
                                .required("Выберите элемент!"),
                    })
                }

                onSubmit = {values => onCreate(values)}
            >
            
                <Form className="border p-4 shadow-lg rounded">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                        <Field 
                            type="text" 
                            name="name" 
                            className="form-control" 
                            id="name" 
                            placeholder="Как меня зовут?"/>
                    </div>
                    <ErrorMessage name="name">{msg => <div className="error">{msg}</div>}</ErrorMessage>
 
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label fs-4">Описание</label>
                        <Field
                            type="text"
                            name="text" 
                            className="form-control" 
                            id="text" 
                            placeholder="Что я умею?"
                            as="textarea"
                            style={{"height": '130px'}}/>
                    </div>
                    <ErrorMessage name="text">{msg => <div className="error" >{msg}</div>}</ErrorMessage>

                    <div className="mb-3">
                        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                        <Field 
                            className="form-select" 
                            id="element" 
                            name="element"
                            as="select">
                            <option >Я владею элементом...</option>
                            {loadFilters}
                        </Field>
                    </div>
                    <ErrorMessage name="element">{msg => <div className="error">{msg}</div>}</ErrorMessage>

                    <button type="submit" className="btn btn-primary">Создать</button>
                </Form>
                
            </Formik>
    )
}

export default HeroesAddForm;