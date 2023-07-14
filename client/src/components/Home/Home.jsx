import style from "./Home.module.css";
import Countries from "../Countries/Countries";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

//Acciones:
import {
  getCountriesByName,
  filterByContinent,
  filterByActivity,
  orderByName,
  orderByPopulation,
  nextPage,
  previousPage,
  resetPage,
} from "../../Redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  //Estado globales
  const activities = useSelector((state) => state.activities);

  //manejo de paginado:
  const firstToShow = useSelector((state) => state.firstToShow);
  const countries = useSelector((state) => state.countries);

  const paginaActual =
    countries.length === 0 ? 0 : Math.ceil((firstToShow + 1) / 10);

  const pages = Math.ceil(countries.length / 10);

  //Estado local para manejar la barra de busqueda
  const [countrySearch, setCountrySearch] = useState("");
  const [searchError, setSearchError] = useState("");
  //manejador de la barra de busqueda
  const handleChange = (event) => {
    setCountrySearch(event.target.value);
  };
  //despacha la accion de la barra de busqueda
  const handleSearch = () => {
    dispatch(getCountriesByName(countrySearch));
    dispatch(resetPage());
    setSearchError(countrySearch);
  };

  // manejadores del paginado
  const handlePrevious = () => {
    dispatch(previousPage());
  };

  const handleNext = () => {
    dispatch(nextPage());
  };

  //Manejadores de ORDEN
  const handleNameOrder = (e) => {
    dispatch(resetPage());
    dispatch(orderByName(e.target.value));
  };
  const handlePopulationOrder = (e) => {
    dispatch(resetPage());
    dispatch(orderByPopulation(e.target.value));
  };

  //Manejadores de los filtros
  const handleContinentFilter = (e) => {
    dispatch(resetPage());
    dispatch(filterByContinent(e.target.value));
  };
  const handleActivityFilter = (e) => {
    dispatch(resetPage());
    dispatch(filterByActivity(e.target.value));
  };
  return (
    <div className={style.home}>
      <nav>
        
        <Link to={"/"}>
          <h1 className={style.title}>Paises App</h1>
        </Link>
        <input
          className={style.input}
          name="search"
          type="search"
          placeholder=" countries..."
          onChange={handleChange}
        />
        <button className={style.search} onClick={handleSearch}>Buscar</button>

        <Link to={"/form"}>
          <button className={style.create}>Crear Actividad</button>
        </Link>
      </nav>

      <div className={style.selectores}>
        <div className={style.order_filter}>
          <h4>por Nombre</h4>
          <select name="nameOrder" defaultValue="" onChange={handleNameOrder}>
            <option value="" disabled hidden>
              {" "}
              --Seleccionar--
            </option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
        </div>
        <div className={style.order_filter}>
          <h4>Por población</h4>
          <select
            name="populationOrder"
            defaultValue=""
            onChange={handlePopulationOrder}
          >
            <option value="" disabled hidden>
              {" "}
              --Seleccionar--{" "}
            </option>
            <option value="A">Ascendente</option>
            <option value="D">Descendente</option>
          </select>
        </div>
        <div className={style.order_filter}>
          <h4>Filtrar por continente</h4>
          <select
            name="continentFilter"
            defaultValue=""
            onChange={handleContinentFilter}
          >
            <option value="" disabled hidden>
              {" "}
              --Seleccionar--{" "}
            </option>
            <option value="All countries">Todos los países</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </div>
        <div className={style.order_filter}>
          <h4>Filtrar por actividad</h4>
          <select
            name="activityFilter"
            defaultValue=""
            onChange={handleActivityFilter}
          >
            <option value="" disabled hidden>
              {" "}
              --Seleccionar--{" "}
            </option>
            <option value="All countries">Todos los países</option>
            {activities?.map((activity) => {
              return (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <Countries searchError={searchError} />
      <div className={style.backNext}>
        <button onClick={handlePrevious}>Anterior</button>
        <button onClick={handleNext}>Siguiente</button>
        <p>
          Pagina {paginaActual} de {pages}
        </p>
      </div>
    </div>
  );
};

export default Home;
