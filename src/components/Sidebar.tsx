import {  PencilLine  } from 'phosphor-react'
import { Avatar } from './Avatar'
import styles from './Sidebar.module.css';

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover} 
                src="https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=40"
            />

            <div className={styles.profile}>

                <Avatar src="https://github.com/AlissonS22.png"/>

                <strong>Alisson Silva</strong>
                <span>Systems Analyst</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine />
                    Editar seu perfil
                </a>

            </footer>

        </aside>
    )
}