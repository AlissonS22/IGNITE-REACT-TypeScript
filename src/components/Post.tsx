import styles from './Post.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Comment } from './Comment';
import { Avatar } from './Avatar';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    author: Author;
    publishedAt: Date;
    content: Content[]; 
    id: number;
}

interface PostProps {
   post: PostType;
}

interface Commentss {
    id: number;
    text: string;

  }



export function Post({post}: PostProps) {

    const [comments, setComments] = useState<Commentss[]>([])

    const [newCommentText, setnewCommentText] = useState('')

    const [idCounter, setIdCounter] = useState(1); // Adiciona um contador de IDs

    const [isButtonVisible, setIsButtonVisible] = useState([false]);
 
    const publishedDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true,

    })

    
    function handleCreateNewComment(event : FormEvent) {
        event.preventDefault();

            // setComments([...comments, newCommentText])
      
          // Adiciona um novo comentário com um ID único
        setComments([...comments, {id: idCounter, text: newCommentText}]) 
        // Atualiza o contador de IDs para o próximo valor único
        setIdCounter(idCounter + 1);
      
        setnewCommentText('')

        // setIsButtonVisible(false)
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement> | FormEvent) {
        
        if ('value' in event.target) {
            // TypeScript sabe que 'event.target' tem uma propriedade 'value' neste ponto
            const value = event.target.value;
            setnewCommentText(value);
            setIsButtonVisible([true]);
        }
    }

  
    function deleteComment(commentToDelete : Commentss) {
        const commentWithoutDeletedOne = comments.filter(comment => {
            return comment.id !== commentToDelete.id
        })
   
        setComments(commentWithoutDeletedOne)        
    }
    
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder src={post.author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>          
                {post.content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {        
                        return <p key={line.content}><a href="#">{line.content}</a></p>
                    }
                })}
            </div>

            <form  onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea  
                    
                    name='commentUsr'
                    placeholder='Deixe um comentário'         
                    onChange={handleNewCommentChange}     
                    value={newCommentText}
                    onClick={handleNewCommentChange}                  
                />
                <footer>
                    {isButtonVisible && <button disabled={newCommentText.length === 0} type='submit'>
                        Publicar
                    </button>}
                </footer>
            </form>

            <div className={styles.commentList}>
               {comments.map((comment) => {
               return <Comment
                    key={comment.id}
                    content={comment.text}
                    deleteComment={() => deleteComment(comment)} // Passa o ID para a função deleteComment
                />
               })}
            </div>
        </article>
       
    )
}