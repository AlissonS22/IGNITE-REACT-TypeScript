import style from '../components/Header.module.css';
import logoHeader from '../assets/Ignite-simbol.svg'

export function Header() {
    return (
        <header className={style.header}>
            <img src={logoHeader} alt="logo"/>&nbsp;&nbsp;
            <strong>Social Feed</strong> 
        </header>     
    )
}