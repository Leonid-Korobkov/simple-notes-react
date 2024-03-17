import st from './Logo.module.css'

function Logo({src, ...props}) {
  return (
    <img className={st['logo-img']} src={src} alt="Логотип" {...props}/>
  );
}

export default Logo;