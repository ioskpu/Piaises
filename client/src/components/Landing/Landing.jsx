import style from "./Landing.module.css";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.contenedor}>
      <h1 className={style.tittle}>Bienvenido a Countries App</h1>
      <p className={style.text}>
        Explora el mundo para descubrir nuevos viajes
        <span> Aventurero </span>
        Sé bienvenido 
      </p>
      <br />
      <br />
      <p className={style.text_secundario}>
      Con nuestra app de países, tendrás acceso a información básica detallada
        información sobre cada nación. Además, podrá explorar una amplia
        gama de actividades disponibles en cada destino, desde actividades al aire libre
        aventuras a experiencias culturales inolvidables. También puedes crear
        nuevas actividades!
        
      </p>
      <button className={style.button}>
        <NavLink to="/home">Explorar</NavLink>
      </button>
    </div>
  );
};

export default Landing;
