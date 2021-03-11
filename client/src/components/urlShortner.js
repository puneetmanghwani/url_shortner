import React, { useState } from 'react';

import Api from '../utils/API';


function UrlShortner(props) {
    const api = new Api();

    const [state, setState] = useState({
        urlCode: "",
        url:"",
        shortUrl:"",
    })
    

    const onChange = e => {
        setState({
            ...state,
            [e.target.id]: e.target.value,
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        const formData = {
            urlCode: state.urlCode,
            originalUrl: state.url,
        }
        api
        .generateShortUrl(formData)
        .then(( { data } ) => {
            const shortUrl = 'http://52.170.145.190/'+data.urlData.urlCode;
            setState({
                ...state,
                shortUrl,
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input placeholder="Enter Url" name="url" id="url" type="text" value={state.url} onChange={onChange} />
                <input placeholder="Enter Url Code" name="url Code" id="urlCode" type="text" value={state.urlCode} onChange={onChange} />
                <button type="submit">Submit</button>
            </form>
            Short Url :  { state.shortUrl && (<a href={state.shortUrl}> { state.shortUrl } </a>) }
        </div>
    )

}

export default UrlShortner;