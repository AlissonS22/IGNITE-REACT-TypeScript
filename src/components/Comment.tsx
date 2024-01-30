/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from 'react';
import styles from './Comment.module.css';
import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';


interface commentProps {
    content: string;
    deleteComment: (comment: string) => void;
}

export function Comment({content, deleteComment} : commentProps) {
    const [likeCount, setLikeCount] = useState(0) 

   function HandleClickLike() {
        setLikeCount(state => {
           return state + 1
        })       
   }

 function handleDeleteComment() {
    deleteComment(content)
    // console.log(content)
 }

    return (

        <div className={styles.comment}>
            <Avatar 
                hasBorder={false} 
                src="https://github.com/AlissonS22.png" 
                alt=""
            />
             
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Alisson</strong>
                            <time title='06/10/2023 às 16:26:46' dateTime="2023-10-06 16:26:46">Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar Comentário'>
                            <Trash size={20} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
                
                <footer>
                    <button onClick={HandleClickLike}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )    
}