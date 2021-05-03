import React from 'react';
import s from './News.module.css'
import NewsData from './NewsData';


const News = (props) => {

    let addNews = (e) => {
        e.preventDefault()
        props.addNewsContainer()
    }

    let changeNews = (e) => {
        let newsText = e.target.value
        props.changeNewsContainer(newsText)
    }

    let newsDataElement = props.news.map((el) => (<NewsData name={el.name} data={el.data} news={el.news} />))

    return (
        <div>
            <div>
                <div>{newsDataElement}</div>
            </div>

            <div>
                <form>
                    <div>
                        <input onChange={changeNews} value={props.newsTextInitial} type="textarea"></input>
                        <div>
                            <button onClick={addNews}>Send News</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default News;