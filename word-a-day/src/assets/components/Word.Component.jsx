import React from "react";
import { useState } from "react";

const WordContainer = ({title, partOfSpeech, Def}) => {
    return(
        <>
        <div>
            <h1>{title}</h1>
            <p><strong>Part of Speech:</strong> {partOfSpeech}</p>
            <p><strong>Definition:</strong> {Def}</p>
        </div>
        </>
    )
}

export default WordContainer