import './styles/main.css'
import { useEffect } from 'react';

import TriathlonView from './view/view.jsx'
import TriathlonController from './controller/controller.jsx'

import { TriathlonData } from './model/triathlonData.js';
import { Member } from './model/member.js';


function App() {
    useEffect(() => {
        const view = new TriathlonView()
        const data = new TriathlonData()
        const member = new Member()
        new TriathlonController(data, view, member);
    }, []);

    return (
        <TriathlonView />
    )
}

export default App
