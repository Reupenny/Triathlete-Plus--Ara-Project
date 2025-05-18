import '../assets/styles/main.css'
import '../assets/styles/icons.css'
import { useEffect, useState } from 'react';

import TriathlonView from './view/view.jsx'
import TriathlonController from './controller/controller.jsx'

import { TriathlonData } from './model/triathlonData.js';
import { Member } from './model/member.js';


function App() {
    const [controller, setController] = useState(null);

    useEffect(() => {
        const data = new TriathlonData()
        const member = new Member()
        const triathlonController = new TriathlonController(data, member);
        setController(triathlonController);
    }, []);

    return (
        controller ? <TriathlonView controller={controller} /> : null
    )
}

export default App
