import CountryCard from "../CountryCard/CountryCard";
import style from "./Countries.module.css";
import { useSelector } from "react-redux";

const Countries = ({ searchError }) => {
  const countries = useSelector((state) => state.countries);
  const firstToShow = useSelector((state) => state.firstToShow);
  return (
    <div className={style.contenedor}>
      {countries.length > 0 ? (
        countries
          .slice(firstToShow, firstToShow + 10)
          .map(({ id, name, image, continent, population }) => {
            return (
              <CountryCard
                key={id}
                id={id}
                name={name}
                image={image}
                continent={continent}
                population={population}
              />
            );
          })
      ) : (
        <div className={style.errorMessage}>
          <h2>Lo siento no se encontraron resultados</h2>
          <h4>
            No hay Países con el termino indicado "{searchError}", por favor intente nuevamente
          </h4>
        </div>
      )}
    </div>
  );
};

export default Countries;
