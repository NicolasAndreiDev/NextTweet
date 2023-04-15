import styles from './ExploreComponent.module.scss'
import HeaderPadrao from "../HeaderPadrao";
import Search from "../Search";
import ButtonHeader from '../ButtonHeader';
import { useRef,useState } from 'react'
import ListaPadrao from './ListaPadrao';
import { lista, listaEntertainment, listaNews, listaSports, listaTrending } from './Listas';
import Post from '../InfoUser/Post';

export default function ExploreComponent() {
    const [selectedOption, setSelectedOption] = useState('For you');
    const contentRef = useRef(null)

    function handleOptionChange(event: React.ChangeEvent<HTMLInputElement>) {
        return setSelectedOption(event.target.value)
    }

    function renderContent() {
        if(selectedOption === 'For you') {
            return (
                <div>
                    <ListaPadrao lista={lista} existe={false}/>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            )
        }
        if(selectedOption === 'Trending') {
            return <div><ListaPadrao lista={listaTrending}/></div>
        }
        if(selectedOption === 'News') {
            return <div><ListaPadrao lista={listaNews}/></div>
        }
        if(selectedOption === 'Sports') {
            return <div><ListaPadrao lista={listaSports}/></div>
        }
        if(selectedOption === 'Entertainment') {
            return <div><ListaPadrao lista={listaEntertainment} /></div>
        }
    }

    return(
        <>
            <HeaderPadrao>
                <div className={styles.explore}>
                    <Search DadosOn={false} style={{width: '100%', boxShadow: 'none', border: '.1rem solid gray'}}/>
                </div>
                <div className={styles.buttonsExplore}>
                    <ButtonHeader names={'For you'} checked={selectedOption === 'For you'} onChange={handleOptionChange} style={selectedOption === 'For you' ? {fontWeight: 'bold'} : {}}>
                        {selectedOption === 'For you' ? <div className={styles.select}></div> : ''}
                    </ButtonHeader>
                    <ButtonHeader names={'Trending'} checked={selectedOption === 'Trending'} onChange={handleOptionChange} style={selectedOption === 'Trending' ? {fontWeight: 'bold'} : {}}>
                        {selectedOption === 'Trending' ? <div className={styles.select}></div> : ''}
                    </ButtonHeader>
                    <ButtonHeader names={'News'} checked={selectedOption === 'News'} onChange={handleOptionChange} style={selectedOption === 'News' ? {fontWeight: 'bold'} : {}}>
                        {selectedOption === 'News' ? <div className={styles.select}></div> : ''}
                    </ButtonHeader>
                    <ButtonHeader names={'Sports'} checked={selectedOption === 'Sports'} onChange={handleOptionChange} style={selectedOption === 'Sports' ? {fontWeight: 'bold'} : {}}>
                        {selectedOption === 'Sports' ? <div className={styles.select}></div> : ''}
                    </ButtonHeader>
                    <ButtonHeader names={'Entertainment'} checked={selectedOption === 'Entertainment'} onChange={handleOptionChange} style={selectedOption === 'Entertainment' ? {fontWeight: 'bold'} : {}}>
                        {selectedOption === 'Entertainment' ? <div className={styles.select}></div> : ''}
                    </ButtonHeader>
                </div>
            </HeaderPadrao>
            <div ref={contentRef}>
                {renderContent()}
            </div>
        </>
    )
}